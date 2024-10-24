import React, { useState, useEffect, useCallback } from 'react'

type Location = {
  latitude: number | null
  longitude: number | null
}

type GeoError = {
  message: string
} | null

const useGeolocation = () => {
  const [location, setLocation] = useState<Location>({ latitude: null, longitude: null })
  const [error, setError] = useState<GeoError>(null)

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      setError({ message: "La géolocalisation n'est pas supportée par ce navigateur." })
      return
    }

    const handleSuccess = (position: GeolocationPosition) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      })
    }

    const handleError = (error: GeolocationPositionError) => {
      setError({ message: error.message })
    }

    const watchId = navigator.geolocation.watchPosition(handleSuccess, handleError, {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 5000,
    })

    return () => {
      navigator.geolocation.clearWatch(watchId)
    }
  }, [])

  return { location, error }
}

const GPSComponent: React.FC = () => {
  const { location, error } = useGeolocation()

  const sendLocationToServer = useCallback(async (location: Location) => {
    if (location.latitude !== null && location.longitude !== null) {
      try {
        // await fetch('http://95.111.225.198:5001/api/save-location', {  //je pointe direct sur l'adresse ip public de mon backend

        // je pointe direct sur le nom de domaine de mon backend
        await fetch('https://api-tracker.smartds.io/api/save-location', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            latitude: location.latitude,
            longitude: location.longitude,
            timestamp: Date.now(),
            userId: 'USER_ID', // Remplacer par l'ID réel de l'utilisateur
          }),
        })
      } catch (err) {
        console.error("Erreur lors de l'envoi de la localisation:", err)
      }
    }
  }, [])

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (location.latitude !== null && location.longitude !== null) {
      // Mettre en place un timer pour envoyer la position après 5 minutes
      timer = setTimeout(() => {
        sendLocationToServer(location)
      }, 5000) // 5s
    }

    return () => {
      if (timer) {
        clearTimeout(timer) // Nettoyer le timer à la destruction du composant
      }
    }
  }, [location, sendLocationToServer])

  return (
    <div>
      <h2>Suivi GPS en temps réel</h2>
      {error ? (
        <p>Erreur: {error.message}</p>
      ) : (
        <p>
          Latitude: {location.latitude} <br />
          Longitude: {location.longitude}
        </p>
      )}
    </div>
  )
}

export default GPSComponent

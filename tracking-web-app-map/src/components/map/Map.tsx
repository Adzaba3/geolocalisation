// src/components/Map.tsx

/*
import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import { getLocations } from '../../utils/locationService'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Définir une icône de marqueur rouge personnalisée
const redIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  iconSize: [25, 41], // Taille du marqueur
  iconAnchor: [12, 41], // Point d'ancrage de l'icône
  popupAnchor: [1, -34], // Point d'ancrage du popup par rapport à l'icône
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41], // Taille de l'ombre du marqueur
})

// Fonction pour effectuer un géocodage inverse via Nominatim
const reverseGeocode = async (latitude: number, longitude: number): Promise<string> => {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
  try {
    const response = await fetch(url);
    // const response = await fetch(url, {
    //   headers: {
    //     'User-Agent': 'MyApp (wilfried@connecttechnology.fr)', // Remplacez par un email valide pour suivre les bonnes pratiques de Nominatim
    //   },
    // })
    const data = await response.json()
    if (data && data.address) {
      // Prioriser les informations plus précises comme le quartier, village ou localité
      return (
        data.address.neighbourhood || // Quartier si disponible
        data.address.suburb || // Banlieue / quartier spécifique
        data.address.village || // Village si disponible
        data.address.town || // Ville si disponible
        data.address.city || // Ville principale
        data.address.country ||
        'Lieu inconnu' // Pays ou "lieu inconnu" si aucune info plus précise
      )
    }
    return 'Lieu inconnu'
  } catch (error) {
    console.error('Erreur lors de la récupération des informations du lieu:', error)
    return 'Lieu inconnu'
  }
}

const Map: React.FC = () => {
  const [locations, setLocations] = useState<any[]>([]) // Stocke les localisations récupérées
  const [error, setError] = useState<string | null>(null)
  const [locationNames, setLocationNames] = useState<Record<string, string>>({}) // Stocke les noms des lieux en fonction des coordonnées

  // Récupérer les localisations depuis le serveur AWS
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const data = await getLocations()
        setLocations(data) // Mise à jour des localisations dans l'état

        // Pour chaque location, récupérer le nom du lieu en fonction des coordonnées
        const names = await Promise.all(
          data.map(async (location) => {
            const name = await reverseGeocode(location.latitude, location.longitude)
            return { id: location._id, name }
          }),
        )
        // Mettre à jour l'état avec les noms des lieux
        const namesMap = names.reduce((acc, curr) => {
          acc[curr.id] = curr.name
          return acc
        }, {} as Record<string, string>)
        setLocationNames(namesMap)
      } catch (error) {
        setError(error.message)
      }
    }

    fetchLocations() // Charger les données une première fois
    const interval = setInterval(fetchLocations, 5000) // Recharger toutes les 5 secondes
    return () => clearInterval(interval)
  }, [])

  // Affichage du message d'erreur si la récupération des données échoue
  if (error) return <p>Erreur lors de la récupération des données : {error}</p>

  // Si on n'a pas assez de points pour tracer une ligne, ne rien afficher
  if (locations.length < 2) return <p>Pas assez de données pour tracer un chemin</p>

  // Extraire les coordonnées des localisations pour la polyline
  const positions = locations.map((location) => [location.latitude, location.longitude])

  return (
    <MapContainer center={positions[0]} zoom={13} style={{ height: '70vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
      />

      <Polyline positions={positions} color="red" weight={5} />

      {locations.map((location, index) => {
        // Vérifie si c'est la première ou la dernière position
        const isStart = index === 0
        const isEnd = index === locations.length - 1

        // Marqueur rouge pour la première et la dernière position
        if (isStart || isEnd) {
          return (
            <Marker
              key={location._id}
              position={[location.latitude, location.longitude]}
              icon={redIcon} // Utilisation de l'icône rouge personnalisée
            >
              <Popup>
                <strong>Lieu :</strong> {locationNames[location._id] || 'Chargement...'} <br />
                <strong>Latitude:</strong> {location.latitude} <br />
                <strong>Longitude:</strong> {location.longitude} <br />
                <strong>User ID:</strong> {location.userId} <br />
                <strong>Date/Heure:</strong> {new Date(location.timestamp).toLocaleString()} <br />
                <strong>Type :</strong> {isStart ? 'Position de départ' : 'Position actuelle'}{' '}
              </Popup>
            </Marker>
          )
        }

        // Afficher un marqueur transparent pour les autres positions (sans icône visible)
        return (
          <Marker
            key={location._id}
            position={[location.latitude, location.longitude]}
            icon={L.divIcon({ className: 'transparent-marker' })} // Marqueur transparent
          >
            <Popup>
              <strong>Lieu :</strong> {locationNames[location._id] || 'Chargement...'} <br />
              <strong>Latitude:</strong> {location.latitude} <br />
              <strong>Longitude:</strong> {location.longitude} <br />
              <strong>User ID:</strong> {location.userId} <br />
              <strong>Date/Heure:</strong> {new Date(location.timestamp).toLocaleString()}
            </Popup>
          </Marker>
        )
      })}
    </MapContainer>
  )
}

export default Map

*/




import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom'; // Importer useSearchParams
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { fetchLocationsByEquipment } from '../../utils/locationService'; // Service de localisation
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Définir une icône de marqueur rouge personnalisée
const redIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  iconSize: [25, 41], // Taille du marqueur
  iconAnchor: [12, 41], // Point d'ancrage de l'icône
  popupAnchor: [1, -34], // Point d'ancrage du popup par rapport à l'icône
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41], // Taille de l'ombre du marqueur
});

// Fonction pour effectuer un géocodage inverse via Nominatim
const reverseGeocode = async (latitude: number, longitude: number): Promise<string> => {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data && data.address) {
      return (
        data.address.neighbourhood ||
        data.address.suburb ||
        data.address.village ||
        data.address.town ||
        data.address.city ||
        data.address.country || 'Lieu inconnu'
      );
    }
    return 'Lieu inconnu';
  } catch (error) {
    console.error('Erreur lors de la récupération des informations du lieu:', error);
    return 'Lieu inconnu';
  }
};

const Map: React.FC = () => {
  const [searchParams] = useSearchParams(); // Utiliser useSearchParams pour récupérer les paramètres de l'URL
  const equipmentId = searchParams.get('equipmentId'); // Récupérer l'equipmentId depuis l'URL
  const [locations, setLocations] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [locationNames, setLocationNames] = useState<Record<string, string>>({});

  // Récupérer les localisations pour l'équipement spécifié
  useEffect(() => {
    if (!equipmentId) {
      setError('Aucun equipmentId fourni dans l’URL');
      return;
    }

    const fetchLocations = async () => {
      try {
        const data = await fetchLocationsByEquipment(equipmentId); // Récupère les localisations pour l'equipmentId
        setLocations(data);

        const names = await Promise.all(
          data.map(async (location) => {
            const name = await reverseGeocode(location.latitude, location.longitude);
            return { id: location._id, name };
          })
        );

        const namesMap = names.reduce((acc, curr) => {
          acc[curr.id] = curr.name;
          return acc;
        }, {} as Record<string, string>);
        setLocationNames(namesMap);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchLocations(); // Charger les données une première fois
    const interval = setInterval(fetchLocations, 5000); // Recharger toutes les 5 secondes
    return () => clearInterval(interval);
  }, [equipmentId]);

  if (error) return <p>Erreur : {error}</p>;
  if (locations.length < 2) return <p>Pas assez de données pour tracer un chemin</p>;

  const positions = locations.map((location) => [location.latitude, location.longitude]);

  return (
    <MapContainer center={positions[0]} zoom={13} style={{ height: '70vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
      />

      <Polyline positions={positions} color="red" weight={5} />

      {locations.map((location, index) => {
        const isStart = index === 0;
        const isEnd = index === locations.length - 1;

        if (isStart || isEnd) {
          return (
            <Marker
              key={location._id}
              position={[location.latitude, location.longitude]}
              icon={redIcon}
            >
              <Popup>
                <strong>Lieu :</strong> {locationNames[location._id] || 'Chargement...'} <br />
                <strong>Latitude:</strong> {location.latitude} <br />
                <strong>Longitude:</strong> {location.longitude} <br />
                <strong>Équipement ID:</strong> {equipmentId} <br />
                <strong>Date/Heure:</strong> {new Date(location.timestamp).toLocaleString()} <br />
                <strong>Type :</strong> {isStart ? 'Position de départ' : 'Position actuelle'}
              </Popup>
            </Marker>
          );
        }

        return (
          <Marker
            key={location._id}
            position={[location.latitude, location.longitude]}
            icon={L.divIcon({ className: 'transparent-marker' })}
          >
            <Popup>
              <strong>Lieu :</strong> {locationNames[location._id] || 'Chargement...'} <br />
              <strong>Latitude:</strong> {location.latitude} <br />
              <strong>Longitude:</strong> {location.longitude} <br />
              <strong>Équipement ID:</strong> {equipmentId} <br />
              <strong>Date/Heure:</strong> {new Date(location.timestamp).toLocaleString()}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default Map;

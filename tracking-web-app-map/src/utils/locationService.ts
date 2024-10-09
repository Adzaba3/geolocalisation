// src/services/locationService.ts
import axios from 'axios'

// const API_URL = 'http://13.51.175.43:5001/api/get-locations' // Remplacer par l'URL de ton serveur AWS
const API_URL = 'http://95.111.225.198:5001/api/get-locations' // Remplacer par l'URL de ton serveur AWS

// Fonction pour récupérer les données de localisation
export const getLocations = async () => {
  try {
    const response = await axios.get(API_URL)
    console.log(response.data.data)

    return response.data.data // Supposons que les données sont dans response.data.data
  } catch (error) {
    console.error('Erreur lors de la récupération des données de localisation:', error)
    throw error
  }
}

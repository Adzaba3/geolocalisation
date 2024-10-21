// src/services/locationService.ts
import axios from 'axios'

/*

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
*/


export const fetchLocationsByEquipment = async (equipmentId: string) => {
  const API_BASE_URL = `http://13.51.175.43:5001/api/equipements/${equipmentId}/positions`;
  
  try {
    // Envoyer la requête GET
    const response = await axios.get(API_BASE_URL);
    
    // Vérifier si la réponse contient les données attendues
    if (response.data && response.data.data) {
      return response.data.data; // Retourner les données de localisation
    } else {
      // Gérer le cas où la réponse n'est pas au format attendu
      throw new Error('Format de réponse inattendu');
    }
  } catch (error) {
    // Afficher plus d'informations sur l'erreur
    console.error('Erreur lors de la récupération des données de localisation:', error.message);
    
    // Si l'erreur provient de la réponse du serveur, afficher le statut et le message
    if (error.response) {
      console.error('Statut de l\'erreur:', error.response.status);
      console.error('Message d\'erreur du serveur:', error.response.data);
    }
    
    // Relancer l'erreur pour la gestion en amont
    throw error;
  }
};

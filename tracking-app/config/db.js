const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Connexion à MongoDB sans les options dépréciées
    const conn = await mongoose.connect(process.env.MONGO_URI);
    
    console.log(`MongoDB connecté: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Erreur de connexion à MongoDB: ${error.message}`);
    process.exit(1); // Arrêter l'application en cas d'erreur
  }
};

module.exports = connectDB;





// app.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const locationRoutes = require('./routes/locationRoutes');
const errorHandler = require('./middleware/errorMiddleware');
const cors = require('cors');

// Charger les variables d'environnement
dotenv.config();

// Connexion à MongoDB
connectDB();

const app = express();
app.use(cors({
  origin: 'http://localhost:5000', // Remplace par l'origine de ton application React (URL où l'app est hébergée)
  methods: ['GET', 'POST'], // Méthodes HTTP autorisées
  credentials: true, // Si tu utilises des cookies ou des sessions
}));
// Middleware pour parser les requêtes JSON
app.use(express.json());

// Définir les routes
app.use('/api', locationRoutes);

// Middleware de gestion des erreurs
app.use(errorHandler);

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});

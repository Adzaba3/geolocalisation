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


// Liste des origines autorisées
const allowedOrigins = [
  'https://security-tracker.smartds.io/',
  'http://95.111.225.198:5000/',
  // 'http://localhost:5000', // Par exemple, si tu veux autoriser le développement en local
  // 'http://localhost:5002', 
];


app.use(cors({
  // origin: 'http://13.51.175.43:5000',  // Remplace par l'origine de ton application React (URL où l'app est hébergée)
  // origin: '*',  // Remplace par l'origine de ton application React (URL où l'app est hébergée)
  origin: function (origin, callback) {
    // Si aucune origine (comme dans une requête serveur-serveur), autoriser
    if (!origin) return callback(null, true);
    // Si l'origine est dans la liste, autoriser
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    // Sinon, rejeter la requête
    return callback(new Error('Accès interdit par la politique CORS'));
  },
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

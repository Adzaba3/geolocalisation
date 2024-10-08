const Location = require('../models/locationModel');

// Enregistrer la position GPS
exports.saveLocation = async (req, res) => {
  const { latitude, longitude, userId, timestamp } = req.body;

  if (!latitude || !longitude || !userId) {
    return res.status(400).json({ success: false, message: 'Paramètres manquants.' });
  }

  try {
    const location = new Location({
      userId,
      latitude,
      longitude,
      timestamp: timestamp || Date.now()
    });

    await location.save();

    res.status(201).json({ success: true, message: 'Position enregistrée.', data: location });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur lors de la sauvegarde de la position.' });
  }
};

exports.getLocation= async (req, res) => {
  try {
    const locations = await Location.find({});
    res.status(200).json({ success: true, data: locations });
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
    res.status(500).json({ success: false, message: 'Erreur lors de la récupération des données.' });
  }
}

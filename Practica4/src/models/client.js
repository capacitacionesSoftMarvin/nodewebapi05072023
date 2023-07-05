const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  // Otros campos del cliente...
});

module.exports = mongoose.model('Client', clientSchema);

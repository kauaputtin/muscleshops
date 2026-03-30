const mongoose = require('mongoose');

const configSchema = new mongoose.Schema({
  storeName: { type: String, default: 'MuscleShops' },
  storeDescription: { type: String },
  primaryColor: { type: String, default: '#3B82F6' },
  secondaryColor: { type: String, default: '#10B981' },
  logo: { type: String },
  banner: { type: String },
  whatsappNumber: { type: String },
  whatsappMessage: { type: String, default: 'Olá, gostaria de fazer um pedido!' },
}, { timestamps: true });

module.exports = mongoose.model('Config', configSchema);
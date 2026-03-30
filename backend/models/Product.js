const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  shortDescription: { type: String },
  price: { type: Number, required: true },
  image: { type: String }, // URL da imagem
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  variations: [{ type: String }], // ex: ["P", "M", "G"]
  featured: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
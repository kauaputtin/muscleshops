const Product = require('../models/Product');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

exports.upload = upload.single('image');

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category');
    res.json(products);
  } catch (err) {
    console.error('Erro ao buscar produtos:', err);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category');
    if (!product) return res.status(404).json({ message: 'Produto não encontrado' });
    res.json(product);
  } catch (err) {
    console.error('Erro ao buscar produto:', err);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, description, shortDescription, price, category, variations, featured } = req.body;
    const image = req.file ? req.file.filename : null;
    const product = new Product({
      name,
      description,
      shortDescription,
      price: parseFloat(price),
      image,
      category,
      variations: variations ? variations.split(',') : [],
      featured: featured === 'true' || featured === true
    });
    await product.save();
    res.json(product);
  } catch (err) {
    console.error('Erro ao criar produto:', err);
    res.status(500).json({ message: 'Erro ao criar produto', error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { name, description, shortDescription, price, category, variations, featured } = req.body;
    const image = req.file ? req.file.filename : req.body.image;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        shortDescription,
        price: parseFloat(price),
        image,
        category,
        variations: variations ? variations.split(',') : [],
        featured: featured === 'true' || featured === true
      },
      { new: true }
    );
    if (!product) return res.status(404).json({ message: 'Produto não encontrado' });
    res.json(product);
  } catch (err) {
    console.error('Erro ao atualizar produto:', err);
    res.status(500).json({ message: 'Erro ao atualizar produto', error: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Produto não encontrado' });
    res.json({ message: 'Produto deletado' });
  } catch (err) {
    console.error('Erro ao deletar produto:', err);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};
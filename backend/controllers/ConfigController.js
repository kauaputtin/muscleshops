const Config = require('../models/Config');
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

exports.uploadLogo = upload.single('logo');
exports.uploadBanner = upload.single('banner');

exports.getConfig = async (req, res) => {
  try {
    const config = await Config.findOne() || new Config();
    res.json(config);
  } catch (err) {
    console.error('Erro ao buscar configurações:', err);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

exports.updateConfig = async (req, res) => {
  try {
    const { storeName, storeDescription, primaryColor, secondaryColor, whatsappNumber, whatsappMessage } = req.body;
    const logo = req.files?.logo ? req.files.logo[0].filename : req.body.logo;
    const banner = req.files?.banner ? req.files.banner[0].filename : req.body.banner;

    const config = await Config.findOneAndUpdate(
      {},
      { storeName, storeDescription, primaryColor, secondaryColor, logo, banner, whatsappNumber, whatsappMessage },
      { new: true, upsert: true }
    );

    res.json(config);
  } catch (err) {
    console.error('Erro ao atualizar configurações:', err);
    res.status(500).json({ message: 'Erro ao salvar configurações', error: err.message });
  }
};
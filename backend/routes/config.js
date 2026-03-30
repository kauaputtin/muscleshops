const express = require('express');
const { getConfig, updateConfig } = require('../controllers/ConfigController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.get('/', getConfig);
router.put('/', upload.fields([{ name: 'logo' }, { name: 'banner' }]), updateConfig);

module.exports = router;
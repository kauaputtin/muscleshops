const mongoose = require('mongoose');
const User = require('./models/User');
const Config = require('./models/Config');
require('dotenv').config();

const initDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/muscleshops');
    console.log('Conectado ao MongoDB');

    // Criar usuário admin se não existir
    const adminExists = await User.findOne({ username: 'admin' });
    if (!adminExists) {
      const bcrypt = require('bcryptjs');
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);
      const admin = new User({ username: 'admin', password: hashedPassword });
      await admin.save();
      console.log('Usuário admin criado: admin/admin123');
    } else {
      console.log('Usuário admin já existe');
    }

    // Criar config padrão se não existir
    const configExists = await Config.findOne();
    if (!configExists) {
      const config = new Config();
      await config.save();
      console.log('Configuração padrão criada');
    }

    console.log('Inicialização concluída');
    process.exit(0);
  } catch (err) {
    console.error('Erro na inicialização:', err);
    process.exit(1);
  }
};

initDB();
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Configurações forçadas diretamente para o seu Android
const MONGODB_URI = process.env.MONGODB_URI || process.env.DATABASE_URL;
const ADMIN_USERNAME = "snoop";
const ADMIN_EMAIL = "Julianaferreira55577@email.com";
const ADMIN_PASSWORD = "Kaio123";

async function createAdminUser() {
  if (!MONGODB_URI) {
    console.error('Erro: MONGODB_URI nao foi encontrada no Render!');
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    require('../functions/api/models/Counter');
    require('../functions/api/models/User');
    const User = mongoose.model('User');

    // Verifica se a sua conta snoop já existe para não duplicar
    const existingUser = await User.findOne({ username: ADMIN_USERNAME });
    if (existingUser) {
      console.log('O usuario snoop ja existe no banco de dados!');
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

    const adminUser = new User({
      username: ADMIN_USERNAME,
      email: ADMIN_EMAIL,
      password: hashedPassword,
      isAdmin: true,
      signupIp: '127.0.0.1',
    });

    await adminUser.save();
    console.log('Admin user created successfully');
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    mongoose.disconnect();
  }
}

createAdminUser();

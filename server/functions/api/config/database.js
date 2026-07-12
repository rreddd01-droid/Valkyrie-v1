const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

let cachedDb = null;

const connectDB = async (uri) => {
  if (cachedDb) {
    return cachedDb;
  }

  try {
    // Força o uso da variável da Render. Se não achar, usa o link recebido.
    const databaseUri = 'mongodb+srv://TestPriv:Kaio123456@cluster0.nr4c4jy.mongodb.net/Classicblox?AppName=Cluster0';

    const client = await mongoose.connect(databaseUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    cachedDb = client;
    console.log('====================================');
    console.log('SUCESSO: CONECTADO AO MONGODB ATLAS!');
    console.log('====================================');

    // require all models
    const modelsPath = path.join(__dirname, '../models');
    fs.readdirSync(modelsPath).forEach((file) => {
      if (file.endsWith('.js')) {
        require(path.join(modelsPath, file));
      }
    });

    return client;
  } catch (error) {
    console.error('Erro grave ao conectar no MongoDB:', error);
    throw error;
  }
};

module.exports = connectDB;

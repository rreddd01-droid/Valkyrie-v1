require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../functions/api/models/User');

const MONGODB_URI = process.env.MONGODB_URI;

async function generateTestUsers(numUsers = 10) {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Carrega o modelo de contador que o projeto usa
    const Counter = mongoose.model('Counter');

    const baseUsername = 'testuser';
    const baseEmail = 'testuser';
    const password = 'testpassword123';

    for (let i = 0; i < numUsers; i++) {
      const username = `${baseUsername}${i + 1}`;
      const email = `${baseEmail}${i + 1}@example.com`;
      const hashedPassword = await bcrypt.hash(password, 10);

      // Incrementa o contador no banco de dados para pegar o próximo ID livre
      const counterDoc = await Counter.findOneAndUpdate(
        { _id: 'userId' },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      
      const proximoId = counterDoc.seq;

      const user = new User({
        userId: proximoId, // <--- Agora o ID correto e obrigatório é injetado aqui
        username,
        email,
        password: hashedPassword,
        signupIp: '127.0.0.1',
        isVerified: true,
      });

      await user.save();
      console.log(`Created user: ${username} (ID: ${proximoId})`);
    }

    console.log(`${numUsers} test users created successfully`);
  } catch (error) {
    console.error('Error generating test users:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

generateTestUsers();

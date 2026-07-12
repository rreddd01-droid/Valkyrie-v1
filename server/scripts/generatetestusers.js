require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../functions/api/models/User'); // Verifique se este caminho está correto no seu projeto

const MONGODB_URI = process.env.MONGODB_URI;

async function generateTestUsers(numUsers = 10) {
  try {
    // Conecta ao banco com um tempo limite de segurança (timeout) de 10 segundos
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, 
    });

    console.log('Connected to MongoDB successfully');

    // Carrega o modelo de contador do projeto
    const Counter = mongoose.model('Counter');

    // Lista de nomes para testar (Adicione ou mude os nomes aqui se quiser)
    const baseUsernames = ['Snoop', 'Frangolino', 'ClassicPlayer', 'Robloxian'];
    const password = 'testpassword123';
    const hashedPassword = await bcrypt.hash(password, 10);

    for (let i = 0; i < numUsers; i++) {
      // Define o nome do usuário baseado na lista ou gera um sequencial
      const username = baseUsernames[i] ? baseUsernames[i] : `testuser${i + 1}`;
      const email = `testuser${i + 1}@example.com`;

      // 1. Verifica se o usuário já existe no banco antes de tentar criar
      const userExists = await User.findOne({ username: username });
      if (userExists) {
        console.log(`[Aviso] O usuário "${username}" já existe. Pulando...`);
        continue; // Pula para o próximo usuário da lista sem dar erro
      }

      // 2. Se não existir, incrementa o contador para pegar o próximo userId livre
      const counterDoc = await Counter.findOneAndUpdate(
        { _id: 'userId' },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      
      const proximoId = counterDoc.seq;

      // 3. Monta o novo usuário
      const user = new User({
        userId: proximoId,
        username,
        email,
        password: hashedPassword,
        signupIp: '127.0.0.1',
        isVerified: true,
      });

      // 4. Salva no banco com proteção de erro interno
      try {
        await user.save();
        console.log(`Created user: ${username} (ID: ${proximoId})`);
      } catch (saveError) {
        if (saveError.code === 11000) {
          console.log(`[Aviso] Conflito de duplicidade ao salvar "${username}". Pulando...`);
        } else {
          console.error(`Erro ao salvar o usuário ${username}:`, saveError);
        }
      }
    }

    console.log('Test users process finished.');
  } catch (error) {
    console.error('Registration error durante a inicialização:', error);
  } finally {
    // Garante que o banco vai fechar a conexão mesmo se houver erros, evitando o Timeout
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

generateTestUsers();

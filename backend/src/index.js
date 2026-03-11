require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const alunoRoutes = require('./routes/aluno');
const validationRoutes = require('./routes/validation');
const performanceRoutes = require('./routes/performance');
const { initializeTransporter } = require('./services/emailService');
const { addSampleData } = require('./data/performance');
const { users } = require('./data/users');

const app = express();
const PORT = process.env.PORT || 5001;

// Middlewares
app.use(cors({
  origin: ['https://dev-aquatrans0-17g38rfng-caesarveras-projects.vercel.app', 'https://aquatrans-frontend.vercel.app'],
  credentials: true
}));
app.use(express.json());

// Rotas públicas
app.use('/api', routes);

// Rotas de autenticação
app.use('/api/auth', authRoutes);

// Rotas administrativas (protegidas)
app.use('/api/admin', adminRoutes);

// Rotas do aluno (protegidas)
app.use('/api/aluno', alunoRoutes);

// Rotas de validação de usuários
app.use('/api/validation', validationRoutes);

// Rotas de performance de natação
app.use('/api/performance', performanceRoutes);

// Rota de saúde
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Aquatrans API está funcionando!' });
});

// Inicialização de dados (executa apenas no build/start)
async function initializeData() {
  console.log(`🏳️‍⚧️ Inicializando Aquatrans API`);
  console.log(`📋 Usuários de teste criados com senha: aquatrans2026`);
  
  // Inicializa dados de exemplo de performance para o aluno demo
  const alunoDemo = users.find(u => u.email === 'aluno@aquatrans.org.br');
  if (alunoDemo) {
    addSampleData(alunoDemo.id);
    console.log(`🏊 Dados de performance de exemplo criados para aluno demo`);
  }
  
  // Inicializa serviço de email
  await initializeTransporter();
}

// Para desenvolvimento local
if (require.main === module) {
  app.listen(PORT, async () => {
    await initializeData();
  });
}

// Export para Vercel
module.exports = app;

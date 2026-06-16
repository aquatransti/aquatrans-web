// Entrypoint serverless da Vercel: delega todas as rotas /api/* para o app
// Express do backend. O app é exportado em backend/src/index.js (sem app.listen
// em produção), então funciona como handler de função serverless.
module.exports = require('../backend/src/index.js');

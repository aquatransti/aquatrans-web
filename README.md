# 🏳️‍⚧️ Aquatrans - Site Institucional

Site institucional da Aquatrans, uma associação para pessoas trans e não-binárias com intuito social.

## 🎨 Cores do Projeto

O projeto utiliza as cores da **bandeira trans**:
- **Azul**: #5BCEFA
- **Rosa**: #F5A9B8
- **Branco**: #FFFFFF

## 📁 Estrutura do Projeto

```
aquatrans/
├── backend/               # API Node.js/Express
│   ├── src/
│   │   ├── index.js      # Servidor principal
│   │   ├── config/       # Configurações (roles, permissões)
│   │   ├── data/         # Dados em memória (usuários)
│   │   ├── middleware/   # Middlewares (autenticação)
│   │   └── routes/       # Rotas da API
│   ├── package.json
│   └── .env.example
│
├── frontend/              # Aplicação React
│   ├── public/
│   ├── src/
│   │   ├── components/   # Componentes reutilizáveis
│   │   │   └── base/     # Componentes base (POM)
│   │   ├── context/      # Contextos (Auth, Theme)
│   │   ├── pages/        # Páginas do site
│   │   │   └── dashboard/# Dashboards por perfil
│   │   ├── styles/       # Estilos globais
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
└── README.md
```

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn

### Backend

```bash
cd backend
npm install
npm run dev
```

O servidor estará disponível em `http://localhost:5001`

### Frontend

```bash
cd frontend
npm install
npm start
```

A aplicação estará disponível em `http://localhost:3000`

## 📄 Páginas Públicas

- **Home** (`/`) - Página inicial com apresentação do projeto
- **Sobre** (`/sobre`) - História, missão, visão e valores
- **Equipe** (`/equipe`) - Membros e setores do projeto
- **Serviços** (`/servicos`) - Serviços oferecidos (natação, psicossocial, jurídico)
- **Eventos** (`/eventos`) - Programação de eventos e atividades
- **Transparência** (`/transparencia`) - Prestação de contas e valores arrecadados
- **Apadrinhamento** (`/apadrinhamento`) - Doações e apoio via PIX
- **Contato** (`/contato`) - Formulário e informações de contato
- **Login** (`/login`) - Acesso ao sistema

## 🔐 Sistema de Autenticação

### Validação de Novos Cadastros

O sistema permite que **Gestores** e **TI** validem novos usuários:

1. **Integração com Google Forms**: Os cadastros chegam automaticamente do formulário de inscrição
2. **Validação**: Gestores/TI revisam os dados e atribuem um perfil ao usuário
3. **Convite por Email**: Após aprovação, um email é enviado com link para finalizar o cadastro
4. **Finalização**: O usuário acessa o link e cria sua senha

**Webhook para Google Forms:**
```
POST /api/validation/webhook/google-forms?apiKey=aquatrans-forms-key-2026
```

**Dados esperados:**
```json
{
  "nome": "Nome Completo",
  "email": "email@exemplo.com",
  "telefone": "(21) 99999-9999",
  "cpf": "000.000.000-00",
  "dataNascimento": "1990-01-01",
  "interesse": "Aulas de natação",
  "comoConheceu": "Instagram",
  "observacoes": "Observações opcionais"
}
```

### Perfis de Usuário

O sistema possui três níveis de acesso:

#### 1. Gestor (Acesso Total)
- Dashboard: `/dashboard/gestor`
- Usuários: Maya, Maria Elis, Marcelo
- Permissões: Gerenciar tudo (usuários, finanças, alunos, aulas, editais, relatórios, sistema)

#### 2. Administradores (Acessos Específicos)
- Dashboard: `/dashboard/admin`
- **TI (Caesar)**: Gerenciar usuários e sistema
- **Professores**: Gerenciar alunos e aulas
- **Jurídico**: Gerenciar alunos e editais
- **Contábil**: Gerenciar finanças
- **Psicossocial**: Atendimento de alunos

#### 3. Alunos
- Dashboard: `/dashboard/aluno`
- Funcionalidades:
  - Ver performance e feedback dos professores
  - Gerar boletos e pagar mensalidade via PIX
  - Acessar atendimento psicossocial
  - Histórico de pagamentos e aulas

### Contas de Teste

| Perfil | E-mail | Senha |
|--------|--------|-------|
| Gestor | maya@aquatrans.org.br | aquatrans2026 |
| TI | caesar@aquatrans.org.br | aquatrans2026 |
| Professor | professor@aquatrans.org.br | aquatrans2026 |
| Jurídico | juridico@aquatrans.org.br | aquatrans2026 |
| Contábil | contabil@aquatrans.org.br | aquatrans2026 |
| Psicossocial | psicossocial@aquatrans.org.br | aquatrans2026 |
| Aluno | aluno@aquatrans.org.br | aquatrans2026 |

## 🔌 API Endpoints

### Públicos
- `GET /api/equipe` - Lista de membros da equipe
- `GET /api/eventos` - Lista de eventos
- `GET /api/servicos` - Lista de serviços
- `GET /api/transparencia` - Dados de transparência
- `POST /api/contato` - Envio de mensagem de contato
- `GET /health` - Status da API

### Autenticação
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Dados do usuário logado
- `PUT /api/auth/me` - Atualizar perfil
- `PUT /api/auth/change-password` - Alterar senha

### Administrativas (Protegidas)
- `GET /api/admin/users` - Listar usuários
- `POST /api/admin/users` - Criar usuário
- `PUT /api/admin/users/:id` - Atualizar usuário
- `GET /api/admin/students` - Listar alunos
- `GET /api/admin/students/:id` - Dados do aluno
- `POST /api/admin/students/:id/aulas` - Registrar aula
- `POST /api/admin/students/:id/psicossocial` - Registrar atendimento
- `GET /api/admin/stats` - Estatísticas

### Aluno (Protegidas)
- `GET /api/aluno/meus-dados` - Dados do aluno
- `GET /api/aluno/aulas` - Histórico de aulas
- `GET /api/aluno/performance` - Performance e avaliações
- `GET /api/aluno/pagamentos` - Histórico de pagamentos
- `GET /api/aluno/pagamento-pendente` - Dados para pagamento
- `POST /api/aluno/pagar-pix` - Confirmar pagamento PIX
- `GET /api/aluno/psicossocial` - Histórico de atendimentos
- `POST /api/aluno/solicitar-psicossocial` - Solicitar atendimento

## 🛠️ Tecnologias

### Frontend
- React 18
- React Router DOM
- Context API (Auth, Theme)
- CSS3 com variáveis customizadas
- Design responsivo (Flexbox/Grid)

### Backend
- Node.js
- Express
- JWT (jsonwebtoken)
- bcryptjs
- CORS
- dotenv

## 📝 Funcionalidades

- ✅ Design responsivo (mobile-first)
- ✅ Tema claro/escuro com toggle
- ✅ Cores da bandeira trans
- ✅ Navegação com React Router
- ✅ Sistema de autenticação JWT
- ✅ Dashboards por perfil de usuário
- ✅ Portal do aluno com pagamento PIX
- ✅ Formulário de contato funcional
- ✅ Página de transparência com prestação de contas
- ✅ Sistema de doações/apadrinhamento
- ✅ Acessibilidade (ARIA, skip links, contraste)

## 🏳️‍⚧️ Sobre o Aquatrans

O Aquatrans é uma associação dedicada a promover inclusão, bem-estar e comunidade para pessoas trans e não-binárias através de:

- **Aulas de natação** em ambiente seguro e acolhedor
- **Atendimento psicossocial** especializado
- **Atendimento jurídico** gratuito
- **Consultoria de diversidade** para empresas

### Parcerias
- Rio sem LGBTfobia
- FundoELAS

## 👥 Equipe

- Maya - Coordenação Geral
- Maria Elis Costa Alencar - Equipe
- Marcelo Silva - Diretor e Equipe Técnica
- Mario Alves - Captação de Recursos
- Iracema Vieira - Equipe
- Caesar Lima - TI

## 📜 Licença

Este projeto é de propriedade da Aquatrans. Todos os direitos reservados.

---
{/* Info para desenvolvimento */}
<div className="login-demo-info">
  <h4>Contas de teste:</h4>
  <div className="demo-accounts">
    <div className="demo-account">
      <strong>Gestor:</strong> maya@aquatrans.org.br
    </div>
    <div className="demo-account">
      <strong>TI:</strong> caesar@aquatrans.org.br
    </div>
    <div className="demo-account">
      <strong>Aluno:</strong> aluno@aquatrans.org.br
    </div>
    <div className="demo-account">
      <strong>Senha:</strong> aquatrans2026
    </div>
  </div>
</div>
Feito com 💙🩷🤍🩷💙 para a comunidade trans
# dev.aquatrans

import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Sobre from './pages/Sobre';
import Equipe from './pages/Equipe';
import Servicos from './pages/Servicos';
import Eventos from './pages/Eventos';
import Transparencia from './pages/Transparencia';
import Apadrinhamento from './pages/Apadrinhamento';
import Contato from './pages/Contato';
import Login from './pages/Login';
import FinalizarCadastro from './pages/FinalizarCadastro';
import DashboardGestor from './pages/dashboard/DashboardGestor';
import DashboardAdmin from './pages/dashboard/DashboardAdmin';
import DashboardAluno from './pages/dashboard/DashboardAluno';
import './styles/App.css';

function App() {
  const location = useLocation();
  
  // Páginas que não devem mostrar Header/Footer
  const hideLayout = location.pathname.startsWith('/dashboard') || location.pathname === '/login';

  return (
    <div className="app">
      <ScrollToTop />
      {!hideLayout && <Header />}
      <main className={hideLayout ? '' : 'main-content'} id="main-content" role="main">
        <Routes>
          {/* Páginas Públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/equipe" element={<Equipe />} />
          <Route path="/servicos" element={<Servicos />} />
          <Route path="/eventos" element={<Eventos />} />
          <Route path="/transparencia" element={<Transparencia />} />
          <Route path="/apadrinhamento" element={<Apadrinhamento />} />
          <Route path="/contato" element={<Contato />} />
          
          {/* Login */}
          <Route path="/login" element={<Login />} />
          <Route path="/finalizar-cadastro" element={<FinalizarCadastro />} />
          
          {/* Dashboards Protegidos */}
          <Route path="/dashboard/gestor" element={<DashboardGestor />} />
          <Route path="/dashboard/admin" element={<DashboardAdmin />} />
          <Route path="/dashboard/aluno" element={<DashboardAluno />} />
        </Routes>
      </main>
      {!hideLayout && <Footer />}
    </div>
  );
}

export default App;

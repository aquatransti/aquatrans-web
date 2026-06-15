import image_72c7070707e7e64bf64098f9ba395a618c01ec17 from 'figma:asset/72c7070707e7e64bf64098f9ba395a618c01ec17.png'
import image_5a2c8aeba1ba5ad3700f75d5e0fe07256b8694dd from 'figma:asset/5a2c8aeba1ba5ad3700f75d5e0fe07256b8694dd.png'
import image_0e341a638aef9f2dd12538c066f8899d97b8a77b from 'figma:asset/0e341a638aef9f2dd12538c066f8899d97b8a77b.png'
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { motion } from 'motion/react';
import { LogIn, Loader2, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import loginImage from 'figma:asset/b92c0e7eb2aa11fe2e0a77cf206b9b70662835f5.png';

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Mock de usuários - em produção, isso viria do Supabase
  const mockUsers = {
    'maya@aquatrans.org.br': { password: 'aquatrans2026', tipo: 'gestor', nome: 'Maya' },
    'caesar@aquatrans.org.br': { password: 'aquatrans2026', tipo: 'admin', nome: 'Caesar Lima' },
    'professor@aquatrans.org.br': { password: 'aquatrans2026', tipo: 'professor', nome: 'Marcelo Silva' },
    'juridico@aquatrans.org.br': { password: 'aquatrans2026', tipo: 'gestor', nome: 'Jurídico' },
    'contabil@aquatrans.org.br': { password: 'aquatrans2026', tipo: 'gestor', nome: 'Contábil' },
    'psicossocial@aquatrans.org.br': { password: 'aquatrans2026', tipo: 'gestor', nome: 'Psicossocial' },
    'aluno@aquatrans.org.br': { password: 'aquatrans2026', tipo: 'aluno', nome: 'Aluno' }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simular delay de autenticação
    await new Promise(resolve => setTimeout(resolve, 800));

    // Mock de autenticação - em produção seria Supabase Auth
    const user = mockUsers[email as keyof typeof mockUsers];

    if (user && user.password === password) {
      // Login bem-sucedido - redirecionar baseado no tipo de usuário
      console.log('Login bem-sucedido:', { email, tipo: user.tipo });

      if (user.tipo === 'aluno') {
        navigate('/dashboard/aluno');
      } else if (user.tipo === 'professor') {
        navigate('/dashboard/professor');
      } else if (user.tipo === 'admin') {
        navigate('/dashboard/admin');
      } else if (user.tipo === 'gestor') {
        navigate('/dashboard/gestor');
      }
    } else {
      setError('E-mail ou senha incorretos');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 font-['Inter']">
      <Header />

      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-0 items-stretch min-h-[calc(100vh-200px)] lg:rounded-3xl overflow-hidden lg:shadow-2xl">
            {/* Image Column - Left */}
            <motion.div
              className="hidden lg:block relative"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative h-full overflow-hidden">
                <img
                  src={image_72c7070707e7e64bf64098f9ba395a618c01ec17}
                  alt="Aquatrans - Natação Inclusiva"
                  className="w-full h-full object-cover object-center scale-105"
                />
              </div>
            </motion.div>

            {/* Form Column - Right */}
            <div className="relative flex items-center justify-center py-12 px-4 sm:px-6 lg:px-12 bg-gradient-to-b from-cyan-50 to-white dark:from-slate-900 dark:to-slate-950 lg:bg-none">
              {/* Background image on right side */}
              <div className="absolute inset-0 hidden lg:block overflow-hidden">
                <img
                  src={loginImage}
                  alt=""
                  className="w-full h-full object-cover object-center opacity-5 dark:opacity-[0.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/80 via-white/90 to-pink-50/80 dark:from-slate-900/90 dark:via-slate-950/95 dark:to-slate-900/90" />
              </div>

              <div className="relative max-w-md w-full">
              {/* Header */}
              <motion.div
                className="text-center lg:text-left mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                
                <h1 className="font-['Plus_Jakarta_Sans'] text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-2">
                  Login
                </h1>
                <p className="text-slate-600 dark:text-slate-300">
                  Acesse o portal Aquatrans
                </p>
              </motion.div>

              {/* Login Form */}
              <motion.div
                className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-2xl"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
              >
                <form onSubmit={handleLogin} className="space-y-5">
                  {error && (
                    <div className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg">
                      <p className="text-sm text-red-600 dark:text-red-400 text-center">
                        {error}
                      </p>
                    </div>
                  )}

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      E-mail
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-600 focus:border-transparent transition-all"
                      placeholder="seu@email.com"
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                        Senha
                      </label>
                      <a href="#" className="text-sm font-medium text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors">
                        Esqueceu a senha?
                      </a>
                    </div>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 pr-12 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-600 focus:border-transparent transition-all"
                        placeholder="••••••••"
                        required
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                        disabled={isLoading}
                        aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <label className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 cursor-pointer hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
                      <input
                        type="checkbox"
                        className="rounded border-slate-300 text-cyan-600 focus:ring-cyan-600"
                        disabled={isLoading}
                      />
                      Lembrar de mim
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-lg bg-gradient-to-r from-cyan-600 to-pink-600 text-white font-bold text-base hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Entrando...
                      </>
                    ) : (
                      <>
                        <LogIn className="w-5 h-5" />
                        Entrar
                      </>
                    )}
                  </button>
                </form>

                {/* Call to Action - Destaque para novos usuários */}
                <div className="mt-8 p-5 bg-gradient-to-br from-cyan-50 to-pink-50 dark:from-cyan-950/20 dark:to-pink-950/20 border-2 border-cyan-200 dark:border-cyan-800 rounded-xl text-center">
                  <p className="text-base font-semibold text-slate-900 dark:text-white mb-2">
                    Ainda não tem acesso?
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    Entre em contato para receber suas credenciais
                  </p>
                  <a
                    href="/contato"
                    className="inline-flex items-center justify-center px-5 py-2.5 bg-white dark:bg-slate-800 text-cyan-700 dark:text-cyan-400 font-semibold rounded-lg border-2 border-cyan-600 dark:border-cyan-500 hover:bg-cyan-50 dark:hover:bg-cyan-950/50 transition-all"
                  >
                    Solicitar Acesso
                  </a>
                </div>
              </motion.div>

              {/* Info Boxes */}
              <div className="mt-6 space-y-3">
                <div className="p-4 bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-800 rounded-lg">
                  <p className="text-sm text-slate-600 dark:text-slate-300 text-center">
                    <strong className="text-slate-900 dark:text-white">Nota:</strong> As credenciais de acesso são fornecidas pela administração do Aquatrans após o cadastro.
                  </p>
                </div>

                {/* Demo credentials - remover em produção */}
                <details className="p-4 bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 rounded-lg">
                  <summary className="text-sm font-semibold text-slate-900 dark:text-white cursor-pointer">
                    🔐 Credenciais de Demonstração
                  </summary>
                  <div className="mt-3 space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                    <p><strong>Admin (Caesar - TI):</strong> caesar@aquatrans.org.br / aquatrans2026</p>
                    <p><strong>Gestor (Maya):</strong> maya@aquatrans.org.br / aquatrans2026</p>
                    <p><strong>Professor:</strong> professor@aquatrans.org.br / aquatrans2026</p>
                    <p><strong>Jurídico:</strong> juridico@aquatrans.org.br / aquatrans2026</p>
                    <p><strong>Contábil:</strong> contabil@aquatrans.org.br / aquatrans2026</p>
                    <p><strong>Psicossocial:</strong> psicossocial@aquatrans.org.br / aquatrans2026</p>
                    <p><strong>Aluno:</strong> aluno@aquatrans.org.br / aquatrans2026</p>
                  </div>
                </details>
              </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

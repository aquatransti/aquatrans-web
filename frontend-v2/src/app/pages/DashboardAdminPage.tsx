import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { motion } from 'motion/react';
import { Shield, Users, DollarSign, GraduationCap, Settings, BarChart3, Database, Lock, CheckCircle2, AlertCircle } from 'lucide-react';
import { Link } from 'react-router';

export function DashboardAdminPage() {
  // Mock data - em produção viria da API
  const adminStats = {
    totalAlunos: 45,
    totalProfessores: 3,
    totalReceitaMes: 2340,
    totalPendenteMes: 890,
    alunosAtivos: 42,
    taxaAdimplencia: 72,
    mensalidadesVencidas: 8
  };

  const acessosRapidos = [
    {
      title: "Gestão de Alunos",
      description: "Gerenciar cadastros e matrículas",
      icon: <Users className="w-8 h-8" />,
      color: "from-cyan-600 to-blue-500",
      link: "/dashboard/gestor"
    },
    {
      title: "Gestão de Professores",
      description: "Gerenciar equipe técnica",
      icon: <GraduationCap className="w-8 h-8" />,
      color: "from-pink-600 to-pink-500",
      link: "/dashboard/professor"
    },
    {
      title: "Financeiro",
      description: "Relatórios e prestação de contas",
      icon: <DollarSign className="w-8 h-8" />,
      color: "from-green-600 to-green-500",
      link: "/dashboard/gestor"
    },
    {
      title: "Configurações",
      description: "Sistema e permissões",
      icon: <Settings className="w-8 h-8" />,
      color: "from-purple-600 to-purple-500",
      link: "#"
    },
    {
      title: "Relatórios",
      description: "Estatísticas e análises",
      icon: <BarChart3 className="w-8 h-8" />,
      color: "from-orange-600 to-orange-500",
      link: "#"
    },
    {
      title: "Banco de Dados",
      description: "Backup e manutenção",
      icon: <Database className="w-8 h-8" />,
      color: "from-slate-600 to-slate-500",
      link: "#"
    }
  ];

  const atividadesRecentes = [
    { tipo: "aluno", acao: "Novo cadastro: Jordan Silva", data: "Há 2 horas" },
    { tipo: "pagamento", acao: "Pagamento recebido: R$ 60,00", data: "Há 3 horas" },
    { tipo: "professor", acao: "Feedback enviado por Marcelo", data: "Há 5 horas" },
    { tipo: "sistema", acao: "Backup automático realizado", data: "Há 1 dia" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-slate-900 dark:to-slate-950 font-['Inter']">
      <Header />

      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-100 dark:bg-purple-950/50 rounded-lg">
                <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h1 className="font-['Plus_Jakarta_Sans'] text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white">
                  Painel de Administração
                </h1>
                <p className="text-slate-600 dark:text-slate-300">
                  Acesso total ao sistema Aquatrans
                </p>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Total de Alunos</p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">{adminStats.totalAlunos}</p>
                </div>
                <Users className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />
              </div>
              <p className="text-xs text-slate-500">
                <span className="text-green-600 dark:text-green-400">↑ {adminStats.alunosAtivos}</span> ativos
              </p>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Receita (Mês)</p>
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                    R$ {adminStats.totalReceitaMes.toLocaleString()}
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <p className="text-xs text-slate-500">
                <span className="text-orange-600 dark:text-orange-400">R$ {adminStats.totalPendenteMes}</span> pendente
              </p>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Adimplência</p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">{adminStats.taxaAdimplencia}%</p>
                </div>
                <BarChart3 className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <p className="text-xs text-green-600 dark:text-green-400">
                ↑ 5% vs mês anterior
              </p>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Professores</p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">{adminStats.totalProfessores}</p>
                </div>
                <GraduationCap className="w-8 h-8 text-pink-600 dark:text-pink-400" />
              </div>
              <p className="text-xs text-slate-500">
                Equipe técnica ativa
              </p>
            </motion.div>
          </div>

          {/* Acessos Rápidos */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Acessos Rápidos
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {acessosRapidos.map((item, index) => (
                <Link
                  key={index}
                  to={item.link}
                  className="group bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 hover:shadow-xl transition-all hover:scale-105"
                >
                  <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${item.color} text-white mb-4 group-hover:scale-110 transition-transform`}>
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {item.description}
                  </p>
                </Link>
              ))}
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Atividades Recentes */}
            <motion.div
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h2 className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-slate-900 dark:text-white mb-6">
                Atividades Recentes
              </h2>
              <div className="space-y-4">
                {atividadesRecentes.map((atividade, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg"
                  >
                    <div className="p-2 bg-white dark:bg-slate-900 rounded-lg">
                      {atividade.tipo === 'aluno' && <Users className="w-4 h-4 text-cyan-600" />}
                      {atividade.tipo === 'pagamento' && <DollarSign className="w-4 h-4 text-green-600" />}
                      {atividade.tipo === 'professor' && <GraduationCap className="w-4 h-4 text-pink-600" />}
                      {atividade.tipo === 'sistema' && <Settings className="w-4 h-4 text-purple-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-900 dark:text-white">{atividade.acao}</p>
                      <p className="text-xs text-slate-500">{atividade.data}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Alertas e Avisos */}
            <motion.div
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h2 className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-slate-900 dark:text-white mb-6">
                Alertas e Avisos
              </h2>
              <div className="space-y-4">
                <div className="p-4 bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400 mt-0.5" />
                    <div>
                      <p className="font-semibold text-orange-900 dark:text-orange-200 text-sm">
                        {adminStats.mensalidadesVencidas} mensalidades vencidas
                      </p>
                      <p className="text-xs text-orange-700 dark:text-orange-300 mt-1">
                        Requer atenção do setor financeiro
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
                    <div>
                      <p className="font-semibold text-green-900 dark:text-green-200 text-sm">
                        Backup realizado com sucesso
                      </p>
                      <p className="text-xs text-green-700 dark:text-green-300 mt-1">
                        Último backup: hoje às 03:00
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-800 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Lock className="w-5 h-5 text-cyan-600 dark:text-cyan-400 mt-0.5" />
                    <div>
                      <p className="font-semibold text-cyan-900 dark:text-cyan-200 text-sm">
                        Sistema seguro e atualizado
                      </p>
                      <p className="text-xs text-cyan-700 dark:text-cyan-300 mt-1">
                        Todas as verificações de segurança OK
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

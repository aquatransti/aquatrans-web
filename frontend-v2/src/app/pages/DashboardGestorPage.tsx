import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { motion } from 'motion/react';
import { DollarSign, Users, CheckCircle2, AlertCircle, TrendingUp, Calendar, Search } from 'lucide-react';
import { useState } from 'react';

export function DashboardGestorPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'todos' | 'pago' | 'pendente'>('todos');

  // Mock data - em produção viria da API
  const gestorData = {
    totalAlunos: 45,
    totalRecebido: 2340,
    totalPendente: 890,
    taxaAdimplencia: 72,
    mesAtual: "Abril 2026",
    alunos: [
      {
        id: 1,
        nome: "Alex Santos",
        email: "alex@email.com",
        turma: "Anêmonas 1",
        valor: 60,
        status: "pendente" as const,
        vencimento: "05/04/2026",
        foto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop"
      },
      {
        id: 2,
        nome: "Jordan Silva",
        email: "jordan@email.com",
        turma: "Anêmonas 2",
        valor: 40,
        status: "pago" as const,
        dataPagamento: "02/04/2026",
        foto: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop"
      },
      {
        id: 3,
        nome: "Taylor Costa",
        email: "taylor@email.com",
        turma: "Golfinhes",
        valor: 60,
        status: "pago" as const,
        dataPagamento: "01/04/2026",
        foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
      },
      {
        id: 4,
        nome: "Morgan Alves",
        email: "morgan@email.com",
        turma: "Anêmonas 2",
        valor: 20,
        status: "pendente" as const,
        vencimento: "05/04/2026",
        foto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
      },
      {
        id: 5,
        nome: "Jamie Pereira",
        email: "jamie@email.com",
        turma: "Água viva",
        valor: 40,
        status: "pago" as const,
        dataPagamento: "03/04/2026",
        foto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop"
      },
      {
        id: 6,
        nome: "Casey Oliveira",
        email: "casey@email.com",
        turma: "Golfinhes",
        valor: 60,
        status: "pendente" as const,
        vencimento: "05/04/2026",
        foto: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop"
      }
    ]
  };

  const filteredAlunos = gestorData.alunos.filter(aluno => {
    const matchesSearch = aluno.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         aluno.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'todos' || aluno.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleMarcarPago = (alunoId: number) => {
    console.log('Marcar como pago:', alunoId);
    alert('Pagamento confirmado!');
  };

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
            <h1 className="font-['Plus_Jakarta_Sans'] text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-2">
              Painel de Gestão 📊
            </h1>
            <p className="text-slate-600 dark:text-slate-300">
              Administre pagamentos e mensalidades - {gestorData.mesAtual}
            </p>
          </motion.div>

          {/* Controles de Filtro */}
          <motion.div
            className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar por nome ou e-mail..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setFilterStatus('todos')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    filterStatus === 'todos'
                      ? 'bg-purple-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  Todos
                </button>
                <button
                  onClick={() => setFilterStatus('pago')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    filterStatus === 'pago'
                      ? 'bg-green-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  Pagos
                </button>
                <button
                  onClick={() => setFilterStatus('pendente')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    filterStatus === 'pendente'
                      ? 'bg-orange-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  Pendentes
                </button>
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
              <div className="flex items-start gap-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-950/50 rounded-lg">
                  <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Total de Alunos</p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">{gestorData.totalAlunos}</p>
                  <p className="text-xs text-slate-500 mt-1">Ativos no projeto</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-950/50 rounded-lg">
                  <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Recebido (Mês)</p>
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                    R$ {gestorData.totalRecebido.toLocaleString()}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">Pagamentos confirmados</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-orange-100 dark:bg-orange-950/50 rounded-lg">
                  <AlertCircle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Pendente (Mês)</p>
                  <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                    R$ {gestorData.totalPendente.toLocaleString()}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">Aguardando pagamento</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-cyan-100 dark:bg-cyan-950/50 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Adimplência</p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">{gestorData.taxaAdimplencia}%</p>
                  <p className="text-xs text-slate-500 mt-1">Taxa do mês</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Lista de Alunos */}
          <motion.div
            className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="p-6 border-b border-slate-200 dark:border-slate-800">
              <h2 className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-slate-900 dark:text-white">
                Gestão de Pagamentos
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                {filteredAlunos.length} aluno{filteredAlunos.length !== 1 ? 's' : ''} encontrado{filteredAlunos.length !== 1 ? 's' : ''}
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 dark:bg-slate-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Aluno
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Turma
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Professor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Valor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Ações
                    </th>
                    
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {filteredAlunos.map((aluno) => (
                    <tr key={aluno.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <img
                            src={aluno.foto}
                            alt={aluno.nome}
                            className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-slate-900"
                          />
                          <div>
                            <p className="font-medium text-slate-900 dark:text-white">{aluno.nome}</p>
                            <p className="text-sm text-slate-500">{aluno.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400">
                        {aluno.turma}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400">
                        <p className="font-semibold text-slate-900 dark:text-white">Marcelo</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="font-semibold text-slate-900 dark:text-white">R$ {aluno.valor},00</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {aluno.status === 'pago' ? (
                          <div>
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-medium rounded-full">
                              <CheckCircle2 className="w-3 h-3" />
                              Pago
                            </span>
                            <p className="text-xs text-slate-500 mt-1">{aluno.dataPagamento}</p>
                          </div>
                        ) : (
                          <div>
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 text-xs font-medium rounded-full">
                              <AlertCircle className="w-3 h-3" />
                              Pendente
                            </span>
                            <p className="text-xs text-slate-500 mt-1">Vence: {aluno.vencimento}</p>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {aluno.status === 'pendente' ? (
                          <button
                            onClick={() => handleMarcarPago(aluno.id)}
                            className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors"
                          >
                            Marcar como Pago
                          </button>
                        ) : (
                          <button className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-sm font-medium rounded-lg cursor-not-allowed">
                            Pago ✓
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

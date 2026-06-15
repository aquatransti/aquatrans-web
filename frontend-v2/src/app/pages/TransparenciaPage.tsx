import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { motion } from 'motion/react';
import { DollarSign, BarChart3, Building2, CheckCircle2 } from 'lucide-react';

export function TransparenciaPage() {
  const prestacaoContas = [
    {
      periodo: "Janeiro 2026",
      entradas: "R$ 2.500,00",
      saidas: "R$ 1.600,00",
      saldo: "R$ 700,00",
      observacoes: "Mensalidades de alunos + materiais"
    },
    {
      periodo: "Dezembro 2025",
      entradas: "R$ 2.200,00",
      saidas: "R$ 2.100,00",
      saldo: "R$ 1.300,00",
      observacoes: "Mensalidades + doações"
    },
    {
      periodo: "Novembro 2025",
      entradas: "R$ 2.800,00",
      saidas: "R$ 2.500,00",
      saldo: "R$ 300,00",
      observacoes: "Mensalidades + evento especial"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 font-['Inter']">
      <Header />
      
      <main className="pt-20">
        {/* Hero */}
        <section className="bg-gradient-to-b from-cyan-50 to-white dark:from-slate-900 dark:to-slate-950 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.span 
              className="inline-block px-4 py-1.5 bg-cyan-50 dark:bg-cyan-950/30 text-cyan-700 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800 rounded-full text-sm font-semibold mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              Prestação de Contas
            </motion.span>
            
            <motion.h1 
              className="font-['Plus_Jakarta_Sans'] text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Transparência
            </motion.h1>
            
            <motion.p 
              className="text-lg text-slate-600 dark:text-slate-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Acompanhe os recursos arrecadados e como são utilizados no projeto
            </motion.p>
          </div>
        </section>

        {/* Stats Cards */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <motion.div
                className="bg-gradient-to-br from-[#5BCEFA] to-[#F5A9B8] p-6 rounded-2xl text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <DollarSign className="w-8 h-8" />
                  <div className="text-sm opacity-90">Total Arrecadado</div>
                </div>
                <div className="text-3xl font-bold">R$ 45.000,00</div>
              </motion.div>

              <motion.div
                className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <BarChart3 className="w-8 h-8 text-[#5BCEFA]" />
                  <div className="text-sm text-gray-600 dark:text-gray-400">Fundos Ativos</div>
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">1</div>
              </motion.div>

              <motion.div
                className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <Building2 className="w-8 h-8 text-yellow-600" />
                  <div className="text-sm text-gray-600 dark:text-gray-400">CNPJ</div>
                </div>
                <div className="text-lg font-bold text-yellow-600">Em Formalização</div>
              </motion.div>
            </div>

            {/* Fundos Arrecadados */}
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-baseline justify-between mb-6">
                <h2 className="font-['Plus_Jakarta_Sans'] text-3xl font-bold text-slate-900 dark:text-white">
                  Fundos Arrecadados
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Recursos obtidos através de editais e parcerias
                </p>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        FundoELAS
                      </h3>
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                        Em uso
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Edital de apoio a projetos LGBTQIA+
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-[#5BCEFA] mb-1">
                      R$ 45.000,00
                    </div>
                    <div className="text-sm text-gray-500">Ano: 2025</div>
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-800 pt-6 space-y-4">
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Prazo de utilização: Maio de 2026
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Prioridades:
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <CheckCircle2 className="w-4 h-4 text-[#5BCEFA]" />
                        Registro e Formalização
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <CheckCircle2 className="w-4 h-4 text-[#5BCEFA]" />
                        Comunicação e Site
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <CheckCircle2 className="w-4 h-4 text-[#5BCEFA]" />
                        Logística e Materiais
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Prestação de Contas */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-baseline justify-between mb-6">
                <h2 className="font-['Plus_Jakarta_Sans'] text-3xl font-bold text-slate-900 dark:text-white">
                  Prestação de Contas
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Movimentação financeira mensal do projeto
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-800">
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-900 dark:text-white">
                        Período
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-900 dark:text-white">
                        Entradas
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-900 dark:text-white">
                        Saídas
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-900 dark:text-white">
                        Saldo
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-900 dark:text-white">
                        Observações
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {prestacaoContas.map((item, index) => (
                      <tr 
                        key={index}
                        className="border-b border-gray-100 dark:border-gray-800 last:border-0"
                      >
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                          {item.periodo}
                        </td>
                        <td className="px-6 py-4 text-sm text-green-600 font-medium">
                          {item.entradas}
                        </td>
                        <td className="px-6 py-4 text-sm text-red-600 font-medium">
                          {item.saidas}
                        </td>
                        <td className="px-6 py-4 text-sm text-[#5BCEFA] font-medium">
                          {item.saldo}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                          {item.observacoes}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 p-4 bg-blue-50 dark:bg-gray-900 rounded-lg space-y-2">
                <div className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <span className="text-lg">💬</span>
                  <div>
                    <strong>Reuniões mensais:</strong> Realizamos reuniões de prestação de contas com alunos e comunidade.
                  </div>
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <span className="text-lg">📊</span>
                  <div>
                    <strong>Relatórios:</strong> Relatórios detalhados disponíveis sob solicitação.
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
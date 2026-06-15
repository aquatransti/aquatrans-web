import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { motion } from 'motion/react';
import { DollarSign, MessageSquare, User, Calendar, CheckCircle2, AlertCircle } from 'lucide-react';

export function DashboardAlunoPage() {
  // Mock data - em produção viria da API
  const alunoData = {
    nome: "Alex Santos",
    turma: "Terça e Quinta - 18h",
    proximaAula: "Quinta, 10 de Abril",
    mensalidadeAtual: {
      mes: "Abril 2026",
      valor: "R$ 60,00",
      status: "pendente",
      vencimento: "05/04/2026"
    },
    historicoCobrancas: [
      { mes: "Março 2026", valor: "R$ 60,00", status: "pago", dataPagamento: "03/03/2026" },
      { mes: "Fevereiro 2026", valor: "R$ 40,00", status: "pago", dataPagamento: "02/02/2026" },
      { mes: "Janeiro 2026", valor: "R$ 40,00", status: "pago", dataPagamento: "05/01/2026" }
    ],
    feedbacks: [
      {
        data: "28/03/2026",
        professor: "Marcelo Silva",
        comentario: "Ótimo progresso na técnica de crawl! Continue praticando a respiração lateral.",
        nivel: "Intermediário"
      },
      {
        data: "14/03/2026",
        professor: "Mario Alves",
        comentario: "Excelente desenvolvimento. Já consegue nadar 50m sem parar. Vamos trabalhar velocidade agora.",
        nivel: "Iniciante Avançado"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white dark:from-slate-900 dark:to-slate-950 font-['Inter']">
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
              Olá, {alunoData.nome}! 👋
            </h1>
            <p className="text-slate-600 dark:text-slate-300">
              Bem-vinde ao seu portal do aluno
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Card Próxima Aula */}
            <motion.div
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-cyan-100 dark:bg-cyan-950/50 rounded-lg">
                  <Calendar className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Próxima Aula</p>
                  <p className="font-semibold text-slate-900 dark:text-white">{alunoData.proximaAula}</p>
                  <p className="text-xs text-slate-500 mt-1">{alunoData.turma}</p>
                </div>
              </div>
            </motion.div>

            {/* Card Mensalidade */}
            <motion.div
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-pink-100 dark:bg-pink-950/50 rounded-lg">
                  <DollarSign className="w-6 h-6 text-pink-600 dark:text-pink-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Mensalidade Atual</p>
                  <p className="font-semibold text-slate-900 dark:text-white">{alunoData.mensalidadeAtual.valor}</p>
                  <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">
                    Vence em {alunoData.mensalidadeAtual.vencimento}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card Perfil */}
            <motion.div
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-950/50 rounded-lg">
                  <User className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Meu Perfil</p>
                  <p className="font-semibold text-slate-900 dark:text-white">Aluno Ativo</p>
                  <a href="#" className="text-xs text-cyan-600 dark:text-cyan-400 hover:underline mt-1 inline-block">
                    Editar dados
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Cobranças */}
            <motion.div
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-slate-900 dark:text-white mb-6">
                Minhas Cobranças
              </h2>

              {/* Cobrança Atual */}
              <div className="mb-6 p-4 bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800 rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">{alunoData.mensalidadeAtual.mes}</p>
                    <p className="text-2xl font-bold text-orange-600 dark:text-orange-400 mt-1">
                      {alunoData.mensalidadeAtual.valor}
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300 text-xs font-medium rounded-full flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    Pendente
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  Vencimento: {alunoData.mensalidadeAtual.vencimento}
                </p>
                <button className="w-full px-4 py-2 bg-gradient-to-r from-cyan-600 to-pink-600 text-white font-medium rounded-lg hover:shadow-lg transition-all">
                  Pagar com PIX
                </button>
              </div>

              {/* Histórico */}
              <div>
                <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Histórico</h3>
                <div className="space-y-2">
                  {alunoData.historicoCobrancas.map((cobranca, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg"
                    >
                      <div>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">{cobranca.mes}</p>
                        <p className="text-xs text-slate-500">Pago em {cobranca.dataPagamento}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-900 dark:text-white">{cobranca.valor}</span>
                        <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Feedbacks dos Professores */}
            <motion.div
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <MessageSquare className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                Feedback dos Professores
              </h2>

              <div className="space-y-4">
                {alunoData.feedbacks.map((feedback, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gradient-to-br from-cyan-50 to-pink-50 dark:from-cyan-950/30 dark:to-pink-950/30 border border-slate-200 dark:border-slate-700 rounded-lg"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white">{feedback.professor}</p>
                        <p className="text-xs text-slate-500">{feedback.data}</p>
                      </div>
                      <span className="px-2 py-1 bg-white dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 text-xs font-medium rounded-full">
                        {feedback.nivel}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {feedback.comentario}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg text-center">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Dúvidas sobre o feedback?{' '}
                  <a href="/contato" className="text-cyan-600 dark:text-cyan-400 hover:underline font-medium">
                    Fale com seu professor
                  </a>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

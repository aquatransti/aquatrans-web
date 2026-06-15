import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { motion } from 'motion/react';
import { Users, MessageSquare, Calendar, Star, Send } from 'lucide-react';
import { useState } from 'react';

export function DashboardProfessorPage() {
  const [selectedAluno, setSelectedAluno] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('');
  const [nivel, setNivel] = useState('');

  // Mock data - em produção viria da API
  const professorData = {
    nome: "Marcelo Silva",
    turmas: [
      { nome: "Terça e Quinta - 18h", totalAlunos: 8 },
      { nome: "Sábado - 10h", totalAlunos: 12 }
    ],
    proximaAula: "Quinta, 10 de Abril - 18h",
    alunos: [
      {
        id: 1,
        nome: "Alex Santos",
        nivel: "Intermediário",
        turma: "Terça e Quinta - 18h",
        ultimoFeedback: "28/03/2026",
        foto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop"
      },
      {
        id: 2,
        nome: "Jordan Silva",
        nivel: "Iniciante",
        turma: "Terça e Quinta - 18h",
        ultimoFeedback: "25/03/2026",
        foto: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop"
      },
      {
        id: 3,
        nome: "Taylor Costa",
        nivel: "Avançado",
        turma: "Sábado - 10h",
        ultimoFeedback: "22/03/2026",
        foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
      },
      {
        id: 4,
        nome: "Morgan Alves",
        nivel: "Iniciante",
        turma: "Sábado - 10h",
        ultimoFeedback: "20/03/2026",
        foto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
      }
    ]
  };

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Feedback enviado:', { alunoId: selectedAluno, feedback, nivel });
    // Reset form
    setFeedback('');
    setNivel('');
    setSelectedAluno(null);
    alert('Feedback enviado com sucesso!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white dark:from-slate-900 dark:to-slate-950 font-['Inter']">
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
              Olá, Prof. {professorData.nome}! 🏊
            </h1>
            <p className="text-slate-600 dark:text-slate-300">
              Gerencie suas turmas e dê feedback aos alunos
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
                <div className="p-2 bg-pink-100 dark:bg-pink-950/50 rounded-lg">
                  <Calendar className="w-6 h-6 text-pink-600 dark:text-pink-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Próxima Aula</p>
                  <p className="font-semibold text-slate-900 dark:text-white">{professorData.proximaAula}</p>
                </div>
              </div>
            </motion.div>

            {/* Card Total de Turmas */}
            <motion.div
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-cyan-100 dark:bg-cyan-950/50 rounded-lg">
                  <Users className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Minhas Turmas</p>
                  <p className="font-semibold text-slate-900 dark:text-white">{professorData.turmas.length} turmas ativas</p>
                  <p className="text-xs text-slate-500 mt-1">
                    {professorData.turmas.reduce((sum, t) => sum + t.totalAlunos, 0)} alunos no total
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card Feedbacks */}
            <motion.div
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-950/50 rounded-lg">
                  <MessageSquare className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Feedbacks</p>
                  <p className="font-semibold text-slate-900 dark:text-white">4 alunos aguardando</p>
                  <p className="text-xs text-slate-500 mt-1">Esta semana</p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Lista de Alunos */}
            <motion.div
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-slate-900 dark:text-white mb-6">
                Meus Alunos
              </h2>

              <div className="space-y-3">
                {professorData.alunos.map((aluno) => (
                  <div
                    key={aluno.id}
                    className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                      selectedAluno === aluno.id
                        ? 'border-pink-600 bg-pink-50 dark:bg-pink-950/30'
                        : 'border-slate-200 dark:border-slate-700 hover:border-pink-300 dark:hover:border-pink-800'
                    }`}
                    onClick={() => setSelectedAluno(aluno.id)}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={aluno.foto}
                        alt={aluno.nome}
                        className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-slate-800"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-slate-900 dark:text-white">{aluno.nome}</p>
                        <p className="text-xs text-slate-500">{aluno.turma}</p>
                      </div>
                      <div className="text-right">
                        <span className="inline-block px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium rounded-full">
                          {aluno.nivel}
                        </span>
                        <p className="text-xs text-slate-500 mt-1">Último: {aluno.ultimoFeedback}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Formulário de Feedback */}
            <motion.div
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <Star className="w-6 h-6 text-pink-600 dark:text-pink-400" />
                Dar Feedback
              </h2>

              {selectedAluno ? (
                <form onSubmit={handleSubmitFeedback} className="space-y-4">
                  <div className="p-4 bg-pink-50 dark:bg-pink-950/30 border border-pink-200 dark:border-pink-800 rounded-lg">
                    <p className="text-sm text-slate-600 dark:text-slate-400">Aluno selecionado:</p>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {professorData.alunos.find(a => a.id === selectedAluno)?.nome}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Nível Atual
                    </label>
                    <select
                      value={nivel}
                      onChange={(e) => setNivel(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-pink-600 focus:border-transparent"
                      required
                    >
                      <option value="">Selecione o nível</option>
                      <option value="Iniciante">Iniciante</option>
                      <option value="Iniciante Avançado">Iniciante Avançado</option>
                      <option value="Intermediário">Intermediário</option>
                      <option value="Avançado">Avançado</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Comentário
                    </label>
                    <textarea
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-pink-600 focus:border-transparent resize-none"
                      rows={6}
                      placeholder="Escreva observações sobre o progresso do aluno, técnicas trabalhadas, pontos de melhoria, etc."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-600 to-pink-500 text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all"
                  >
                    <Send className="w-5 h-5" />
                    Enviar Feedback
                  </button>
                </form>
              ) : (
                <div className="text-center py-12">
                  <MessageSquare className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-600 dark:text-slate-400">
                    Selecione um aluno da lista ao lado para dar feedback
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

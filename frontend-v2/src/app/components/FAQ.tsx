import { motion } from 'motion/react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

export function FAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "Quem pode participar das aulas?",
      answer: "Nossas aulas são voltadas para pessoas trans e não bináries de todas as idades e níveis de habilidade na natação."
    },
    {
      question: "Preciso saber nadar para participar?",
      answer: "Não! Oferecemos aulas para todos os níveis, desde iniciantes até quem já sabe nadar e quer aprimorar."
    },
    {
      question: "E se eu não tiver touca ou óculos de natação?",
      answer: "Não se preocupe! O Aquatrans disponibiliza toucas em cada aula e, quando possível, óculos também. Além disso, cada alune recebe uma carteirinha de estudante do projeto."
    },
    {
      question: "Menores de idade podem participar?",
      answer: "Sim! Menores de idade são bem-vindes e contam com todo o apoio necessário. As aulas são ministradas por professores credenciados, incluindo o Marcelo, que tem formação específica para trabalhar com esse público."
    },
    {
      question: "Como funciona o pagamento?",
      answer: "Trabalhamos com valores flexíveis (R$ 20, R$ 40 ou R$ 60) de acordo com a possibilidade de cada pessoa. Também temos taxas sociais para quem pode contribuir um pouco mais e ajudar a manter o projeto acessível para todes."
    },
    {
      question: "O que são as taxas sociais?",
      answer: "As taxas sociais são contribuições maiores que algumas pessoas fazem voluntariamente para ajudar a subsidiar as aulas de quem tem menos condições financeiras. É uma forma de solidariedade que permite que o Aquatrans continue oferecendo valores acessíveis."
    },
    {
      question: "Onde ficam as aulas?",
      answer: "As aulas acontecem em piscinas parceiras em ambiente seguro e acolhedor. Entre em contato para saber a localização atual e horários disponíveis."
    },
    {
      question: "Preciso levar algum documento na primeira aula?",
      answer: "Não é obrigatório, mas recomendamos levar um documento com foto para facilitar o cadastro e a emissão da sua carteirinha de aluno."
    },
    {
      question: "Posso levar acompanhante?",
      answer: "As aulas são exclusivas para alunes matriculades (pessoas trans e não bináries). Acompanhantes podem aguardar nas áreas comuns. Entre em contato para casos específicos."
    },
    {
      question: "Como posso ajudar o projeto?",
      answer: "Você pode ajudar de várias formas! Financeiramente através de doações, PIX ou apadrinhamento. Também aceitamos voluntários para setores de captação, TI, comunicação e equipe técnica. Entre em contato conosco para saber como contribuir!"
    },
    {
      question: "O Aquatrans oferece outros serviços além de natação?",
      answer: "Sim! Oferecemos atendimento psicossocial, atendimento jurídico e consultoria de diversidade para empresas e organizações."
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-['Plus_Jakarta_Sans'] text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Dúvidas comuns sobre o Aquatrans
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
            >
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <span className="font-medium text-gray-900 dark:text-white pr-4">
                  {faq.question}
                </span>
                {openFaq === index ? (
                  <ChevronUp className="w-5 h-5 text-[#5BCEFA] flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                )}
              </button>
              
              {openFaq === index && (
                <div className="px-6 pb-6 text-gray-600 dark:text-gray-400">
                  {faq.answer}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
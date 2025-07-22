// js/modules/quizQuestions.js

/**
 * Define as perguntas do quiz, organizadas por dificuldade.
 * Cada pergunta deve ter:
 * - category: Categoria da pergunta (ex: "Consumo Consciente")
 * - question: O texto da pergunta
 * - options: Um array de strings com as opções de resposta
 * - correct: O índice da resposta correta no array options (0-indexed)
 * - explanation: Uma explicação concisa sobre a resposta
 */
const QuizQuestions = {
    facil: [
        {
            category: "Água no Dia a Dia",
            question: "Qual das seguintes ações mais economiza água no banho?",
            options: [
                "Demorar mais de 15 minutos no banho",
                "Tomar banhos rápidos e fechar o chuveiro ao se ensaboar",
                "Deixar a torneira aberta enquanto se escova os dentes",
                "Lavar a calçada com mangueira"
            ],
            correct: 1,
            explanation: "Banhos rápidos e fechar o chuveiro ao se ensaboar são práticas essenciais para economizar água."
        },
        {
            category: "Ciclo da Água",
            question: "De onde vem a maior parte da água que bebemos?",
            options: [
                "Do oceano",
                "De geleiras",
                "De rios, lagos e aquíferos",
                "Da chuva diretamente"
            ],
            correct: 2,
            explanation: "A água potável geralmente é captada de rios, lagos e reservatórios subterrâneos (aquíferos), que são fontes de água doce."
        },
        {
            category: "Poluição da Água",
            question: "O que NÃO devemos jogar no vaso sanitário?",
            options: [
                "Papel higiênico",
                "Líquidos",
                "Fio dental e cotonetes",
                "Feijão"
            ],
            correct: 2,
            explanation: "Fio dental, cotonetes, cabelos e outros resíduos sólidos não se dissolvem e podem entupir a rede de esgoto, além de contaminar a água."
        },
        {
            category: "Saneamento Básico",
            question: "Qual o principal benefício do tratamento de esgoto?",
            options: [
                "Deixar a água com cheiro bom",
                "Remover as cores da água",
                "Proteger a saúde das pessoas e o meio ambiente",
                "Tornar a água potável"
            ],
            correct: 2,
            explanation: "O tratamento de esgoto elimina poluentes e microrganismos nocivos, prevenindo doenças e protegendo ecossistemas aquáticos."
        },
        {
            category: "Desperdício de Água",
            question: "Um pequeno vazamento em uma torneira pode desperdiçar quantos litros de água por dia?",
            options: [
                "1-5 litros",
                "10-20 litros",
                "Mais de 40 litros",
                "Nenhum, é muito pequeno"
            ],
            correct: 2,
            explanation: "Um vazamento aparentemente pequeno pode desperdiçar mais de 40 litros de água por dia, resultando em grande perda ao longo do tempo."
        }
        // Adicione mais perguntas de dificuldade fácil aqui
    ],
    medio: [
        {
            category: "Recursos Hídricos",
            question: "O que são aquíferos?",
            options: [
                "Grandes rios subterrâneos",
                "Camadas de rochas que armazenam água subterrânea",
                "Lagos artificiais criados para reserva de água",
                "Bacias de coleta de água da chuva"
            ],
            correct: 1,
            explanation: "Aquíferos são formações geológicas subterrâneas capazes de armazenar e fornecer água, sendo uma importante fonte de água doce."
        },
        {
            category: "Reuso de Água",
            question: "Qual a principal vantagem do reuso de água?",
            options: [
                "Deixar a água mais limpa para beber",
                "Diminuir a conta de água",
                "Reduzir a demanda por água potável de fontes naturais",
                "Aumentar a pressão da água nas torneiras"
            ],
            correct: 2,
            explanation: "O reuso de água, especialmente para fins não potáveis como irrigação ou descargas, alivia a pressão sobre os recursos de água doce."
        },
        {
            category: "Pegada Hídrica",
            question: "O que significa 'pegada hídrica' de um produto?",
            options: [
                "A quantidade de água usada para lavar o produto",
                "A quantidade de água potável que o produto pode armazenar",
                "O volume total de água doce utilizado em todo o processo de produção",
                "A distância que a água percorre até chegar à fábrica do produto"
            ],
            correct: 2,
            explanation: "A pegada hídrica é uma métrica que quantifica o volume total de água doce usada, direta e indiretamente, para produzir bens e serviços."
        },
        {
            category: "Crise Hídrica",
            question: "Além da falta de chuva, qual outro fator contribui significativamente para a crise hídrica em grandes cidades?",
            options: [
                "Excesso de rios",
                "Subida do nível do mar",
                "Desperdício, poluição e infraestrutura inadequada",
                "Aumento da umidade do ar"
            ],
            correct: 2,
            explanation: "O desperdício, a poluição de fontes de água e a infraestrutura deficiente (como vazamentos na rede de distribuição) são fatores críticos na crise hídrica urbana."
        },
        {
            category: "Tecnologia e Água",
            question: "Qual tecnologia é mais utilizada para transformar água do mar em água potável?",
            options: [
                "Filtração por areia",
                "Cloração",
                "Dessalinização por osmose inversa",
                "Ebulição"
            ],
            correct: 2,
            explanation: "A osmose inversa é o método mais comum de dessalinização, usando membranas semipermeáveis para remover sais e outras impurezas da água salgada."
        }
        // Adicione mais perguntas de dificuldade média aqui
    ],
    dificil: [
        {
            category: "Legislação e Água",
            question: "No Brasil, qual a principal lei que estabelece a Política Nacional de Recursos Hídricos?",
            options: [
                "Lei da Mata Atlântica",
                "Lei das Águas (Lei nº 9.433/97)",
                "Código Florestal",
                "Lei de Saneamento Básico"
            ],
            correct: 1,
            explanation: "A Lei nº 9.433/97, conhecida como Lei das Águas, instituiu a Política Nacional de Recursos Hídricos e o Sistema Nacional de Gerenciamento de Recursos Hídricos."
        },
        {
            category: "Tratamento de Água",
            question: "Qual a etapa do tratamento de água onde ocorre a adição de produtos químicos para aglomerar as partículas de sujeira?",
            options: [
                "Filtração",
                "Decantação",
                "Floculação",
                "Cloração"
            ],
            correct: 2,
            explanation: "Na floculação, coagulantes são adicionados à água, fazendo com que as partículas suspensas se aglomerem em 'flocos' maiores, que são mais fáceis de remover nas etapas seguintes."
        },
        {
            category: "Efeitos Climáticos",
            question: "Como as mudanças climáticas afetam os recursos hídricos globais?",
            options: [
                "Apenas aumentam a quantidade de chuvas em todas as regiões",
                "Causam apenas o derretimento de geleiras",
                "Alteram padrões de chuva, intensificam secas e inundações, e afetam a qualidade da água",
                "Não têm impacto significativo nos recursos hídricos"
            ],
            correct: 2,
            explanation: "As mudanças climáticas levam a eventos extremos, como secas prolongadas e chuvas torrenciais, desequilibrando o ciclo hidrológico e impactando a disponibilidade e qualidade da água."
        },
        {
            category: "Contaminação",
            question: "O que é eutrofização em corpos d'água?",
            options: [
                "Aumento da acidez da água devido à poluição industrial",
                "Acúmulo de sedimentos no fundo de rios e lagos",
                "Enriquecimento excessivo de nutrientes, levando ao crescimento descontrolado de algas",
                "Congelamento da superfície da água em ambientes frios"
            ],
            correct: 2,
            explanation: "A eutrofização ocorre quando há um excesso de nutrientes (como nitrogênio e fósforo) na água, geralmente de esgoto ou fertilizantes agrícolas, o que provoca a proliferação de algas e a depleção de oxigênio."
        },
        {
            category: "Infraestrutura de Saneamento",
            question: "Qual o principal desafio para a universalização do saneamento básico no Brasil?",
            options: [
                "Falta de água em abundância",
                "Tecnologia obsoleta para tratamento",
                "Alto custo de investimento, gestão ineficiente e desigualdade social",
                "Falta de interesse da população"
            ],
            correct: 2,
            explanation: "A universalização do saneamento no Brasil enfrenta barreiras como altos investimentos necessários, ineficiência na gestão dos sistemas e a persistente desigualdade no acesso aos serviços."
        }
        // Adicione mais perguntas de dificuldade difícil aqui
    ]
};

// Exporta o objeto QuizQuestions para ser usado em outros módulos
export default QuizQuestions;

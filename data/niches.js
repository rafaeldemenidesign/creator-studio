// Universal templates availble for all niches
const allTemplates = [
    'modern-cover', 'modern-list', 'modern-photo', 'modern-quote'
];

const niches = [
    {
        id: 'pediatria',
        title: 'Medicina Infantil',
        icon: '🧸',
        description: 'Divertido, confiável e informativo. Cores suaves.',
        colors: { primary: '#FF9FAC', secondary: '#89CFF0', bg: '#FFF5F7', text: '#4A5568' },
        font: "'Outfit', sans-serif",
        hashtags: "#pediatria #maternidade #saudeinfantil #maedeprimeiraviagem #puericultura",
        prompts: {
            cover: '5 Sinais de Alerta na Febre',
            list: '1. Hidrate bastante\n2. Monitore a temperatura\n3. Observe o comportamento\n4. Evite roupas quentes',
            quote: 'Criança feliz é criança saudável.',
            cta: 'Agende uma consulta preventiva.'
        },
        weekPlan: [
            { title: 'Segunda da Prevenção', sub: 'Uma dica rápida para começar a semana com saúde.', layout: 'modern-cover' },
            { title: 'Mito ou Verdade?', sub: 'Esclareça uma dúvida comum dos pais.', layout: 'modern-photo' },
            { title: 'Dica do Pediatra', sub: '3 coisas que você deve ter na farmacinha de casa.', layout: 'modern-list' },
            { title: 'Dia de TBT', sub: 'Uma foto fofa do consultório ou paciente (com autorização).', layout: 'modern-photo' },
            { title: 'Bom Fim de Semana', sub: 'Lembrete: Aproveite o tempo em família!', layout: 'modern-quote' }
        ]
    },
    {
        id: 'advocacia',
        title: 'Advocacia',
        icon: '⚖️',
        description: 'Sério, autoritário e elegante.',
        colors: { primary: '#1e3a8a', secondary: '#d4af37', bg: '#f8fafc', text: '#0f172a' },
        font: "'Playfair Display', serif",
        hashtags: "#direito #advocacia #oab #direitodotrabalho #consumidor #juridico",
        prompts: {
            cover: 'Seus Direitos no Trabalho',
            list: '1. Guarde as provas\n2. Não assine sem ler\n3. Consulte um advogado',
            quote: 'A justiça não socorre aos que dormem.',
            cta: 'Dúvidas? Deixe nos comentários.'
        },
        weekPlan: [
            { title: 'Direito Explicado', sub: 'Traduza um termo jurídico difícil para o público.', layout: 'modern-cover' },
            { title: 'O que fazer se...', sub: 'Passo a passo para uma situação de emergência legal.', layout: 'modern-list' },
            { title: 'Bastidores', sub: 'Foto estudando um caso ou no tribunal.', layout: 'modern-photo' },
            { title: 'Você Sabia?', sub: 'Uma curiosidade sobre a lei que poucos sabem.', layout: 'modern-cover' },
            { title: 'Caso de Sucesso', sub: 'Um relato anônimo de uma vitória recente.', layout: 'modern-quote' }
        ]
    },
    {
        id: 'hamburgueria',
        title: 'Hamburgueria',
        icon: '🍔',
        description: 'Apetitoso e vibrante. Dark mode.',
        colors: { primary: '#fca311', secondary: '#9c2f2f', bg: '#171717', text: '#ffffff' },
        font: "'Montserrat', sans-serif",
        hashtags: "#burger #hamburguerartesanal #delivery #instafood #bacon #gourmet",
        prompts: {
            cover: 'PROMOÇÃO DO DIA 🍔',
            list: '1. Pão artesanal\n2. Carne Angus\n3. Bacon Crocante\n4. Molho Secreto',
            quote: 'Felicidade se compra... com Burger!',
            cta: 'Peça agora pelo iFood.'
        },
        weekPlan: [
            { title: 'Matador de Fome', sub: 'Apresente o maior burger do cardápio.', layout: 'modern-photo' },
            { title: 'Terça dos Amigos', sub: 'Marque quem te deve um lanche.', layout: 'modern-quote' },
            { title: 'Bastidores da Chapa', sub: 'Vídeo/Foto do burger sendo montado.', layout: 'modern-photo' },
            { title: 'Ingrediente Secreto', sub: 'Fale sobre a qualidade do seu bacon ou queijo.', layout: 'modern-cover' },
            { title: 'Sextou com Oferta', sub: 'Compre 1 Leve 2 (ou refri grátis). Aproveite!', layout: 'modern-cover' }
        ]
    },
    {
        id: 'roupas',
        title: 'Loja de Roupas',
        icon: '👗',
        description: 'Clean, fashion e editorial.',
        colors: { primary: '#000000', secondary: '#666666', bg: '#ffffff', text: '#000000' },
        font: "'Lato', sans-serif",
        hashtags: "#moda #lookdodia #tendencia #estilo #fashion #novacolecao",
        prompts: {
            cover: 'NOVA COLEÇÃO ✨',
            list: '• Tecido Premium\n• Caimento Perfeito\n• Várias cores',
            quote: 'A vida é curta demais para usar roupas chatas.',
            cta: 'Link na bio para comprar.'
        },
        weekPlan: [
            { title: 'Look da Semana', sub: 'A combinação perfeita para começar bem.', layout: 'modern-photo' },
            { title: 'Paleta de Cores', sub: 'As tendências da estação em detalhes.', layout: 'modern-cover' },
            { title: 'Como Combinar', sub: '3 formas de usar a mesma peça.', layout: 'modern-list' },
            { title: 'Cliente Vip', sub: 'Repost de uma cliente usando o look.', layout: 'modern-photo' },
            { title: 'Lançamento', sub: 'A peça que acabou de chegar (e vai acabar rápido).', layout: 'modern-cover' }
        ]
    },
    {
        id: 'internet',
        title: 'Provedor de Internet',
        icon: '🚀',
        description: 'Velocidade e tecnologia.',
        colors: { primary: '#0066ff', secondary: '#00ccff', bg: '#f0f9ff', text: '#0c4a6e' },
        font: "'Inter', sans-serif",
        hashtags: "#internetfibra #provedor #tecnologia #conexao #velocidade #gamer",
        prompts: {
            cover: 'INTERNET LENTA? 🐢',
            list: '1. Reinicie o roteador\n2. Verifique os cabos\n3. Chame o suporte',
            quote: 'Conectando você ao mundo.',
            cta: 'Assine nosso plano Turbo.'
        },
        weekPlan: [
            { title: 'Segunda Gamer', sub: 'Ping baixo para quem joga. Conheça o plano.', layout: 'modern-photo' },
            { title: 'Dica Técnica', sub: 'Onde posicionar o roteador para melhor sinal.', layout: 'modern-list' },
            { title: 'Home Office', sub: 'Trabalhe sem travar nas reuniões.', layout: 'modern-cover' },
            { title: 'Filme sem travar', sub: 'Netflix em 4K? Temos o plano ideal.', layout: 'modern-photo' },
            { title: 'Suporte Rápido', sub: 'Precisou? A gente resolve em minutos.', layout: 'modern-quote' }
        ]
    },
    {
        id: 'celulares',
        title: 'Loja de Celulares',
        icon: '📱',
        description: 'High-tech e moderno.',
        colors: { primary: '#2563eb', secondary: '#1e293b', bg: '#f8fafc', text: '#1e293b' },
        font: "'Inter', sans-serif",
        hashtags: "#smartphone #iphone #android #tecnologia #promoçao #celularnovo",
        prompts: {
            cover: 'IPHONE 15 PRO',
            list: '• Câmera 48MP\n• Titânio\n• Chip A17 Pro',
            quote: 'Tecnologia que move você.',
            cta: 'Troque seu usado hoje.'
        },
        weekPlan: [
            { title: 'Destaque Apple', sub: 'O iPhone que todo mundo quer.', layout: 'modern-photo' },
            { title: 'Dica de Bateria', sub: 'Como fazer seu celular durar o dia todo.', layout: 'modern-list' },
            { title: 'Android vs iOS', sub: 'Qual o melhor para você? Comparativo.', layout: 'modern-cover' },
            { title: 'Acessórios', sub: 'Capinhas e películas que protegem seu investimento.', layout: 'modern-photo' },
            { title: 'Oferta Relâmpago', sub: 'Desconto especial para seguidores hoje.', layout: 'modern-cover' }
        ]
    },
    {
        id: 'otica',
        title: 'Ótica',
        icon: '👓',
        description: 'Clareza e visão.',
        colors: { primary: '#14b8a6', secondary: '#f0fdfa', bg: '#ffffff', text: '#134e4a' },
        font: "'Lato', sans-serif",
        hashtags: "#otica #oculosdegrau #oculosdesol #visao #saudeocular #estilo",
        prompts: {
            cover: 'PROTEJA SUA VISÃO',
            list: '• Lentes Anti-reflexo\n• Filtro Azul\n• Armações Leves',
            quote: 'Ver bem é viver bem.',
            cta: 'Exame de vista grátis na compra.'
        },
        weekPlan: [
            { title: 'Estilo e Visão', sub: 'A armação que combina com seu rosto.', layout: 'modern-photo' },
            { title: 'Saúde Ocular', sub: 'Você coça os olhos? Pare agora.', layout: 'modern-cover' },
            { title: 'Lente de Contato', sub: 'Liberdade para praticar esportes.', layout: 'modern-photo' },
            { title: 'Tendência', sub: 'Os modelos que estão na moda em Paris.', layout: 'modern-list' },
            { title: 'Promoção Solar', sub: 'Óculos de sol com grau. Aproveite.', layout: 'modern-quote' }
        ]
    },
    {
        id: 'acaiteria',
        title: 'Açaiteria / Sorvetes',
        icon: '🍧',
        description: 'Refrescante e roxo.',
        colors: { primary: '#6b21a8', secondary: '#e9d5ff', bg: '#faf5ff', text: '#3b0764' },
        font: "'Outfit', sans-serif",
        hashtags: "#acai #sorvete #refrescante #verao #sobremesa #acailovers",
        prompts: {
            cover: 'CALOR PEDE AÇAÍ ☀️',
            list: '1. Escolha o tamanho\n2. Escolha as frutas\n3. Capriche no leite ninho',
            quote: 'Energia natural para o seu dia.',
            cta: 'Venha montar o seu!'
        },
        weekPlan: [
            { title: 'Comece a semana', sub: 'Nada melhor que um açaí para dar energia.', layout: 'modern-photo' },
            { title: 'Monte o Seu', sub: 'Mostre as opções de toppings coloridos.', layout: 'modern-list' },
            { title: 'Combinação Perfeita', sub: 'Morango + Leite Condensado + Granola.', layout: 'modern-cover' },
            { title: 'Benefícios', sub: 'O poder antioxidante do açaí puro.', layout: 'modern-quote' },
            { title: 'Sexta do Sorvete', sub: 'Traga a família para refrescar.', layout: 'modern-photo' }
        ]
    },
    {
        id: 'restaurante',
        title: 'Restaurante',
        icon: '🍽️',
        description: 'Sofisticado e delicioso.',
        colors: { primary: '#9f1239', secondary: '#f43f5e', bg: '#fff1f2', text: '#881337' },
        font: "'Playfair Display', serif",
        hashtags: "#gastronomia #restaurante #jantar #chef #comidadeverdade #vinho",
        prompts: {
            cover: 'JANTAR ESPECIAL 🍷',
            list: '• Entrada: Bruschetta\n• Prato: Risoto de Camarão\n• Sobremesa: Petit Gâteau',
            quote: 'Cozinhar é um ato de amor.',
            cta: 'Reserve sua mesa.'
        },
        weekPlan: [
            { title: 'Prato do Dia', sub: 'A sugestão do Chef para sua segunda-feira.', layout: 'modern-photo' },
            { title: 'Ingredientes Frescos', sub: 'Nossa massa é feita aqui, todos os dias.', layout: 'modern-cover' },
            { title: 'Quarta do Vinho', sub: 'As melhores harmonizações para seu jantar.', layout: 'modern-list' },
            { title: 'Ambiente', sub: 'O lugar perfeito para seu encontro.', layout: 'modern-photo' },
            { title: 'Fim de Semana', sub: 'Música ao vivo e gastronomia de ponta.', layout: 'modern-quote' }
        ]
    },
    {
        id: 'academia',
        title: 'Academia',
        icon: '💪',
        description: 'Força e impacto.',
        colors: { primary: '#eab308', secondary: '#ffffff', bg: '#171717', text: '#ffffff' },
        font: "'Montserrat', sans-serif",
        hashtags: "#academia #fitness #treino #nopainnogain #saude #musculacao",
        prompts: {
            cover: 'FOCO NO RESULTADO 👊',
            list: '1. Treine pesado\n2. Coma bem\n3. Durma 8h\n4. Repita',
            quote: 'Sem dor, sem ganho.',
            cta: 'Matrícula grátis hoje.'
        },
        weekPlan: [
            { title: 'Segunda Sem Desculpa', sub: 'O treino não vai se fazer sozinho.', layout: 'modern-cover' },
            { title: 'Dica do Coach', sub: 'Como melhorar seu agachamento.', layout: 'modern-list' },
            { title: 'Transformação', sub: 'Antes e depois inspirador de um aluno.', layout: 'modern-photo' },
            { title: 'Nutrição', sub: 'O que comer no pré-treino para ter energia.', layout: 'modern-cover' },
            { title: 'Desafio da Sexta', sub: 'Quem aguenta mais tempo na prancha?', layout: 'modern-quote' }
        ]
    }
];

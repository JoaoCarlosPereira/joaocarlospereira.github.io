(function () {
  const storageKey = 'joao-site-language';
  const fallbackLanguage = 'pt';
  const languages = {
    pt: { code: 'pt-BR', locale: 'pt_BR', short: 'PT', label: 'Português' },
    en: { code: 'en', locale: 'en_US', short: 'EN', label: 'English' },
    es: { code: 'es', locale: 'es_ES', short: 'ES', label: 'Español' },
    fr: { code: 'fr', locale: 'fr_FR', short: 'FR', label: 'Français' },
    de: { code: 'de', locale: 'de_DE', short: 'DE', label: 'Deutsch' },
    it: { code: 'it', locale: 'it_IT', short: 'IT', label: 'Italiano' },
    zh: { code: 'zh-CN', locale: 'zh_CN', short: 'ZH', label: '中文' }
  };

  const translations = {
    en: {
      'Selecionar idioma': 'Choose language',
      'Idioma': 'Language',
      'Abrir navegação': 'Open navigation',
      'Início': 'Home',
      'Sobre': 'About',
      'Formações': 'Education',
      'Formação': 'Education',
      'Diversão': 'Fun',
      'Contato': 'Contact',
      'Sistemas · Desenvolvimento · IA · ERP': 'Systems · Development · AI · ERP',
      'Simplificando a Tecnologia': 'Making Technology Simpler',
      'Maximizando a Eficiência': 'Maximizing Efficiency',
      'Sobre mim': 'About Me',
      'Olá! Meu nome é João Carlos Pereira, e se tem algo que me define, é a paixão por resolver problemas e criar soluções que realmente fazem a diferença.': 'Hello, my name is João Carlos Pereira. If there is one thing that defines me, it is the drive to solve problems and create solutions that truly make a difference.',
      'Desde cedo, a curiosidade pela tecnologia me guiou, e hoje, com mais de uma década de experiência como programador Delphi sênior, me dedico a desenvolver sistemas ERP que ajudam empresas a alcançarem seus objetivos de forma eficiente e descomplicada.': 'Technology has guided my curiosity from an early age. Today, with more than a decade of experience as a senior Delphi developer, I build ERP systems that help companies reach their goals efficiently and without unnecessary complexity.',
      'Quando não estou mergulhado em linhas de código, gosto de explorar novos conhecimentos, seja lendo sobre inteligência artificial ou aprendendo algo completamente diferente. Acredito que a tecnologia só faz sentido quando está conectada às pessoas e suas necessidades. Por isso, valorizo a simplicidade e a eficiência em tudo o que crio.': 'When I am not deep in code, I enjoy exploring new knowledge, whether by reading about artificial intelligence or learning something entirely different. I believe technology only matters when it is connected to people and their needs, which is why I value simplicity and efficiency in everything I create.',
      'Sou de São Miguel do Oeste, Santa Catarina, e gosto de viver com equilíbrio entre o trabalho e os momentos de descontração. Seja aprimorando minhas habilidades ou ajudando empresas a transformarem suas operações, meu foco sempre é crescer junto com as pessoas e os projetos com os quais me envolvo.': 'I am from São Miguel do Oeste, Santa Catarina, and I value a balanced life between work and moments of relaxation. Whether improving my skills or helping companies transform their operations, my focus is always on growing alongside the people and projects I work with.',
      'Seja bem-vindo ao meu site! Fique à vontade para explorar meu perfil profissional e, se precisar de alguém para descomplicar a tecnologia, estou aqui para ajudar.': 'Welcome to my website. Feel free to explore my professional profile, and if you need someone who can make technology simpler, I am here to help.',
      'João Carlos Pereira | Programador sênior com foco em sistemas, ERP, inteligência artificial e soluções tecnológicas eficientes.': 'João Carlos Pereira | Senior developer focused on systems, ERP, artificial intelligence and efficient technology solutions.',
      'João Carlos Pereira | Programador Sênior': 'João Carlos Pereira | Senior Developer',
      'Portfólio e currículo profissional com experiência em desenvolvimento de sistemas, ERP, inteligência artificial e tecnologia.': 'Professional portfolio and resume covering experience in systems development, ERP, artificial intelligence and technology.',
      'João Carlos - Início': 'João Carlos - Home',
      'Carreira e experiência profissional de João Carlos Pereira em desenvolvimento de sistemas, ERP, arquitetura de software e tecnologia.': 'Career and professional experience of João Carlos Pereira in systems development, ERP, software architecture and technology.',
      'João Carlos Pereira | Carreira': 'João Carlos Pereira | Career',
      'Conheça a trajetória profissional, habilidades e experiência de João Carlos Pereira em sistemas, ERP e tecnologia.': 'Learn about João Carlos Pereira’s professional journey, skills and experience in systems, ERP and technology.',
      'João Carlos - Carreira': 'João Carlos - Career',
      'Experiências': 'Experience',
      '2014 - Presente': '2014 - Present',
      'Programador de Sistemas de Informação Sênior': 'Senior Information Systems Developer',
      'Atuação no desenvolvimento e manutenção de sistemas de informação, análise de requisitos, aplicação de boas práticas de programação e revisão de código para garantir alta qualidade nos projetos entregues.': 'Work focused on developing and maintaining information systems, analyzing requirements, applying sound programming practices and reviewing code to ensure high-quality deliveries.',
      'Responsável pela criação e edição de vídeos, com foco na produção de conteúdo visual de alta qualidade para campanhas publicitárias e eventos especiais.': 'Responsible for creating and editing videos, focused on producing high-quality visual content for advertising campaigns and special events.',
      'Formação Acadêmica': 'Academic Education',
      'Pós-graduação Lato Sensu': 'Postgraduate specialization',
      'Segurança da Informação e Defesa Cibernética': 'Information Security and Cyber Defense',
      'Curso focado em estratégias de defesa cibernética, análise de ameaças e implementação de políticas de segurança da informação.': 'Program focused on cyber defense strategies, threat analysis and implementation of information security policies.',
      'Ciência de Dados e Inteligência Artificial': 'Data Science and Artificial Intelligence',
      'Curso focado em desenvolvimento de soluções com Inteligência Artificial, análise de dados e aprendizado de máquina.': 'Program focused on building artificial intelligence solutions, data analysis and machine learning.',
      'Desenvolvimento Cloud Web e Mobile': 'Cloud, Web and Mobile Development',
      'Especialização em tecnologias para desenvolvimento de aplicações web e móveis, com ênfase em computação em nuvem.': 'Specialization in technologies for web and mobile application development, with emphasis on cloud computing.',
      'Curso Superior de Tecnologia': 'Higher Technology Degree',
      'Gestão da Tecnologia da Informação': 'Information Technology Management',
      'Formação voltada para gestão e administração de TI, com destaque para infraestrutura e segurança.': 'Education focused on IT management and administration, especially infrastructure and security.',
      'Habilidades Profissionais': 'Professional Skills',
      'Resolução de Problemas Complexos': 'Complex Problem Solving',
      'Arquitetura de Software': 'Software Architecture',
      'Integração de Sistemas(APIs/ CNAB/ Bancos)': 'Systems Integration (APIs / CNAB / Banks)',
      'Manutenção de Sistemas Legados': 'Legacy Systems Maintenance',
      'Otimização de Performance': 'Performance Optimization',
      'Análise de Sistemas': 'Systems Analysis',
      'Linguagens': 'Programming Languages',
      'Tecnologias': 'Technologies',
      'Inteligência Artificial': 'Artificial Intelligence',
      'Formações acadêmicas e especializações de João Carlos Pereira em tecnologia, segurança da informação, IA e desenvolvimento.': 'Academic education and specializations by João Carlos Pereira in technology, information security, AI and development.',
      'João Carlos Pereira | Formações': 'João Carlos Pereira | Education',
      'Veja as formações acadêmicas e especializações de João Carlos Pereira em tecnologia, IA e segurança da informação.': 'View João Carlos Pereira’s academic background and specializations in technology, AI and information security.',
      'João Carlos - Formações': 'João Carlos - Education',
      'Pós-graduação Lato Sensu na UNINTER Centro Universitário Internacional (2025). Foco em estratégias de defesa cibernética, análise de ameaças e implementação de políticas de segurança da informação.': 'Postgraduate specialization at UNINTER International University Center (2025), focused on cyber defense strategies, threat analysis and implementation of information security policies.',
      'Pós-graduação Lato Sensu na UNINTER Centro Universitário Internacional (Outubro de 2024 - Abril de 2025). Foco em desenvolvimento de soluções com IA, aprendizado de máquina e análise de dados.': 'Postgraduate specialization at UNINTER International University Center (October 2024 - April 2025), focused on AI solution development, machine learning and data analysis.',
      'Pós-graduação Lato Sensu na Universidade do Oeste de Santa Catarina (2017 - 2019). Especialização em tecnologias para desenvolvimento de aplicações web e móveis com computação em nuvem.': 'Postgraduate specialization at the University of Western Santa Catarina (2017 - 2019), focused on technologies for web and mobile application development with cloud computing.',
      'Curso Superior de Tecnologia (CST) na UCEFF (2014 - 2017). Formação voltada para gestão e administração de TI, com destaque para infraestrutura e segurança.': 'Higher Technology Degree (CST) at UCEFF (2014 - 2017), focused on IT management and administration, especially infrastructure and security.',
      'Vamos construir algo juntos.': 'Let’s build something together.',
      'Entre em contato com João Carlos Pereira para oportunidades profissionais, projetos de tecnologia e desenvolvimento de sistemas.': 'Contact João Carlos Pereira for professional opportunities, technology projects and systems development.',
      'João Carlos Pereira | Contato': 'João Carlos Pereira | Contact',
      'João Carlos - Contato': 'João Carlos - Contact',
      'Entre em contato comigo': 'Get in touch with me',
      'bastidores, rotina e projetos': 'behind the scenes, routine and projects',
      'perfil profissional e experiência': 'professional profile and experience',
      'código, experimentos e repositórios': 'code, experiments and repositories',
      'mensagens diretas e propostas': 'direct messages and proposals',
      'contato rápido para conversar': 'quick contact for a conversation',
      'Conheça a Miriam AI, a assistente virtual de João Carlos Pereira, integrada em uma página dedicada dentro do site.': 'Meet Miriam AI, João Carlos Pereira’s virtual assistant, integrated into a dedicated page on the website.',
      'João Carlos Pereira | Miriam AI': 'João Carlos Pereira | Miriam AI',
      'Acesse a Miriam AI em uma página dedicada, integrada ao site de João Carlos Pereira.': 'Access Miriam AI on a dedicated page integrated into João Carlos Pereira’s website.',
      'João Carlos - Miriam AI': 'João Carlos - Miriam AI',
      'Abrir em nova janela': 'Open in a new window',
      'Infelizmente a Miriam está dormindo no momento.': 'Unfortunately, Miriam is asleep right now.',
      'Talvez para salvar o planeta gastando menos energia...': 'Maybe she is saving the planet by using less energy...',
      'Ou talvez esteja em manutenção...': 'Or maybe she is under maintenance...',
      'Ou simplesmente o João queira economizar energia elétrica...': 'Or João may simply be saving electricity...',
      'Seja como for, pode chamar ele': 'Either way, you can reach him',
      'aqui': 'here',
      'Área de diversão técnica com mini jogos criados por IA LLM local e plugins de desenvolvimento rápido.': 'A technical fun area with mini-games created using local LLM AI and rapid-development plugins.',
      'João Carlos Pereira | Diversão': 'João Carlos Pereira | Fun',
      'Catálogo de mini jogos clássicos em canvas desenvolvidos com IA LLM local e plugins de desenvolvimento rápido.': 'A catalog of classic canvas mini-games developed with local LLM AI and rapid-development plugins.',
      'João Carlos - Diversão': 'João Carlos - Fun',
      'Paixão · Tecnologia · Inovação': 'Passion · Technology · Innovation',
      'Jogos e Tecnologia': 'Games and Technology',
      'Como programador e apaixonado por tecnologia, eu não teria como não gostar de jogos. Eles representam uma área diretamente ligada à mais alta tecnologia de desenvolvimento de software, unindo lógica complexa e interatividade.': 'As a programmer and technology enthusiast, games naturally fascinate me. They are closely tied to advanced software development, combining complex logic with interactivity.',
      'Nesta página, apresento alguns jogos clássicos que desenvolvi para demonstrar experimentação prática com IA aplicada ao desenvolvimento. Como entusiasta de jogos eletrônicos, utilizo esses projetos para explorar novas fronteiras técnicas.': 'On this page, I present a few classic games I built to demonstrate practical experimentation with AI applied to development. As an electronic games enthusiast, I use these projects to explore new technical frontiers.',
      'Mesmo sendo uma área de diversão, cada mini jogo é uma prova de conceito: prototipação com IA LLM local, uso de plugins de desenvolvimento rápido e implementação em HTML, CSS, JavaScript e canvas.': 'Even as a fun area, each mini-game is a proof of concept: prototyping with local LLM AI, using rapid-development plugins and implementing the result with HTML, CSS, JavaScript and canvas.',
      'Mini jogo em canvas desenvolvido com apoio de IA LLM local e plugins de desenvolvimento rápido, combinando lógica de jogo, interface responsiva e visual alinhado ao site.': 'Canvas mini-game developed with support from local LLM AI and rapid-development plugins, combining game logic, a responsive interface and visuals aligned with the website.',
      'O clássico jogo da cobrinha reinventado com estética neon. Desenvolvido para testar movimentação em grade e renderização eficiente de partículas.': 'The classic snake game reimagined with a neon aesthetic, built to test grid movement and efficient particle rendering.',
      'Jogar': 'Play',
      'Mini jogo 01 · IA LLM local': 'Mini-game 01 · local LLM AI',
      'Mini jogo 02 · IA LLM local': 'Mini-game 02 · local LLM AI',
      'Pontos': 'Score',
      'Vidas': 'Lives',
      'Nivel': 'Level',
      'Pressione iniciar': 'Press start',
      'Iniciar': 'Start',
      'Pausar': 'Pause',
      'Reiniciar': 'Restart',
      'Setas ou WASD': 'Arrow keys or WASD',
      'Controles na tela': 'On-screen controls',
      'Controles direcionais': 'Directional controls',
      'Mover para cima': 'Move up',
      'Mover para esquerda': 'Move left',
      'Mover para direita': 'Move right',
      'Mover para baixo': 'Move down',
      'Jogo Pac-Man em canvas': 'Pac-Man game in canvas',
      'Jogo da Cobrinha em canvas': 'Snake game in canvas',
      'Nivel concluido': 'Level complete',
      'Fim de jogo': 'Game over',
      'Fim de Jogo': 'Game over',
      'Tente de novo': 'Try again',
      'Pausado': 'Paused',
      'Conversar com Miriam AI': 'Chat with Miriam AI',
      'Miriam está dormindo': 'Miriam is sleeping',
      'Manter uma IA acordada consome muita energia. Por isso, a Miriam dorme quando não há ninguém conversando.': 'Keeping an AI awake uses a lot of energy, so Miriam sleeps when nobody is talking to her.',
      'Acordar Miriam': 'Wake Miriam',
      'Miriam AI Chat': 'Miriam AI Chat'
    },
    es: {
      'Selecionar idioma': 'Elegir idioma',
      'Idioma': 'Idioma',
      'Abrir navegação': 'Abrir navegación',
      'Início': 'Inicio',
      'Sobre': 'Acerca de',
      'Formações': 'Formación',
      'Formação': 'Formación',
      'Diversão': 'Diversión',
      'Contato': 'Contacto',
      'Sistemas · Desenvolvimento · IA · ERP': 'Sistemas · Desarrollo · IA · ERP',
      'Simplificando a Tecnologia': 'Simplificando la tecnología',
      'Maximizando a Eficiência': 'Maximizando la eficiencia',
      'Sobre mim': 'Sobre mí',
      'Olá! Meu nome é João Carlos Pereira, e se tem algo que me define, é a paixão por resolver problemas e criar soluções que realmente fazem a diferença.': 'Hola, mi nombre es João Carlos Pereira. Si hay algo que me define, es la pasión por resolver problemas y crear soluciones que de verdad marcan la diferencia.',
      'Desde cedo, a curiosidade pela tecnologia me guiou, e hoje, com mais de uma década de experiência como programador Delphi sênior, me dedico a desenvolver sistemas ERP que ajudam empresas a alcançarem seus objetivos de forma eficiente e descomplicada.': 'La curiosidad por la tecnología me acompaña desde temprano. Hoy, con más de una década de experiencia como desarrollador Delphi sénior, me dedico a crear sistemas ERP que ayudan a las empresas a alcanzar sus objetivos de forma eficiente y sencilla.',
      'Quando não estou mergulhado em linhas de código, gosto de explorar novos conhecimentos, seja lendo sobre inteligência artificial ou aprendendo algo completamente diferente. Acredito que a tecnologia só faz sentido quando está conectada às pessoas e suas necessidades. Por isso, valorizo a simplicidade e a eficiência em tudo o que crio.': 'Cuando no estoy inmerso en líneas de código, me gusta explorar nuevos conocimientos, ya sea leyendo sobre inteligencia artificial o aprendiendo algo completamente distinto. Creo que la tecnología solo tiene sentido cuando está conectada con las personas y sus necesidades; por eso valoro la simplicidad y la eficiencia en todo lo que creo.',
      'Sou de São Miguel do Oeste, Santa Catarina, e gosto de viver com equilíbrio entre o trabalho e os momentos de descontração. Seja aprimorando minhas habilidades ou ajudando empresas a transformarem suas operações, meu foco sempre é crescer junto com as pessoas e os projetos com os quais me envolvo.': 'Soy de São Miguel do Oeste, Santa Catarina, y me gusta vivir con equilibrio entre el trabajo y los momentos de descanso. Ya sea mejorando mis habilidades o ayudando a empresas a transformar sus operaciones, mi foco siempre está en crecer junto con las personas y los proyectos en los que participo.',
      'Seja bem-vindo ao meu site! Fique à vontade para explorar meu perfil profissional e, se precisar de alguém para descomplicar a tecnologia, estou aqui para ajudar.': 'Bienvenido a mi sitio. Siéntete libre de explorar mi perfil profesional y, si necesitas a alguien que haga la tecnología más simple, estoy aquí para ayudar.',
      'João Carlos Pereira | Programador sênior com foco em sistemas, ERP, inteligência artificial e soluções tecnológicas eficientes.': 'João Carlos Pereira | Desarrollador sénior centrado en sistemas, ERP, inteligencia artificial y soluciones tecnológicas eficientes.',
      'João Carlos Pereira | Programador Sênior': 'João Carlos Pereira | Desarrollador Sénior',
      'Portfólio e currículo profissional com experiência em desenvolvimento de sistemas, ERP, inteligência artificial e tecnologia.': 'Portafolio y currículum profesional con experiencia en desarrollo de sistemas, ERP, inteligencia artificial y tecnología.',
      'João Carlos - Início': 'João Carlos - Inicio',
      'Carreira e experiência profissional de João Carlos Pereira em desenvolvimento de sistemas, ERP, arquitetura de software e tecnologia.': 'Trayectoria y experiencia profesional de João Carlos Pereira en desarrollo de sistemas, ERP, arquitectura de software y tecnología.',
      'João Carlos Pereira | Carreira': 'João Carlos Pereira | Trayectoria',
      'Conheça a trajetória profissional, habilidades e experiência de João Carlos Pereira em sistemas, ERP e tecnologia.': 'Conoce la trayectoria profesional, habilidades y experiencia de João Carlos Pereira en sistemas, ERP y tecnología.',
      'João Carlos - Carreira': 'João Carlos - Trayectoria',
      'Experiências': 'Experiencia',
      '2014 - Presente': '2014 - Presente',
      'Programador de Sistemas de Informação Sênior': 'Desarrollador Sénior de Sistemas de Información',
      'Atuação no desenvolvimento e manutenção de sistemas de informação, análise de requisitos, aplicação de boas práticas de programação e revisão de código para garantir alta qualidade nos projetos entregues.': 'Trabajo en desarrollo y mantenimiento de sistemas de información, análisis de requisitos, aplicación de buenas prácticas de programación y revisión de código para asegurar entregas de alta calidad.',
      'Responsável pela criação e edição de vídeos, com foco na produção de conteúdo visual de alta qualidade para campanhas publicitárias e eventos especiais.': 'Responsable de la creación y edición de videos, con foco en producir contenido visual de alta calidad para campañas publicitarias y eventos especiales.',
      'Formação Acadêmica': 'Formación Académica',
      'Pós-graduação Lato Sensu': 'Posgrado lato sensu',
      'Segurança da Informação e Defesa Cibernética': 'Seguridad de la Información y Defensa Cibernética',
      'Curso focado em estratégias de defesa cibernética, análise de ameaças e implementação de políticas de segurança da informação.': 'Programa centrado en estrategias de defensa cibernética, análisis de amenazas e implementación de políticas de seguridad de la información.',
      'Ciência de Dados e Inteligência Artificial': 'Ciencia de Datos e Inteligencia Artificial',
      'Curso focado em desenvolvimento de soluções com Inteligência Artificial, análise de dados e aprendizado de máquina.': 'Programa centrado en el desarrollo de soluciones con inteligencia artificial, análisis de datos y aprendizaje automático.',
      'Desenvolvimento Cloud Web e Mobile': 'Desarrollo Cloud, Web y Mobile',
      'Especialização em tecnologias para desenvolvimento de aplicações web e móveis, com ênfase em computação em nuvem.': 'Especialización en tecnologías para desarrollar aplicaciones web y móviles, con énfasis en computación en la nube.',
      'Curso Superior de Tecnologia': 'Grado Superior de Tecnología',
      'Gestão da Tecnologia da Informação': 'Gestión de Tecnología de la Información',
      'Formação voltada para gestão e administração de TI, com destaque para infraestrutura e segurança.': 'Formación orientada a la gestión y administración de TI, especialmente infraestructura y seguridad.',
      'Habilidades Profissionais': 'Habilidades Profesionales',
      'Resolução de Problemas Complexos': 'Resolución de Problemas Complejos',
      'Arquitetura de Software': 'Arquitectura de Software',
      'Integração de Sistemas(APIs/ CNAB/ Bancos)': 'Integración de Sistemas (APIs / CNAB / Bancos)',
      'Manutenção de Sistemas Legados': 'Mantenimiento de Sistemas Legados',
      'Otimização de Performance': 'Optimización de Rendimiento',
      'Análise de Sistemas': 'Análisis de Sistemas',
      'Linguagens': 'Lenguajes de programación',
      'Tecnologias': 'Tecnologías',
      'Inteligência Artificial': 'Inteligencia Artificial',
      'Formações acadêmicas e especializações de João Carlos Pereira em tecnologia, segurança da informação, IA e desenvolvimento.': 'Formación académica y especializaciones de João Carlos Pereira en tecnología, seguridad de la información, IA y desarrollo.',
      'João Carlos Pereira | Formações': 'João Carlos Pereira | Formación',
      'Veja as formações acadêmicas e especializações de João Carlos Pereira em tecnologia, IA e segurança da informação.': 'Consulta la formación académica y las especializaciones de João Carlos Pereira en tecnología, IA y seguridad de la información.',
      'João Carlos - Formações': 'João Carlos - Formación',
      'Pós-graduação Lato Sensu na UNINTER Centro Universitário Internacional (2025). Foco em estratégias de defesa cibernética, análise de ameaças e implementação de políticas de segurança da informação.': 'Posgrado lato sensu en UNINTER Centro Universitario Internacional (2025), con foco en estrategias de defensa cibernética, análisis de amenazas e implementación de políticas de seguridad de la información.',
      'Pós-graduação Lato Sensu na UNINTER Centro Universitário Internacional (Outubro de 2024 - Abril de 2025). Foco em desenvolvimento de soluções com IA, aprendizado de máquina e análise de dados.': 'Posgrado lato sensu en UNINTER Centro Universitario Internacional (octubre de 2024 - abril de 2025), con foco en desarrollo de soluciones con IA, aprendizaje automático y análisis de datos.',
      'Pós-graduação Lato Sensu na Universidade do Oeste de Santa Catarina (2017 - 2019). Especialização em tecnologias para desenvolvimento de aplicações web e móveis com computação em nuvem.': 'Posgrado lato sensu en la Universidad del Oeste de Santa Catarina (2017 - 2019), especializado en tecnologías para aplicaciones web y móviles con computación en la nube.',
      'Curso Superior de Tecnologia (CST) na UCEFF (2014 - 2017). Formação voltada para gestão e administração de TI, com destaque para infraestrutura e segurança.': 'Grado Superior de Tecnología (CST) en UCEFF (2014 - 2017), orientado a la gestión y administración de TI, especialmente infraestructura y seguridad.',
      'Vamos construir algo juntos.': 'Construyamos algo juntos.',
      'Entre em contato com João Carlos Pereira para oportunidades profissionais, projetos de tecnologia e desenvolvimento de sistemas.': 'Contacta con João Carlos Pereira para oportunidades profesionales, proyectos de tecnología y desarrollo de sistemas.',
      'João Carlos Pereira | Contato': 'João Carlos Pereira | Contacto',
      'João Carlos - Contato': 'João Carlos - Contacto',
      'Entre em contato comigo': 'Ponte en contacto conmigo',
      'bastidores, rotina e projetos': 'bastidores, rutina y proyectos',
      'perfil profissional e experiência': 'perfil profesional y experiencia',
      'código, experimentos e repositórios': 'código, experimentos y repositorios',
      'mensagens diretas e propostas': 'mensajes directos y propuestas',
      'contato rápido para conversar': 'contacto rápido para conversar',
      'Conheça a Miriam AI, a assistente virtual de João Carlos Pereira, integrada em uma página dedicada dentro do site.': 'Conoce Miriam AI, la asistente virtual de João Carlos Pereira, integrada en una página dedicada dentro del sitio.',
      'João Carlos Pereira | Miriam AI': 'João Carlos Pereira | Miriam AI',
      'Acesse a Miriam AI em uma página dedicada, integrada ao site de João Carlos Pereira.': 'Accede a Miriam AI en una página dedicada, integrada al sitio de João Carlos Pereira.',
      'João Carlos - Miriam AI': 'João Carlos - Miriam AI',
      'Abrir em nova janela': 'Abrir en una nueva ventana',
      'Infelizmente a Miriam está dormindo no momento.': 'Por desgracia, Miriam está durmiendo en este momento.',
      'Talvez para salvar o planeta gastando menos energia...': 'Tal vez para salvar el planeta gastando menos energía...',
      'Ou talvez esteja em manutenção...': 'O quizá esté en mantenimiento...',
      'Ou simplesmente o João queira economizar energia elétrica...': 'O quizá João simplemente quiera ahorrar electricidad...',
      'Seja como for, pode chamar ele': 'Sea como sea, puedes contactarlo',
      'aqui': 'aquí',
      'Área de diversão técnica com mini jogos criados por IA LLM local e plugins de desenvolvimento rápido.': 'Área de diversión técnica con minijuegos creados con IA LLM local y plugins de desarrollo rápido.',
      'João Carlos Pereira | Diversão': 'João Carlos Pereira | Diversión',
      'Catálogo de mini jogos clássicos em canvas desenvolvidos com IA LLM local e plugins de desenvolvimento rápido.': 'Catálogo de minijuegos clásicos en canvas desarrollados con IA LLM local y plugins de desarrollo rápido.',
      'João Carlos - Diversão': 'João Carlos - Diversión',
      'Paixão · Tecnologia · Inovação': 'Pasión · Tecnología · Innovación',
      'Jogos e Tecnologia': 'Juegos y Tecnología',
      'Como programador e apaixonado por tecnologia, eu não teria como não gostar de jogos. Eles representam uma área diretamente ligada à mais alta tecnologia de desenvolvimento de software, unindo lógica complexa e interatividade.': 'Como programador y apasionado por la tecnología, era inevitable que me gustaran los juegos. Representan un área directamente conectada con la tecnología más avanzada de desarrollo de software, uniendo lógica compleja e interactividad.',
      'Nesta página, apresento alguns jogos clássicos que desenvolvi para demonstrar experimentação prática com IA aplicada ao desenvolvimento. Como entusiasta de jogos eletrônicos, utilizo esses projetos para explorar novas fronteiras técnicas.': 'En esta página presento algunos juegos clásicos que desarrollé para demostrar experimentación práctica con IA aplicada al desarrollo. Como entusiasta de los videojuegos, uso estos proyectos para explorar nuevas fronteras técnicas.',
      'Mesmo sendo uma área de diversão, cada mini jogo é uma prova de conceito: prototipação com IA LLM local, uso de plugins de desenvolvimento rápido e implementação em HTML, CSS, JavaScript e canvas.': 'Aunque sea un área de diversión, cada minijuego es una prueba de concepto: prototipado con IA LLM local, uso de plugins de desarrollo rápido e implementación en HTML, CSS, JavaScript y canvas.',
      'Mini jogo em canvas desenvolvido com apoio de IA LLM local e plugins de desenvolvimento rápido, combinando lógica de jogo, interface responsiva e visual alinhado ao site.': 'Minijuego en canvas desarrollado con apoyo de IA LLM local y plugins de desarrollo rápido, combinando lógica de juego, interfaz responsiva y visual alineado con el sitio.',
      'O clássico jogo da cobrinha reinventado com estética neon. Desenvolvido para testar movimentação em grade e renderização eficiente de partículas.': 'El clásico juego de la serpiente reinventado con estética neón, desarrollado para probar movimiento en cuadrícula y renderizado eficiente de partículas.',
      'Jogar': 'Jugar',
      'Mini jogo 01 · IA LLM local': 'Minijuego 01 · IA LLM local',
      'Mini jogo 02 · IA LLM local': 'Minijuego 02 · IA LLM local',
      'Pontos': 'Puntos',
      'Vidas': 'Vidas',
      'Nivel': 'Nivel',
      'Pressione iniciar': 'Pulsa iniciar',
      'Iniciar': 'Iniciar',
      'Pausar': 'Pausar',
      'Reiniciar': 'Reiniciar',
      'Setas ou WASD': 'Flechas o WASD',
      'Controles na tela': 'Controles en pantalla',
      'Controles direcionais': 'Controles direccionales',
      'Mover para cima': 'Mover hacia arriba',
      'Mover para esquerda': 'Mover a la izquierda',
      'Mover para direita': 'Mover a la derecha',
      'Mover para baixo': 'Mover hacia abajo',
      'Jogo Pac-Man em canvas': 'Juego Pac-Man en canvas',
      'Jogo da Cobrinha em canvas': 'Juego de la serpiente en canvas',
      'Nivel concluido': 'Nivel completado',
      'Fim de jogo': 'Fin del juego',
      'Fim de Jogo': 'Fin del juego',
      'Tente de novo': 'Inténtalo de nuevo',
      'Pausado': 'Pausado',
      'Conversar com Miriam AI': 'Conversar con Miriam AI',
      'Miriam está dormindo': 'Miriam está durmiendo',
      'Manter uma IA acordada consome muita energia. Por isso, a Miriam dorme quando não há ninguém conversando.': 'Mantener una IA despierta consume mucha energía. Por eso Miriam duerme cuando no hay nadie conversando.',
      'Acordar Miriam': 'Despertar a Miriam',
      'Miriam AI Chat': 'Chat de Miriam AI'
    },
    fr: {
      'Selecionar idioma': 'Choisir la langue',
      'Idioma': 'Langue',
      'Abrir navegação': 'Ouvrir la navigation',
      'Início': 'Accueil',
      'Sobre': 'À propos',
      'Formações': 'Formation',
      'Formação': 'Formation',
      'Diversão': 'Loisirs',
      'Contato': 'Contact',
      'Sistemas · Desenvolvimento · IA · ERP': 'Systèmes · Développement · IA · ERP',
      'Simplificando a Tecnologia': 'Simplifier la technologie',
      'Maximizando a Eficiência': 'Maximiser l’efficacité',
      'Sobre mim': 'À propos de moi',
      'Olá! Meu nome é João Carlos Pereira, e se tem algo que me define, é a paixão por resolver problemas e criar soluções que realmente fazem a diferença.': 'Bonjour, je m’appelle João Carlos Pereira. S’il y a une chose qui me définit, c’est l’envie de résoudre des problèmes et de créer des solutions qui font réellement la différence.',
      'Desde cedo, a curiosidade pela tecnologia me guiou, e hoje, com mais de uma década de experiência como programador Delphi sênior, me dedico a desenvolver sistemas ERP que ajudam empresas a alcançarem seus objetivos de forma eficiente e descomplicada.': 'Depuis mon plus jeune âge, la curiosité pour la technologie me guide. Aujourd’hui, avec plus de dix ans d’expérience comme développeur Delphi senior, je conçois des systèmes ERP qui aident les entreprises à atteindre leurs objectifs de manière efficace et simple.',
      'Quando não estou mergulhado em linhas de código, gosto de explorar novos conhecimentos, seja lendo sobre inteligência artificial ou aprendendo algo completamente diferente. Acredito que a tecnologia só faz sentido quando está conectada às pessoas e suas necessidades. Por isso, valorizo a simplicidade e a eficiência em tudo o que crio.': 'Quand je ne suis pas plongé dans le code, j’aime explorer de nouveaux sujets, qu’il s’agisse d’intelligence artificielle ou de quelque chose de totalement différent. Je crois que la technologie n’a de sens que lorsqu’elle est liée aux personnes et à leurs besoins; c’est pourquoi je privilégie la simplicité et l’efficacité dans tout ce que je crée.',
      'Sou de São Miguel do Oeste, Santa Catarina, e gosto de viver com equilíbrio entre o trabalho e os momentos de descontração. Seja aprimorando minhas habilidades ou ajudando empresas a transformarem suas operações, meu foco sempre é crescer junto com as pessoas e os projetos com os quais me envolvo.': 'Je viens de São Miguel do Oeste, dans l’État de Santa Catarina, et j’aime garder un équilibre entre le travail et les moments de détente. Que je perfectionne mes compétences ou que j’aide des entreprises à transformer leurs opérations, mon objectif est toujours de grandir avec les personnes et les projets auxquels je participe.',
      'Seja bem-vindo ao meu site! Fique à vontade para explorar meu perfil profissional e, se precisar de alguém para descomplicar a tecnologia, estou aqui para ajudar.': 'Bienvenue sur mon site. N’hésitez pas à explorer mon profil professionnel; si vous avez besoin de quelqu’un pour rendre la technologie plus simple, je suis là pour vous aider.',
      'João Carlos Pereira | Programador sênior com foco em sistemas, ERP, inteligência artificial e soluções tecnológicas eficientes.': 'João Carlos Pereira | Développeur senior spécialisé dans les systèmes, les ERP, l’intelligence artificielle et les solutions technologiques efficaces.',
      'João Carlos Pereira | Programador Sênior': 'João Carlos Pereira | Développeur Senior',
      'Portfólio e currículo profissional com experiência em desenvolvimento de sistemas, ERP, inteligência artificial e tecnologia.': 'Portfolio et CV professionnel présentant une expérience en développement de systèmes, ERP, intelligence artificielle et technologie.',
      'João Carlos - Início': 'João Carlos - Accueil',
      'Carreira e experiência profissional de João Carlos Pereira em desenvolvimento de sistemas, ERP, arquitetura de software e tecnologia.': 'Parcours et expérience professionnelle de João Carlos Pereira en développement de systèmes, ERP, architecture logicielle et technologie.',
      'João Carlos Pereira | Carreira': 'João Carlos Pereira | Parcours',
      'Conheça a trajetória profissional, habilidades e experiência de João Carlos Pereira em sistemas, ERP e tecnologia.': 'Découvrez le parcours professionnel, les compétences et l’expérience de João Carlos Pereira en systèmes, ERP et technologie.',
      'João Carlos - Carreira': 'João Carlos - Parcours',
      'Experiências': 'Expériences',
      '2014 - Presente': '2014 - Aujourd’hui',
      'Programador de Sistemas de Informação Sênior': 'Développeur Senior de Systèmes d’Information',
      'Atuação no desenvolvimento e manutenção de sistemas de informação, análise de requisitos, aplicação de boas práticas de programação e revisão de código para garantir alta qualidade nos projetos entregues.': 'Intervention dans le développement et la maintenance de systèmes d’information, l’analyse des exigences, l’application de bonnes pratiques de programmation et la revue de code afin de garantir des livraisons de grande qualité.',
      'Responsável pela criação e edição de vídeos, com foco na produção de conteúdo visual de alta qualidade para campanhas publicitárias e eventos especiais.': 'Responsable de la création et du montage vidéo, avec un accent sur la production de contenus visuels de haute qualité pour des campagnes publicitaires et des événements spéciaux.',
      'Formação Acadêmica': 'Formation Académique',
      'Pós-graduação Lato Sensu': 'Spécialisation de troisième cycle',
      'Segurança da Informação e Defesa Cibernética': 'Sécurité de l’Information et Cyberdéfense',
      'Curso focado em estratégias de defesa cibernética, análise de ameaças e implementação de políticas de segurança da informação.': 'Programme axé sur les stratégies de cyberdéfense, l’analyse des menaces et la mise en œuvre de politiques de sécurité de l’information.',
      'Ciência de Dados e Inteligência Artificial': 'Science des Données et Intelligence Artificielle',
      'Curso focado em desenvolvimento de soluções com Inteligência Artificial, análise de dados e aprendizado de máquina.': 'Programme axé sur le développement de solutions d’intelligence artificielle, l’analyse de données et l’apprentissage automatique.',
      'Desenvolvimento Cloud Web e Mobile': 'Développement Cloud, Web et Mobile',
      'Especialização em tecnologias para desenvolvimento de aplicações web e móveis, com ênfase em computação em nuvem.': 'Spécialisation dans les technologies de développement d’applications web et mobiles, avec un accent sur le cloud computing.',
      'Curso Superior de Tecnologia': 'Diplôme Supérieur de Technologie',
      'Gestão da Tecnologia da Informação': 'Gestion des Technologies de l’Information',
      'Formação voltada para gestão e administração de TI, com destaque para infraestrutura e segurança.': 'Formation orientée vers la gestion et l’administration informatique, notamment l’infrastructure et la sécurité.',
      'Habilidades Profissionais': 'Compétences Professionnelles',
      'Resolução de Problemas Complexos': 'Résolution de Problèmes Complexes',
      'Arquitetura de Software': 'Architecture Logicielle',
      'Integração de Sistemas(APIs/ CNAB/ Bancos)': 'Intégration de Systèmes (API / CNAB / Banques)',
      'Manutenção de Sistemas Legados': 'Maintenance de Systèmes Hérités',
      'Otimização de Performance': 'Optimisation des Performances',
      'Análise de Sistemas': 'Analyse de Systèmes',
      'Linguagens': 'Langages de programmation',
      'Tecnologias': 'Technologies',
      'Inteligência Artificial': 'Intelligence Artificielle',
      'Formações acadêmicas e especializações de João Carlos Pereira em tecnologia, segurança da informação, IA e desenvolvimento.': 'Formation académique et spécialisations de João Carlos Pereira en technologie, sécurité de l’information, IA et développement.',
      'João Carlos Pereira | Formações': 'João Carlos Pereira | Formation',
      'Veja as formações acadêmicas e especializações de João Carlos Pereira em tecnologia, IA e segurança da informação.': 'Découvrez la formation académique et les spécialisations de João Carlos Pereira en technologie, IA et sécurité de l’information.',
      'João Carlos - Formações': 'João Carlos - Formation',
      'Pós-graduação Lato Sensu na UNINTER Centro Universitário Internacional (2025). Foco em estratégias de defesa cibernética, análise de ameaças e implementação de políticas de segurança da informação.': 'Spécialisation de troisième cycle à l’UNINTER Centro Universitário Internacional (2025), axée sur les stratégies de cyberdéfense, l’analyse des menaces et la mise en œuvre de politiques de sécurité de l’information.',
      'Pós-graduação Lato Sensu na UNINTER Centro Universitário Internacional (Outubro de 2024 - Abril de 2025). Foco em desenvolvimento de soluções com IA, aprendizado de máquina e análise de dados.': 'Spécialisation de troisième cycle à l’UNINTER Centro Universitário Internacional (octobre 2024 - avril 2025), axée sur le développement de solutions d’IA, l’apprentissage automatique et l’analyse de données.',
      'Pós-graduação Lato Sensu na Universidade do Oeste de Santa Catarina (2017 - 2019). Especialização em tecnologias para desenvolvimento de aplicações web e móveis com computação em nuvem.': 'Spécialisation de troisième cycle à l’Université de l’Ouest de Santa Catarina (2017 - 2019), consacrée aux technologies de développement web et mobile avec cloud computing.',
      'Curso Superior de Tecnologia (CST) na UCEFF (2014 - 2017). Formação voltada para gestão e administração de TI, com destaque para infraestrutura e segurança.': 'Diplôme Supérieur de Technologie (CST) à l’UCEFF (2014 - 2017), orienté vers la gestion et l’administration informatique, notamment l’infrastructure et la sécurité.',
      'Vamos construir algo juntos.': 'Construisons quelque chose ensemble.',
      'Entre em contato com João Carlos Pereira para oportunidades profissionais, projetos de tecnologia e desenvolvimento de sistemas.': 'Contactez João Carlos Pereira pour des opportunités professionnelles, des projets technologiques et du développement de systèmes.',
      'João Carlos Pereira | Contato': 'João Carlos Pereira | Contact',
      'João Carlos - Contato': 'João Carlos - Contact',
      'Entre em contato comigo': 'Contactez-moi',
      'bastidores, rotina e projetos': 'coulisses, quotidien et projets',
      'perfil profissional e experiência': 'profil professionnel et expérience',
      'código, experimentos e repositórios': 'code, expérimentations et dépôts',
      'mensagens diretas e propostas': 'messages directs et propositions',
      'contato rápido para conversar': 'contact rapide pour échanger',
      'Conheça a Miriam AI, a assistente virtual de João Carlos Pereira, integrada em uma página dedicada dentro do site.': 'Découvrez Miriam AI, l’assistante virtuelle de João Carlos Pereira, intégrée dans une page dédiée du site.',
      'João Carlos Pereira | Miriam AI': 'João Carlos Pereira | Miriam AI',
      'Acesse a Miriam AI em uma página dedicada, integrada ao site de João Carlos Pereira.': 'Accédez à Miriam AI sur une page dédiée intégrée au site de João Carlos Pereira.',
      'João Carlos - Miriam AI': 'João Carlos - Miriam AI',
      'Abrir em nova janela': 'Ouvrir dans une nouvelle fenêtre',
      'Infelizmente a Miriam está dormindo no momento.': 'Malheureusement, Miriam dort en ce moment.',
      'Talvez para salvar o planeta gastando menos energia...': 'Peut-être pour préserver la planète en consommant moins d’énergie...',
      'Ou talvez esteja em manutenção...': 'Ou peut-être qu’elle est en maintenance...',
      'Ou simplesmente o João queira economizar energia elétrica...': 'Ou peut-être que João veut simplement économiser de l’électricité...',
      'Seja como for, pode chamar ele': 'Dans tous les cas, vous pouvez le contacter',
      'aqui': 'ici',
      'Área de diversão técnica com mini jogos criados por IA LLM local e plugins de desenvolvimento rápido.': 'Espace de loisir technique avec des mini-jeux créés avec une IA LLM locale et des plugins de développement rapide.',
      'João Carlos Pereira | Diversão': 'João Carlos Pereira | Loisirs',
      'Catálogo de mini jogos clássicos em canvas desenvolvidos com IA LLM local e plugins de desenvolvimento rápido.': 'Catalogue de mini-jeux classiques en canvas développés avec une IA LLM locale et des plugins de développement rapide.',
      'João Carlos - Diversão': 'João Carlos - Loisirs',
      'Paixão · Tecnologia · Inovação': 'Passion · Technologie · Innovation',
      'Jogos e Tecnologia': 'Jeux et Technologie',
      'Como programador e apaixonado por tecnologia, eu não teria como não gostar de jogos. Eles representam uma área diretamente ligada à mais alta tecnologia de desenvolvimento de software, unindo lógica complexa e interatividade.': 'En tant que programmeur passionné de technologie, il m’était naturel d’aimer les jeux. Ils représentent un domaine directement lié aux technologies avancées de développement logiciel, combinant logique complexe et interactivité.',
      'Nesta página, apresento alguns jogos clássicos que desenvolvi para demonstrar experimentação prática com IA aplicada ao desenvolvimento. Como entusiasta de jogos eletrônicos, utilizo esses projetos para explorar novas fronteiras técnicas.': 'Sur cette page, je présente quelques jeux classiques développés pour démontrer une expérimentation pratique avec l’IA appliquée au développement. En tant que passionné de jeux vidéo, j’utilise ces projets pour explorer de nouvelles frontières techniques.',
      'Mesmo sendo uma área de diversão, cada mini jogo é uma prova de conceito: prototipação com IA LLM local, uso de plugins de desenvolvimento rápido e implementação em HTML, CSS, JavaScript e canvas.': 'Même dans un espace de loisir, chaque mini-jeu est une preuve de concept: prototypage avec une IA LLM locale, utilisation de plugins de développement rapide et implémentation en HTML, CSS, JavaScript et canvas.',
      'Mini jogo em canvas desenvolvido com apoio de IA LLM local e plugins de desenvolvimento rápido, combinando lógica de jogo, interface responsiva e visual alinhado ao site.': 'Mini-jeu en canvas développé avec l’aide d’une IA LLM locale et de plugins de développement rapide, combinant logique de jeu, interface responsive et visuel cohérent avec le site.',
      'O clássico jogo da cobrinha reinventado com estética neon. Desenvolvido para testar movimentação em grade e renderização eficiente de partículas.': 'Le classique jeu du serpent réinventé avec une esthétique néon, développé pour tester le déplacement sur grille et le rendu efficace de particules.',
      'Jogar': 'Jouer',
      'Mini jogo 01 · IA LLM local': 'Mini-jeu 01 · IA LLM locale',
      'Mini jogo 02 · IA LLM local': 'Mini-jeu 02 · IA LLM locale',
      'Pontos': 'Score',
      'Vidas': 'Vies',
      'Nivel': 'Niveau',
      'Pressione iniciar': 'Appuyez pour démarrer',
      'Iniciar': 'Démarrer',
      'Pausar': 'Pause',
      'Reiniciar': 'Redémarrer',
      'Setas ou WASD': 'Flèches ou WASD',
      'Controles na tela': 'Commandes à l’écran',
      'Controles direcionais': 'Commandes directionnelles',
      'Mover para cima': 'Monter',
      'Mover para esquerda': 'Aller à gauche',
      'Mover para direita': 'Aller à droite',
      'Mover para baixo': 'Descendre',
      'Jogo Pac-Man em canvas': 'Jeu Pac-Man en canvas',
      'Jogo da Cobrinha em canvas': 'Jeu du serpent en canvas',
      'Nivel concluido': 'Niveau terminé',
      'Fim de jogo': 'Partie terminée',
      'Fim de Jogo': 'Partie terminée',
      'Tente de novo': 'Essayez encore',
      'Pausado': 'En pause',
      'Conversar com Miriam AI': 'Discuter avec Miriam AI',
      'Miriam está dormindo': 'Miriam dort',
      'Manter uma IA acordada consome muita energia. Por isso, a Miriam dorme quando não há ninguém conversando.': 'Garder une IA éveillée consomme beaucoup d’énergie. Miriam dort donc lorsqu’il n’y a personne avec qui parler.',
      'Acordar Miriam': 'Réveiller Miriam',
      'Miriam AI Chat': 'Chat Miriam AI'
    },
    de: {
      'Selecionar idioma': 'Sprache auswählen',
      'Idioma': 'Sprache',
      'Abrir navegação': 'Navigation öffnen',
      'Início': 'Start',
      'Sobre': 'Über mich',
      'Formações': 'Ausbildung',
      'Formação': 'Ausbildung',
      'Diversão': 'Freizeit',
      'Contato': 'Kontakt',
      'Sistemas · Desenvolvimento · IA · ERP': 'Systeme · Entwicklung · KI · ERP',
      'Simplificando a Tecnologia': 'Technologie verständlicher machen',
      'Maximizando a Eficiência': 'Effizienz maximieren',
      'Sobre mim': 'Über mich',
      'Olá! Meu nome é João Carlos Pereira, e se tem algo que me define, é a paixão por resolver problemas e criar soluções que realmente fazem a diferença.': 'Hallo, mein Name ist João Carlos Pereira. Wenn mich etwas ausmacht, dann ist es die Leidenschaft, Probleme zu lösen und Lösungen zu entwickeln, die wirklich etwas bewegen.',
      'Desde cedo, a curiosidade pela tecnologia me guiou, e hoje, com mais de uma década de experiência como programador Delphi sênior, me dedico a desenvolver sistemas ERP que ajudam empresas a alcançarem seus objetivos de forma eficiente e descomplicada.': 'Schon früh hat mich die Neugier auf Technologie begleitet. Heute entwickle ich mit mehr als zehn Jahren Erfahrung als Senior-Delphi-Entwickler ERP-Systeme, die Unternehmen effizient und unkompliziert bei der Zielerreichung unterstützen.',
      'Quando não estou mergulhado em linhas de código, gosto de explorar novos conhecimentos, seja lendo sobre inteligência artificial ou aprendendo algo completamente diferente. Acredito que a tecnologia só faz sentido quando está conectada às pessoas e suas necessidades. Por isso, valorizo a simplicidade e a eficiência em tudo o que crio.': 'Wenn ich nicht gerade im Code vertieft bin, erkunde ich gern neues Wissen, ob über künstliche Intelligenz oder über ganz andere Themen. Ich glaube, dass Technologie nur dann sinnvoll ist, wenn sie mit Menschen und ihren Bedürfnissen verbunden ist; deshalb lege ich bei allem, was ich entwickle, Wert auf Einfachheit und Effizienz.',
      'Sou de São Miguel do Oeste, Santa Catarina, e gosto de viver com equilíbrio entre o trabalho e os momentos de descontração. Seja aprimorando minhas habilidades ou ajudando empresas a transformarem suas operações, meu foco sempre é crescer junto com as pessoas e os projetos com os quais me envolvo.': 'Ich komme aus São Miguel do Oeste in Santa Catarina und schätze ein ausgewogenes Verhältnis zwischen Arbeit und Erholung. Ob ich meine Fähigkeiten weiterentwickle oder Unternehmen bei der Transformation ihrer Abläufe unterstütze, mein Fokus liegt darauf, gemeinsam mit den Menschen und Projekten zu wachsen, mit denen ich arbeite.',
      'Seja bem-vindo ao meu site! Fique à vontade para explorar meu perfil profissional e, se precisar de alguém para descomplicar a tecnologia, estou aqui para ajudar.': 'Willkommen auf meiner Website. Sehen Sie sich gern mein berufliches Profil an. Wenn Sie jemanden brauchen, der Technologie verständlicher macht, helfe ich gerne.',
      'João Carlos Pereira | Programador sênior com foco em sistemas, ERP, inteligência artificial e soluções tecnológicas eficientes.': 'João Carlos Pereira | Senior-Entwickler mit Fokus auf Systeme, ERP, künstliche Intelligenz und effiziente Technologielösungen.',
      'João Carlos Pereira | Programador Sênior': 'João Carlos Pereira | Senior-Entwickler',
      'Portfólio e currículo profissional com experiência em desenvolvimento de sistemas, ERP, inteligência artificial e tecnologia.': 'Portfolio und beruflicher Lebenslauf mit Erfahrung in Systementwicklung, ERP, künstlicher Intelligenz und Technologie.',
      'João Carlos - Início': 'João Carlos - Start',
      'Carreira e experiência profissional de João Carlos Pereira em desenvolvimento de sistemas, ERP, arquitetura de software e tecnologia.': 'Karriere und Berufserfahrung von João Carlos Pereira in Systementwicklung, ERP, Softwarearchitektur und Technologie.',
      'João Carlos Pereira | Carreira': 'João Carlos Pereira | Karriere',
      'Conheça a trajetória profissional, habilidades e experiência de João Carlos Pereira em sistemas, ERP e tecnologia.': 'Lernen Sie den beruflichen Werdegang, die Fähigkeiten und die Erfahrung von João Carlos Pereira in Systemen, ERP und Technologie kennen.',
      'João Carlos - Carreira': 'João Carlos - Karriere',
      'Experiências': 'Erfahrung',
      '2014 - Presente': '2014 - Heute',
      'Programador de Sistemas de Informação Sênior': 'Senior-Entwickler für Informationssysteme',
      'Atuação no desenvolvimento e manutenção de sistemas de informação, análise de requisitos, aplicação de boas práticas de programação e revisão de código para garantir alta qualidade nos projetos entregues.': 'Tätigkeit in Entwicklung und Wartung von Informationssystemen, Anforderungsanalyse, Anwendung bewährter Programmierpraktiken und Code-Reviews zur Sicherstellung hochwertiger Projektergebnisse.',
      'Responsável pela criação e edição de vídeos, com foco na produção de conteúdo visual de alta qualidade para campanhas publicitárias e eventos especiais.': 'Verantwortlich für Erstellung und Schnitt von Videos mit Fokus auf hochwertigem visuellen Content für Werbekampagnen und besondere Veranstaltungen.',
      'Formação Acadêmica': 'Akademische Ausbildung',
      'Pós-graduação Lato Sensu': 'Postgraduale Spezialisierung',
      'Segurança da Informação e Defesa Cibernética': 'Informationssicherheit und Cyberabwehr',
      'Curso focado em estratégias de defesa cibernética, análise de ameaças e implementação de políticas de segurança da informação.': 'Studiengang mit Fokus auf Cyberabwehrstrategien, Bedrohungsanalyse und Umsetzung von Informationssicherheitsrichtlinien.',
      'Ciência de Dados e Inteligência Artificial': 'Data Science und Künstliche Intelligenz',
      'Curso focado em desenvolvimento de soluções com Inteligência Artificial, análise de dados e aprendizado de máquina.': 'Studiengang mit Fokus auf Entwicklung von KI-Lösungen, Datenanalyse und maschinellem Lernen.',
      'Desenvolvimento Cloud Web e Mobile': 'Cloud-, Web- und Mobile-Entwicklung',
      'Especialização em tecnologias para desenvolvimento de aplicações web e móveis, com ênfase em computação em nuvem.': 'Spezialisierung auf Technologien zur Entwicklung von Web- und Mobilanwendungen mit Schwerpunkt Cloud Computing.',
      'Curso Superior de Tecnologia': 'Höherer Technologieabschluss',
      'Gestão da Tecnologia da Informação': 'Management der Informationstechnologie',
      'Formação voltada para gestão e administração de TI, com destaque para infraestrutura e segurança.': 'Ausbildung mit Schwerpunkt IT-Management und -Administration, insbesondere Infrastruktur und Sicherheit.',
      'Habilidades Profissionais': 'Berufliche Fähigkeiten',
      'Resolução de Problemas Complexos': 'Lösung komplexer Probleme',
      'Arquitetura de Software': 'Softwarearchitektur',
      'Integração de Sistemas(APIs/ CNAB/ Bancos)': 'Systemintegration (APIs / CNAB / Banken)',
      'Manutenção de Sistemas Legados': 'Wartung von Legacy-Systemen',
      'Otimização de Performance': 'Performance-Optimierung',
      'Análise de Sistemas': 'Systemanalyse',
      'Linguagens': 'Programmiersprachen',
      'Tecnologias': 'Technologien',
      'Inteligência Artificial': 'Künstliche Intelligenz',
      'Formações acadêmicas e especializações de João Carlos Pereira em tecnologia, segurança da informação, IA e desenvolvimento.': 'Akademische Ausbildung und Spezialisierungen von João Carlos Pereira in Technologie, Informationssicherheit, KI und Entwicklung.',
      'João Carlos Pereira | Formações': 'João Carlos Pereira | Ausbildung',
      'Veja as formações acadêmicas e especializações de João Carlos Pereira em tecnologia, IA e segurança da informação.': 'Sehen Sie die akademische Ausbildung und Spezialisierungen von João Carlos Pereira in Technologie, KI und Informationssicherheit.',
      'João Carlos - Formações': 'João Carlos - Ausbildung',
      'Pós-graduação Lato Sensu na UNINTER Centro Universitário Internacional (2025). Foco em estratégias de defesa cibernética, análise de ameaças e implementação de políticas de segurança da informação.': 'Postgraduale Spezialisierung am UNINTER Centro Universitário Internacional (2025) mit Fokus auf Cyberabwehrstrategien, Bedrohungsanalyse und Umsetzung von Informationssicherheitsrichtlinien.',
      'Pós-graduação Lato Sensu na UNINTER Centro Universitário Internacional (Outubro de 2024 - Abril de 2025). Foco em desenvolvimento de soluções com IA, aprendizado de máquina e análise de dados.': 'Postgraduale Spezialisierung am UNINTER Centro Universitário Internacional (Oktober 2024 - April 2025) mit Fokus auf Entwicklung von KI-Lösungen, maschinellem Lernen und Datenanalyse.',
      'Pós-graduação Lato Sensu na Universidade do Oeste de Santa Catarina (2017 - 2019). Especialização em tecnologias para desenvolvimento de aplicações web e móveis com computação em nuvem.': 'Postgraduale Spezialisierung an der Universität des Westens von Santa Catarina (2017 - 2019) in Technologien für Web- und Mobilanwendungen mit Cloud Computing.',
      'Curso Superior de Tecnologia (CST) na UCEFF (2014 - 2017). Formação voltada para gestão e administração de TI, com destaque para infraestrutura e segurança.': 'Höherer Technologieabschluss (CST) an der UCEFF (2014 - 2017), ausgerichtet auf IT-Management und -Administration, insbesondere Infrastruktur und Sicherheit.',
      'Vamos construir algo juntos.': 'Lassen Sie uns gemeinsam etwas bauen.',
      'Entre em contato com João Carlos Pereira para oportunidades profissionais, projetos de tecnologia e desenvolvimento de sistemas.': 'Kontaktieren Sie João Carlos Pereira für berufliche Möglichkeiten, Technologieprojekte und Systementwicklung.',
      'João Carlos Pereira | Contato': 'João Carlos Pereira | Kontakt',
      'João Carlos - Contato': 'João Carlos - Kontakt',
      'Entre em contato comigo': 'Nehmen Sie Kontakt mit mir auf',
      'bastidores, rotina e projetos': 'Einblicke, Alltag und Projekte',
      'perfil profissional e experiência': 'berufliches Profil und Erfahrung',
      'código, experimentos e repositórios': 'Code, Experimente und Repositories',
      'mensagens diretas e propostas': 'direkte Nachrichten und Angebote',
      'contato rápido para conversar': 'schneller Kontakt für ein Gespräch',
      'Conheça a Miriam AI, a assistente virtual de João Carlos Pereira, integrada em uma página dedicada dentro do site.': 'Lernen Sie Miriam AI kennen, den virtuellen Assistenten von João Carlos Pereira, integriert in eine eigene Seite der Website.',
      'João Carlos Pereira | Miriam AI': 'João Carlos Pereira | Miriam AI',
      'Acesse a Miriam AI em uma página dedicada, integrada ao site de João Carlos Pereira.': 'Öffnen Sie Miriam AI auf einer eigenen Seite, die in die Website von João Carlos Pereira integriert ist.',
      'João Carlos - Miriam AI': 'João Carlos - Miriam AI',
      'Abrir em nova janela': 'In neuem Fenster öffnen',
      'Infelizmente a Miriam está dormindo no momento.': 'Leider schläft Miriam im Moment.',
      'Talvez para salvar o planeta gastando menos energia...': 'Vielleicht, um den Planeten durch weniger Energieverbrauch zu schonen...',
      'Ou talvez esteja em manutenção...': 'Oder vielleicht befindet sie sich in Wartung...',
      'Ou simplesmente o João queira economizar energia elétrica...': 'Oder João möchte einfach Strom sparen...',
      'Seja como for, pode chamar ele': 'Wie auch immer, Sie können ihn kontaktieren',
      'aqui': 'hier',
      'Área de diversão técnica com mini jogos criados por IA LLM local e plugins de desenvolvimento rápido.': 'Technischer Freizeitbereich mit Mini-Spielen, erstellt mit lokaler LLM-KI und Rapid-Development-Plugins.',
      'João Carlos Pereira | Diversão': 'João Carlos Pereira | Freizeit',
      'Catálogo de mini jogos clássicos em canvas desenvolvidos com IA LLM local e plugins de desenvolvimento rápido.': 'Katalog klassischer Canvas-Mini-Spiele, entwickelt mit lokaler LLM-KI und Rapid-Development-Plugins.',
      'João Carlos - Diversão': 'João Carlos - Freizeit',
      'Paixão · Tecnologia · Inovação': 'Leidenschaft · Technologie · Innovation',
      'Jogos e Tecnologia': 'Spiele und Technologie',
      'Como programador e apaixonado por tecnologia, eu não teria como não gostar de jogos. Eles representam uma área diretamente ligada à mais alta tecnologia de desenvolvimento de software, unindo lógica complexa e interatividade.': 'Als Programmierer und Technikbegeisterter kann ich Spiele kaum nicht mögen. Sie sind direkt mit anspruchsvoller Softwareentwicklung verbunden und vereinen komplexe Logik mit Interaktivität.',
      'Nesta página, apresento alguns jogos clássicos que desenvolvi para demonstrar experimentação prática com IA aplicada ao desenvolvimento. Como entusiasta de jogos eletrônicos, utilizo esses projetos para explorar novas fronteiras técnicas.': 'Auf dieser Seite stelle ich einige klassische Spiele vor, die ich entwickelt habe, um praktische Experimente mit KI in der Entwicklung zu zeigen. Als Videospiel-Enthusiast nutze ich diese Projekte, um neue technische Grenzen zu erkunden.',
      'Mesmo sendo uma área de diversão, cada mini jogo é uma prova de conceito: prototipação com IA LLM local, uso de plugins de desenvolvimento rápido e implementação em HTML, CSS, JavaScript e canvas.': 'Auch wenn es ein Freizeitbereich ist, ist jedes Mini-Spiel ein Proof of Concept: Prototyping mit lokaler LLM-KI, Einsatz von Rapid-Development-Plugins und Umsetzung in HTML, CSS, JavaScript und Canvas.',
      'Mini jogo em canvas desenvolvido com apoio de IA LLM local e plugins de desenvolvimento rápido, combinando lógica de jogo, interface responsiva e visual alinhado ao site.': 'Canvas-Mini-Spiel, entwickelt mit Unterstützung lokaler LLM-KI und Rapid-Development-Plugins, kombiniert Spiellogik, responsive Oberfläche und ein zum Website-Design passendes Erscheinungsbild.',
      'O clássico jogo da cobrinha reinventado com estética neon. Desenvolvido para testar movimentação em grade e renderização eficiente de partículas.': 'Das klassische Snake-Spiel, neu interpretiert mit Neon-Ästhetik, entwickelt zum Testen von Rasterbewegung und effizientem Partikel-Rendering.',
      'Jogar': 'Spielen',
      'Mini jogo 01 · IA LLM local': 'Mini-Spiel 01 · lokale LLM-KI',
      'Mini jogo 02 · IA LLM local': 'Mini-Spiel 02 · lokale LLM-KI',
      'Pontos': 'Punkte',
      'Vidas': 'Leben',
      'Nivel': 'Level',
      'Pressione iniciar': 'Start drücken',
      'Iniciar': 'Starten',
      'Pausar': 'Pausieren',
      'Reiniciar': 'Neustart',
      'Setas ou WASD': 'Pfeiltasten oder WASD',
      'Controles na tela': 'Steuerung auf dem Bildschirm',
      'Controles direcionais': 'Richtungssteuerung',
      'Mover para cima': 'Nach oben bewegen',
      'Mover para esquerda': 'Nach links bewegen',
      'Mover para direita': 'Nach rechts bewegen',
      'Mover para baixo': 'Nach unten bewegen',
      'Jogo Pac-Man em canvas': 'Pac-Man-Spiel in Canvas',
      'Jogo da Cobrinha em canvas': 'Snake-Spiel in Canvas',
      'Nivel concluido': 'Level abgeschlossen',
      'Fim de jogo': 'Spiel vorbei',
      'Fim de Jogo': 'Spiel vorbei',
      'Tente de novo': 'Noch einmal versuchen',
      'Pausado': 'Pausiert',
      'Conversar com Miriam AI': 'Mit Miriam AI chatten',
      'Miriam está dormindo': 'Miriam schläft',
      'Manter uma IA acordada consome muita energia. Por isso, a Miriam dorme quando não há ninguém conversando.': 'Eine KI wach zu halten verbraucht viel Energie. Deshalb schläft Miriam, wenn niemand mit ihr spricht.',
      'Acordar Miriam': 'Miriam wecken',
      'Miriam AI Chat': 'Miriam AI Chat'
    },
    it: {
      'Selecionar idioma': 'Scegli lingua',
      'Idioma': 'Lingua',
      'Abrir navegação': 'Apri navigazione',
      'Início': 'Home',
      'Sobre': 'Chi sono',
      'Formações': 'Formazione',
      'Formação': 'Formazione',
      'Diversão': 'Divertimento',
      'Contato': 'Contatto',
      'Sistemas · Desenvolvimento · IA · ERP': 'Sistemi · Sviluppo · IA · ERP',
      'Simplificando a Tecnologia': 'Semplificare la tecnologia',
      'Maximizando a Eficiência': 'Massimizzare l’efficienza',
      'Sobre mim': 'Su di me',
      'Olá! Meu nome é João Carlos Pereira, e se tem algo que me define, é a paixão por resolver problemas e criar soluções que realmente fazem a diferença.': 'Ciao, mi chiamo João Carlos Pereira. Se c’è qualcosa che mi definisce, è la passione per risolvere problemi e creare soluzioni che fanno davvero la differenza.',
      'Desde cedo, a curiosidade pela tecnologia me guiou, e hoje, com mais de uma década de experiência como programador Delphi sênior, me dedico a desenvolver sistemas ERP que ajudam empresas a alcançarem seus objetivos de forma eficiente e descomplicada.': 'La curiosità per la tecnologia mi accompagna da sempre. Oggi, con oltre dieci anni di esperienza come sviluppatore Delphi senior, sviluppo sistemi ERP che aiutano le aziende a raggiungere i propri obiettivi in modo efficiente e semplice.',
      'Quando não estou mergulhado em linhas de código, gosto de explorar novos conhecimentos, seja lendo sobre inteligência artificial ou aprendendo algo completamente diferente. Acredito que a tecnologia só faz sentido quando está conectada às pessoas e suas necessidades. Por isso, valorizo a simplicidade e a eficiência em tudo o que crio.': 'Quando non sono immerso nel codice, mi piace esplorare nuove conoscenze, leggendo di intelligenza artificiale o imparando qualcosa di completamente diverso. Credo che la tecnologia abbia senso solo quando è connessa alle persone e ai loro bisogni; per questo valorizzo semplicità ed efficienza in tutto ciò che creo.',
      'Sou de São Miguel do Oeste, Santa Catarina, e gosto de viver com equilíbrio entre o trabalho e os momentos de descontração. Seja aprimorando minhas habilidades ou ajudando empresas a transformarem suas operações, meu foco sempre é crescer junto com as pessoas e os projetos com os quais me envolvo.': 'Vengo da São Miguel do Oeste, Santa Catarina, e mi piace mantenere equilibrio tra lavoro e momenti di relax. Che si tratti di migliorare le mie competenze o aiutare aziende a trasformare le proprie operazioni, il mio obiettivo è sempre crescere insieme alle persone e ai progetti in cui sono coinvolto.',
      'Seja bem-vindo ao meu site! Fique à vontade para explorar meu perfil profissional e, se precisar de alguém para descomplicar a tecnologia, estou aqui para ajudar.': 'Benvenuto nel mio sito. Sentiti libero di esplorare il mio profilo professionale e, se hai bisogno di qualcuno che renda la tecnologia più semplice, sono qui per aiutarti.',
      'João Carlos Pereira | Programador sênior com foco em sistemas, ERP, inteligência artificial e soluções tecnológicas eficientes.': 'João Carlos Pereira | Sviluppatore senior focalizzato su sistemi, ERP, intelligenza artificiale e soluzioni tecnologiche efficienti.',
      'João Carlos Pereira | Programador Sênior': 'João Carlos Pereira | Sviluppatore Senior',
      'Portfólio e currículo profissional com experiência em desenvolvimento de sistemas, ERP, inteligência artificial e tecnologia.': 'Portfolio e curriculum professionale con esperienza in sviluppo di sistemi, ERP, intelligenza artificiale e tecnologia.',
      'João Carlos - Início': 'João Carlos - Home',
      'Carreira e experiência profissional de João Carlos Pereira em desenvolvimento de sistemas, ERP, arquitetura de software e tecnologia.': 'Carriera ed esperienza professionale di João Carlos Pereira nello sviluppo di sistemi, ERP, architettura software e tecnologia.',
      'João Carlos Pereira | Carreira': 'João Carlos Pereira | Carriera',
      'Conheça a trajetória profissional, habilidades e experiência de João Carlos Pereira em sistemas, ERP e tecnologia.': 'Scopri il percorso professionale, le competenze e l’esperienza di João Carlos Pereira in sistemi, ERP e tecnologia.',
      'João Carlos - Carreira': 'João Carlos - Carriera',
      'Experiências': 'Esperienze',
      '2014 - Presente': '2014 - Presente',
      'Programador de Sistemas de Informação Sênior': 'Sviluppatore Senior di Sistemi Informativi',
      'Atuação no desenvolvimento e manutenção de sistemas de informação, análise de requisitos, aplicação de boas práticas de programação e revisão de código para garantir alta qualidade nos projetos entregues.': 'Attività di sviluppo e manutenzione di sistemi informativi, analisi dei requisiti, applicazione di buone pratiche di programmazione e revisione del codice per garantire consegne di alta qualità.',
      'Responsável pela criação e edição de vídeos, com foco na produção de conteúdo visual de alta qualidade para campanhas publicitárias e eventos especiais.': 'Responsabile della creazione e del montaggio video, con focus sulla produzione di contenuti visivi di alta qualità per campagne pubblicitarie ed eventi speciali.',
      'Formação Acadêmica': 'Formazione Accademica',
      'Pós-graduação Lato Sensu': 'Specializzazione post-laurea',
      'Segurança da Informação e Defesa Cibernética': 'Sicurezza delle Informazioni e Difesa Cibernetica',
      'Curso focado em estratégias de defesa cibernética, análise de ameaças e implementação de políticas de segurança da informação.': 'Percorso focalizzato su strategie di difesa cibernetica, analisi delle minacce e implementazione di politiche di sicurezza delle informazioni.',
      'Ciência de Dados e Inteligência Artificial': 'Data Science e Intelligenza Artificiale',
      'Curso focado em desenvolvimento de soluções com Inteligência Artificial, análise de dados e aprendizado de máquina.': 'Percorso focalizzato sullo sviluppo di soluzioni con intelligenza artificiale, analisi dei dati e machine learning.',
      'Desenvolvimento Cloud Web e Mobile': 'Sviluppo Cloud, Web e Mobile',
      'Especialização em tecnologias para desenvolvimento de aplicações web e móveis, com ênfase em computação em nuvem.': 'Specializzazione in tecnologie per lo sviluppo di applicazioni web e mobili, con enfasi sul cloud computing.',
      'Curso Superior de Tecnologia': 'Laurea Tecnologica',
      'Gestão da Tecnologia da Informação': 'Gestione della Tecnologia dell’Informazione',
      'Formação voltada para gestão e administração de TI, com destaque para infraestrutura e segurança.': 'Formazione orientata alla gestione e amministrazione IT, con particolare attenzione a infrastruttura e sicurezza.',
      'Habilidades Profissionais': 'Competenze Professionali',
      'Resolução de Problemas Complexos': 'Risoluzione di Problemi Complessi',
      'Arquitetura de Software': 'Architettura Software',
      'Integração de Sistemas(APIs/ CNAB/ Bancos)': 'Integrazione di Sistemi (API / CNAB / Banche)',
      'Manutenção de Sistemas Legados': 'Manutenzione di Sistemi Legacy',
      'Otimização de Performance': 'Ottimizzazione delle Prestazioni',
      'Análise de Sistemas': 'Analisi dei Sistemi',
      'Linguagens': 'Linguaggi di programmazione',
      'Tecnologias': 'Tecnologie',
      'Inteligência Artificial': 'Intelligenza Artificiale',
      'Formações acadêmicas e especializações de João Carlos Pereira em tecnologia, segurança da informação, IA e desenvolvimento.': 'Formazione accademica e specializzazioni di João Carlos Pereira in tecnologia, sicurezza delle informazioni, IA e sviluppo.',
      'João Carlos Pereira | Formações': 'João Carlos Pereira | Formazione',
      'Veja as formações acadêmicas e especializações de João Carlos Pereira em tecnologia, IA e segurança da informação.': 'Consulta la formazione accademica e le specializzazioni di João Carlos Pereira in tecnologia, IA e sicurezza delle informazioni.',
      'João Carlos - Formações': 'João Carlos - Formazione',
      'Pós-graduação Lato Sensu na UNINTER Centro Universitário Internacional (2025). Foco em estratégias de defesa cibernética, análise de ameaças e implementação de políticas de segurança da informação.': 'Specializzazione post-laurea presso UNINTER Centro Universitário Internacional (2025), focalizzata su strategie di difesa cibernetica, analisi delle minacce e politiche di sicurezza delle informazioni.',
      'Pós-graduação Lato Sensu na UNINTER Centro Universitário Internacional (Outubro de 2024 - Abril de 2025). Foco em desenvolvimento de soluções com IA, aprendizado de máquina e análise de dados.': 'Specializzazione post-laurea presso UNINTER Centro Universitário Internacional (ottobre 2024 - aprile 2025), focalizzata su soluzioni con IA, machine learning e analisi dei dati.',
      'Pós-graduação Lato Sensu na Universidade do Oeste de Santa Catarina (2017 - 2019). Especialização em tecnologias para desenvolvimento de aplicações web e móveis com computação em nuvem.': 'Specializzazione post-laurea presso l’Università dell’Ovest di Santa Catarina (2017 - 2019), dedicata a tecnologie per applicazioni web e mobili con cloud computing.',
      'Curso Superior de Tecnologia (CST) na UCEFF (2014 - 2017). Formação voltada para gestão e administração de TI, com destaque para infraestrutura e segurança.': 'Laurea Tecnologica (CST) presso UCEFF (2014 - 2017), orientata alla gestione e amministrazione IT, con attenzione a infrastruttura e sicurezza.',
      'Vamos construir algo juntos.': 'Costruiamo qualcosa insieme.',
      'Entre em contato com João Carlos Pereira para oportunidades profissionais, projetos de tecnologia e desenvolvimento de sistemas.': 'Contatta João Carlos Pereira per opportunità professionali, progetti tecnologici e sviluppo di sistemi.',
      'João Carlos Pereira | Contato': 'João Carlos Pereira | Contatto',
      'João Carlos - Contato': 'João Carlos - Contatto',
      'Entre em contato comigo': 'Mettiti in contatto con me',
      'bastidores, rotina e projetos': 'dietro le quinte, routine e progetti',
      'perfil profissional e experiência': 'profilo professionale ed esperienza',
      'código, experimentos e repositórios': 'codice, esperimenti e repository',
      'mensagens diretas e propostas': 'messaggi diretti e proposte',
      'contato rápido para conversar': 'contatto rapido per parlare',
      'Conheça a Miriam AI, a assistente virtual de João Carlos Pereira, integrada em uma página dedicada dentro do site.': 'Conosci Miriam AI, l’assistente virtuale di João Carlos Pereira, integrata in una pagina dedicata del sito.',
      'João Carlos Pereira | Miriam AI': 'João Carlos Pereira | Miriam AI',
      'Acesse a Miriam AI em uma página dedicada, integrada ao site de João Carlos Pereira.': 'Accedi a Miriam AI in una pagina dedicata, integrata nel sito di João Carlos Pereira.',
      'João Carlos - Miriam AI': 'João Carlos - Miriam AI',
      'Abrir em nova janela': 'Apri in una nuova finestra',
      'Infelizmente a Miriam está dormindo no momento.': 'Purtroppo Miriam sta dormendo in questo momento.',
      'Talvez para salvar o planeta gastando menos energia...': 'Forse per salvare il pianeta consumando meno energia...',
      'Ou talvez esteja em manutenção...': 'O forse è in manutenzione...',
      'Ou simplesmente o João queira economizar energia elétrica...': 'O magari João vuole semplicemente risparmiare energia elettrica...',
      'Seja como for, pode chamar ele': 'In ogni caso, puoi contattarlo',
      'aqui': 'qui',
      'Área de diversão técnica com mini jogos criados por IA LLM local e plugins de desenvolvimento rápido.': 'Area di divertimento tecnico con minigiochi creati con IA LLM locale e plugin di sviluppo rapido.',
      'João Carlos Pereira | Diversão': 'João Carlos Pereira | Divertimento',
      'Catálogo de mini jogos clássicos em canvas desenvolvidos com IA LLM local e plugins de desenvolvimento rápido.': 'Catalogo di minigiochi classici in canvas sviluppati con IA LLM locale e plugin di sviluppo rapido.',
      'João Carlos - Diversão': 'João Carlos - Divertimento',
      'Paixão · Tecnologia · Inovação': 'Passione · Tecnologia · Innovazione',
      'Jogos e Tecnologia': 'Giochi e Tecnologia',
      'Como programador e apaixonado por tecnologia, eu não teria como não gostar de jogos. Eles representam uma área diretamente ligada à mais alta tecnologia de desenvolvimento de software, unindo lógica complexa e interatividade.': 'Da programmatore appassionato di tecnologia, non potevo non amare i giochi. Sono un ambito direttamente legato alla tecnologia più avanzata dello sviluppo software, unendo logica complessa e interattività.',
      'Nesta página, apresento alguns jogos clássicos que desenvolvi para demonstrar experimentação prática com IA aplicada ao desenvolvimento. Como entusiasta de jogos eletrônicos, utilizo esses projetos para explorar novas fronteiras técnicas.': 'In questa pagina presento alcuni giochi classici che ho sviluppato per mostrare sperimentazione pratica con IA applicata allo sviluppo. Da appassionato di videogiochi, uso questi progetti per esplorare nuove frontiere tecniche.',
      'Mesmo sendo uma área de diversão, cada mini jogo é uma prova de conceito: prototipação com IA LLM local, uso de plugins de desenvolvimento rápido e implementação em HTML, CSS, JavaScript e canvas.': 'Anche se è un’area di divertimento, ogni minigioco è una prova di concetto: prototipazione con IA LLM locale, uso di plugin di sviluppo rapido e implementazione in HTML, CSS, JavaScript e canvas.',
      'Mini jogo em canvas desenvolvido com apoio de IA LLM local e plugins de desenvolvimento rápido, combinando lógica de jogo, interface responsiva e visual alinhado ao site.': 'Minigioco in canvas sviluppato con il supporto di IA LLM locale e plugin di sviluppo rapido, combinando logica di gioco, interfaccia responsiva e visual coerente con il sito.',
      'O clássico jogo da cobrinha reinventado com estética neon. Desenvolvido para testar movimentação em grade e renderização eficiente de partículas.': 'Il classico gioco del serpente reinventato con estetica neon, sviluppato per testare movimento su griglia e rendering efficiente delle particelle.',
      'Jogar': 'Gioca',
      'Mini jogo 01 · IA LLM local': 'Minigioco 01 · IA LLM locale',
      'Mini jogo 02 · IA LLM local': 'Minigioco 02 · IA LLM locale',
      'Pontos': 'Punti',
      'Vidas': 'Vite',
      'Nivel': 'Livello',
      'Pressione iniciar': 'Premi avvio',
      'Iniciar': 'Avvia',
      'Pausar': 'Pausa',
      'Reiniciar': 'Riavvia',
      'Setas ou WASD': 'Frecce o WASD',
      'Controles na tela': 'Controlli su schermo',
      'Controles direcionais': 'Controlli direzionali',
      'Mover para cima': 'Muovi su',
      'Mover para esquerda': 'Muovi a sinistra',
      'Mover para direita': 'Muovi a destra',
      'Mover para baixo': 'Muovi giù',
      'Jogo Pac-Man em canvas': 'Gioco Pac-Man in canvas',
      'Jogo da Cobrinha em canvas': 'Gioco del serpente in canvas',
      'Nivel concluido': 'Livello completato',
      'Fim de jogo': 'Game over',
      'Fim de Jogo': 'Game over',
      'Tente de novo': 'Riprova',
      'Pausado': 'In pausa',
      'Conversar com Miriam AI': 'Chatta con Miriam AI',
      'Miriam está dormindo': 'Miriam sta dormendo',
      'Manter uma IA acordada consome muita energia. Por isso, a Miriam dorme quando não há ninguém conversando.': 'Tenere sveglia un’IA consuma molta energia. Per questo Miriam dorme quando non c’è nessuno con cui parlare.',
      'Acordar Miriam': 'Sveglia Miriam',
      'Miriam AI Chat': 'Chat Miriam AI'
    },
    zh: {
      'Selecionar idioma': '选择语言',
      'Idioma': '语言',
      'Abrir navegação': '打开导航',
      'Início': '首页',
      'Sobre': '关于',
      'Formações': '教育背景',
      'Formação': '教育背景',
      'Diversão': '趣味项目',
      'Contato': '联系',
      'Sistemas · Desenvolvimento · IA · ERP': '系统 · 开发 · AI · ERP',
      'Simplificando a Tecnologia': '让技术更简单',
      'Maximizando a Eficiência': '最大化效率',
      'Sobre mim': '关于我',
      'Olá! Meu nome é João Carlos Pereira, e se tem algo que me define, é a paixão por resolver problemas e criar soluções que realmente fazem a diferença.': '你好，我是 João Carlos Pereira。若要用一句话定义我，那就是我热衷于解决问题，并创造真正产生价值的解决方案。',
      'Desde cedo, a curiosidade pela tecnologia me guiou, e hoje, com mais de uma década de experiência como programador Delphi sênior, me dedico a desenvolver sistemas ERP que ajudam empresas a alcançarem seus objetivos de forma eficiente e descomplicada.': '我从很早就对技术充满好奇。如今，凭借十多年高级 Delphi 开发经验，我专注于构建 ERP 系统，帮助企业更高效、更轻松地实现目标。',
      'Quando não estou mergulhado em linhas de código, gosto de explorar novos conhecimentos, seja lendo sobre inteligência artificial ou aprendendo algo completamente diferente. Acredito que a tecnologia só faz sentido quando está conectada às pessoas e suas necessidades. Por isso, valorizo a simplicidade e a eficiência em tudo o que crio.': '不写代码的时候，我喜欢探索新知识，无论是阅读人工智能相关内容，还是学习完全不同的领域。我相信，技术只有与人和真实需求连接时才有意义。因此，我在所有作品中都重视简洁与效率。',
      'Sou de São Miguel do Oeste, Santa Catarina, e gosto de viver com equilíbrio entre o trabalho e os momentos de descontração. Seja aprimorando minhas habilidades ou ajudando empresas a transformarem suas operações, meu foco sempre é crescer junto com as pessoas e os projetos com os quais me envolvo.': '我来自圣卡塔琳娜州的 São Miguel do Oeste，也重视工作与放松之间的平衡。无论是提升自身能力，还是帮助企业优化运营，我始终希望与参与的人和项目共同成长。',
      'Seja bem-vindo ao meu site! Fique à vontade para explorar meu perfil profissional e, se precisar de alguém para descomplicar a tecnologia, estou aqui para ajudar.': '欢迎访问我的网站。你可以自由浏览我的专业资料；如果你需要有人把技术变得更清晰、更易用，我很乐意帮忙。',
      'João Carlos Pereira | Programador sênior com foco em sistemas, ERP, inteligência artificial e soluções tecnológicas eficientes.': 'João Carlos Pereira | 专注于系统、ERP、人工智能和高效技术解决方案的高级开发者。',
      'João Carlos Pereira | Programador Sênior': 'João Carlos Pereira | 高级开发者',
      'Portfólio e currículo profissional com experiência em desenvolvimento de sistemas, ERP, inteligência artificial e tecnologia.': '专业作品集与简历，涵盖系统开发、ERP、人工智能和技术经验。',
      'João Carlos - Início': 'João Carlos - 首页',
      'Carreira e experiência profissional de João Carlos Pereira em desenvolvimento de sistemas, ERP, arquitetura de software e tecnologia.': 'João Carlos Pereira 在系统开发、ERP、软件架构和技术领域的职业经历。',
      'João Carlos Pereira | Carreira': 'João Carlos Pereira | 职业经历',
      'Conheça a trajetória profissional, habilidades e experiência de João Carlos Pereira em sistemas, ERP e tecnologia.': '了解 João Carlos Pereira 在系统、ERP 和技术方面的职业历程、技能与经验。',
      'João Carlos - Carreira': 'João Carlos - 职业经历',
      'Experiências': '工作经历',
      '2014 - Presente': '2014 - 至今',
      'Programador de Sistemas de Informação Sênior': '高级信息系统开发者',
      'Atuação no desenvolvimento e manutenção de sistemas de informação, análise de requisitos, aplicação de boas práticas de programação e revisão de código para garantir alta qualidade nos projetos entregues.': '负责信息系统的开发与维护、需求分析、良好编程实践应用和代码审查，以确保项目交付质量。',
      'Responsável pela criação e edição de vídeos, com foco na produção de conteúdo visual de alta qualidade para campanhas publicitárias e eventos especiais.': '负责视频创作与剪辑，专注于为广告活动和特别活动制作高质量视觉内容。',
      'Formação Acadêmica': '学术背景',
      'Pós-graduação Lato Sensu': '研究生专业课程',
      'Segurança da Informação e Defesa Cibernética': '信息安全与网络防御',
      'Curso focado em estratégias de defesa cibernética, análise de ameaças e implementação de políticas de segurança da informação.': '课程聚焦网络防御策略、威胁分析以及信息安全政策的实施。',
      'Ciência de Dados e Inteligência Artificial': '数据科学与人工智能',
      'Curso focado em desenvolvimento de soluções com Inteligência Artificial, análise de dados e aprendizado de máquina.': '课程聚焦人工智能解决方案开发、数据分析和机器学习。',
      'Desenvolvimento Cloud Web e Mobile': '云端、Web 与移动开发',
      'Especialização em tecnologias para desenvolvimento de aplicações web e móveis, com ênfase em computação em nuvem.': '专注于 Web 与移动应用开发技术，并强调云计算。',
      'Curso Superior de Tecnologia': '技术高等教育学位',
      'Gestão da Tecnologia da Informação': '信息技术管理',
      'Formação voltada para gestão e administração de TI, com destaque para infraestrutura e segurança.': '培养方向为 IT 管理与运维，重点关注基础设施和安全。',
      'Habilidades Profissionais': '专业技能',
      'Resolução de Problemas Complexos': '复杂问题解决',
      'Arquitetura de Software': '软件架构',
      'Integração de Sistemas(APIs/ CNAB/ Bancos)': '系统集成（API / CNAB / 银行）',
      'Manutenção de Sistemas Legados': '遗留系统维护',
      'Otimização de Performance': '性能优化',
      'Análise de Sistemas': '系统分析',
      'Linguagens': '编程语言',
      'Tecnologias': '技术',
      'Inteligência Artificial': '人工智能',
      'Formações acadêmicas e especializações de João Carlos Pereira em tecnologia, segurança da informação, IA e desenvolvimento.': 'João Carlos Pereira 在技术、信息安全、AI 和开发方面的学术背景与专业课程。',
      'João Carlos Pereira | Formações': 'João Carlos Pereira | 教育背景',
      'Veja as formações acadêmicas e especializações de João Carlos Pereira em tecnologia, IA e segurança da informação.': '查看 João Carlos Pereira 在技术、AI 和信息安全方面的学术背景与专业课程。',
      'João Carlos - Formações': 'João Carlos - 教育背景',
      'Pós-graduação Lato Sensu na UNINTER Centro Universitário Internacional (2025). Foco em estratégias de defesa cibernética, análise de ameaças e implementação de políticas de segurança da informação.': 'UNINTER 国际大学中心研究生专业课程（2025），重点为网络防御策略、威胁分析和信息安全政策实施。',
      'Pós-graduação Lato Sensu na UNINTER Centro Universitário Internacional (Outubro de 2024 - Abril de 2025). Foco em desenvolvimento de soluções com IA, aprendizado de máquina e análise de dados.': 'UNINTER 国际大学中心研究生专业课程（2024 年 10 月 - 2025 年 4 月），重点为 AI 解决方案开发、机器学习和数据分析。',
      'Pós-graduação Lato Sensu na Universidade do Oeste de Santa Catarina (2017 - 2019). Especialização em tecnologias para desenvolvimento de aplicações web e móveis com computação em nuvem.': '圣卡塔琳娜西部大学研究生专业课程（2017 - 2019），专注于结合云计算的 Web 与移动应用开发技术。',
      'Curso Superior de Tecnologia (CST) na UCEFF (2014 - 2017). Formação voltada para gestão e administração de TI, com destaque para infraestrutura e segurança.': 'UCEFF 技术高等教育课程（CST，2014 - 2017），面向 IT 管理与运维，重点关注基础设施和安全。',
      'Vamos construir algo juntos.': '让我们一起构建一些有价值的东西。',
      'Entre em contato com João Carlos Pereira para oportunidades profissionais, projetos de tecnologia e desenvolvimento de sistemas.': '如有职业机会、技术项目或系统开发需求，请联系 João Carlos Pereira。',
      'João Carlos Pereira | Contato': 'João Carlos Pereira | 联系',
      'João Carlos - Contato': 'João Carlos - 联系',
      'Entre em contato comigo': '与我联系',
      'bastidores, rotina e projetos': '幕后、日常与项目',
      'perfil profissional e experiência': '职业资料与经验',
      'código, experimentos e repositórios': '代码、实验与仓库',
      'mensagens diretas e propostas': '直接消息与合作提案',
      'contato rápido para conversar': '快速联系，方便交流',
      'Conheça a Miriam AI, a assistente virtual de João Carlos Pereira, integrada em uma página dedicada dentro do site.': '了解 Miriam AI，这是 João Carlos Pereira 的虚拟助手，已集成到网站的专属页面中。',
      'João Carlos Pereira | Miriam AI': 'João Carlos Pereira | Miriam AI',
      'Acesse a Miriam AI em uma página dedicada, integrada ao site de João Carlos Pereira.': '在 João Carlos Pereira 网站的专属页面中访问 Miriam AI。',
      'João Carlos - Miriam AI': 'João Carlos - Miriam AI',
      'Abrir em nova janela': '在新窗口打开',
      'Infelizmente a Miriam está dormindo no momento.': '很遗憾，Miriam 现在正在休眠。',
      'Talvez para salvar o planeta gastando menos energia...': '也许是为了减少能耗、保护地球……',
      'Ou talvez esteja em manutenção...': '也可能正在维护……',
      'Ou simplesmente o João queira economizar energia elétrica...': '或者 João 只是想节省电力……',
      'Seja como for, pode chamar ele': '无论如何，你都可以联系他',
      'aqui': '这里',
      'Área de diversão técnica com mini jogos criados por IA LLM local e plugins de desenvolvimento rápido.': '技术趣味专区，包含使用本地 LLM AI 和快速开发插件创建的小游戏。',
      'João Carlos Pereira | Diversão': 'João Carlos Pereira | 趣味项目',
      'Catálogo de mini jogos clássicos em canvas desenvolvidos com IA LLM local e plugins de desenvolvimento rápido.': '经典 Canvas 小游戏目录，使用本地 LLM AI 和快速开发插件构建。',
      'João Carlos - Diversão': 'João Carlos - 趣味项目',
      'Paixão · Tecnologia · Inovação': '热情 · 技术 · 创新',
      'Jogos e Tecnologia': '游戏与技术',
      'Como programador e apaixonado por tecnologia, eu não teria como não gostar de jogos. Eles representam uma área diretamente ligada à mais alta tecnologia de desenvolvimento de software, unindo lógica complexa e interatividade.': '作为程序员和技术爱好者，我很自然地喜欢游戏。游戏与先进的软件开发技术紧密相关，融合了复杂逻辑和交互体验。',
      'Nesta página, apresento alguns jogos clássicos que desenvolvi para demonstrar experimentação prática com IA aplicada ao desenvolvimento. Como entusiasta de jogos eletrônicos, utilizo esses projetos para explorar novas fronteiras técnicas.': '在这个页面中，我展示了一些自己开发的经典游戏，用于演示 AI 应用于开发的实践探索。作为电子游戏爱好者，我也借这些项目探索新的技术边界。',
      'Mesmo sendo uma área de diversão, cada mini jogo é uma prova de conceito: prototipação com IA LLM local, uso de plugins de desenvolvimento rápido e implementação em HTML, CSS, JavaScript e canvas.': '虽然这是一个趣味专区，但每个小游戏都是概念验证：使用本地 LLM AI 原型设计、快速开发插件，并通过 HTML、CSS、JavaScript 和 Canvas 实现。',
      'Mini jogo em canvas desenvolvido com apoio de IA LLM local e plugins de desenvolvimento rápido, combinando lógica de jogo, interface responsiva e visual alinhado ao site.': '这款 Canvas 小游戏借助本地 LLM AI 和快速开发插件完成，结合了游戏逻辑、响应式界面以及与网站一致的视觉风格。',
      'O clássico jogo da cobrinha reinventado com estética neon. Desenvolvido para testar movimentação em grade e renderização eficiente de partículas.': '经典贪吃蛇游戏以霓虹风格重新演绎，用于测试网格移动和高效粒子渲染。',
      'Jogar': '开始玩',
      'Mini jogo 01 · IA LLM local': '小游戏 01 · 本地 LLM AI',
      'Mini jogo 02 · IA LLM local': '小游戏 02 · 本地 LLM AI',
      'Pontos': '得分',
      'Vidas': '生命',
      'Nivel': '等级',
      'Pressione iniciar': '按开始',
      'Iniciar': '开始',
      'Pausar': '暂停',
      'Reiniciar': '重新开始',
      'Setas ou WASD': '方向键或 WASD',
      'Controles na tela': '屏幕控制',
      'Controles direcionais': '方向控制',
      'Mover para cima': '向上移动',
      'Mover para esquerda': '向左移动',
      'Mover para direita': '向右移动',
      'Mover para baixo': '向下移动',
      'Jogo Pac-Man em canvas': 'Canvas 版 Pac-Man 游戏',
      'Jogo da Cobrinha em canvas': 'Canvas 版贪吃蛇游戏',
      'Nivel concluido': '关卡完成',
      'Fim de jogo': '游戏结束',
      'Fim de Jogo': '游戏结束',
      'Tente de novo': '再试一次',
      'Pausado': '已暂停',
      'Conversar com Miriam AI': '与 Miriam AI 对话',
      'Miriam está dormindo': 'Miriam 正在休眠',
      'Manter uma IA acordada consome muita energia. Por isso, a Miriam dorme quando não há ninguém conversando.': '让 AI 一直保持唤醒会消耗大量能源。因此，当没有人聊天时，Miriam 会进入休眠。',
      'Acordar Miriam': '唤醒 Miriam',
      'Miriam AI Chat': 'Miriam AI 聊天'
    }
  };

  const sourceKeys = new Set();
  const reverseTranslations = {};

  Object.keys(translations).forEach(function (language) {
    Object.keys(translations[language]).forEach(function (source) {
      sourceKeys.add(source);
      reverseTranslations[translations[language][source]] = source;
    });
  });

  let currentLanguage = readStoredLanguage();
  let applying = false;
  let queued = false;
  let observer = null;
  let titleSource = resolveSource(document.title);

  function readStoredLanguage() {
    try {
      const stored = window.localStorage.getItem(storageKey);
      if (stored && languages[stored]) {
        return stored;
      }
    } catch (error) {
      return fallbackLanguage;
    }

    return fallbackLanguage;
  }

  function writeStoredLanguage(language) {
    try {
      window.localStorage.setItem(storageKey, language);
    } catch (error) {
      return;
    }
  }

  function normalize(value) {
    return String(value || '').replace(/\s+/g, ' ').trim();
  }

  function preserveSpacing(original, translated) {
    const leading = String(original).match(/^\s*/)[0];
    const trailing = String(original).match(/\s*$/)[0];
    return leading + translated + trailing;
  }

  function resolveSource(value, fallback) {
    const normalized = normalize(value);

    if (!normalized) {
      return fallback || '';
    }

    if (sourceKeys.has(normalized)) {
      return normalized;
    }

    if (reverseTranslations[normalized]) {
      return reverseTranslations[normalized];
    }

    return fallback || normalized;
  }

  function translateSource(source) {
    if (currentLanguage === fallbackLanguage) {
      return source;
    }

    return translations[currentLanguage][source] || source;
  }

  function getTextSource(node) {
    const parentSource = node.parentElement && node.parentElement.dataset
      ? node.parentElement.dataset.messageSource
      : '';

    if (parentSource) {
      node.__siteI18nSource = resolveSource(parentSource);
      return node.__siteI18nSource;
    }

    const current = normalize(node.nodeValue);

    if (!current) {
      return '';
    }

    if (sourceKeys.has(current)) {
      node.__siteI18nSource = current;
      return current;
    }

    if (node.__siteI18nSource) {
      return node.__siteI18nSource;
    }

    node.__siteI18nSource = resolveSource(current);
    return node.__siteI18nSource;
  }

  function shouldSkipNode(node) {
    const parent = node.parentElement;

    if (!parent) {
      return true;
    }

    if (parent.closest('[data-i18n-skip]')) {
      return true;
    }

    return /^(SCRIPT|STYLE|NOSCRIPT|TEXTAREA|CODE|PRE|CANVAS|IFRAME)$/i.test(parent.tagName);
  }

  function translateTextNode(node) {
    if (shouldSkipNode(node)) {
      return;
    }

    const source = getTextSource(node);

    if (!source) {
      return;
    }

    const translated = preserveSpacing(node.nodeValue, translateSource(source));

    if (node.nodeValue !== translated) {
      node.nodeValue = translated;
    }
  }

  function getAttributeSource(element, attribute) {
    const value = element.getAttribute(attribute);
    const current = normalize(value);

    if (!current) {
      return '';
    }

    element.__siteI18nAttrs = element.__siteI18nAttrs || {};

    if (sourceKeys.has(current)) {
      element.__siteI18nAttrs[attribute] = current;
      return current;
    }

    if (element.__siteI18nAttrs[attribute]) {
      return element.__siteI18nAttrs[attribute];
    }

    element.__siteI18nAttrs[attribute] = resolveSource(current);
    return element.__siteI18nAttrs[attribute];
  }

  function translateAttribute(element, attribute) {
    if (!element.hasAttribute(attribute) || element.closest('[data-i18n-skip]')) {
      return;
    }

    if (attribute === 'content' && element.tagName !== 'META') {
      return;
    }

    const source = getAttributeSource(element, attribute);

    if (!source) {
      return;
    }

    const translated = translateSource(source);

    if (element.getAttribute(attribute) !== translated) {
      element.setAttribute(attribute, translated);
    }
  }

  function translateDocumentMetadata() {
    const language = languages[currentLanguage] || languages[fallbackLanguage];
    document.documentElement.lang = language.code;
    document.documentElement.dir = 'ltr';
    document.documentElement.dataset.siteLanguage = currentLanguage;

    if (document.title) {
      titleSource = resolveSource(document.title, titleSource);
      document.title = translateSource(titleSource);
    }

    const localeMeta = document.querySelector('meta[property="og:locale"]');

    if (localeMeta) {
      localeMeta.setAttribute('content', language.locale);
    }
  }

  function translateTree(root) {
    const filter = window.NodeFilter || { SHOW_TEXT: 4, FILTER_ACCEPT: 1, FILTER_REJECT: 2 };
    const walker = document.createTreeWalker(
      root,
      filter.SHOW_TEXT,
      {
        acceptNode: function (node) {
          return shouldSkipNode(node) ? filter.FILTER_REJECT : filter.FILTER_ACCEPT;
        }
      }
    );
    const nodes = [];
    let current = walker.nextNode();

    while (current) {
      nodes.push(current);
      current = walker.nextNode();
    }

    nodes.forEach(translateTextNode);
  }

  function translateAttributes(root) {
    const elements = [];

    if (root.nodeType === 1) {
      elements.push(root);
    }

    if (root.querySelectorAll) {
      root.querySelectorAll('[title], [aria-label], [alt], meta[content]').forEach(function (element) {
        elements.push(element);
      });
    }

    elements.forEach(function (element) {
      ['title', 'aria-label', 'alt', 'content'].forEach(function (attribute) {
        translateAttribute(element, attribute);
      });
    });
  }

  function updateSwitcher() {
    const current = languages[currentLanguage] || languages[fallbackLanguage];
    const currentLabel = document.querySelector('.language-current');

    if (currentLabel) {
      currentLabel.textContent = current.short;
    }

    document.querySelectorAll('[data-language-option]').forEach(function (button) {
      const isActive = button.dataset.languageOption === currentLanguage;
      button.classList.toggle('active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });
  }

  function applyTranslations(root) {
    const target = root || document.body;
    applying = true;
    translateDocumentMetadata();
    translateAttributes(document.head);
    translateTree(target);
    translateAttributes(target);
    updateSwitcher();
    applying = false;
  }

  function scheduleTranslations() {
    if (applying || queued) {
      return;
    }

    queued = true;
    const schedule = window.requestAnimationFrame
      ? window.requestAnimationFrame.bind(window)
      : window.setTimeout.bind(window);

    schedule(function () {
      queued = false;
      applyTranslations(document.body);
    });
  }

  function setLanguage(language) {
    if (!languages[language]) {
      return;
    }

    currentLanguage = language;
    writeStoredLanguage(language);
    applyTranslations(document.body);
  }

  function buildSwitcher() {
    const nav = document.querySelector('.navbar-nav');

    if (!nav || nav.querySelector('.language-switcher')) {
      return;
    }

    const item = document.createElement('li');
    item.className = 'nav-item language-switcher';
    item.innerHTML = [
      '<div class="dropdown">',
      '<button class="language-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" aria-label="Selecionar idioma" title="Idioma">',
      '<i class="bi bi-translate" aria-hidden="true"></i>',
      '<span class="language-current">PT</span>',
      '</button>',
      '<ul class="dropdown-menu dropdown-menu-end language-menu" data-i18n-skip>',
      Object.keys(languages).map(function (key) {
        return '<li><button class="dropdown-item language-option" type="button" data-language-option="' + key + '">' +
          '<span class="language-option-code">' + languages[key].short + '</span>' +
          '<span>' + languages[key].label + '</span>' +
          '</button></li>';
      }).join(''),
      '</ul>',
      '</div>'
    ].join('');

    nav.appendChild(item);

    item.querySelectorAll('[data-language-option]').forEach(function (button) {
      button.addEventListener('click', function () {
        setLanguage(button.dataset.languageOption);
      });
    });
  }

  function observeChanges() {
    if (!window.MutationObserver || observer) {
      return;
    }

    observer = new MutationObserver(function () {
      scheduleTranslations();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['title', 'aria-label', 'alt', 'content'],
      characterData: true,
      childList: true,
      subtree: true
    });
  }

  function init() {
    buildSwitcher();
    applyTranslations(document.body);
    observeChanges();
  }

  if (document.body) {
    init();
  } else if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.SiteI18n = {
    setLanguage: setLanguage,
    translate: function (source) {
      return translateSource(resolveSource(source));
    },
    getLanguage: function () {
      return currentLanguage;
    }
  };
})();

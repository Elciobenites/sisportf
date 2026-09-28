export const siteConfig = {
  name: "Elcio Benites",
  initials: "EB",
  brandLine: "Dados & Inteligência",
  role: "Dados • BI • Big Data • Engenharia de Dados • Desenvolvimento de Sistemas",
  quote: "Tecnologia faz mais sentido quando melhora a vida das pessoas.",
  stackPhrase: "Do dado à decisão.",
  footerPhrase: "Dados que geram valor. Soluções que transformam.",
  values: ["Dados", "Processos", "Pessoas", "Resultados"],
  headline: "Transformo grandes volumes de dados em sistemas que funcionam.",
  headlineAccent: "sistemas que funcionam",
  tagline:
    "Transformo dados e processos de negócio em sistemas, automações e soluções analíticas que apoiam decisões e melhoram processos.",
  heroText:
    "Soluções que integram dados, automação, análise e aplicações, apoiando decisões e melhorando processos.",
  seo: {
    title: "Elcio Benites | Dados, BI, Engenharia de Dados e Sistemas",
    description:
      "Portfólio profissional de Elcio Benites. Projetos de Dados, Business Intelligence, Engenharia de Dados, automação e desenvolvimento de sistemas.",
  },
  /**
   * Preencha os links reais em um único lugar.
   * Deixe vazio para ocultar o botão correspondente.
   */
  contact: {
    linkedin: "",
    github: "",
    email: "",
    cvHref: "/curriculo/Curriculo_Elcio_Benites.pdf",
  },
  navigation: [
    { label: "Início", href: "/#inicio" },
    { label: "Projetos", href: "/#projetos" },
    { label: "Tecnologias", href: "/#tecnologias" },
    { label: "Sobre", href: "/#sobre" },
    { label: "Contato", href: "/#contato" },
  ],
} as const;

export const mainStack = [
  { id: "sql-server", label: "SQL Server" },
  { id: "python", label: "Python" },
  { id: "nodejs", label: "Node.js" },
  { id: "power-bi", label: "Power BI" },
  { id: "etl", label: "ETL" },
  { id: "data-warehouse", label: "Data Warehouse" },
  { id: "big-data", label: "Big Data" },
] as const;

export const impactItems = [
  {
    id: "registros",
    value: "7 mil+",
    numericValue: 7000,
    prefix: "",
    suffix: "+",
    display: "7 mil+",
    label: "Registros de servidores em bases corporativas",
    animated: true,
  },
  {
    id: "solucoes",
    value: "Soluções reais",
    label: "Sistemas desenvolvidos para processos utilizados no dia a dia",
    animated: false,
  },
  {
    id: "integracao",
    value: "Integração",
    label: "Dados, processos, negócio e tecnologia trabalhando juntos",
    animated: false,
  },
  {
    id: "eficiencia",
    value: "Automação",
    label: "Menos tarefas manuais e melhor acesso às informações",
    animated: false,
  },
] as const;

export const about = {
  title: "Sobre mim",
  paragraphs: [
    "Minha trajetória profissional une conhecimento de negócio, sistemas, dados e tecnologia. Comecei atuando em processos de Recursos Humanos, Departamento Pessoal e sistemas corporativos e, ao longo da carreira, evoluí minha atuação para Ciência de Dados, Business Intelligence, Engenharia de Dados, automação e desenvolvimento de sistemas.",
    "Atualmente trabalho com grandes bases corporativas, SQL Server, Python, ETL, Data Warehouse, dashboards, integrações e desenvolvimento de soluções que transformam necessidades reais das áreas em ferramentas utilizadas no dia a dia.",
    "Meu diferencial está em compreender o problema de negócio, trabalhar a estrutura dos dados e transformar essa necessidade em sistemas, automações e análises que funcionam na prática.",
  ],
  evolution: [
    "RH & Processos",
    "Sistemas",
    "Dados",
    "Business Intelligence",
    "Engenharia de Dados",
    "Desenvolvimento de Sistemas",
  ],
} as const;

export const education = [
  { title: "Ciência de Dados", institution: "", status: "concluido" },
  { title: "MBA Data Driven", institution: "", status: "concluido" },
  {
    title: "MBA Inteligência Artificial e Big Data",
    institution: "",
    status: "concluido",
  },
  { title: "MBA Gestão de Pessoas", institution: "", status: "concluido" },
  {
    title: "MBA Privacidade e Proteção de Dados",
    institution: "",
    status: "concluido",
  },
  {
    title: "Pós-graduação em Engenharia de Dados",
    institution: "",
    status: "concluido",
  },
  {
    title: "Pós-graduação em Engenharia de Machine Learning",
    institution: "",
    status: "concluido",
  },
  {
    title: "AI Engineering",
    institution: "",
    status: "concluido",
  },
] as const;

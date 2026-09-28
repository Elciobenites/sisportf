export type TechnologyCategory = {
  id: string;
  title: string;
  items: string[];
  note?: string;
};

export const technologyCategories: TechnologyCategory[] = [
  {
    id: "dados",
    title: "Dados & Engenharia",
    items: [
      "SQL Server",
      "Python",
      "Pandas",
      "ETL",
      "SSIS",
      "Data Warehouse",
      "Data Marts",
      "Modelagem Dimensional",
      "Big Data",
    ],
  },
  {
    id: "bi",
    title: "BI & Analytics",
    items: [
      "Power BI",
      "Tableau",
      "QlikView",
      "SSRS",
      "Report Server",
      "KPIs",
      "People Analytics",
      "Data Analytics",
    ],
  },
  {
    id: "dev",
    title: "Desenvolvimento de Sistemas",
    items: ["Node.js", "JavaScript", "HTML", "CSS", "Streamlit", "Flask", "APIs REST"],
  },
  {
    id: "infra",
    title: "Bancos & Infraestrutura",
    items: ["SQL Server", "SQLite", "Firebird", "IIS", "Nginx", "Windows Server"],
  },
  {
    id: "avancado",
    title: "Analytics Avançado",
    items: [
      "Machine Learning",
      "Análise Preditiva",
      "Séries Temporais",
      "Inteligência Artificial",
    ],
  },
  {
    id: "produtividade",
    title: "Produtividade",
    items: [
      "IA para análise",
      "IA para prototipação",
      "IA para documentação",
      "IA para produtividade",
      "Apoio ao desenvolvimento",
    ],
  },
];

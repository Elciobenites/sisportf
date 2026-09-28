export type ProjectImage = {
  src: string;
  alt: string;
  placeholder: boolean;
  fit?: "cover" | "contain";
};

// Capas e galerias: se alguma screenshot expuser CPF, matrícula, nome, telefone,
// dados médicos, senhas, IPs ou strings de conexão, anonimizar antes da publicação.

export type ArchitectureStep = {
  label: string;
};

export type ProjectIcon =
  | "users"
  | "clipboard"
  | "heart"
  | "chart"
  | "map"
  | "headset"
  | "process"
  | "health"
  | "report"
  | "research"
  | "tv";

export type Project = {
  id: string;
  slug: string;
  nome: string;
  icone: ProjectIcon;
  resumo: string;
  desafio: string;
  solucao: string;
  participacao: string[];
  tecnologias: string[];
  arquitetura: ArchitectureStep[];
  resultados: {
    qualitativos: string[];
    quantitativos: string[];
  };
  imagens: {
    capa: ProjectImage;
    galeria: ProjectImage[];
  };
};

export const projects: Project[] = [
  {
    id: "frequencia",
    slug: "frequencia",
    nome: "Sistema de Frequência",
    icone: "clipboard",
    resumo:
      "Centralização e tratamento das informações de frequência, permitindo acompanhamento de status, filtros, movimentações e geração de relatórios para apoio aos processos de RH.",
    desafio:
      "As informações de frequência precisam ser tratadas, atualizadas e acompanhadas com clareza. Sem uma visão organizada, fica difícil filtrar registros, acompanhar status e produzir relatórios úteis para a gestão.",
    solucao:
      "Foi construída uma solução para tratar, acompanhar e gerenciar as informações de frequência, com filtros, atualização de dados, acompanhamento de status e geração de relatórios.",
    participacao: [
      "Entendimento do problema",
      "Levantamento das regras de negócio",
      "SQL",
      "ETL",
      "Desenvolvimento",
      "Validação",
    ],
    tecnologias: ["Python", "Streamlit", "SQL Server", "ETL", "Pandas"],
    arquitetura: [
      { label: "Fontes de frequência" },
      { label: "ETL / Pandas" },
      { label: "SQL Server" },
      { label: "Aplicação Streamlit" },
      { label: "Relatórios e acompanhamento" },
      { label: "Usuário" },
    ],
    resultados: {
      qualitativos: [
        "Organização do tratamento e do acompanhamento das informações de frequência.",
        "Apoio à atualização de dados, ao acompanhamento de status e à geração de relatórios.",
      ],
      quantitativos: [],
    },
    imagens: {
      capa: {
        src: "/projects/frequencia/login.jpg",
        alt: "Tela de acesso do Sistema de Frequência, sem dados pessoais",
        placeholder: false,
        fit: "cover",
      },
      galeria: [
        {
          src: "/projects/frequencia/gallery-01.png",
          alt: "Identidade visual do Sistema de Frequência",
          placeholder: false,
        },
        {
          src: "/projects/frequencia/gallery-02.png",
          alt: "Identidade do módulo de controle de frequência",
          placeholder: false,
        },
      ],
    },
  },
  {
    id: "piso-enfermagem",
    slug: "piso-enfermagem",
    nome: "Piso da Enfermagem",
    icone: "heart",
    resumo:
      "Solução para conferência, tratamento e análise das informações relacionadas ao Piso da Enfermagem, facilitando validações, identificação de inconsistências e acompanhamento de indicadores.",
    desafio:
      "A conferência das informações relacionadas ao Piso da Enfermagem exige tratamento, validações e indicadores que apoiem a análise. Sem isso, o processo fica mais sujeito a inconsistências e a retrabalho.",
    solucao:
      "Foi desenvolvida uma solução para conferir, tratar e analisar as informações do Piso da Enfermagem, com validações, indicadores e apoio à conferência dos dados.",
    participacao: [
      "Entendimento do problema",
      "Levantamento das regras de negócio",
      "SQL",
      "ETL",
      "Dashboards",
      "Validação",
    ],
    tecnologias: ["Node.js", "JavaScript", "SQL Server", "ETL", "BI"],
    arquitetura: [
      { label: "Fontes de dados" },
      { label: "ETL / Integração" },
      { label: "SQL Server" },
      { label: "Validações e indicadores" },
      { label: "Aplicação / BI" },
      { label: "Usuário" },
    ],
    resultados: {
      qualitativos: [
        "Apoio à conferência e ao tratamento das informações do Piso da Enfermagem.",
        "Uso de validações e indicadores para análise dos dados.",
      ],
      quantitativos: [],
    },
    imagens: {
      capa: {
        src: "/projects/piso-enfermagem/capa-wide.jpg",
        alt: "Tela de acesso do sistema de conferência do Piso da Enfermagem, sem dados pessoais",
        placeholder: false,
        fit: "cover",
      },
      galeria: [
        {
          src: "/projects/piso-enfermagem/gallery-01.png",
          alt: "Identidade visual do sistema de conferência do Piso da Enfermagem",
          placeholder: false,
        },
      ],
    },
  },
  {
    id: "people-analytics",
    slug: "people-analytics",
    nome: "People Analytics / BI",
    icone: "chart",
    resumo:
      "Dashboards e indicadores para transformar grandes bases de gestão de pessoas em informações gerenciais, apoiando análises e tomada de decisão.",
    desafio:
      "Informações de gestão de pessoas costumam estar em fontes distintas. Sem integração e sem indicadores claros, a análise gerencial fica limitada e o acompanhamento dos temas de pessoas perde consistência.",
    solucao:
      "Foram construídos dashboards e indicadores para análise de gestão de pessoas, integrando diferentes fontes e apoiando decisões gerenciais.",
    participacao: [
      "Entendimento do problema",
      "Levantamento das regras de negócio",
      "Modelagem de dados",
      "SQL",
      "ETL",
      "Dashboards",
    ],
    tecnologias: ["Power BI", "SQL Server", "Python", "ETL", "Data Warehouse"],
    arquitetura: [
      { label: "Fontes de dados de pessoas" },
      { label: "ETL / Integração" },
      { label: "SQL Server / Data Warehouse" },
      { label: "Modelagem analítica" },
      { label: "Power BI" },
      { label: "Gestão" },
    ],
    resultados: {
      qualitativos: [
        "Integração de diferentes fontes para análise de gestão de pessoas.",
        "Indicadores e dashboards para apoiar decisões gerenciais.",
      ],
      quantitativos: [],
    },
    imagens: {
      capa: {
        src: "/projects/people-analytics/login.jpg",
        alt: "Tela inicial de acesso da solução de dados e inteligência, sem valores ou dados pessoais",
        placeholder: false,
        fit: "cover",
      },
      galeria: [],
    },
  },
  {
    id: "geolocalizacao",
    slug: "geolocalizacao",
    nome: "Geolocalização de Unidades",
    icone: "map",
    resumo:
      "Tratamento e geocodificação de endereços, reaproveitamento de coordenadas e preparação das informações para análises espaciais e localização de unidades.",
    desafio:
      "Endereços precisam ser tratados e convertidos em coordenadas para análises espaciais. Sem geocodificação consistente e sem reaproveitamento das localizações já identificadas, a preparação desses dados fica lenta e irregular.",
    solucao:
      "Foi desenvolvida uma solução para tratar e geocodificar endereços, identificar coordenadas, reaproveitar localizações já conhecidas e preparar as informações para análises espaciais.",
    participacao: [
      "Entendimento do problema",
      "SQL",
      "ETL",
      "Integração",
      "Desenvolvimento",
      "Validação",
    ],
    tecnologias: ["Python", "SQL Server", "APIs", "Geopy", "Dados Geoespaciais"],
    arquitetura: [
      { label: "Endereços" },
      { label: "Tratamento e padronização" },
      { label: "APIs / Geopy" },
      { label: "SQL Server" },
      { label: "Camada geoespacial" },
      { label: "Análise espacial" },
    ],
    resultados: {
      qualitativos: [
        "Preparação de endereços e coordenadas para análises espaciais.",
        "Reaproveitamento de localizações já identificadas no processo de geocodificação.",
      ],
      quantitativos: [],
    },
    imagens: {
      capa: {
        src: "/projects/geolocalizacao/login.jpg",
        alt: "Tela inicial do módulo de geolocalização, sem endereços ou dados pessoais",
        placeholder: false,
        fit: "cover",
      },
      galeria: [],
    },
  },
  {
    id: "rh-conecta",
    slug: "rh-conecta",
    nome: "RH Conecta",
    icone: "headset",
    resumo:
      "Centralização do atendimento de RH em uma aplicação web, organizando solicitações e facilitando a comunicação entre usuários e áreas responsáveis.",
    desafio:
      "Solicitações de RH e a comunicação entre usuários e áreas responsáveis precisam de um ponto único. Sem isso, o atendimento fica fragmentado e o acompanhamento das demandas perde clareza.",
    solucao:
      "Foi desenvolvido um sistema web para centralizar o atendimento de RH, organizar solicitações e facilitar a comunicação entre usuários e áreas responsáveis.",
    participacao: [
      "Entendimento do problema",
      "Levantamento das regras de negócio",
      "Modelagem de dados",
      "SQL",
      "Desenvolvimento",
      "Validação",
    ],
    tecnologias: ["Node.js", "JavaScript", "SQL Server", "Web"],
    arquitetura: [
      { label: "Usuário" },
      { label: "Aplicação web" },
      { label: "API / Backend" },
      { label: "SQL Server" },
      { label: "Áreas responsáveis" },
      { label: "Acompanhamento" },
    ],
    resultados: {
      qualitativos: [
        "Centralização do atendimento de RH em um sistema web.",
        "Organização das solicitações e da comunicação entre usuários e áreas responsáveis.",
      ],
      quantitativos: [],
    },
    imagens: {
      capa: {
        src: "/projects/rh-conecta/login.jpg",
        alt: "Tela de acesso do RH Conecta, sem dados pessoais",
        placeholder: false,
        fit: "cover",
      },
      galeria: [
        {
          src: "/projects/rh-conecta/gallery-01.png",
          alt: "Composição visual do RH Conecta, sem dados pessoais",
          placeholder: false,
        },
      ],
    },
  },
  {
    id: "protocolo-rh",
    slug: "protocolo-rh",
    nome: "Protocolo RH",
    icone: "users",
    resumo:
      "Sistema para registro, acompanhamento e controle de protocolos de RH, utilizando identificação por código de barras e organização do fluxo de recebimento de documentos.",
    desafio:
      "O recebimento e o acompanhamento de protocolos de RH precisam de um fluxo organizado. Sem isso, o primeiro registro da folha e o acompanhamento das entregas ficam fragmentados.",
    solucao:
      "Foi desenvolvido um sistema web para protocolar, acompanhar e gerenciar esses registros, com regras de negócio de RH e persistência em SQL Server.",
    participacao: [
      "Entendimento do problema",
      "Levantamento das regras de negócio",
      "Modelagem de dados",
      "SQL",
      "Desenvolvimento",
      "Validação",
    ],
    tecnologias: ["Node.js", "JavaScript", "SQL Server", "Web"],
    arquitetura: [
      { label: "Unidades e documentos" },
      { label: "Regras de protocolo" },
      { label: "SQL Server" },
      { label: "API / Backend" },
      { label: "Aplicação web" },
      { label: "Usuário" },
    ],
    resultados: {
      qualitativos: [
        "Organização do registro e do acompanhamento de protocolos de RH.",
        "Apoio ao primeiro recebimento da folha de frequência em um fluxo digital.",
      ],
      quantitativos: [],
    },
    imagens: {
      capa: {
        src: "/projects/protocolo-rh/login.jpg",
        alt: "Tela de acesso do Protocolo RH, sem dados pessoais",
        placeholder: false,
        fit: "cover",
      },
      galeria: [
        {
          src: "/projects/protocolo-rh/gallery-01.png",
          alt: "Identidade visual do Protocolo RH",
          placeholder: false,
        },
      ],
    },
  },
  {
    id: "processos",
    slug: "processos",
    nome: "Controle de Processos",
    icone: "process",
    resumo:
      "Painel web para acompanhar processos, com filtros, busca, atualização das informações e exportação dos resultados.",
    desafio:
      "O acompanhamento de processos costuma ficar em planilhas e controles espalhados. Sem um painel único, filtrar, buscar e exportar o andamento fica mais lento.",
    solucao:
      "Foi construído um painel em Node.js com carga das informações para SQL Server, filtros por categoria, status e período, busca textual e exportação dos resultados.",
    participacao: [
      "Entendimento do problema",
      "SQL",
      "ETL",
      "Desenvolvimento",
      "Dashboards",
      "Validação",
    ],
    tecnologias: ["Node.js", "SQL Server", "Excel", "ETL", "JavaScript"],
    arquitetura: [
      { label: "Planilhas e fontes" },
      { label: "Carga / ETL" },
      { label: "SQL Server" },
      { label: "API / Backend" },
      { label: "Painel web" },
      { label: "Usuário" },
    ],
    resultados: {
      qualitativos: [
        "Centralização do acompanhamento de processos em um painel web.",
        "Apoio a filtros, busca e exportação sem expor dados pessoais no portfólio.",
      ],
      quantitativos: [],
    },
    imagens: {
      capa: {
        src: "/projects/processos/login.jpg",
        alt: "Tela de acesso do Controle de Processos, sem dados pessoais",
        placeholder: false,
        fit: "cover",
      },
      galeria: [
        {
          src: "/projects/processos/gallery-01.png",
          alt: "Identidade visual do Controle de Processos",
          placeholder: false,
          fit: "cover",
        },
      ],
    },
  },
  {
    id: "gersau",
    slug: "gersau",
    nome: "GERSAU",
    icone: "health",
    resumo:
      "Sistema para gestão de saúde e segurança do trabalho, reunindo módulos de acompanhamento, documentos e painel gerencial.",
    desafio:
      "As informações de saúde e segurança do trabalho precisam de um sistema próprio para organizar atendimentos, documentos e o acompanhamento das rotinas.",
    solucao:
      "Foi desenvolvido um sistema web com SQL Server, módulos de gestão e geração de documentos, mantendo o acompanhamento em um único ambiente.",
    participacao: [
      "Entendimento do problema",
      "Levantamento das regras de negócio",
      "Modelagem de dados",
      "SQL",
      "Desenvolvimento",
      "Validação",
    ],
    tecnologias: ["Node.js", "SQL Server", "JavaScript", "PDF", "Excel"],
    arquitetura: [
      { label: "Rotinas de saúde e segurança" },
      { label: "Regras de negócio" },
      { label: "SQL Server" },
      { label: "API / Backend" },
      { label: "Aplicação web" },
      { label: "Usuário" },
    ],
    resultados: {
      qualitativos: [
        "Organização das rotinas de saúde e segurança do trabalho em um sistema web.",
        "Apoio à gestão e à documentação em um único ambiente.",
      ],
      quantitativos: [],
    },
    imagens: {
      capa: {
        src: "/projects/gersau/login.jpg",
        alt: "Tela de acesso do GERSAU, sem dados pessoais",
        placeholder: false,
        fit: "cover",
      },
      galeria: [
        {
          src: "/projects/gersau/cover.png",
          alt: "Identidade visual do módulo GERSAU",
          placeholder: false,
          fit: "contain",
        },
      ],
    },
  },
  {
    id: "sisrdqa",
    slug: "sisrdqa",
    nome: "SISRDQA",
    icone: "report",
    resumo:
      "Sistema para conferência e geração do Relatório Detalhado do Quadrimestre Anterior, com validações, classificação e exportação em Excel e PDF.",
    desafio:
      "A elaboração do relatório quadrimestral exige conferência de informações, classificação e geração de documentos. Sem um sistema específico, o processo fica mais manual e sujeito a inconsistências.",
    solucao:
      "Foi desenvolvido um sistema em Python e Flask, com acesso autenticado, consulta em SQL Server, validações e geração de relatórios em Excel e PDF.",
    participacao: [
      "Entendimento do problema",
      "Levantamento das regras de negócio",
      "SQL",
      "Desenvolvimento",
      "Validação",
    ],
    tecnologias: ["Python", "Flask", "SQL Server", "Excel", "PDF"],
    arquitetura: [
      { label: "Fontes corporativas" },
      { label: "Validação e classificação" },
      { label: "SQL Server" },
      { label: "Aplicação Flask" },
      { label: "Excel / PDF" },
      { label: "Usuário" },
    ],
    resultados: {
      qualitativos: [
        "Apoio à conferência e à geração do relatório quadrimestral em um sistema próprio.",
        "Exportação organizada para Excel e PDF, sem expor dados pessoais no portfólio.",
      ],
      quantitativos: [],
    },
    imagens: {
      capa: {
        src: "/projects/sisrdqa/login.jpg",
        alt: "Tela de acesso do SISRDQA, sem dados pessoais",
        placeholder: false,
        fit: "cover",
      },
      galeria: [
        {
          src: "/projects/sisrdqa/fundo.jpg",
          alt: "Identidade visual do SISRDQA",
          placeholder: false,
          fit: "cover",
        },
      ],
    },
  },
  {
    id: "pesquisa-pcpi",
    slug: "pesquisa-pcpi",
    nome: "Pesquisa PCPI",
    icone: "research",
    resumo:
      "Sistema web de pesquisa acadêmica para aplicação de questionários, tabulação automática, indicadores, gráficos e relatórios, com área pública para participantes e área restrita para análise.",
    desafio:
      "Uma pesquisa de mestrado precisa coletar respostas de grupos distintos e produzir tabulação, indicadores e relatórios sem misturar o acesso dos participantes com a área de análise.",
    solucao:
      "Foi construído um sistema em Next.js com questionários por grupo, termo de consentimento, tabulação, gráficos, exportações e área administrativa restrita ao pesquisador.",
    participacao: [
      "Entendimento do problema",
      "Levantamento das regras de negócio",
      "Modelagem de dados",
      "Desenvolvimento",
      "Dashboards",
      "Validação",
    ],
    tecnologias: ["Next.js", "TypeScript", "PostgreSQL", "Node.js", "Web"],
    arquitetura: [
      { label: "Participantes" },
      { label: "Questionários" },
      { label: "Banco de dados" },
      { label: "Área administrativa" },
      { label: "Indicadores e exportações" },
      { label: "Pesquisador" },
    ],
    resultados: {
      qualitativos: [
        "Separação clara entre a coleta pública e a análise restrita da pesquisa.",
        "Apoio à tabulação, aos indicadores e à geração de relatórios acadêmicos.",
      ],
      quantitativos: [],
    },
    imagens: {
      capa: {
        src: "/projects/pesquisa-pcpi/login.jpg",
        alt: "Tela inicial de acesso da pesquisa acadêmica PCPI, sem dados de participantes",
        placeholder: false,
        fit: "cover",
      },
      galeria: [
        {
          src: "/projects/pesquisa-pcpi/gallery-01.jpg",
          alt: "Comunicação da pesquisa acadêmica, sem dados pessoais",
          placeholder: false,
          fit: "cover",
        },
      ],
    },
  },
  {
    id: "painel-tv",
    slug: "painel-tv",
    nome: "Painel de TV",
    icone: "tv",
    resumo:
      "Painel ao vivo para exibição em TV, com rotação de visões de folha, frequência, férias, movimentação, vínculos, piso e mapa, sem necessidade de operação contínua.",
    desafio:
      "Indicadores de gestão de pessoas precisam aparecer em um painel de TV, de forma automática e legível à distância, sem expor detalhes operacionais na tela.",
    solucao:
      "Foi desenvolvido um painel web em modo kiosk, com atualização das informações e rotação automática entre os módulos, preparado para funcionar na máquina da TV.",
    participacao: [
      "Entendimento do problema",
      "SQL",
      "ETL",
      "Desenvolvimento",
      "Dashboards",
      "Validação",
    ],
    tecnologias: ["Node.js", "JavaScript", "HTML", "CSS", "SQL Server"],
    arquitetura: [
      { label: "Bases de gestão de pessoas" },
      { label: "Sincronização" },
      { label: "Painel web" },
      { label: "Modo kiosk / TV" },
      { label: "Rotação de módulos" },
      { label: "Gestão" },
    ],
    resultados: {
      qualitativos: [
        "Exibição contínua de visões gerenciais em painel de TV.",
        "Rotação automática entre módulos, sem operação manual a cada troca.",
      ],
      quantitativos: [],
    },
    imagens: {
      capa: {
        src: "/projects/painel-tv/login.jpg",
        alt: "Tela inicial do Painel de TV Folha Intelligence, sem indicadores numéricos",
        placeholder: false,
        fit: "cover",
      },
      galeria: [],
    },
  },
  {
    id: "sind",
    slug: "sind",
    nome: "SIND",
    icone: "report",
    resumo:
      "Sistema para controle de processos de sindicância e apuração administrativa, com cadastro, prazos, comissões, consulta avançada, indicadores e exportação de relatórios.",
    desafio:
      "Processos de sindicância precisam ser registrados, acompanhados por prazo e consultados com clareza. Sem um sistema próprio, o controle das apurações, das comissões e das decisões fica fragmentado.",
    solucao:
      "Foi desenvolvido um sistema web com autenticação por perfil, cadastro e acompanhamento de processos, cálculo de prazo, gestão de comissões, consulta avançada, dashboard com indicadores e exportação em Excel e PDF.",
    participacao: [
      "Entendimento do problema",
      "Levantamento das regras de negócio",
      "Modelagem de dados",
      "SQL",
      "Desenvolvimento",
      "Validação",
    ],
    tecnologias: ["Node.js", "React", "TypeScript", "SQL Server", "APIs REST"],
    arquitetura: [
      { label: "Usuário" },
      { label: "Aplicação web" },
      { label: "API / Backend" },
      { label: "SQL Server" },
      { label: "Prazos, comissões e relatórios" },
      { label: "Gestão" },
    ],
    resultados: {
      qualitativos: [
        "Centralização do acompanhamento de processos de sindicância em um sistema web.",
        "Apoio a prazos, comissões, consulta avançada e geração de relatórios em Excel e PDF.",
      ],
      quantitativos: [],
    },
    imagens: {
      capa: {
        src: "/projects/sind/login.jpg",
        alt: "Tela de acesso do SIND, sem dados pessoais",
        placeholder: false,
        fit: "cover",
      },
      galeria: [
        {
          src: "/projects/sind/gallery-01.png",
          alt: "Identidade visual do SIND",
          placeholder: false,
        },
      ],
    },
  },
];

const featuredIds = new Set([
  "frequencia",
  "piso-enfermagem",
  "people-analytics",
  "geolocalizacao",
  "rh-conecta",
  "protocolo-rh",
]);

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => featuredIds.has(project.id));
}

export function getOtherProjects(): Project[] {
  return projects.filter((project) => !featuredIds.has(project.id));
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getProjectSlugs(): string[] {
  return projects.map((project) => project.slug);
}

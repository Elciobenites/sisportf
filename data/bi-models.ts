export type BiPeriod = "6m" | "12m";
export type BiFormat = "number" | "percent" | "days" | "hours";
export type BiCategory =
  | "Pessoas"
  | "Operação"
  | "Executivo"
  | "Qualidade"
  | "Território";
export type BiTone = "up" | "watch" | "alert";
export type BiViz = "donut" | "radar";
export type BiPreview = "bars" | "line" | "pie" | "gauges" | "heatmap" | "map";

export type BiKpi = {
  id: string;
  label: string;
  hint: string;
  format: BiFormat;
  series: number[];
  invertDelta?: boolean;
  target?: number;
};

export type BiSegment = {
  id: string;
  label: string;
  color: string;
  share: number;
  series: Record<string, number[]>;
  heatmap: number[];
};

export type BiSignal = {
  label: string;
  detail: string;
  level: "ok" | "watch" | "alert";
};

export type BiInsight = {
  title: string;
  text: string;
  tone: BiTone;
};

export type BiRadarAxis = {
  axis: string;
  value: number;
};

export type BiModel = {
  slug: string;
  nome: string;
  resumo: string;
  contexto: string;
  category: BiCategory;
  audience: string;
  accent: string;
  featured?: boolean;
  viz: BiViz;
  preview: BiPreview;
  chart3d?: boolean;
  months: string[];
  kpis: BiKpi[];
  segments: BiSegment[];
  comboBarKpi: string;
  comboLineKpi: string;
  comboBarLabel: string;
  comboLineLabel: string;
  heatmapTitle: string;
  heatmapHint: string;
  breakdownTitle: string;
  compositionTitle: string;
  tableTitle: string;
  radar?: BiRadarAxis[];
  map?: boolean;
  signals: BiSignal[];
  insights: BiInsight[];
  reading: string;
};

export const biMonths = [
  "Out",
  "Nov",
  "Dez",
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
];

function round(value: number, digits = 1): number {
  const base = 10 ** digits;
  return Math.round(value * base) / base;
}

function scale(series: number[], factor: number, digits = 1): number[] {
  return series.map((value) => round(value * factor, digits));
}

function bend(series: number[], amount: number, digits = 1): number[] {
  return series.map((value, index) => {
    const wave = 1 + Math.sin((index + 1) / 2.4) * amount;
    return round(value * wave, digits);
  });
}

const peopleHeadcount = [1186, 1194, 1201, 1210, 1216, 1224, 1231, 1238, 1244, 1251, 1258, 1266];
const peopleMoves = [38, 41, 29, 44, 36, 40, 33, 39, 31, 42, 35, 37];
const peopleAbsent = [4.8, 4.7, 5.1, 4.6, 4.5, 4.4, 4.6, 4.3, 4.2, 4.1, 4.2, 4.0];
const peopleStay = [91.2, 91.4, 91.1, 91.6, 91.8, 92.0, 92.1, 92.3, 92.4, 92.6, 92.5, 92.8];

const opsOpen = [142, 148, 139, 155, 161, 158, 164, 170, 166, 173, 169, 176];
const opsOnTime = [78, 79, 76, 80, 81, 82, 83, 84, 83, 85, 86, 87];
const opsNear = [18, 16, 21, 15, 14, 13, 12, 11, 14, 10, 9, 8];
const opsCycle = [21, 20, 22, 19, 19, 18, 18, 17, 17, 16, 16, 15];

const execCover = [71, 73, 74, 76, 78, 79, 81, 83, 84, 86, 87, 89];
const execFresh = [88, 89, 86, 90, 91, 92, 93, 94, 93, 95, 96, 97];
const execQuality = [92.1, 92.4, 91.8, 93.0, 93.2, 93.6, 93.8, 94.1, 94.0, 94.4, 94.6, 94.9];
const execMetrics = [18, 18, 19, 21, 21, 22, 24, 24, 26, 27, 28, 30];

const dqComplete = [91.2, 91.8, 92.1, 92.6, 93.0, 93.4, 93.8, 94.2, 94.6, 95.1, 95.4, 96.0];
const dqConsistent = [88.4, 88.9, 89.1, 89.7, 90.2, 90.8, 91.1, 91.6, 92.0, 92.4, 92.8, 93.2];
const dqOnTime = [84, 86, 82, 88, 89, 90, 91, 93, 92, 94, 95, 96];
const dqIncidents = [18, 16, 21, 14, 13, 12, 11, 9, 10, 8, 7, 6];

const geoUnits = [86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 98];
const geoCover = [64, 66, 67, 69, 71, 72, 74, 76, 77, 79, 80, 82];
const geoFresh = [71, 73, 72, 75, 76, 78, 80, 81, 83, 84, 86, 88];
const geoGap = [29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18];

const freqPresent = [91.4, 91.8, 90.6, 92.1, 92.4, 92.8, 93.0, 93.2, 92.7, 93.6, 93.8, 94.1];
const freqLate = [6.8, 6.4, 7.9, 6.1, 5.8, 5.5, 5.4, 5.2, 5.6, 4.9, 4.8, 4.6];
const freqOvertime = [1840, 1760, 2140, 1680, 1590, 1510, 1480, 1420, 1550, 1380, 1340, 1290];
const freqCover = [88, 89, 86, 90, 91, 92, 93, 94, 93, 95, 95, 96];

export const biModels: BiModel[] = [
  {
    slug: "gestao-de-pessoas",
    nome: "Gestão de Pessoas",
    resumo: "Efetivo, movimentação e absenteísmo no mesmo recorte, com calor por área e leitura executiva.",
    contexto:
      "Modelo ilustrativo de people analytics. Os números são fictícios e não identificam servidores, unidades reais ou bases corporativas.",
    category: "Pessoas",
    audience: "RH e liderança",
    accent: "#3ec6ff",
    viz: "donut",
    preview: "bars",
    chart3d: true,
    months: [...biMonths],
    kpis: [
      { id: "efetivo", label: "Efetivo", hint: "Posição no último mês", format: "number", series: peopleHeadcount },
      { id: "movimentacao", label: "Movimentações", hint: "Entradas e saídas no mês", format: "number", series: peopleMoves },
      {
        id: "absenteismo",
        label: "Absenteísmo",
        hint: "Média do recorte",
        format: "percent",
        invertDelta: true,
        target: 4.2,
        series: peopleAbsent,
      },
      {
        id: "estabilidade",
        label: "Estabilidade 12m",
        hint: "Pessoas sem desligamento no período",
        format: "percent",
        target: 92,
        series: peopleStay,
      },
    ],
    segments: [
      {
        id: "operacao",
        label: "Operação",
        color: "#2f6dff",
        share: 38,
        series: {
          efetivo: scale(peopleHeadcount, 0.38, 0),
          movimentacao: scale(peopleMoves, 0.4, 0),
          absenteismo: bend(scale(peopleAbsent, 1.12), 0.04),
          estabilidade: scale(peopleStay, 0.985),
        },
        heatmap: [62, 58, 74, 55, 52, 48, 57, 44, 41, 39, 43, 36],
      },
      {
        id: "assistencia",
        label: "Assistência",
        color: "#3ec6ff",
        share: 31,
        series: {
          efetivo: scale(peopleHeadcount, 0.31, 0),
          movimentacao: scale(peopleMoves, 0.3, 0),
          absenteismo: scale(peopleAbsent, 0.92),
          estabilidade: scale(peopleStay, 1.004),
        },
        heatmap: [48, 46, 61, 42, 40, 38, 41, 35, 33, 31, 34, 29],
      },
      {
        id: "gestao",
        label: "Gestão",
        color: "#7ad8ff",
        share: 17,
        series: {
          efetivo: scale(peopleHeadcount, 0.17, 0),
          movimentacao: scale(peopleMoves, 0.16, 0),
          absenteismo: scale(peopleAbsent, 0.72),
          estabilidade: scale(peopleStay, 1.02),
        },
        heatmap: [28, 26, 33, 24, 22, 21, 23, 19, 18, 17, 18, 16],
      },
      {
        id: "apoio",
        label: "Apoio",
        color: "#5b8cff",
        share: 14,
        series: {
          efetivo: scale(peopleHeadcount, 0.14, 0),
          movimentacao: scale(peopleMoves, 0.14, 0),
          absenteismo: scale(peopleAbsent, 1.04),
          estabilidade: scale(peopleStay, 0.992),
        },
        heatmap: [41, 39, 52, 37, 35, 34, 36, 31, 30, 28, 29, 26],
      },
    ],
    comboBarKpi: "efetivo",
    comboLineKpi: "absenteismo",
    comboBarLabel: "Efetivo",
    comboLineLabel: "Absenteísmo",
    heatmapTitle: "Pressão de absenteísmo",
    heatmapHint: "Intensidade relativa por recorte e mês. Quanto mais claro, maior a atenção.",
    breakdownTitle: "Efetivo por recorte",
    compositionTitle: "Composição do quadro",
    tableTitle: "Indicadores por recorte",
    signals: [
      { label: "Estabilidade", detail: "O quadro se mantém acima da referência de 92%.", level: "ok" },
      { label: "Operação", detail: "Absenteísmo ainda concentra atenção neste recorte.", level: "watch" },
      { label: "Dezembro", detail: "Pico sazonal aparece no mapa de calor e pede planejamento de cobertura.", level: "alert" },
    ],
    insights: [
      { title: "O quadro cresce sem perder estabilidade", text: "O efetivo sobe de forma contínua e a permanência 12 meses acompanha o movimento.", tone: "up" },
      { title: "O risco não está no total", text: "A média de absenteísmo recua, mas Operação segue acima dos demais recortes.", tone: "watch" },
      { title: "Sazonalidade pede cobertura", text: "O mapa de calor mostra dezembro como o mês que mais pressiona a operação.", tone: "alert" },
    ],
    reading:
      "Leitura executiva: o quadro cresce com estabilidade, o absenteísmo recua no consolidado e a atenção deve ir para Operação e para o pico de dezembro — não para o total.",
  },
  {
    slug: "operacao-e-prazos",
    nome: "Operação e Prazos",
    resumo: "Fila, SLA, ciclo e vencimento no mesmo painel, com mapa de calor da pressão operacional.",
    contexto:
      "Modelo ilustrativo de dashboard operacional. Os processos, prazos e volumes são fictícios e não representam casos reais.",
    category: "Operação",
    audience: "Operação e gestão",
    accent: "#5b8cff",
    viz: "donut",
    preview: "line",
    months: [...biMonths],
    kpis: [
      { id: "abertos", label: "Em andamento", hint: "Saldo no último mês", format: "number", series: opsOpen },
      { id: "no-prazo", label: "No prazo", hint: "Percentual do saldo", format: "percent", target: 85, series: opsOnTime },
      { id: "proximo", label: "Prazo próximo", hint: "Vence em até 5 dias", format: "number", invertDelta: true, series: opsNear },
      { id: "ciclo", label: "Ciclo médio", hint: "Dias até conclusão", format: "days", invertDelta: true, target: 16, series: opsCycle },
    ],
    segments: [
      {
        id: "analise",
        label: "Análise",
        color: "#2f6dff",
        share: 31,
        series: {
          abertos: scale(opsOpen, 0.31, 0),
          "no-prazo": scale(opsOnTime, 0.97),
          proximo: scale(opsNear, 0.38, 0),
          ciclo: scale(opsCycle, 0.8, 0),
        },
        heatmap: [44, 41, 58, 39, 36, 34, 33, 30, 38, 28, 26, 24],
      },
      {
        id: "conferencia",
        label: "Conferência",
        color: "#3ec6ff",
        share: 23,
        series: {
          abertos: scale(opsOpen, 0.23, 0),
          "no-prazo": scale(opsOnTime, 0.99),
          proximo: scale(opsNear, 0.24, 0),
          ciclo: scale(opsCycle, 0.6, 0),
        },
        heatmap: [36, 33, 47, 31, 29, 27, 26, 24, 30, 22, 21, 19],
      },
      {
        id: "documentacao",
        label: "Documentação",
        color: "#f59e0b",
        share: 19,
        series: {
          abertos: scale(opsOpen, 0.19, 0),
          "no-prazo": scale(opsOnTime, 0.94),
          proximo: scale(opsNear, 0.22, 0),
          ciclo: scale(opsCycle, 1.12, 0),
        },
        heatmap: [58, 54, 71, 49, 46, 44, 42, 39, 48, 36, 34, 32],
      },
      {
        id: "devolutiva",
        label: "Devolutiva",
        color: "#22c55e",
        share: 16,
        series: {
          abertos: scale(opsOpen, 0.16, 0),
          "no-prazo": scale(opsOnTime, 1.03),
          proximo: scale(opsNear, 0.1, 0),
          ciclo: scale(opsCycle, 0.46, 0),
        },
        heatmap: [22, 20, 28, 18, 16, 15, 14, 13, 17, 12, 11, 10],
      },
      {
        id: "encerramento",
        label: "Encerramento",
        color: "#7ad8ff",
        share: 11,
        series: {
          abertos: scale(opsOpen, 0.11, 0),
          "no-prazo": scale(opsOnTime, 1.05),
          proximo: scale(opsNear, 0.06, 0),
          ciclo: scale(opsCycle, 0.4, 0),
        },
        heatmap: [16, 15, 21, 14, 13, 12, 11, 10, 13, 9, 8, 7],
      },
    ],
    comboBarKpi: "abertos",
    comboLineKpi: "no-prazo",
    comboBarLabel: "Fila",
    comboLineLabel: "No prazo",
    heatmapTitle: "Pressão de prazo",
    heatmapHint: "Onde a fila aperta no calendário. Documentação concentra o maior risco de ciclo.",
    breakdownTitle: "Fila por tipo",
    compositionTitle: "Status de prazo",
    tableTitle: "Fila da operação",
    signals: [
      { label: "SLA", detail: "O consolidado fecha o período acima de 85% no prazo.", level: "ok" },
      { label: "Ciclo", detail: "O tempo médio caiu, mas Documentação ainda puxa a fila.", level: "watch" },
      { label: "Vencimento", detail: "Itens próximos do prazo recuaram — a fila está mais previsível.", level: "ok" },
    ],
    insights: [
      { title: "A fila cresce com mais controle", text: "O saldo sobe, mas o percentual no prazo e o ciclo melhoram no mesmo recorte.", tone: "up" },
      { title: "Documentação é o gargalo", text: "É o tipo com maior ciclo e a célula mais quente no mapa de calor.", tone: "watch" },
      { title: "Menos surpresa de prazo", text: "A faixa de vencimento próximo recua — dá para agir antes do atraso.", tone: "up" },
    ],
    reading:
      "O painel mostra volume e prazo juntos. A decisão não é “tem muita fila”; é “a fila cresce, o SLA aguenta e o gargalo está em Documentação”.",
  },
  {
    slug: "painel-executivo",
    nome: "Painel Executivo",
    resumo: "Scorecard da camada analítica: cobertura, atualização, qualidade e uso para decidir com confiança.",
    contexto:
      "Modelo ilustrativo de painel executivo. Os indicadores descrevem uma camada analítica genérica, sem dados institucionais.",
    category: "Executivo",
    audience: "Direção e gestores",
    accent: "#2f6dff",
    viz: "radar",
    preview: "gauges",
    months: [...biMonths],
    kpis: [
      { id: "cobertura", label: "Cobertura", hint: "Indicadores com fonte ativa", format: "percent", target: 90, series: execCover },
      { id: "atualizacao", label: "Atualização", hint: "Cargas no prazo", format: "percent", target: 95, series: execFresh },
      { id: "qualidade", label: "Qualidade", hint: "Registros sem pendência", format: "percent", target: 95, series: execQuality },
      { id: "indicadores", label: "Indicadores ativos", hint: "Publicados no painel", format: "number", series: execMetrics },
    ],
    segments: [
      {
        id: "pessoas",
        label: "Pessoas",
        color: "#3ec6ff",
        share: 34,
        series: {
          cobertura: scale(execCover, 1.04),
          atualizacao: scale(execFresh, 1.01),
          qualidade: scale(execQuality, 1.005),
          indicadores: scale(execMetrics, 0.3, 0),
        },
        heatmap: [70, 72, 68, 75, 77, 79, 81, 83, 82, 86, 87, 89],
      },
      {
        id: "operacao",
        label: "Operação",
        color: "#5b8cff",
        share: 27,
        series: {
          cobertura: scale(execCover, 1.01),
          atualizacao: scale(execFresh, 1.0),
          qualidade: scale(execQuality, 0.995),
          indicadores: scale(execMetrics, 0.27, 0),
        },
        heatmap: [66, 68, 64, 71, 73, 75, 78, 80, 79, 83, 84, 86],
      },
      {
        id: "qualidade",
        label: "Qualidade",
        color: "#2dd4bf",
        share: 18,
        series: {
          cobertura: scale(execCover, 0.98),
          atualizacao: scale(execFresh, 0.99),
          qualidade: scale(execQuality, 1.01),
          indicadores: scale(execMetrics, 0.2, 0),
        },
        heatmap: [74, 76, 73, 78, 80, 82, 84, 85, 86, 88, 89, 91],
      },
      {
        id: "territorio",
        label: "Território",
        color: "#818cf8",
        share: 13,
        series: {
          cobertura: scale(execCover, 0.86),
          atualizacao: scale(execFresh, 0.94),
          qualidade: scale(execQuality, 0.97),
          indicadores: scale(execMetrics, 0.13, 0),
        },
        heatmap: [48, 50, 47, 54, 56, 58, 61, 64, 66, 69, 71, 74],
      },
      {
        id: "financeiro",
        label: "Financeiro",
        color: "#22c55e",
        share: 8,
        series: {
          cobertura: scale(execCover, 0.9),
          atualizacao: scale(execFresh, 0.97),
          qualidade: scale(execQuality, 1.02),
          indicadores: scale(execMetrics, 0.1, 0),
        },
        heatmap: [58, 60, 55, 63, 65, 67, 70, 72, 71, 75, 77, 79],
      },
    ],
    comboBarKpi: "indicadores",
    comboLineKpi: "cobertura",
    comboBarLabel: "Indicadores",
    comboLineLabel: "Cobertura",
    heatmapTitle: "Maturidade da informação",
    heatmapHint: "Quanto mais claro, mais o tema está pronto para decisão. Território ainda é o recorte mais aberto.",
    breakdownTitle: "Uso por tema",
    compositionTitle: "Score da decisão",
    tableTitle: "Camada analítica",
    radar: [
      { axis: "Cobertura", value: 89 },
      { axis: "Atualização", value: 97 },
      { axis: "Qualidade", value: 95 },
      { axis: "Uso", value: 82 },
      { axis: "Confiança", value: 90 },
    ],
    signals: [
      { label: "Atualização", detail: "As cargas fecham o período com 97% no prazo.", level: "ok" },
      { label: "Cobertura", detail: "Ainda há espaço até a referência de 90% no consolidado.", level: "watch" },
      { label: "Território", detail: "É o tema com menor prontidão para decisão.", level: "alert" },
    ],
    insights: [
      { title: "A decisão já tem base", text: "Atualização e qualidade estão no patamar executivo; o gap restante é cobertura.", tone: "up" },
      { title: "Publicar mais não basta", text: "O número de indicadores sobe, mas Território ainda não acompanha o restante da camada.", tone: "watch" },
      { title: "O radar mostra o equilíbrio", text: "Confiança e qualidade sustentam o painel; cobertura e uso são os eixos a puxar.", tone: "watch" },
    ],
    reading:
      "Painel para quem precisa decidir sem abrir dez relatórios: a informação está atualizada e íntegra; o próximo passo é cobrir Território.",
  },
  {
    slug: "qualidade-de-dados",
    nome: "Qualidade de Dados",
    resumo: "Completude, consistência, pontualidade da carga e incidentes — o recorte que o analista precisa ver antes do dashboard.",
    contexto:
      "Modelo ilustrativo de qualidade de dados. Os percentuais e incidentes são fictícios e não descrevem bases, tabelas ou sistemas reais.",
    category: "Qualidade",
    audience: "Dados e engenharia",
    accent: "#2dd4bf",
    viz: "donut",
    preview: "pie",
    months: [...biMonths],
    kpis: [
      { id: "completude", label: "Completude", hint: "Campos obrigatórios preenchidos", format: "percent", target: 96, series: dqComplete },
      { id: "consistencia", label: "Consistência", hint: "Regras de negócio atendidas", format: "percent", target: 94, series: dqConsistent },
      { id: "pontualidade", label: "Pontualidade", hint: "Cargas dentro da janela", format: "percent", target: 95, series: dqOnTime },
      { id: "incidentes", label: "Incidentes", hint: "Falhas na carga no mês", format: "number", invertDelta: true, series: dqIncidents },
    ],
    segments: [
      {
        id: "cadastro",
        label: "Cadastro",
        color: "#2dd4bf",
        share: 28,
        series: {
          completude: scale(dqComplete, 0.99),
          consistencia: scale(dqConsistent, 1.01),
          pontualidade: scale(dqOnTime, 1.02),
          incidentes: scale(dqIncidents, 0.22, 0),
        },
        heatmap: [22, 20, 28, 18, 16, 15, 14, 12, 13, 11, 10, 9],
      },
      {
        id: "movimentacao",
        label: "Movimentação",
        color: "#5b8cff",
        share: 22,
        series: {
          completude: scale(dqComplete, 0.98),
          consistencia: scale(dqConsistent, 0.99),
          pontualidade: scale(dqOnTime, 0.98),
          incidentes: scale(dqIncidents, 0.2, 0),
        },
        heatmap: [30, 28, 36, 24, 22, 21, 19, 17, 18, 15, 14, 13],
      },
      {
        id: "frequencia",
        label: "Frequência",
        color: "#3ec6ff",
        share: 21,
        series: {
          completude: scale(dqComplete, 0.97),
          consistencia: scale(dqConsistent, 0.96),
          pontualidade: scale(dqOnTime, 0.94),
          incidentes: scale(dqIncidents, 0.28, 0),
        },
        heatmap: [41, 38, 52, 34, 31, 29, 27, 24, 26, 22, 20, 18],
      },
      {
        id: "documentos",
        label: "Documentos",
        color: "#818cf8",
        share: 16,
        series: {
          completude: scale(dqComplete, 0.94),
          consistencia: scale(dqConsistent, 0.95),
          pontualidade: scale(dqOnTime, 0.92),
          incidentes: scale(dqIncidents, 0.18, 0),
        },
        heatmap: [48, 45, 57, 40, 37, 35, 33, 30, 32, 28, 26, 24],
      },
      {
        id: "integracoes",
        label: "Integrações",
        color: "#f59e0b",
        share: 13,
        series: {
          completude: scale(dqComplete, 0.93),
          consistencia: scale(dqConsistent, 0.92),
          pontualidade: scale(dqOnTime, 0.88),
          incidentes: scale(dqIncidents, 0.32, 0),
        },
        heatmap: [62, 58, 74, 52, 48, 45, 42, 38, 40, 34, 31, 28],
      },
    ],
    comboBarKpi: "incidentes",
    comboLineKpi: "completude",
    comboBarLabel: "Incidentes",
    comboLineLabel: "Completude",
    heatmapTitle: "Risco de qualidade",
    heatmapHint: "Intensidade de pendência por domínio. Integrações e documentos ainda concentram o ruído.",
    breakdownTitle: "Pendências por domínio",
    compositionTitle: "Origem da atenção",
    tableTitle: "Saúde por domínio",
    signals: [
      { label: "Completude", detail: "Fecha o período na referência de 96%.", level: "ok" },
      { label: "Consistência", detail: "Sobe, mas ainda fica um ponto abaixo da meta.", level: "watch" },
      { label: "Integrações", detail: "É o domínio com mais incidentes e menor pontualidade.", level: "alert" },
    ],
    insights: [
      { title: "A base está mais confiável", text: "Completude e consistência sobem enquanto os incidentes de carga recuam.", tone: "up" },
      { title: "O gargalo mudou de lugar", text: "Cadastro já está estável; o risco visível está em Integrações.", tone: "watch" },
      { title: "Pontualidade sustenta o resto", text: "Sem carga no horário, o dashboard mente. Aqui a pontualidade chega a 96%.", tone: "up" },
    ],
    reading:
      "Antes do gráfico bonito, a pergunta é se o dado chega completo, consistente e no horário. Este painel responde isso sem expor tabelas, servidores ou regras internas.",
  },
  {
    slug: "inteligencia-territorial",
    nome: "Mapa e georreferência",
    resumo:
      "Mapa do Brasil com cobertura por UF, pontos geocodificados e vazios territoriais — o recorte espacial da decisão.",
    contexto:
      "Modelo ilustrativo de georreferência. O mapa usa as unidades da federação, mas os números, pontos e vazios são fictícios e não correspondem a endereços, unidades ou bases reais.",
    category: "Território",
    audience: "Planejamento e dados",
    accent: "#818cf8",
    featured: true,
    viz: "donut",
    preview: "map",
    map: true,
    months: [...biMonths],
    kpis: [
      { id: "unidades", label: "Unidades ativas", hint: "Pontos com cadastro válido", format: "number", series: geoUnits },
      { id: "cobertura", label: "Cobertura", hint: "Registros com coordenada confiável", format: "percent", target: 85, series: geoCover },
      { id: "atualizacao", label: "Atualização", hint: "Cadastro revisado no período", format: "percent", target: 90, series: geoFresh },
      { id: "vazios", label: "Vazios", hint: "Pontos sem coordenada útil", format: "number", invertDelta: true, series: geoGap },
    ],
    segments: [
      {
        id: "norte",
        label: "Norte",
        color: "#818cf8",
        share: 18,
        series: {
          unidades: scale(geoUnits, 0.18, 0),
          cobertura: scale(geoCover, 0.86),
          atualizacao: scale(geoFresh, 0.9),
          vazios: scale(geoGap, 0.3, 0),
        },
        heatmap: [64, 62, 60, 57, 54, 52, 49, 47, 45, 42, 40, 38],
      },
      {
        id: "nordeste",
        label: "Nordeste",
        color: "#38bdf8",
        share: 24,
        series: {
          unidades: scale(geoUnits, 0.24, 0),
          cobertura: scale(geoCover, 0.95),
          atualizacao: scale(geoFresh, 0.97),
          vazios: scale(geoGap, 0.22, 0),
        },
        heatmap: [48, 46, 45, 42, 40, 38, 36, 34, 32, 30, 28, 26],
      },
      {
        id: "centro-oeste",
        label: "Centro-Oeste",
        color: "#2dd4bf",
        share: 14,
        series: {
          unidades: scale(geoUnits, 0.14, 0),
          cobertura: scale(geoCover, 0.99),
          atualizacao: scale(geoFresh, 1.01),
          vazios: scale(geoGap, 0.16, 0),
        },
        heatmap: [36, 34, 33, 31, 29, 28, 26, 24, 23, 21, 20, 18],
      },
      {
        id: "sudeste",
        label: "Sudeste",
        color: "#2f6dff",
        share: 28,
        series: {
          unidades: scale(geoUnits, 0.28, 0),
          cobertura: scale(geoCover, 1.12),
          atualizacao: scale(geoFresh, 1.08),
          vazios: scale(geoGap, 0.14, 0),
        },
        heatmap: [22, 21, 20, 18, 17, 16, 15, 14, 13, 12, 11, 10],
      },
      {
        id: "sul",
        label: "Sul",
        color: "#22c55e",
        share: 16,
        series: {
          unidades: scale(geoUnits, 0.16, 0),
          cobertura: scale(geoCover, 1.08),
          atualizacao: scale(geoFresh, 1.06),
          vazios: scale(geoGap, 0.12, 0),
        },
        heatmap: [26, 25, 24, 22, 21, 20, 18, 17, 16, 15, 14, 12],
      },
    ],
    comboBarKpi: "unidades",
    comboLineKpi: "cobertura",
    comboBarLabel: "Unidades",
    comboLineLabel: "Cobertura",
    heatmapTitle: "Vazio territorial",
    heatmapHint: "Intensidade de pontos sem coordenada útil. Norte e Nordeste ainda concentram o gap.",
    breakdownTitle: "Unidades por região",
    compositionTitle: "Distribuição territorial",
    tableTitle: "Cobertura por região",
    signals: [
      { label: "Cobertura", detail: "Sobe 18 pontos no recorte de 12 meses.", level: "ok" },
      { label: "Norte", detail: "Ainda é a região com mais vazios relativos no mapa.", level: "watch" },
      { label: "Geocodificação", detail: "Os pontos no mapa separam coordenada útil de cadastro incompleto.", level: "ok" },
    ],
    insights: [
      { title: "O Brasil fica visível no recorte", text: "O mapa mostra onde a cobertura já sustenta decisão e onde o vazio ainda é grande.", tone: "up" },
      { title: "O gap tem UF, não só região", text: "Norte concentra a menor cobertura; o ranking aponta os estados que puxam o indicador para baixo.", tone: "watch" },
      { title: "Georreferência é o dado, não o desenho", text: "Os pontos no mapa ilustram cadastro geocodificado versus ponto sem coordenada útil — sem expor endereço real.", tone: "up" },
    ],
    reading:
      "Painel espacial para planejamento: o mapa do Brasil, a UF, a região e o ponto geocodificado entram no mesmo recorte. Os números são fictícios; o que se demonstra é a leitura.",
  },
  {
    slug: "frequencia-e-forca",
    nome: "Frequência e Força de Trabalho",
    resumo: "Presença, atraso, hora extra e cobertura de escala em um painel para antecipar folga na operação.",
    contexto:
      "Modelo ilustrativo de frequência. Os percentuais e volumes são fictícios e não identificam pessoas, escalas reais ou unidades.",
    category: "Pessoas",
    audience: "RH operacional",
    accent: "#38bdf8",
    viz: "donut",
    preview: "heatmap",
    months: [...biMonths],
    kpis: [
      { id: "presenca", label: "Presença", hint: "Comparecimento no recorte", format: "percent", target: 94, series: freqPresent },
      { id: "atraso", label: "Atraso", hint: "Registros fora do horário", format: "percent", invertDelta: true, target: 5, series: freqLate },
      { id: "extra", label: "Hora extra", hint: "Horas no mês", format: "hours", invertDelta: true, series: freqOvertime },
      { id: "cobertura", label: "Cobertura", hint: "Escalas preenchidas", format: "percent", target: 95, series: freqCover },
    ],
    segments: [
      {
        id: "plantao",
        label: "Plantão",
        color: "#38bdf8",
        share: 34,
        series: {
          presenca: scale(freqPresent, 0.985),
          atraso: scale(freqLate, 1.18),
          extra: scale(freqOvertime, 0.42, 0),
          cobertura: scale(freqCover, 0.97),
        },
        heatmap: [54, 50, 72, 46, 42, 39, 38, 36, 44, 34, 32, 30],
      },
      {
        id: "assistencia",
        label: "Assistência",
        color: "#3ec6ff",
        share: 26,
        series: {
          presenca: scale(freqPresent, 1.0),
          atraso: scale(freqLate, 0.92),
          extra: scale(freqOvertime, 0.24, 0),
          cobertura: scale(freqCover, 1.01),
        },
        heatmap: [36, 34, 48, 31, 28, 26, 25, 23, 29, 21, 20, 18],
      },
      {
        id: "administrativo",
        label: "Administrativo",
        color: "#2f6dff",
        share: 18,
        series: {
          presenca: scale(freqPresent, 1.02),
          atraso: scale(freqLate, 0.7),
          extra: scale(freqOvertime, 0.12, 0),
          cobertura: scale(freqCover, 1.03),
        },
        heatmap: [18, 16, 22, 14, 13, 12, 12, 11, 14, 10, 9, 8],
      },
      {
        id: "apoio",
        label: "Apoio",
        color: "#818cf8",
        share: 13,
        series: {
          presenca: scale(freqPresent, 0.99),
          atraso: scale(freqLate, 1.05),
          extra: scale(freqOvertime, 0.14, 0),
          cobertura: scale(freqCover, 0.99),
        },
        heatmap: [28, 26, 37, 24, 22, 21, 20, 18, 23, 17, 16, 15],
      },
      {
        id: "gestao",
        label: "Gestão",
        color: "#22c55e",
        share: 9,
        series: {
          presenca: scale(freqPresent, 1.03),
          atraso: scale(freqLate, 0.48),
          extra: scale(freqOvertime, 0.08, 0),
          cobertura: scale(freqCover, 1.04),
        },
        heatmap: [12, 11, 16, 10, 9, 8, 8, 7, 9, 6, 6, 5],
      },
    ],
    comboBarKpi: "extra",
    comboLineKpi: "presenca",
    comboBarLabel: "Hora extra",
    comboLineLabel: "Presença",
    heatmapTitle: "Tensão da escala",
    heatmapHint: "Intensidade de atraso e extra por recorte. Plantão em dezembro é o ponto de atenção.",
    breakdownTitle: "Cobertura por recorte",
    compositionTitle: "Força de trabalho",
    tableTitle: "Frequência por recorte",
    signals: [
      { label: "Presença", detail: "Fecha o período acima de 94%.", level: "ok" },
      { label: "Atraso", detail: "Recua e entra na referência de 5%.", level: "ok" },
      { label: "Plantão", detail: "Dezembro ainda concentra hora extra e tensão de escala.", level: "watch" },
    ],
    insights: [
      { title: "A operação comparece", text: "Presença e cobertura sobem no consolidado, com menos atraso no fim do recorte.", tone: "up" },
      { title: "Hora extra não é o retrato inteiro", text: "O volume cai ao longo do ano, mas o pico de dezembro no plantão continua visível.", tone: "watch" },
      { title: "Administrativo está estável", text: "O recorte administrativo puxa presença para cima e quase não pressiona a escala.", tone: "up" },
    ],
    reading:
      "Painel de força de trabalho: presença alta não esconde o ponto de tensão. O mapa de calor mostra onde a escala aperta — plantão, no fim do ano.",
  },
];

export function getBiModels(): BiModel[] {
  return biModels;
}

export function getFeaturedBiModel(): BiModel {
  return biModels.find((model) => model.featured) ?? biModels[0];
}

export function getBiModel(slug: string): BiModel | undefined {
  return biModels.find((model) => model.slug === slug);
}

export function getBiSlugs(): string[] {
  return biModels.map((model) => model.slug);
}

export function getBiCategories(): BiCategory[] {
  return [...new Set(biModels.map((model) => model.category))];
}

export function sliceByPeriod<T>(items: T[], period: BiPeriod): T[] {
  return period === "6m" ? items.slice(-6) : items;
}

export function formatBiValue(value: number, format: BiFormat): string {
  if (format === "percent") {
    return `${value.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`;
  }
  if (format === "days") {
    return `${Math.round(value)} d`;
  }
  if (format === "hours") {
    return `${Math.round(value).toLocaleString("pt-BR")} h`;
  }
  return Math.round(value).toLocaleString("pt-BR");
}

export function deltaLabel(
  series: number[],
  invert = false,
): { text: string; positive: boolean } {
  if (series.length < 2) {
    return { text: "estável", positive: true };
  }
  const current = series[series.length - 1];
  const previous = series[series.length - 2];
  const diff = current - previous;
  const improved = invert ? diff <= 0 : diff >= 0;
  const formatted =
    Math.abs(diff) >= 10
      ? Math.abs(diff).toLocaleString("pt-BR", { maximumFractionDigits: 0 })
      : Math.abs(diff).toLocaleString("pt-BR", { maximumFractionDigits: 1 });
  return {
    text: `${diff >= 0 ? "+" : "−"}${formatted}`,
    positive: improved,
  };
}

export function periodDelta(
  series: number[],
  invert = false,
): { text: string; positive: boolean } {
  if (series.length < 2) {
    return { text: "estável", positive: true };
  }
  const current = series[series.length - 1];
  const first = series[0];
  const diff = current - first;
  const improved = invert ? diff <= 0 : diff >= 0;
  const formatted =
    Math.abs(diff) >= 10
      ? Math.abs(diff).toLocaleString("pt-BR", { maximumFractionDigits: 0 })
      : Math.abs(diff).toLocaleString("pt-BR", { maximumFractionDigits: 1 });
  return {
    text: `${diff >= 0 ? "+" : "−"}${formatted} no recorte`,
    positive: improved,
  };
}

export function seriesFor(model: BiModel, kpiId: string, segmentId: string): number[] {
  if (segmentId === "all") {
    return model.kpis.find((kpi) => kpi.id === kpiId)?.series ?? [];
  }
  return (
    model.segments.find((segment) => segment.id === segmentId)?.series[kpiId] ??
    model.kpis.find((kpi) => kpi.id === kpiId)?.series ??
    []
  );
}

export function kpiById(model: BiModel, id: string): BiKpi | undefined {
  return model.kpis.find((kpi) => kpi.id === id);
}

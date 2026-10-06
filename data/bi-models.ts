export type BiPeriod = "6m" | "12m";

export type BiKpi = {
  id: string;
  label: string;
  hint: string;
  format: "number" | "percent" | "days";
  series: number[];
  invertDelta?: boolean;
};

export type BiModel = {
  slug: string;
  nome: string;
  resumo: string;
  contexto: string;
  accent: string;
  months: string[];
  kpis: BiKpi[];
  trendTitle: string;
  trendUnit: string;
  trendSeries: number[];
  breakdownTitle: string;
  breakdown: { label: string; value: number }[];
  compositionTitle: string;
  composition: { label: string; value: number; color: string }[];
  tableTitle: string;
  tableColumns: [string, string, string, string];
  tableRows: [string, string, string, string][];
  reading: string;
};

export const biModels: BiModel[] = [
  {
    slug: "gestao-de-pessoas",
    nome: "Gestão de Pessoas",
    resumo:
      "Painel gerencial de efetivo, movimentação e absenteísmo, no recorte de pessoas.",
    contexto:
      "Modelo ilustrativo de dashboard para gestão de pessoas. Os números são fictícios e não identificam servidores, unidades reais ou bases corporativas.",
    accent: "#3ec6ff",
    months: ["Out", "Nov", "Dez", "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set"],
    kpis: [
      {
        id: "efetivo",
        label: "Efetivo",
        hint: "Posição no último mês",
        format: "number",
        series: [1186, 1194, 1201, 1210, 1216, 1224, 1231, 1238, 1244, 1251, 1258, 1266],
      },
      {
        id: "movimentacao",
        label: "Movimentações",
        hint: "Entradas e saídas no mês",
        format: "number",
        series: [38, 41, 29, 44, 36, 40, 33, 39, 31, 42, 35, 37],
      },
      {
        id: "absenteismo",
        label: "Absenteísmo",
        hint: "Média do recorte",
        format: "percent",
        invertDelta: true,
        series: [4.8, 4.7, 5.1, 4.6, 4.5, 4.4, 4.6, 4.3, 4.2, 4.1, 4.2, 4.0],
      },
      {
        id: "estabilidade",
        label: "Estabilidade 12m",
        hint: "Pessoas sem desligamento no período",
        format: "percent",
        series: [91.2, 91.4, 91.1, 91.6, 91.8, 92.0, 92.1, 92.3, 92.4, 92.6, 92.5, 92.8],
      },
    ],
    trendTitle: "Evolução do efetivo",
    trendUnit: "pessoas",
    trendSeries: [1186, 1194, 1201, 1210, 1216, 1224, 1231, 1238, 1244, 1251, 1258, 1266],
    breakdownTitle: "Efetivo por região",
    breakdown: [
      { label: "Norte", value: 312 },
      { label: "Sul", value: 298 },
      { label: "Leste", value: 274 },
      { label: "Oeste", value: 221 },
      { label: "Central", value: 161 },
    ],
    compositionTitle: "Composição do quadro",
    composition: [
      { label: "Efetivo", value: 71, color: "#2f6dff" },
      { label: "Temporário", value: 18, color: "#3ec6ff" },
      { label: "Estágio", value: 7, color: "#7ad8ff" },
      { label: "Outros", value: 4, color: "#5b8cff" },
    ],
    tableTitle: "Indicadores por recorte",
    tableColumns: ["Recorte", "Efetivo", "Absenteísmo", "Movimentação"],
    tableRows: [
      ["Operação", "486", "4,6%", "14"],
      ["Assistência", "392", "3,8%", "11"],
      ["Gestão", "214", "2,9%", "6"],
      ["Apoio", "174", "4,1%", "6"],
    ],
    reading:
      "No recorte ilustrativo, o efetivo cresce de forma estável e o absenteísmo recua no segundo semestre. O painel prioriza leitura executiva: poucos indicadores, tendência e composição.",
  },
  {
    slug: "operacao-e-prazos",
    nome: "Operação e Prazos",
    resumo:
      "Acompanhamento de volume, status de prazo e distribuição da operação em um só lugar.",
    contexto:
      "Modelo ilustrativo de dashboard operacional. Os processos, prazos e volumes são fictícios e não representam casos reais.",
    accent: "#5b8cff",
    months: ["Out", "Nov", "Dez", "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set"],
    kpis: [
      {
        id: "abertos",
        label: "Em andamento",
        hint: "Saldo no último mês",
        format: "number",
        series: [142, 148, 139, 155, 161, 158, 164, 170, 166, 173, 169, 176],
      },
      {
        id: "no-prazo",
        label: "No prazo",
        hint: "Percentual do saldo",
        format: "percent",
        series: [78, 79, 76, 80, 81, 82, 83, 84, 83, 85, 86, 87],
      },
      {
        id: "proximo",
        label: "Prazo próximo",
        hint: "Vence em até 5 dias",
        format: "number",
        invertDelta: true,
        series: [18, 16, 21, 15, 14, 13, 12, 11, 14, 10, 9, 8],
      },
      {
        id: "ciclo",
        label: "Ciclo médio",
        hint: "Dias até conclusão",
        format: "days",
        invertDelta: true,
        series: [21, 20, 22, 19, 19, 18, 18, 17, 17, 16, 16, 15],
      },
    ],
    trendTitle: "Volume mensal de aberturas",
    trendUnit: "registros",
    trendSeries: [86, 91, 74, 98, 104, 97, 109, 112, 101, 118, 110, 121],
    breakdownTitle: "Fila por tipo",
    breakdown: [
      { label: "Análise", value: 54 },
      { label: "Conferência", value: 41 },
      { label: "Documentação", value: 33 },
      { label: "Devolutiva", value: 28 },
      { label: "Encerramento", value: 20 },
    ],
    compositionTitle: "Status de prazo",
    composition: [
      { label: "No prazo", value: 87, color: "#22c55e" },
      { label: "Próximo", value: 8, color: "#eab308" },
      { label: "Vencido", value: 5, color: "#f43f5e" },
    ],
    tableTitle: "Fila da operação",
    tableColumns: ["Tipo", "Saldo", "No prazo", "Ciclo"],
    tableRows: [
      ["Análise", "54", "89%", "12 d"],
      ["Conferência", "41", "86%", "9 d"],
      ["Documentação", "33", "84%", "18 d"],
      ["Devolutiva", "28", "91%", "7 d"],
      ["Encerramento", "20", "93%", "6 d"],
    ],
    reading:
      "O modelo mostra fila, prazo e ciclo no mesmo recorte. A leitura rápida fica nos cartões; o detalhe entra na tendência mensal e na composição de status.",
  },
  {
    slug: "painel-executivo",
    nome: "Painel Executivo",
    resumo:
      "Visão consolidada de cobertura, atualização e qualidade para apoiar decisão.",
    contexto:
      "Modelo ilustrativo de painel executivo. Os indicadores descrevem uma camada analítica genérica, sem dados institucionais.",
    accent: "#2f6dff",
    months: ["Out", "Nov", "Dez", "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set"],
    kpis: [
      {
        id: "cobertura",
        label: "Cobertura",
        hint: "Indicadores com fonte ativa",
        format: "percent",
        series: [71, 73, 74, 76, 78, 79, 81, 83, 84, 86, 87, 89],
      },
      {
        id: "atualizacao",
        label: "Atualização",
        hint: "Cargas no prazo",
        format: "percent",
        series: [88, 89, 86, 90, 91, 92, 93, 94, 93, 95, 96, 97],
      },
      {
        id: "qualidade",
        label: "Qualidade",
        hint: "Registros sem pendência",
        format: "percent",
        series: [92.1, 92.4, 91.8, 93.0, 93.2, 93.6, 93.8, 94.1, 94.0, 94.4, 94.6, 94.9],
      },
      {
        id: "indicadores",
        label: "Indicadores ativos",
        hint: "Publicados no painel",
        format: "number",
        series: [18, 18, 19, 21, 21, 22, 24, 24, 26, 27, 28, 30],
      },
    ],
    trendTitle: "Cobertura da camada analítica",
    trendUnit: "%",
    trendSeries: [71, 73, 74, 76, 78, 79, 81, 83, 84, 86, 87, 89],
    breakdownTitle: "Uso por tema",
    breakdown: [
      { label: "Pessoas", value: 34 },
      { label: "Operação", value: 27 },
      { label: "Qualidade", value: 18 },
      { label: "Financeiro", value: 13 },
      { label: "Território", value: 8 },
    ],
    compositionTitle: "Fontes da decisão",
    composition: [
      { label: "Data warehouse", value: 46, color: "#2f6dff" },
      { label: "Sistemas", value: 29, color: "#3ec6ff" },
      { label: "Planilhas", value: 15, color: "#7ad8ff" },
      { label: "APIs", value: 10, color: "#5b8cff" },
    ],
    tableTitle: "Camada analítica",
    tableColumns: ["Tema", "Indicadores", "Atualização", "Qualidade"],
    tableRows: [
      ["Pessoas", "9", "98%", "95%"],
      ["Operação", "8", "97%", "94%"],
      ["Qualidade", "6", "96%", "96%"],
      ["Território", "4", "94%", "93%"],
      ["Financeiro", "3", "95%", "97%"],
    ],
    reading:
      "O painel executivo resume se a informação está coberta, atualizada e utilizável. É o recorte de quem precisa decidir sem abrir dez relatórios.",
  },
];

export function getBiModels(): BiModel[] {
  return biModels;
}

export function getBiModel(slug: string): BiModel | undefined {
  return biModels.find((model) => model.slug === slug);
}

export function getBiSlugs(): string[] {
  return biModels.map((model) => model.slug);
}

export function sliceByPeriod<T>(items: T[], period: BiPeriod): T[] {
  return period === "6m" ? items.slice(-6) : items;
}

export function formatBiValue(value: number, format: BiKpi["format"]): string {
  if (format === "percent") {
    return `${value.toLocaleString("pt-BR", { maximumFractionDigits: 1 })}%`;
  }
  if (format === "days") {
    return `${Math.round(value)} d`;
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

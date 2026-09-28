# Portfólio — Elcio Benites

Portfólio profissional de projetos em Dados, Business Intelligence, Engenharia de Dados, automação e desenvolvimento de sistemas.

O site é estático no conteúdo (sem banco de dados). Os textos e projetos ficam em arquivos TypeScript na pasta `data`.

## Como instalar

```bash
npm install
```

## Como executar

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Como gerar a versão de produção

```bash
npm run build
npm start
```

## Como alterar textos

Edite os arquivos da pasta `data`:

- `data/site.ts` — nome, título, frases da home, links de contato, formação e indicadores
- `data/projects.ts` — todos os projetos
- `data/technologies.ts` — categorias e competências

Não é necessário alterar os componentes da interface para mudar textos.

## Como cadastrar um novo projeto

1. Abra `data/projects.ts`.
2. Adicione um novo objeto ao array `projects`, no mesmo formato dos existentes.
3. Crie a pasta das imagens:

```text
public/projects/nome-do-projeto/
```

4. Coloque pelo menos:

```text
public/projects/nome-do-projeto/cover.png
```

A página `/projetos/nome-do-projeto` é gerada automaticamente a partir do `slug`.

Campos principais:

- `id`, `slug`, `nome`, `resumo`
- `desafio`, `solucao`, `participacao`
- `tecnologias`, `arquitetura`, `resultados`
- `imagens.capa` e `imagens.galeria`

## Como trocar screenshots

Substitua os arquivos em:

```text
public/projects/[slug]/
```

Exemplos:

```text
public/projects/frequencia/cover.png
public/projects/frequencia/gallery-01.png
```

As imagens atuais são provisórias, extraídas da referência visual. Troque-as por screenshots reais e anonimizados.

A composição do hero fica em:

```text
public/images/hero-dashboard.png
```

## Como trocar o currículo

Coloque o PDF em:

```text
public/curriculo/Curriculo_Elcio_Benites.pdf
```

## Como configurar contato

Em `data/site.ts`, preencha:

```ts
contact: {
  linkedin: "https://www.linkedin.com/in/seu-perfil",
  github: "https://github.com/seu-usuario",
  email: "seu.email@dominio.com",
  cvHref: "/curriculo/Curriculo_Elcio_Benites.pdf",
}
```

Telefone não é exibido por padrão.

## Como publicar

Não há banco de dados. A variável `NEXT_PUBLIC_SITE_URL` é opcional no local e deve apontar para a URL pública no ar (sitemap e Open Graph).

### GitHub + Render

1. Envie esta pasta (`sisportf`) para um repositório no GitHub.
2. No [Render](https://dashboard.render.com), conecte a conta GitHub e crie um **Web Service**.
3. Use:

   - **Runtime:** Node
   - **Build Command:** `npm ci && npm run build`
   - **Start Command:** `npm start`
   - **Node:** 22 (`NODE_VERSION=22`)

4. Depois do primeiro deploy, defina `NEXT_PUBLIC_SITE_URL` com a URL do Render (ex.: `https://sisportf.onrender.com`) e faça um novo deploy.

O arquivo `render.yaml` descreve esse serviço. No plano gratuito o site pode dormir após inatividade e demorar alguns segundos para acordar.

### Vercel (alternativa)

1. Importe o repositório em [vercel.com](https://vercel.com).
2. Framework: Next.js.
3. Defina `NEXT_PUBLIC_SITE_URL` com a URL pública.

## Estrutura

```text
app/                 páginas e SEO
components/          componentes reutilizáveis
data/                conteúdo editável
lib/                 utilitários
public/images        imagens gerais
public/projects      screenshots dos projetos
public/curriculo     PDF do currículo
```

## Segurança

Não coloque no código senhas, strings de conexão, IPs internos, tokens, chaves de API, dados pessoais, dados de pacientes ou informações internas. As imagens de exemplo devem permanecer fictícias ou anonimizadas.

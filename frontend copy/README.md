# Desafio - Frontend

Aplicacao frontend em React com Vite e TypeScript. Inclui UI com Tailwind CSS, testes com Vitest e configuracao de lint.

## Tecnologias

- React 19 e React DOM
- TypeScript 6
- Vite 8 (dev server e build)
- React Router 7
- Tailwind CSS 4 (via plugin do Vite)
- Base UI, shadcn, Lucide
- Vitest + Testing Library + JSDOM
- ESLint

## Requisitos

- Node.js (recomendado LTS)
- npm
- Docker + Docker Compose (para executar via compose.yml)

## Como executar (local)

Instale as dependencias:

```bash
npm install
```

Rode o servidor de desenvolvimento:

```bash
npm run dev
```

Build de producao:

```bash
npm run build
```

Preview do build:

```bash
npm run preview
```

Testes:

```bash
npm run test
```

Testes (modo CI):

```bash
npm run test:run
```

Lint:

```bash
npm run lint
```

## Como executar com Docker Compose

O arquivo compose.yml define tres servicos: app, db (Postgres) e localstack (S3). A aplicacao usa as variaveis:

- DATABASE_URL=postgresql://bootcamp:bootcamp@postgres:5432/bootcamp
- S3_ENDPOINT=http://localstack:4566

Suba os servicos:

```bash
docker compose up -d
```

A aplicacao fica disponivel em:

- http://localhost:3000

Parar os servicos:

```bash
docker compose down
```

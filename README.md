# portfolio

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Compile and Minify for Production

```sh
pnpm build
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```

## AI Agent (`/ai`)

A chat agent with LLM tool use and generative UI (Groq free tier or Claude).

- **Setup:** copy `.env.example` to `.env.local` and set `GROQ_API_KEY` (free tier, no card) or `ANTHROPIC_API_KEY`. In production, set the same variable in the Vercel project settings.
- **Architecture:**
  - `api/chat.js` + `server/ai/`: stateless serverless gateway (validation, rate limits, SSE streaming, pluggable model providers).
  - `shared/ai/toolDefinitions.js`: tool contract shared by the server and the client.
  - `src/features/ai-agent/`: agent loop, tools over `src/data`, providers (Claude + offline fallback), and widgets.
- **Without an API key** the agent switches to a local engine automatically, so the page always works.

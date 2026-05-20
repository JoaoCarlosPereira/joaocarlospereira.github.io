# Proxy OAuth (Cloudflare Worker)

Proxy OAuth do GitHub para [Sveltia CMS](https://sveltiacms.app/) no site `joaocarlospereira.github.io`.  
Implementa login exclusivo do proprietário (`ALLOWED_GITHUB_USER`) sem armazenar segredos no repositório Git.

## Endpoints

| Método | Caminho | Propósito |
|--------|---------|-----------|
| `GET` | `/login` | Redireciona para OAuth do GitHub (conveniência) |
| `GET` | `/auth/github` | Inicia OAuth (usado quando `auth_endpoint: auth/github` em `config.yaml`) |
| `GET` | `/auth` | Igual ao anterior (`?provider=github&site_id=…`) |
| `GET` | `/callback` | Callback do OAuth (registre esta URL no GitHub OAuth App) |
| `GET` | `/health` | Checagem de saúde |

## Pré-requisitos

- Conta [Cloudflare](https://dash.cloudflare.com/) (plano gratuito do Workers)
- [Node.js](https://nodejs.org/) 18+ (para Wrangler)
- Conta GitHub: **JoaoCarlosPereira**
- Repositório: `JoaoCarlosPereira/joaocarlospereira.github.io`

## 1. GitHub OAuth App

1. Abra [GitHub → Configurações → Developer settings → OAuth Apps → Novo](https://github.com/settings/applications/new).
2. Preencha:
   - **Application name:** `Sveltia CMS — joaocarlospereira.github.io` (ou qualquer rótulo)
   - **Homepage URL:** `https://joaocarlospereira.github.io`
   - **Authorization callback URL:** `https://SEU_WORKER.workers.dev/callback`  
     Substitua `SEU_WORKER` pelo subdomínio do seu Worker após o deploy (passo 3).
3. Crie o app e clique em **Generate a new client secret**.
4. Copie **Client ID** e **Client secret** (aparecem apenas uma vez).

## 2. Fine-grained PAT (opcional, recomendado para gravação)

Para gravações confiáveis no repositório, crie um [fine-grained personal access token](https://github.com/settings/tokens?type=beta):

- Acesso ao repositório: **Somente** `joaocarlospereira.github.io`
- Permissões: **Contents** → Leitura e gravação

Armazene como segredo do Worker `GITHUB_PAT` (não usado pelo script atual de apenas OAuth; reservado para um proxy futuro ou ferramentas personalizadas).

## 3. Deploy do Worker

```bash
cd workers/oauth-proxy
npm install
npx wrangler login
npx wrangler deploy
```

Anote a URL implantada, por exemplo `https://joaocarlospereira-oauth-proxy.<account>.workers.dev`.

### Segredos e variáveis

Configure no [painel Cloudflare](https://dash.cloudflare.com/) → Workers → seu worker → **Configurações** → **Variáveis**, ou via CLI:

```bash
# Obrigatório
npx wrangler secret put GITHUB_CLIENT_SECRET

# Client ID: como variável normal no painel ou:
npx wrangler secret put GITHUB_CLIENT_ID

# Opcional
npx wrangler secret put SESSION_SECRET
npx wrangler secret put GITHUB_PAT
```

| Nome | Tipo | Descrição |
|------|------|-----------|
| `GITHUB_CLIENT_ID` | Variável ou segredo | OAuth App Client ID |
| `GITHUB_CLIENT_SECRET` | Segredo | OAuth App Client secret |
| `ALLOWED_GITHUB_USER` | Variável | Padrão `JoaoCarlosPereira` em `wrangler.toml` |
| `ALLOWED_DOMAINS` | Variável | Opcional; hostnames separados por vírgula |
| `SESSION_SECRET` | Segredo | Opcional; define cookie `cms-session` de curta duração ao sucesso |
| `GITHUB_PAT` | Segredo | PAT opcional para proxy futuro do Git API no lado do servidor |

Após o deploy, atualize a **URL de callback** do GitHub OAuth App se a URL do Worker mudar.

## 4. Atualizar configuração do site

Na raiz do repositório, edite `config.yaml`:

```yaml
backend:
  base_url: https://SEU_WORKER.workers.dev   # ← substitua o placeholder
```

Faça commit e push. O GitHub Pages servirá `/admin/` e `/config.yaml`.

## 5. Verificar

1. Abra `https://joaocarlospereira.github.io/admin/`
2. Faça login com o GitHub como **JoaoCarlosPereira**
3. Crie ou edite um post em **Artigos do Blog** — o arquivo deve aparecer em `content/blog/`
4. Usuário GitHub diferente → **Acesso negado** (403)

## Fallback manual via Git

Se o Worker estiver fora do ar ou o OAuth falhar, edite os artigos diretamente no repositório:

1. Clone `https://github.com/JoaoCarlosPereira/joaocarlospereira.github.io`
2. Adicione ou edite `content/blog/<slug>.md` com YAML frontmatter (`status: draft` ou `published`)
3. Faça commit e push para `main`
4. Aguarde o GitHub Pages reimplantar

Exemplo de frontmatter:

```yaml
---
title: "Meu artigo"
slug: meu-artigo
date: 2026-05-20
status: draft
language: pt
tags: []
---
```

## Notas de segurança

- Nunca faça commit de `GITHUB_CLIENT_SECRET`, PATs ou segredos de sessão.
- O Worker retorna erros genéricos ao navegador; tokens não são logados.
- Apenas `ALLOWED_GITHUB_USER` pode concluir o OAuth com sucesso.

## Desenvolvimento local

```bash
npx wrangler dev
```

Use `http://localhost:8787` como `base_url` em uma configuração CMS local apenas para testes; registre `http://localhost:8787/callback` em um OAuth App separado para dev local.

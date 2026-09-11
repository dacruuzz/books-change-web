# books-change-web

Front-end da **bookschange**, uma plataforma de troca de livros usados que conecta pessoas e lojas (livrarias, sebos). Este repositório consome a API REST (`books-change-api`, Spring Boot / arquitetura hexagonal) e implementa toda a experiência de descoberta, troca e perfil do usuário.

## Stack

- **Angular 22**
- **TypeScript**
- **Sass (SCSS)** como sistema de estilos
- **Angular Material** para construção de componentes
- **Vitest + jsdom** para testes unitários (não usa Karma/Chrome)
- **npm** como gerenciador de pacotes

Sem SSR/SSG habilitado por enquanto — pode ser adicionado depois com `ng add @angular/ssr` sem necessidade de reescrever a aplicação.

## Requisitos

| Ferramenta | Versão                                    |
| ---------- | ------------------------------------------ |
| Node.js    | `^20.19 \|\| ^22.12 \|\| ^24` (exigido pelo Angular CLI 22) |
| npm        | `11.17.0` (ver `packageManager` no `package.json`) |

## Instalação

```bash
npm ci
```

Usar `npm ci` (não `npm install`) para respeitar exatamente o `package-lock.json` — é o mesmo comando usado no pipeline de CI.

## Comandos disponíveis

| Comando         | Descrição                                              |
| --------------- | -------------------------------------------------------- |
| `npm start`      | Sobe o servidor de desenvolvimento (`ng serve`)          |
| `npm run build`  | Build de produção                                        |
| `npm run watch`  | Build em modo desenvolvimento, com watch                 |
| `npm test`       | Roda os testes unitários (Vitest + jsdom)                |

## Estilização e design system

O projeto usa **Angular Material para construir os componentes**, mas de forma desacoplada, para permitir trocar o design system no futuro com esforço contido:

- Apenas componentes dentro de `shared/ui/` importam `@angular/material/*`. São wrappers com API própria (`book-button`, `book-card`, `book-chip`, ...) que não expõem tipos do Material.
- Features e telas consomem **apenas** `shared/ui/` — nunca Angular Material diretamente.
- Os tokens de design (cores, tipografia, espaçamento, raio de borda) vivem como **CSS custom properties**, agnósticas de framework. O tema do Angular Material consome esses tokens; nunca o inverso.

```
src/app/
  shared/
    ui/              # única camada que conhece @angular/material
    design-tokens/   # CSS custom properties, 100% agnóstico
  features/
    discovery/
    exchange/
    profile/
```

## CI

O pipeline (`.github/workflows/build-and-test.yml`) roda `npm ci`, `npm run build` e `npm test` em pull requests e pushes para `master`/`develop`. Branch protection configurada via GitHub UI (migração para Terraform prevista, seguindo o mesmo padrão adotado no back-end).

## Domínio

O front-end cobre as principais entidades do domínio bookschange: **Usuários**, **Livros**, **Lojas**, **Endereços** e **Categorias**, consumindo os endpoints versionados sob `/api/v1/...` da API.
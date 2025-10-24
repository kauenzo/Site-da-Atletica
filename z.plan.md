# Plano: Sistema de Gestão de Links com Banco de Dados

## 1. Arquitetura de Alto Nível

```
┌─────────────────────────────────────────────────────────────┐
│                    CAMADA DE APRESENTAÇÃO                    │
├─────────────────────────────────────────────────────────────┤
│  /links (público)           │  /admin/* (protegido)          │
│  - Lista links ativos       │  - /admin/links                │
│  - Tracking de cliques      │  - /admin/users                │
│                             │  - /admin/analytics            │
├─────────────────────────────────────────────────────────────┤
│                    CAMADA DE ROTEAMENTO                      │
├─────────────────────────────────────────────────────────────┤
│  /l/[slug] (redirect)       │  /login (auth)                 │
│  - Registra clique          │  - NextAuth.js                 │
│  - Redireciona              │  - Middleware proteção         │
├─────────────────────────────────────────────────────────────┤
│                    CAMADA DE LÓGICA                          │
├─────────────────────────────────────────────────────────────┤
│  Server Actions             │  Services                      │
│  - createLink()             │  - LinkService                 │
│  - updateLink()             │  - UserService                 │
│  - deleteLink()             │  - AnalyticsService            │
│  - createUser()             │  - AuthService                 │
├─────────────────────────────────────────────────────────────┤
│                    CAMADA DE DADOS                           │
├─────────────────────────────────────────────────────────────┤
│  Prisma ORM                 │  PostgreSQL (Docker)           │
│  - Schema definitions       │  - Users table                 │
│  - Type-safe queries        │  - Links table                 │
│  - Migrations               │  - LinkClicks table            │
└─────────────────────────────────────────────────────────────┘
```

## 2. Configuração do Banco de Dados

### 2.1 Docker Compose

Criar `docker-compose.yml` na raiz:

```yaml
version: '3.8'
services:
  postgres:
    image: postgres:16-alpine
    container_name: atletica_db
    environment:
      POSTGRES_USER: atletica
      POSTGRES_PASSWORD: atletica_dev_2025
      POSTGRES_DB: atletica_links
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### 2.2 Variáveis de Ambiente

Criar `.env` e `.env.example`:

```env
DATABASE_URL="postgresql://atletica:atletica_dev_2025@localhost:5432/atletica_links"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="[gerar secret seguro]"
```

### 2.3 Prisma Setup

Instalar dependências:

```bash
pnpm add @prisma/client @auth/prisma-adapter
pnpm add -D prisma
```

Schema Prisma (`prisma/schema.prisma`):

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  username      String    @unique
  password      String
  cpf           String    @unique
  phone         String
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  isActive      Boolean   @default(true)
  
  // Relações
  createdLinks  Link[]    @relation("CreatedLinks")
  updatedLinks  Link[]    @relation("UpdatedLinks")
  
  // NextAuth
  accounts      Account[]
  sessions      Session[]
}

model Link {
  id            String      @id @default(cuid())
  label         String
  url           String
  slug          String      @unique
  isActive      Boolean     @default(true)
  clickCount    Int         @default(0)
  createdAt     DateTime    @default(now())
  updatedAt     DateTime    @updatedAt
  
  // Relações
  createdById   String
  createdBy     User        @relation("CreatedLinks", fields: [createdById], references: [id])
  updatedById   String?
  updatedBy     User?       @relation("UpdatedLinks", fields: [updatedById], references: [id])
  
  clicks        LinkClick[]
  
  @@index([slug])
  @@index([isActive])
}

model LinkClick {
  id          String   @id @default(cuid())
  linkId      String
  link        Link     @relation(fields: [linkId], references: [id], onDelete: Cascade)
  clickedAt   DateTime @default(now())
  userAgent   String?
  referer     String?
  ipAddress   String?
  
  @@index([linkId])
  @@index([clickedAt])
}

// NextAuth Models
model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}
```

## 3. Estrutura de Diretórios

```
app/
├── (auth)/
│   └── login/
│       ├── page.tsx              # Página de login
│       ├── actions.ts            # Server action de autenticação
│       └── components/
│           └── LoginForm.tsx     # Formulário de login
├── (routes)/
│   ├── links/                    # PÚBLICO - mantém atual
│   │   └── page.tsx
│   └── l/
│       └── [slug]/
│           └── route.ts          # Redirect handler + tracking
├── admin/                        # PROTEGIDO - novas rotas
│   ├── layout.tsx                # Layout com navegação admin
│   ├── links/
│   │   ├── page.tsx              # Lista de links
│   │   ├── new/
│   │   │   └── page.tsx          # Criar link
│   │   ├── [id]/
│   │   │   ├── page.tsx          # Ver/Editar link
│   │   │   └── analytics/
│   │   │       └── page.tsx      # Analytics do link
│   │   ├── actions.ts            # Server actions (CRUD)
│   │   ├── services.ts           # LinkService
│   │   └── components/
│   │       ├── LinkList.tsx
│   │       ├── LinkForm.tsx
│   │       └── LinkFilters.tsx
│   ├── users/
│   │   ├── page.tsx              # Lista de usuários
│   │   ├── new/
│   │   │   └── page.tsx          # Criar usuário
│   │   ├── [id]/
│   │   │   └── page.tsx          # Ver/Editar usuário
│   │   ├── actions.ts            # Server actions (CRUD)
│   │   ├── services.ts           # UserService
│   │   └── components/
│   │       ├── UserList.tsx
│   │       └── UserForm.tsx
│   └── analytics/
│       ├── page.tsx              # Dashboard geral
│       └── services.ts           # AnalyticsService
├── api/
│   └── auth/
│       └── [...nextauth]/
│           └── route.ts          # NextAuth config
├── middleware.ts                 # Proteção de rotas
└── layout.tsx

lib/
├── prisma.ts                     # Prisma client singleton
├── auth.ts                       # NextAuth config
├── validations/
│   ├── link.ts                   # Zod schemas para links
│   └── user.ts                   # Zod schemas para usuários
└── utils/
    ├── hash.ts                   # Bcrypt helpers
    └── slug.ts                   # Gerador de slugs

types/
└── index.ts                      # Types compartilhados
```

## 4. Implementação por Módulos

### 4.1 Configuração Base

- Instalar dependências (Prisma, NextAuth, bcrypt, etc)
- Configurar Docker Compose
- Criar arquivo `.env` com variáveis
- Inicializar Prisma e criar schema
- Executar migrations
- Criar Prisma client singleton em `lib/prisma.ts`

### 4.2 Autenticação (NextAuth.js)

- Configurar NextAuth em `app/api/auth/[...nextauth]/route.ts`
- Criar `lib/auth.ts` com configurações:
    - Credentials provider com email/senha
    - Callbacks para sessão e JWT
    - Adapter do Prisma
- Criar página de login em `app/(auth)/login/page.tsx`
- Implementar middleware em `app/middleware.ts`:
    - Proteger rotas `/admin/*`
    - Permitir acesso livre a `/links` e `/l/*`

### 4.3 Gestão de Usuários

**Rota**: `/admin/users`

**Componentes**:

- `UserList.tsx`: Tabela com lista de usuários (DataTable do shadcn)
- `UserForm.tsx`: Formulário com react-hook-form + Zod

**Server Actions** (`app/admin/users/actions.ts`):

```typescript
'use server'
- createUser(data: CreateUserInput)
- updateUser(id: string, data: UpdateUserInput)
- toggleUserStatus(id: string)
- getUsers(filters?: UserFilters)
- getUserById(id: string)
```

**Service Layer** (`app/admin/users/services.ts`):

```typescript
- UserService.create()
- UserService.update()
- UserService.findAll()
- UserService.findById()
- UserService.hashPassword()
```

**Validações** (`lib/validations/user.ts`):

```typescript
- CreateUserSchema (email, password, username, cpf, phone)
- UpdateUserSchema
- LoginSchema
```

### 4.4 Gestão de Links

**Rotas**: `/admin/links`, `/admin/links/new`, `/admin/links/[id]`

**Componentes**:

- `LinkList.tsx`: Tabela com filtros (ativos/inativos/todos)
- `LinkForm.tsx`: Formulário para criar/editar
- `LinkFilters.tsx`: Filtros e busca

**Server Actions** (`app/admin/links/actions.ts`):

```typescript
'use server'
- createLink(data: CreateLinkInput)
- updateLink(id: string, data: UpdateLinkInput)
- toggleLinkStatus(id: string)
- getLinks(filters?: LinkFilters)
- getLinkById(id: string)
- generateUniqueSlug(label: string)
```

**Service Layer** (`app/admin/links/services.ts`):

```typescript
- LinkService.create()
- LinkService.update()
- LinkService.findAll()
- LinkService.findById()
- LinkService.toggleStatus()
- LinkService.incrementClicks()
```

**Validações** (`lib/validations/link.ts`):

```typescript
- CreateLinkSchema (label, url, slug optional)
- UpdateLinkSchema
- LinkFilterSchema
```

### 4.5 Sistema de Redirect e Tracking

**Rota**: `/l/[slug]`

Criar `app/l/[slug]/route.ts`:

```typescript
- Buscar link pelo slug
- Verificar se está ativo
- Registrar clique (LinkClick)
- Incrementar contador
- Redirecionar para URL
```

Tracking client-side na página `/links`:

- Adicionar onclick que chama API para registrar clique
- Manter UX fluida com navegação

### 4.6 Analytics

**Rota**: `/admin/analytics`

**Service** (`app/admin/analytics/services.ts`):

```typescript
- AnalyticsService.getLinkStats(linkId)
- AnalyticsService.getGlobalStats()
- AnalyticsService.getClicksTimeline(linkId, period)
```

**Dados exibidos**:

- Total de cliques por link
- Gráfico de cliques ao longo do tempo
- Links mais acessados
- Taxa de conversão

### 4.7 Migração de Dados Existentes

Criar seed script (`prisma/seed.ts`):

- Criar usuário admin padrão
- Migrar links de `contants/links.ts` para o banco
- Gerar slugs únicos para cada link

### 4.8 Atualização da Página Pública

Modificar `features/pages/Links.tsx`:

- Buscar links ativos do banco via Server Component
- Usar slugs curtos (`/l/[slug]`)
- Manter layout e estilo atuais

## 5. Segurança

- **Senhas**: Hash com bcrypt (rounds: 12)
- **Autenticação**: NextAuth.js com JWT
- **Proteção de rotas**: Middleware validando sessão
- **Validação**: Zod schemas em todas as entradas
- **SQL Injection**: Prisma ORM previne automaticamente
- **CSRF**: NextAuth.js protege automaticamente
- **Rate limiting**: Implementar posteriormente se necessário

## 6. Type Safety

- Todos os schemas Prisma geram types automáticos
- Zod para validação runtime + infer types
- Server Actions tipadas com TypeScript strict
- Usar `Prisma.LinkCreateInput`, `Prisma.UserWhereInput`, etc

## 7. Comandos Iniciais

```bash
# Subir banco de dados
docker-compose up -d

# Instalar dependências
pnpm install

# Configurar Prisma
pnpm prisma generate
pnpm prisma migrate dev --name init

# Seed inicial
pnpm prisma db seed

# Rodar aplicação
pnpm dev
```

## 8. Próximos Passos (Futuro)

- Roles e permissões (admin, editor, viewer)
- Upload de imagens/ícones para links
- QR codes para links
- Exportação de relatórios (CSV/PDF)
- Notificações por email
- Logs de auditoria
- Testes automatizados
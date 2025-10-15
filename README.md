# API GymPass (Node.js + SOLID) — Rocketseat Pós Tech Developer 360

Aplicação de backend que simula um app estilo GymPass: cadastro/autenticação de usuários, busca de academias, check-ins com validação de distância e métrica de uso. Projeto acadêmico da Rocketseat (Pós Tech Developer 360), com foco em princípios SOLID, testes e boas práticas de arquitetura.

## Visão geral
- Domínio: Usuários, Academias e Check-ins.
- Objetivo: aplicar engenharia de software com SOLID, persistência em PostgreSQL, validações robustas e autenticação JWT.
- Abaixo encontram-se RFs, RNs e RNFs já implementados.

## Stack
- Node.js + TypeScript
- Fastify (HTTP)
- Prisma ORM + PostgreSQL
- Zod (validação)
- JWT (autenticação)
- Bcrypt (hash de senha)
- Dayjs (datas)
- Vitest + Supertest (testes unitários/e2e)
- Docker (infra), ESLint/Prettier (qualidade)

## Arquitetura e SOLID
- Single Responsibility: cada caso de uso encapsula uma responsabilidade (ex.: AuthenticateUser, RegisterGym, ValidateCheckIn).
- Open/Closed: novos fluxos via novos casos de uso/rotas sem alterar existentes.
- Liskov Substitution: interfaces de repositório permitem alternar Prisma por memória para testes.
- Interface Segregation: contratos mínimos por contexto (ex.: UsersRepository, GymsRepository).
- Dependency Inversion: casos de uso dependem de interfaces, injetadas pelas implementações (Prisma, provedores de hash/token).

Organização típica:
- src/http: controllers, rotas, middlewares (auth, role)
- src/use-cases: serviços de domínio
- src/repositories: contratos + Prisma impl
- src/lib: prisma, env
- src/utils: geolocalização (cálculo de distância)
- src/validators: esquemas Zod
- src/providers: hash (bcrypt), token (JWT)

## Fluxos principais
- Usuários: cadastro, login, perfil, métricas de check-ins.
- Academias: cadastro (admin), busca por nome, busca por proximidade (raio ~100m).
- Check-ins: criação com validação de distância, listagem paginada (20 itens), validação por admin em até 20 minutos.

## Endpoints (resumo)
- POST /users
- POST /sessions
- GET /me (auth)
- GET /check-ins/history (auth)
- GET /check-ins/metrics (auth)
- GET /gyms/search (auth)
- GET /gyms/nearby (auth)
- POST /gyms (admin)
- POST /gyms/:gymId/check-ins (auth)
- PATCH /check-ins/:checkInId/validate (admin)

## Segurança e validação
- Senhas com bcrypt.
- JWT assinado (header Authorization: Bearer).
- Middlewares de autenticação e autorização (role admin).
- Zod em entrada/saída, paginação padrão de 20 itens.


## Decisões e trade-offs
- Prisma pelo ganho de produtividade, tipagem e migrações.
- Fastify pela performance e ecossistema de plugins.
- Repositórios in-memory para testes e2e rápidos e determinísticos.
- Cálculo de distância por fórmula de Haversine (aproximação suficiente para 100m).

## Próximos passos
- Documentação OpenAPI/Swagger.
- Refresh token/rota de logout.
- Observabilidade (pino + métricas).
- Rate limiting e CORS refinado.
- Seeds e dados fictícios mais ricos.

Projeto educacional alinhado às melhores práticas de engenharia de software e princípios SOLID, cobrindo requisitos funcionais, regras de negócio e não funcionais descritos abaixo.

# App

GymPass style app.

## RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [x] Deve ser possível o usuário obter o seu histórico de check-ins;
- [x] Deve ser possível o usuário buscar academias próximas;
- [x] Deve ser possível o usuário buscar academias pelo nome;
- [x] Deve ser possível o usuário realizar check-in em uma academia;
- [x] Deve ser possível validar o check-in de um usuário;
- [x] Deve ser possível cadastrar uma academia;

## RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] O usuário não pode fazer 2 check-ins no mesmo dia;
- [x] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [x] O check-in só pode ser validado até 20 minutos após ser criado;
- [x] O check-in só pode ser validado por administradores;
- [x] A academia só pode ser cadastrada por administradores;

## RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [x] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [x] O usuário deve ser identificado por um JWT (JSON Web Token);

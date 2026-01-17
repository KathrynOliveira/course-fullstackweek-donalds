# 🍔 FSW Donalds

Este projeto foi desenvolvido durante a Full Stack Week, com o objetivo de criar uma aplicação completa de cardápio digital para restaurantes, utilizando tecnologias modernas e boas práticas de desenvolvimento.

## 📚 O que aprendi
- Como estruturar um projeto fullstack com Next.js, Prisma e React.
- Utilização de componentes client/server no Next.js 13+.
- Criação de interfaces modernas com TailwindCSS e Shadcn UI.
- Gerenciamento de estado global com Context API.
- Validação de formulários com React Hook Form e Zod.
- Integração com banco de dados relacional usando Prisma ORM.
- Boas práticas de organização de código e separação de responsabilidades.

## 🚀 Funcionalidades
- Visualização do cardápio de um restaurante por slug.
- Seleção do método de consumo (comer no local ou levar).
- Adição de produtos ao carrinho.
- Finalização de pedido com validação de dados (nome e CPF).
- Interface responsiva e moderna.

## 🛠️ Tecnologias utilizadas
- Next.js 15
- React 19
- Prisma ORM
- TailwindCSS
- Shadcn UI
- React Hook Form
- Zod
- Radix UI

## 📝 Como rodar o projeto

1. **Clone o repositório:**
   ```bash
   git clone <url-do-repositorio>
   cd fullstackweek-donalds
   ```
2. **Instale as dependências:**
   ```bash
   npm install
   ```
3. **Configure o banco de dados:**
   - Crie um arquivo `.env` com a string de conexão do banco de dados (exemplo: PostgreSQL).
   - Ajuste o arquivo `prisma/schema.prisma` se necessário.
   - Rode as migrations:
     ```bash
     npx prisma migrate dev
     ```
   - Gere o Prisma Client:
     ```bash
     npx prisma generate
     ```
   - Popule o banco com dados de exemplo:
     ```bash
     npm run prisma:seed
     ```
4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
5. **Acesse no navegador:**
   - Abra `http://localhost:3000/<slug-do-restaurante>` para visualizar o cardápio.

 ## 👨‍💻 Desenvolvido por

- [Kathryn Oliveira](https://github.com/KathrynOliveira)



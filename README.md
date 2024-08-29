# Payment API

Uma API de pagamento online que permite o gerenciamento de usuários, transações, contas e categorias. Esta API foi desenvolvida com Node, Express, MongoDB e JWT para autenticação.

## Tecnologias Utilizadas

- **Framework:** Express
- **Banco de Dados:** MongoDB (usando Mongoose)
- **Autenticação:** JWT
- **Documentação:** Swagger
- **Testes:** Swagger Test Templates

## Estrutura do Projeto

```plaintext
/payment-api
  ├── /src
  │   ├── /config
  │   │   └── db.js
  │   ├── /controllers
  │   │   ├── accountController.js
  │   │   ├── categoryController.js
  │   │   ├── transactionController.js
  │   │   └── userController.js
  │   ├── /middleware
  │   │   └── authMiddleware.js
  │   ├── /models
  │   │   ├── Account.js
  │   │   ├── Category.js
  │   │   ├── Transaction.js
  │   │   └── User.js
  │   ├── /routes
  │   │   ├── accountRoutes.js
  │   │   ├── categoryRoutes.js
  │   │   ├── transactionRoutes.js
  │   │   ├── userRoutes.js
  │   │   └── installRoutes.js
  │   ├── /swagger
  │   │   └── swagger.json
  │   └── test.js
  │   └── app.js
  ├── server.js
  ├── package-lock.json
  ├── package.json
  ├── .env
  ├── LICENSE
  ├── .gitattributes
  ├── .gitignore
  ├── package.json
  └── README.md
```

## Configuração do Ambiente

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/guievbs/payment-api.git
   ```

2. **Instale as dependências:**

   Navegue até o diretório do projeto e execute:

   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**

   Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

   ```bash
   MONGO_URI=mongodb://localhost:27017/payment-api
   JWT_SECRET=sua-chave-secreta
   ```

4. **Inicie o servidor:**

   Para iniciar o servidor, execute:

   ```bash
   npm start
   ```

   Para desenvolvimento com recarregamento automático, execute:

   ```bash
   npm run dev
   ```

## Rotas da API

### Usuários

- **POST /api/users/register**
  - Cria um novo usuário.
  - Corpo da solicitação: `{ "username": "string", "email": "string", "password": "string" }`

- **POST /api/users/login**
  - Realiza o login e retorna um token JWT.
  - Corpo da solicitação: `{ "email": "string", "password": "string" }`

### Transações

- **POST /api/transactions**
  - Cria uma nova transação.
  - Corpo da solicitação: `{ "amount": "number", "description": "string" }`

- **GET /api/transactions**
  - Lista transações com paginação.
  - Query Params: `limit`, `page`

### Contas

- **POST /api/accounts**
  - Cria uma nova conta.
  - Corpo da solicitação: `{ "name": "string", "balance": "number" }`

- **GET /api/accounts**
  - Lista contas com paginação.
  - Query Params: `limit`, `page`

### Categorias

- **POST /api/categories**
  - Cria uma nova categoria.
  - Corpo da solicitação: `{ "name": "string" }`

- **GET /api/categories**
  - Lista categorias com paginação.
  - Query Params: `limit`, `page`

### Instalação

- **GET /api/install**
  - Cria um usuário administrador e limpa a coleção de usuários.

### Documentação

- **GET /api/docs**
  - Acesse a documentação Swagger da API.

## Testes Automatizados

Para executar os testes automatizados, use:

```bash
npm test
```

Os testes são baseados na documentação Swagger e validam as rotas da API.

## Contribuição

Sinta-se à vontade para contribuir para o projeto. Faça um fork do repositório, crie uma branch, faça suas alterações e envie um pull request.

## Licença

Este projeto é licenciado sob a Licença MIT. Veja o arquivo [LICENSE](https://github.com/guievbs/payment-api/blob/main/LICENSE) para mais detalhes.

## Notas Adicionais

- **Documentação Swagger:** O arquivo `swagger.json` na pasta `/swagger` contém a especificação da API e deve ser atualizado conforme as mudanças na API.
- **Testes Automatizados:** O arquivo `test.js` utiliza Swagger Test Templates para gerar e executar testes automatizados.

Se precisar de mais alguma coisa ou tiver dúvidas adicionais, estou à disposição!

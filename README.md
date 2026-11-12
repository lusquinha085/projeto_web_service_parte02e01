# Projeto Integrador - Web Services IFMS

Sistema distribuído de pedidos composto por microsserviços em Node.js com Express e TypeScript, utilizando PostgreSQL e Prisma ORM para persistência de dados.

---

## Arquitetura do Sistema

* **catalogo-service (Porta 3001)**: Microsserviço responsável por gerenciar produtos, preços e reservas de estoque. Conecta-se ao banco de dados `catalogo_db`.


* **pedidos-service (Porta 3000)**: Microsserviço responsável pela criação e listagem de pedidos. Faz comunicação síncrona via HTTP com o `catalogo-service` para reservar o estoque antes de salvar o pedido. Conecta-se ao banco de dados `pedidos_db`.



---

## Como Executar o Projeto

### 1. Iniciar o PostgreSQL no Docker

Na raiz do repositório (onde está o arquivo `compose.yml`), execute:

```bash
docker compose up -d

```

Em seguida, crie os dois bancos de dados lógicos:

```bash
docker exec -it webservices-postgres psql -U postgres -c "CREATE DATABASE catalogo_db;"
docker exec -it webservices-postgres psql -U postgres -c "CREATE DATABASE pedidos_db;"

```

---

### 2. Configurar o Catalogo Service

No terminal:

```bash
cd catalogo-service
npm install

```

Crie o arquivo `.env` na pasta `catalogo-service`:

```env
PORT=3001
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/catalogo_db"

```

Execute a migration do Prisma e inicie o serviço:

```bash
npx prisma migrate dev --name init_catalogo
npm run dev

```

---

### 3. Configurar o Pedidos Service

Em outro terminal:

```bash
cd pedidos-service
npm install

```

Crie o arquivo `.env` na pasta `pedidos-service`:

```env
PORT=3000
CATALOG_URL=http://localhost:3001
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/pedidos_db"

```

Execute a migration do Prisma e inicie o serviço:

```bash
npx prisma migrate dev --name init_pedidos
npm run dev

```

---

## Endpoints e Formato das Requisições

### Catalogo Service (`http://localhost:3001`)

* **POST /produtos** — Cria um novo produto.


* Body:
```json
{
  "nome": "Mouse Gamer RGB",
  "preco": 150.00,
  "estoque": 10
}

```


* Resposta (201 Created): Retorna o produto criado.




* **GET /produtos** — Lista todos os produtos cadastrados.


* **GET /produtos/:id** — Retorna os dados de um produto pelo ID.


* **POST /produtos/:id/reservas** — Reserva estoque de um produto.


* Body: `{"quantidade": 2}`


* Resposta (200 OK): `{"produtoId": 1, "reservado": 2, "precoUnitario": 150.00, "estoqueRestante": 8}`





---

### Pedidos Service (`http://localhost:3000`)

* **POST /pedidos** — Processa a reserva com o catálogo, calcula o total e salva o pedido.


* Body:
```json
{
  "produtoId": 1,
  "quantidade": 2,
  "clienteEmail": "aluno@estudante.ifms.edu.br"
}

```


* Resposta (201 Created): Retorna o pedido confirmado com o total calculado (`300.00`).




* **GET /pedidos** — Lista todos os pedidos realizados.


* **GET /pedidos/:id** — Busca um pedido específico pelo ID.



---

## Cenários de Teste e Códigos de Status

* **201 Created**: Pedido ou produto criado com sucesso.


* **400 Bad Request**: Dados do body inválidos ou quantidade menor/igual a zero.


* **404 Not Found**: Produto ou pedido não encontrado no banco.


* **409 Conflict**: Estoque insuficiente para realizar a reserva.


* **502 Bad Gateway**: O serviço de pedidos tenta acessar o catálogo e ele está fora do ar.



---

## Teste de Persistência (Parte 3)

1. Crie um produto em `POST /produtos` e um pedido em `POST /pedidos`.


2. Pare os dois serviços no terminal utilizando `Ctrl + C`.


3. Inicie os serviços novamente com `npm run dev`.


4. Faça a consulta via `GET /produtos` e `GET /pedidos`. Os registros criados anteriormente devem continuar disponíveis, confirmando a persistência no PostgreSQL.

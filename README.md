# Projeto Integrador - Web Services IFMS (Partes 1 e 2)

Sistema distribuído de pedidos composto por microsserviços em Node.js e Express utilizando TypeScript[cite: 23, 24].

## Arquitetura e Portas
* **catalogo-service**: Porta `:3001` (Dono dos produtos, preços e reserva de estoque)[cite: 26]
* **pedidos-service**: Porta `:3000` (Orquestrador do pedido, realiza chamada HTTP síncrona ao catálogo)[cite: 27]

## Configuração do Ambiente
Em cada uma das pastas (`catalogo-service` e `pedidos-service`), crie o arquivo `.env` baseado no `.env.example`:

### `catalogo-service/.env`
```env
PORT=3001
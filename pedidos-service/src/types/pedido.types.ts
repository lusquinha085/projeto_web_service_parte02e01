export interface Pedido {
  id: number;
  produtoId: number;
  quantidade: number;
  precoUnitario: number;
  total: number;
  clienteEmail: string;
  status: "confirmado";
  notificacaoStatus: "nao_enviada";
  criadoEm: string;
}

export interface ReservaEstoqueResponse {
  produtoId: number;
  reservado: number;
  precoUnitario: number;
  estoqueRestante: number;
}

export interface CriarPedidoDTO {
  produtoId: number;
  quantidade: number;
  clienteEmail: string;
}
export interface Produto {
  id: number;
  nome: string;
  preco: number;
  estoque: number;
}

export interface ReservaEstoqueResponse {
  produtoId: number;
  reservado: number;
  precoUnitario: number;
  estoqueRestante: number;
}
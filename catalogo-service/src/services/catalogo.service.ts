import { produtos } from "../data/produtos.data.js";
import { Produto, ReservaEstoqueResponse } from "../types/produto.types.js";

export class CatalogoService {
  listarTodos(): Produto[] {
    return produtos;
  }

  buscarPorId(id: number): Produto | undefined {
    return produtos.find((p) => p.id === id);
  }

  criar(dados: { nome: string; preco: number; estoque: number }): Produto {
    const novoProduto: Produto = {
      id: produtos.length > 0 ? Math.max(...produtos.map((p) => p.id)) + 1 : 1,
      nome: dados.nome,
      preco: dados.preco,
      estoque: dados.estoque
    };
    produtos.push(novoProduto);
    return novoProduto;
  }

  reservarEstoque(id: number, quantidade: number): { status: number; data: ReservaEstoqueResponse | { mensagem: string; codigo: string } } {
    if (!quantidade || quantidade <= 0 || !Number.isInteger(quantidade)) {
      return {
        status: 400,
        data: { mensagem: "Quantidade solicitada deve ser um número inteiro positivo", codigo: "DADOS_INVALIDOS" }
      };
    }

    const produto = this.buscarPorId(id);
    if (!produto) {
      return {
        status: 404,
        data: { mensagem: "Produto não encontrado", codigo: "PRODUTO_NAO_ENCONTRADO" }
      };
    }

    if (produto.estoque < quantidade) {
      return {
        status: 409,
        data: { mensagem: "Estoque insuficiente", codigo: "ESTOQUE_INSUFICIENTE" }
      };
    }

    produto.estoque -= quantidade;

    return {
      status: 200,
      data: {
        produtoId: produto.id,
        reservado: quantidade,
        precoUnitario: produto.preco,
        estoqueRestante: produto.estoque
      }
    };
  }
}
import { ProdutosRepository } from "../repositories/produtos.repository.js";

const repository = new ProdutosRepository();

export class CatalogoService {
  async listarTodos() {
    const produtos = await repository.listar();
    return produtos.map((p) => ({
      ...p,
      preco: Number(p.preco)
    }));
  }

  async buscarPorId(id: number) {
    const produto = await repository.buscarPorId(id);
    if (!produto) return null;
    return {
      ...produto,
      preco: Number(produto.preco)
    };
  }

  async criar(dados: { nome: string; preco: number; estoque: number }) {
    const produto = await repository.criar(dados);
    return {
      ...produto,
      preco: Number(produto.preco)
    };
  }

  async reservarEstoque(id: number, quantidade: number) {
    if (!quantidade || quantidade <= 0 || !Number.isInteger(quantidade)) {
      return {
        status: 400,
        data: { mensagem: "Quantidade solicitada deve ser um número inteiro positivo", codigo: "DADOS_INVALIDOS" }
      };
    }

    const produto = await repository.buscarPorId(id);
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

    const produtoAtualizado = await repository.decrementarEstoque(id, quantidade);

    return {
      status: 200,
      data: {
        produtoId: produtoAtualizado.id,
        reservado: quantidade,
        precoUnitario: Number(produtoAtualizado.preco),
        estoqueRestante: produtoAtualizado.estoque
      }
    };
  }
}
import { prisma } from "../lib/prisma.js";

export class ProdutosRepository {
  async listar() {
    return prisma.produto.findMany({
      orderBy: { id: "asc" }
    });
  }

  async buscarPorId(id: number) {
    return prisma.produto.findUnique({
      where: { id }
    });
  }

  async criar(dados: { nome: string; preco: number; estoque: number }) {
    return prisma.produto.create({
      data: {
        nome: dados.nome,
        preco: dados.preco,
        estoque: dados.estoque
      }
    });
  }

  async decrementarEstoque(id: number, quantidade: number) {
    return prisma.produto.update({
      where: { id },
      data: {
        estoque: { decrement: quantidade }
      }
    });
  }
}
import { prisma } from "../lib/prisma.js";

export class PedidosRepository {
  async criar(dados: {
    produtoId: number;
    quantidade: number;
    clienteEmail: string;
    precoUnitario: number;
    total: number;
  }) {
    return prisma.pedido.create({
      data: {
        produtoId: dados.produtoId,
        quantidade: dados.quantidade,
        clienteEmail: dados.clienteEmail,
        precoUnitario: dados.precoUnitario,
        total: dados.total,
        status: "CONFIRMADO",
        notificacaoStatus: "NAO_ENVIADA"
      }
    });
  }

  async listar() {
    return prisma.pedido.findMany({
      orderBy: { id: "asc" }
    });
  }

  async buscarPorId(id: number) {
    return prisma.pedido.findUnique({
      where: { id }
    });
  }
}
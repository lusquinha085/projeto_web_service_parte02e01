import { PedidosRepository } from "../repositories/pedidos.repository.js";
import { CriarPedidoDTO } from "../types/pedido.types.js";
import { reservarEstoque } from "../clients/catalogo.client.js";
import { AppError } from "../errors/app.error.js";

const repository = new PedidosRepository();

export class PedidosService {
  async criarPedido(dados: CriarPedidoDTO) {
    const { produtoId, quantidade, clienteEmail } = dados;

    if (!produtoId || !quantidade || !clienteEmail) {
      throw new AppError("Dados do pedido são inválidos", 400, "DADOS_INVALIDOS");
    }

    if (quantidade <= 0 || !Number.isInteger(quantidade)) {
      throw new AppError("Quantidade deve ser um inteiro maior que zero", 400, "DADOS_INVALIDOS");
    }

    // Chama catálogo por HTTP antes de gravar no banco
    const reserva = await reservarEstoque(produtoId, quantidade);
    const precoUnitario = Number(reserva.precoUnitario);
    const total = Number((precoUnitario * quantidade).toFixed(2));

    const novoPedido = await repository.criar({
      produtoId: reserva.produtoId,
      quantidade,
      clienteEmail,
      precoUnitario,
      total
    });

    return {
      ...novoPedido,
      precoUnitario: Number(novoPedido.precoUnitario),
      total: Number(novoPedido.total)
    };
  }

  async listarTodos() {
    const pedidos = await repository.listar();
    return pedidos.map((p) => ({
      ...p,
      precoUnitario: Number(p.precoUnitario),
      total: Number(p.total)
    }));
  }

  async buscarPorId(id: number) {
    const pedido = await repository.buscarPorId(id);
    if (!pedido) {
      throw new AppError("Pedido não encontrado", 404, "PEDIDO_NAO_ENCONTRADO");
    }
    return {
      ...pedido,
      precoUnitario: Number(pedido.precoUnitario),
      total: Number(pedido.total)
    };
  }
}
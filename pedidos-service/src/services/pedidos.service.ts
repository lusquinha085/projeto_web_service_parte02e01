import { pedidos } from "../data/pedidos.data.js";
import { CriarPedidoDTO, Pedido } from "../types/pedido.types.js";
import { reservarEstoque } from "../clients/catalogo.client.js";
import { AppError } from "../errors/app.error.js";

export class PedidosService {
  async criarPedido(dados: CriarPedidoDTO): Promise<Pedido> {
    const { produtoId, quantidade, clienteEmail } = dados;

    if (!produtoId || !quantidade || !clienteEmail) {
      throw new AppError("Dados do pedido são inválidos", 400, "DADOS_INVALIDOS");
    }

    if (quantidade <= 0 || !Number.isInteger(quantidade)) {
      throw new AppError("Quantidade deve ser um inteiro maior que zero", 400, "DADOS_INVALIDOS");
    }

    const reserva = await reservarEstoque(produtoId, quantidade);

    const total = Number((reserva.precoUnitario * quantidade).toFixed(2));

    const novoPedido: Pedido = {
      id: pedidos.length > 0 ? Math.max(...pedidos.map((p) => p.id)) + 1 : 1,
      produtoId: reserva.produtoId,
      quantidade,
      precoUnitario: reserva.precoUnitario,
      total,
      clienteEmail,
      status: "confirmado",
      notificacaoStatus: "nao_enviada",
      criadoEm: new Date().toISOString()
    };

    pedidos.push(novoPedido);
    return novoPedido;
  }

  listarTodos(): Pedido[] {
    return pedidos;
  }

  buscarPorId(id: number): Pedido {
    const pedido = pedidos.find((p) => p.id === id);
    if (!pedido) {
      throw new AppError("Pedido não encontrado", 404, "PEDIDO_NAO_ENCONTRADO");
    }
    return pedido;
  }
}
import { Request, Response, NextFunction } from "express";
import { PedidosService } from "../services/pedidos.service.js";

const pedidosService = new PedidosService();

export class PedidosController {
  async criar(req: Request, res: Response, next: NextFunction) {
    try {
      const novoPedido = await pedidosService.criarPedido(req.body);
      return res.status(201).json(novoPedido);
    } catch (error) {
      next(error);
    }
  }

  listar(req: Request, res: Response) {
    const lista = pedidosService.listarTodos();
    return res.status(200).json(lista);
  }

  buscarPorId(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const pedido = pedidosService.buscarPorId(id);
      return res.status(200).json(pedido);
    } catch (error) {
      next(error);
    }
  }
}
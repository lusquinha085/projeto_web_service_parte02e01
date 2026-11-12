import { Request, Response } from "express";
import { CatalogoService } from "../services/catalogo.service.js";

const catalogoService = new CatalogoService();

export class CatalogoController {
  async listar(req: Request, res: Response) {
    const lista = await catalogoService.listarTodos();
    return res.status(200).json(lista);
  }

  async buscarPorId(req: Request, res: Response) {
    const id = Number(req.params.id);
    const produto = await catalogoService.buscarPorId(id);

    if (!produto) {
      return res.status(404).json({ mensagem: "Produto não encontrado", codigo: "PRODUTO_NAO_ENCONTRADO" });
    }

    return res.status(200).json(produto);
  }

  async criar(req: Request, res: Response) {
    const { nome, preco, estoque } = req.body;

    if (!nome || typeof preco !== "number" || typeof estoque !== "number" || preco <= 0 || estoque < 0) {
      return res.status(400).json({ mensagem: "Dados inválidos para a criação do produto", codigo: "DADOS_INVALIDOS" });
    }

    const novoProduto = await catalogoService.criar({ nome, preco, estoque });
    return res.status(201).json(novoProduto);
  }

  async reservar(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { quantidade } = req.body;

    const resultado = await catalogoService.reservarEstoque(id, quantidade);
    return res.status(resultado.status).json(resultado.data);
  }
}
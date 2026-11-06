import { Router } from "express";
import { PedidosController } from "../controllers/pedidos.controller.js";

const router = Router();
const controller = new PedidosController();

router.post("/pedidos", (req, res, next) => controller.criar(req, res, next));
router.get("/pedidos", (req, res) => controller.listar(req, res));
router.get("/pedidos/:id", (req, res, next) => controller.buscarPorId(req, res, next));

export default router;
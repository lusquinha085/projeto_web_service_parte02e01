import { Router } from "express";
import { CatalogoController } from "../controllers/catalogo.controller.js";

const router = Router();
const controller = new CatalogoController();

router.get("/produtos", (req, res) => controller.listar(req, res));
router.get("/produtos/:id", (req, res) => controller.buscarPorId(req, res));
router.post("/produtos", (req, res) => controller.criar(req, res));
router.post("/produtos/:id/reservas", (req, res) => controller.reservar(req, res));

export default router;
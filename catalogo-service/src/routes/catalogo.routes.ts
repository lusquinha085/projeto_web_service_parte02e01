import { Router } from "express";
import { CatalogoController } from "../controllers/catalogo.controller.js";

const router = Router();
const controller = new CatalogoController();

router.get("/produtos", controller.listar);
router.get("/produtos/:id", controller.buscarPorId);
router.post("/produtos", controller.criar);
router.post("/produtos/:id/reservas", controller.reservar);

export default router;
import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import pedidosRoutes from "./routes/pedidos.routes.js";
import { AppError } from "./errors/app.error.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(pedidosRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      mensagem: err.message,
      codigo: err.codigo
    });
  }

  console.error(err);
  return res.status(500).json({
    mensagem: "Erro interno no servidor de pedidos",
    codigo: "ERRO_INTERNO"
  });
});

app.listen(PORT, () => {
  console.log(`[pedidos-service] Executando na porta ${PORT}`);
});
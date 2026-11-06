import express from "express";
import dotenv from "dotenv";
import catalogoRoutes from "./routes/catalogo.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(catalogoRoutes);

app.listen(PORT, () => {
  console.log(`[catalogo-service] Executando na porta ${PORT}`);
});
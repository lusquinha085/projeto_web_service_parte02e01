import { ReservaEstoqueResponse } from "../types/pedido.types.js";
import { AppError } from "../errors/app.error.js";

export async function reservarEstoque(produtoId: number, quantidade: number): Promise<ReservaEstoqueResponse> {
  const catalogUrl = process.env.CATALOG_URL;

  if (!catalogUrl) {
    throw new AppError("Variável CATALOG_URL não configurada", 500, "ERRO_CONFIGURACAO");
  }

  try {
    const resposta = await fetch(`${catalogUrl}/produtos/${produtoId}/reservas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ quantidade })
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      throw new AppError(
        dados.mensagem || "Falha ao processar reserva no catálogo",
        resposta.status,
        dados.codigo || "ERRO_CATALOGO"
      );
    }

    return dados as ReservaEstoqueResponse;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError("Catálogo indisponível", 502, "CATALOGO_INDISPONIVEL");
  }
}
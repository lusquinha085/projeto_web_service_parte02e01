export class AppError extends Error {
  public readonly statusCode: number;
  public readonly codigo: string;

  constructor(message: string, statusCode: number = 400, codigo: string = "ERRO_APLICACAO") {
    super(message);
    this.statusCode = statusCode;
    this.codigo = codigo;
  }
}
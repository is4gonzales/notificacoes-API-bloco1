function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const mensagem = err.message || "Erro interno do servidor";

  console.error(`[ERRO] ${err.name}: ${mensagem}`);

  res.status(statusCode).json({
    erro: {
      tipo: err.name || "Error",
      mensagem: mensagem,
      statusCode: statusCode,
    },
  });
}

module.exports = errorHandler;
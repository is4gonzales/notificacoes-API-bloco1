const InscricaoModel = require("../models/InscricaoModel");

const { isRequired, validar } = require("../helpers/validators");

const { ValidationError } = require("../errors/AppError");

/**
 * Criar inscrição (COM VALIDAÇÃO)
 */
function store(req, res, next) {
  try {
    const { eventoId, participanteId } = req.body;

    const erros = validar([
      isRequired(eventoId, "Evento ID"),
      isRequired(participanteId, "Participante ID"),
    ]);

    if (erros) {
      throw new ValidationError(erros.join("; "));
    }

    const resultado = InscricaoModel.criar(
      parseInt(eventoId),
      parseInt(participanteId)
    );

    res.status(201).json(resultado);
  } catch (erro) {
    next(erro);
  }
}

/**
 * Listar inscrições
 */
function index(req, res, next) {
  try {
    const inscricoes = InscricaoModel.listar();
    res.json(inscricoes);
  } catch (erro) {
    next(erro);
  }
}

/**
 * Deletar inscrição
 */
function destroy(req, res, next) {
  try {
    const id = parseInt(req.params.id);

    const removido = InscricaoModel.deletar(id);

    if (!removido) {
      return res.status(404).json({
        erro: {
          tipo: "NotFoundError",
          mensagem: "Inscrição não encontrada",
          statusCode: 404,
        },
      });
    }

    res.status(204).send();
  } catch (erro) {
    next(erro);
  }
}

module.exports = {
  index,
  store,
  destroy,
};
const ParticipanteModel = require("../models/ParticipanteModel");

const {
  isRequired,
  isEmail,
  minLength,
  validar,
} = require("../helpers/validators");

const { NotFoundError, ValidationError } = require("../errors/AppError");

/**
 * Listar participantes
 */
function index(req, res, next) {
  try {
    const participantes = ParticipanteModel.listar();
    res.json(participantes);
  } catch (erro) {
    next(erro);
  }
}

/**
 * Buscar participante por ID
 */
function show(req, res, next) {
  try {
    const id = parseInt(req.params.id);

    const participante = ParticipanteModel.buscarPorId(id);

    if (!participante) {
      throw new NotFoundError("Participante");
    }

    res.json(participante);
  } catch (erro) {
    next(erro);
  }
}

/**
 * Criar participante (COM VALIDAÇÃO)
 */
function store(req, res, next) {
  try {
    const { nome, email } = req.body;

    const erros = validar([
      isRequired(nome, "Nome"),
      minLength(nome, 2, "Nome"),
      isRequired(email, "Email"),
      isEmail(email),
    ]);

    if (erros) {
      throw new ValidationError(erros.join("; "));
    }

    const novoParticipante = ParticipanteModel.criar({
      nome,
      email,
    });

    res.status(201).json(novoParticipante);
  } catch (erro) {
    next(erro);
  }
}

/**
 * Atualizar participante (COM VALIDAÇÃO)
 */
function update(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const { nome, email } = req.body;

    // No update, campos são opcionais, mas se vierem precisam ser válidos
    const erros = validar([
      minLength(nome, 2, "Nome"),
      isEmail(email),
    ]);

    if (erros) {
      throw new ValidationError(erros.join("; "));
    }

    const participanteAtualizado = ParticipanteModel.atualizar(id, req.body);

    if (!participanteAtualizado) {
      throw new NotFoundError("Participante");
    }

    res.json(participanteAtualizado);
  } catch (erro) {
    next(erro);
  }
}

/**
 * Deletar participante
 */
function destroy(req, res, next) {
  try {
    const id = parseInt(req.params.id);

    const removido = ParticipanteModel.deletar(id);

    if (!removido) {
      throw new NotFoundError("Participante");
    }

    res.status(204).send();
  } catch (erro) {
    next(erro);
  }
}

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
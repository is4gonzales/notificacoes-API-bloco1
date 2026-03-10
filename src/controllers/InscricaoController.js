const InscricaoModel = require("../models/InscricaoModel");

function index(req, res) {
  const inscricoes = InscricaoModel.listarTodas();
  return res.json(inscricoes);
}

function store(req, res) {
  const { participanteId, eventoId } = req.body;

  if (!participanteId || !eventoId) {
    return res.status(400).json({
      erro: "participanteId e eventoId são obrigatórios"
    });
  }

  const nova = InscricaoModel.criar({ participanteId, eventoId });

  return res.status(201).json(nova);
}

function update(req, res) {
  const id = parseInt(req.params.id);
  const { participanteId, eventoId } = req.body;

  const inscricoes = InscricaoModel.listarTodas();
  const inscricao = inscricoes.find(i => i.id === id);

  if (!inscricao) {
    return res.status(404).json({ erro: "Inscrição não encontrada" });
  }

  if (participanteId) {
    inscricao.participanteId = participanteId;
  }

  if (eventoId) {
    inscricao.eventoId = eventoId;
  }

  return res.json(inscricao);
}

module.exports = {
  index,
  store,
  update
};
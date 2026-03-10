let inscricoes = [];

function listarTodas() {
  return inscricoes;
}

function criar(dados) {
  const nova = {
    id: inscricoes.length + 1,
    participanteId: dados.participanteId,
    eventoId: dados.eventoId,
    data: new Date()
  };

  inscricoes.push(nova);
  return nova;
}

module.exports = {
  listarTodas,
  criar
};
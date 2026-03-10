let participantes = [
  { id: 1, nome: "Ana Silva", email: "ana@email.com" },
  { id: 2, nome: "Carlos Souza", email: "carlos@email.com" },
  { id: 3, nome: "Maria Santos", email: "maria@email.com" }
];

function listarTodos() {
  return participantes;
}

function buscarPorId(id) {
  return participantes.find(p => p.id === id);
}

function criar(dados) {
  const novo = {
    id: participantes.length + 1,
    nome: dados.nome,
    email: dados.email
  };

  participantes.push(novo);
  return novo;
}

function atualizar(id, dados) {
  const participante = participantes.find(p => p.id === id);
  if (!participante) return null;

  participante.nome = dados.nome || participante.nome;
  participante.email = dados.email || participante.email;

  return participante;
}

function deletar(id) {
  const index = participantes.findIndex(p => p.id === id);
  if (index === -1) return false;

  participantes.splice(index, 1);
  return true;
}

module.exports = {
  listarTodos,
  buscarPorId,
  criar,
  atualizar,
  deletar
};
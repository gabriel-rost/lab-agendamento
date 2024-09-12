document.getElementById('agendamentoForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const professor = document.getElementById('professor').value;
  const turma = document.getElementById('turma').value;
  const atividade = document.getElementById('atividade').value;
  const data = document.getElementById('data').value;
  const horario = document.getElementById('horario').value;
  const observacoes = document.getElementById('observacoes').value;

  // Verifica se todos os campos obrigatórios estão preenchidos
  if (!professor || !turma || !atividade || !data || !horario) {
    alert('Por favor, preencha todos os campos obrigatórios.');
    return;
  }

  // Envia os dados para o Google Sheets
  const url = 'https://script.google.com/macros/s/AKfycbwezd-XBWlOQJclAka21lv18YS0VY2H8YngQNxwyj0-qFylz8nssskhP0cMasJHmJQT/exec'; // Cole aqui o URL do seu Google Apps Script
  const params = new URLSearchParams();
  params.append('professor', professor);
  params.append('turma', turma);
  params.append('atividade', atividade);
  params.append('data', data);
  params.append('horario', horario);
  params.append('observacoes', observacoes);

  fetch(url, {
    method: 'POST',
    body: params
  })
  .then(response => response.text())
  .then(data => {
    alert('Agendamento registrado com sucesso!');

    // Exibir o resumo do agendamento
    const resumo = `
      <h2>Resumo do Agendamento</h2>
      <p><strong>Professor:</strong> ${professor}</p>
      <p><strong>Turma:</strong> ${turma}</p>
      <p><strong>Atividade:</strong> ${atividade}</p>
      <p><strong>Data:</strong> ${new Date(data).toLocaleDateString('pt-BR')}</p>
      <p><strong>Horário:</strong> ${horario}</p>
      <p><strong>Observações:</strong> ${observacoes ? observacoes : 'Nenhuma'}</p>
    `;

    const resumoAgendamento = document.getElementById('resumoAgendamento');
    resumoAgendamento.innerHTML = resumo;
    resumoAgendamento.style.display = 'block';

    // Limpar o formulário
    document.getElementById('agendamentoForm').reset();
  })
  .catch(error => console.error('Erro ao enviar dados:', error));
});

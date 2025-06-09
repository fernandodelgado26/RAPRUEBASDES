document.getElementById('logoutBtn').addEventListener('click', () => {
  window.location.href = '../login.html';
});
document.querySelector('.nav-item.AV').addEventListener('click', () => {
  window.location.href = '../ayudasvisuales/ayudasisuales.html';
});
document.querySelector('.nav-item.HM').addEventListener('click', () => {
  window.location.href = '../home/home.html';
});
document.getElementById('ticketForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    departamento: document.getElementById('departamento').value,
    area: document.getElementById('area').value,
    linea: document.getElementById('linea').value
  };

  try {
   const res = await fetch('http://localhost:3000/api/ticket', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
});


    const result = await res.text();
    document.getElementById('mensaje').textContent = result;
  } catch (error) {
    document.getElementById('mensaje').textContent = '❌ Error al enviar el ticket.';
  }
});

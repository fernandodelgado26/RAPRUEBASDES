document.getElementById('logoutBtn').addEventListener('click', () => {
  window.location.href = '../login.html'; // Redirige al login
});

document.querySelector('.nav-item.ticket').addEventListener('click', () => {
  window.location.href = '../ticket/ticket.html';
});
document.querySelector('.nav-item.AV').addEventListener('click', () => {
  window.location.href = '../ayudasvisuales/ayudasisuales.html';
});
document.querySelector('.nav-item.HM').addEventListener('click', () => {
  window.location.href = '../home/home.html';
});

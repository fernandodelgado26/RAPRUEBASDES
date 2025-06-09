document.getElementById('logoutBtn').addEventListener('click', () => {
  window.location.href = '../login.html'; // Redirige al login
});
document.querySelector('.nav-item.HM').addEventListener('click', () => {
  window.location.href = '../home/home.html';
});
document.querySelector('.nav-item.ticket').addEventListener('click', () => {
  window.location.href = '../ticket/ticket.html';
});
// Al hacer clic en un card, se selecciona y se deseleccionan los demás
const cards = document.querySelectorAll('.card');

cards.forEach(card => {
  card.addEventListener('click', () => {
    cards.forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
  });

  // Para accesibilidad: seleccionar con Enter o espacio
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      cards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
    }
  });
});

const routes = {
  rooms: 'pages/rooms/rooms.html',
  roles: 'pages/roles/roles.html'
};

//--- Cargar contenido de la página
function loadPage(page) {
  const container = document.getElementById('appContentArea');

  fetch(routes[page])
    .then(res => res.text())
    .then(html => {
      container.innerHTML = html;
    })
    .catch(() => {
      container.innerHTML = '<p>Error cargando la página</p>';
    });
}

//--- Función para manejar el estado activo del menu
function setActiveMenu(page) {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
  });

  const activeLink = document.querySelector(
    `.nav-link[data-page="${page}"]`
  );

  if (activeLink) {
    activeLink.classList.add('active');
  }
}

//--- Cuando se entra a index.html → se ve Habitaciones
document.addEventListener('DOMContentLoaded', () => {
  loadPage('rooms');
  setActiveMenu('rooms');
});
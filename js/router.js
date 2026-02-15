import { initRolesPage } from '../pages/roles/roles.js';

const routes = {
  rooms:      'pages/rooms/rooms.html',
  employees:  'pages/employees/employees.html',
  roles:      'pages/roles/roles.html'
};

//--- Cargar contenido de la página
window.loadPage = function (page) {
  const container = document.getElementById('appContentArea');

  fetch(routes[page])
    .then(res => res.text())
    .then(html => {
      container.innerHTML = html;
      setActiveMenu(page);
      // Inicializa la página de roles y accesos
      if (page === "roles") {
        initRolesPage();
      }
    })
    .catch(() => {
      container.innerHTML = '<p>Error cargando la página</p>';
    });
};

//--- Función para manejar el estado activo del menu
window.setActiveMenu = function (page) {
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

//--- Página inicial: cuando se entra a index.html → se ve Habitaciones
document.addEventListener('DOMContentLoaded', () => {
  window.loadPage('rooms');
});
//--- Manejo de clicks en el menú ---
document.addEventListener('click', (e) => {
  const link = e.target.closest('[data-page]');
  if (!link) return;

  const page = link.dataset.page;
  window.loadPage(page);
});
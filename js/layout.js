//-- Carga componentes de diseño (navbar y sidebar menu) dinámicamente en la página
window.loadLayout = async function () {
  const navbar = await fetch('partials/navbar.html').then(r => r.text())
  const sidebar = await fetch('partials/sidebar.html').then(r => r.text())
  const userProfile = await fetch('partials/userprofile.html').then(r => r.text())

  document.getElementById('navbar-container').innerHTML = navbar
  document.getElementById('sidebar-container').innerHTML = sidebar
  document.getElementById('userprofile-container').innerHTML = userProfile
}

document.addEventListener('DOMContentLoaded', loadLayout);

/*
⚠️ IMPORTANTE
📌 Esto requiere servir los archivos desde un servidor, no abrir con doble click.
En el TERMINAL en la carpeta del proyecto, ejecutar: 
  python -m http.server   // para inciciar un servidor local
  Ctrl + C                // para detener el servidor
  http://localhost:8000   // para abrir en el navegador
*/
//--- Apps Script Backend API ---
const API_URL = "https://script.google.com/macros/s/AKfycbxCpu621IJVuRqhcmTs0vYZoEk097KBJllJJSMcJY-axN5zeP0yBXLgFPAp8_m_nZ9W/exec";

//--- Verificación de sesión y carga de datos de usuario ---
document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    // No hay sesión → volver al login
    window.location.href = "login.html";
    return;
  }

  // Avatar (iniciales)
  const initials = user.nombre_completo
    .split(" ")
    .map(n => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  document.getElementById("userAvatar").textContent = initials;
  document.getElementById("userName").textContent = user.nombre_completo;
  document.getElementById("userRole").textContent = user.cargo;
});

//--- Función de cierre de sesión ---
function logout() {
  localStorage.removeItem("user");
  window.location.href = "login.html";
}

//--- Interacciones de la interfaz ---
function openRoom(roomNumber) {
    alert('Abrir todo el detalle de la habitación ' + roomNumber);
}

function toggleSidebar() {
    document.body.classList.toggle('sidebar-open');
}

document.addEventListener("click", function (e) {
    const body = document.body;
    const sidebar = document.querySelector(".sidebar");
    const toggleBtn = document.querySelector("#menuToggle");

    if (!body.classList.contains("sidebar-open")) return;

    const clickedInsideSidebar = sidebar.contains(e.target);
    const clickedToggle = toggleBtn && toggleBtn.contains(e.target);

    if (!clickedInsideSidebar && !clickedToggle) {
        body.classList.remove("sidebar-open");
    }
});

//--- Prueba de conexión con la API ---
/*
async function probarAPI() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    console.log("Respuesta API:", data);
    alert("API conectada correctamente ✅");
  } catch (err) {
    console.error("Error conectando API", err);
    alert("Error conectando con la API ❌");
  }
}
document.addEventListener("DOMContentLoaded", probarAPI);
*/
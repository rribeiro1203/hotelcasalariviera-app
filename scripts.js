//--- Apps Script Backend API ---
const API_URL = "https://script.google.com/macros/s/AKfycbxCpu621IJVuRqhcmTs0vYZoEk097KBJllJJSMcJY-axN5zeP0yBXLgFPAp8_m_nZ9W/exec";

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

//--- Interacciones de la interfaz ---
function openRoom(roomNumber) {
    alert('Abrir detalle de la habitación ' + roomNumber);
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
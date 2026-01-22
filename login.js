//--- Apps Script Backend API ---
const API_URL = "https://script.google.com/macros/s/AKfycbxCpu621IJVuRqhcmTs0vYZoEk097KBJllJJSMcJY-axN5zeP0yBXLgFPAp8_m_nZ9W/exec";

//--- Función de inicio de sesión ---
function login() {
  const numDoc = document.getElementById("numDoc").value.trim();
  const password = document.getElementById("password").value.trim();

  fetch(`${API_URL}?action=login&num_doc=${numDoc}&password=${password}`)
    .then(res => res.json())
    .then(data => {
      if (!data.success) {
        document.getElementById("error").classList.remove("d-none");
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      window.location.href = "index.html";
    });
}
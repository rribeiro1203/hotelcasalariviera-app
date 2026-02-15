const permissionsData = {
  HOTEL: [
    { name: "Habitaciones", icon: "bi-door-open" },
    { name: "Reservas", icon: "bi-calendar-check" },
    { name: "Ingresos Hotel", icon: "bi-cash-stack" },
    { name: "Gastos Hotel", icon: "bi-receipt" },
    { name: "Extranjeros", icon: "bi-passport" },
    { name: "Clientes", icon: "bi-people" },
    { name: "Empresas", icon: "bi-building" },
    { name: "Expedia", icon: "bi-globe" }
  ],
  MINIBAR: [
    { name: "Ingresos Minibar", icon: "bi-cash" },
    { name: "Gastos Minibar", icon: "bi-receipt-cutoff" },
    { name: "Inventario Minibar", icon: "bi-box-seam" }
  ],
  GERENCIA: [
    { name: "Auditoria", icon: "bi-search" },
    { name: "Reportes", icon: "bi-bar-chart" },
    { name: "Empleados", icon: "bi-person-badge" },
    { name: "Roles & Accesos", icon: "bi-shield-lock" }
  ]
};

function selectRole(element) {
  document.querySelectorAll("#rolesList .list-group-item")
    .forEach(item => item.classList.remove("active"));

  element.classList.add("active");

  const roleName = element.dataset.role;
  document.getElementById("roleTitle").innerText = "Permisos - " + roleName;

  renderPermissions(roleName);
}
// Hace selectRole una función global
window.selectRole = selectRole;

function renderPermissions(roleName) {
  const container = document.getElementById("permissionsContainer");
  container.innerHTML = "";

  Object.keys(permissionsData).forEach(section => {

    const sectionTitle = document.createElement("div");
    sectionTitle.className = "permission-section-title";
    sectionTitle.innerText = section;
    container.appendChild(sectionTitle);

    permissionsData[section].forEach(menu => {

      const row = document.createElement("div");
      row.className = "permission-row";

      row.innerHTML = `
        <div class="permission-name">
          <i class="bi ${menu.icon} me-2"></i>
          ${menu.name}
        </div>

        <div class="permission-options d-flex">
          <div class="form-check">
            <input class="form-check-input" type="radio" name="${roleName}-${menu.name}" checked>
            <label class="form-check-label">Sin acceso</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="${roleName}-${menu.name}">
            <label class="form-check-label">Lector</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="${roleName}-${menu.name}">
            <label class="form-check-label">Editor</label>
          </div>
        </div>
      `;

      container.appendChild(row);
    });

  });
}

//--- Función de Inicialización
export function initRolesPage() {
  const firstRole = document.querySelector("#rolesList .list-group-item");
  if (firstRole) {
    firstRole.classList.add("active");
    selectRole(firstRole);
  }
  initTooltips();
}

//-- Tooltips
function initTooltips() {
  const tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
}
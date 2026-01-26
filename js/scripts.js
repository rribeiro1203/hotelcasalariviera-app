// Variables globales
window.perfilUsuario = null


window.protegerRuta = async function () {
  const loader = document.getElementById('appLoader')
  const app = document.getElementById('appContent')

  // 1️⃣ Obtener sesión (NO usuario)
  const { data: { session }, error } =
    await window.supabaseClient.auth.getSession()

  if (error || !session) {
    window.location.href = 'login/login.html'
    return
  }

  // 2️⃣ Ahora sí, el usuario existe
  await cargarPerfilSidebar()

  // 3️⃣ Mostrar app con transición
  setTimeout(() => {
    loader.style.opacity = '0'
    app.classList.remove('app-hidden')
    app.classList.add('app-visible')

    setTimeout(() => loader.remove(), 400)
  }, 200)

  console.log('Session:', session)
}

window.cargarPerfilSidebar = async function () {
  // Obtener usuario autenticado
  const { data: { user } } = await window.supabaseClient.auth.getUser()

   if (!user) {
    window.location.replace('login/login.html')
    return
  }

  const { data: perfil, error } = await window.supabaseClient
    .from('empleados')
    .select('nombre_completo, cargo, tipo_doc, num_doc')
    .eq('id', user.id)
    .single()

  if (error || !perfil) {
    console.error('Error cargando perfil', error)
    return
  }

  // 🔹 GUARDAMOS PERFIL EN MEMORIA
  window.perfilUsuario = perfil

  // Pintar en el sidebar
  renderUser(perfil)
}

function renderUser(perfil) {
  const avatar = document.getElementById('userAvatar')
  const name = document.getElementById('userName')
  const role = document.getElementById('userRole')

  if (!avatar || !name || !role) return

  // Avatar (iniciales)
  const iniciales = perfil.nombre_completo
    .split(' ')
    .slice(0, 2)
    .map(p => p[0])
    .join('')
    .toUpperCase()

  avatar.textContent = iniciales
  name.textContent = perfil.nombre_completo
  role.textContent = perfil.cargo
}

//--- Función de cierre de sesión ---
window.logout = async function () {
  try {
    await window.supabaseClient.auth.signOut()
  } catch (e) {
    console.error('Error al cerrar sesión', e)
  }

  localStorage.removeItem('user')

  // Redirigir al login
  window.location.replace('login/login.html')
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

//--- Abrir modal + cargar datos ---
/*
window.abrirPerfil = function () {
  const modal = new bootstrap.Modal(document.getElementById('perfilModal'))
  modal.show()

  if (!window.perfilUsuario) return

  // Pintar datos
  document.getElementById('perfilNombre').value  = window.perfilUsuario.nombre_completo
  document.getElementById('perfilCargo').value   = window.perfilUsuario.cargo
  document.getElementById('perfilTipoDoc').value = window.perfilUsuario.tipo_doc
  document.getElementById('perfilNumDoc').value  =window.perfilUsuario.num_doc
}
*/
window.abrirPerfil = function () {
  const modalEl = document.getElementById('perfilModal')

  if (!modalEl) {
    console.error('❌ perfilModal no existe en el DOM')
    return
  }

  if (typeof bootstrap === 'undefined') {
    console.error('❌ Bootstrap JS no está cargado')
    return
  }

  const modal = bootstrap.Modal.getOrCreateInstance(modalEl)
  modal.show()

  if (!window.perfilUsuario) return

  document.getElementById('perfilNombre').value  = window.perfilUsuario.nombre_completo
  document.getElementById('perfilCargo').value   = window.perfilUsuario.cargo
  document.getElementById('perfilTipoDoc').value = window.perfilUsuario.tipo_doc
  document.getElementById('perfilNumDoc').value  = window.perfilUsuario.num_doc
}


//--- Cambiar contraseña ---
window.cambiarPassword = async function () {
  const pass1 = document.getElementById('newPassword').value
  const pass2 = document.getElementById('confirmPassword').value
  const msg = document.getElementById('passwordMsg')

  msg.classList.add('d-none')

  if (!pass1 || pass1.length < 6) {
    msg.textContent = 'La contraseña debe tener al menos 6 caracteres'
    msg.classList.remove('d-none')
    return
  }

  if (pass1 !== pass2) {
    msg.textContent = 'Las contraseñas no coinciden'
    msg.classList.remove('d-none')
    return
  }

  const { error } = await window.supabaseClient.auth.updateUser({
    password: pass1
  })

  if (error) {
    msg.textContent = 'Error al cambiar la contraseña'
    msg.classList.remove('d-none')
    return
  }

  // Muestra mensaje de éxito
  alert('Contraseña actualizada correctamente')

  // Limpiar inputs
  document.getElementById('newPassword').value = ''
  document.getElementById('confirmPassword').value = ''

  // Cerrar modal
  const perfilModal = bootstrap.Modal.getInstance(document.getElementById('perfilModal'))
  perfilModal.hide()
}

//--- Mostrar / ocultar contraseña ---
window.togglePassword = function (inputId, btn) {
  const input = document.getElementById(inputId)
  const icon = btn.querySelector('i')

  if (!input) return

  if (input.type === 'password') {
    input.type = 'text'
    icon.classList.remove('bi-eye')
    icon.classList.add('bi-eye-slash')
  } else {
    input.type = 'password'
    icon.classList.remove('bi-eye-slash')
    icon.classList.add('bi-eye')
  }
}


// Esto garantiza que el DOM exista, el loader esté visible y Supabase valide sesión
document.addEventListener('DOMContentLoaded', async () => {
  await loadLayout()      // ⬅️ primero layout + modal
  await protegerRuta()    // ⬅️ luego lógica de sesión
})
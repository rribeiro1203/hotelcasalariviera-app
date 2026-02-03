import { supabaseClient } from '../../js/supabase.js';

// 🔹 Función de login
async function login(event) {
  event.preventDefault(); // ⛔ evita recarga de página

  const numDoc = document.getElementById('numDoc').value.trim();
  const password = document.getElementById('password').value.trim();
  const errorDiv = document.getElementById('error');

  errorDiv.classList.add('d-none');

  if (!numDoc || !password) {
    errorDiv.innerText = 'Complete todos los campos';
    errorDiv.classList.remove('d-none');
    return;
  }

  // 🔐 Auth
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    // Como los empleados entraran con su número de documento, pero supabase
    // necesita un email, creamos un email ficticio con el número de documento
    email: `${numDoc}@hotel.local`,
    password
  });

  if (error) {
    errorDiv.innerText = 'Credenciales inválidas';
    errorDiv.classList.remove('d-none');
    return;
  }

   // 📄 Datos del empleado
  const { data: empleado, error: empError } =
  await supabaseClient
    .from('empleados')
    .select('*')
    .eq('id', data.user.id)
    .single();

  if (empError) {
    console.error(empError);
  }

  // ✅ Login OK → guardar sesión
  localStorage.setItem('user', JSON.stringify(empleado));

  // 🚀 Redirigir al dashboard
  window.location.href = '../../index.html';
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

window.login = login;   // 👈 CLAVE para que el HTML puede llamarr a la función onsubmit en el form

/*
Debug en la consola:
JSON.parse(localStorage.getItem('user'))
*/
// 🔹 Función de login
window.login = async function () {
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
  const { data, error } = await window.supabaseClient.auth.signInWithPassword({
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
  await window.supabaseClient
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
  window.location.href = '../index.html';
}

/*
Debug en la consola:
JSON.parse(localStorage.getItem('user'))
*/
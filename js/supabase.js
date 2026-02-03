import ENV from './env.js';

// 🔹 Inicializar Supabase según el ambiente en que estamos
const CONFIG = {
  // Supabase: Project Settings > Data API > Project URL
  // Supabase: Project Settings > API Keys > Legacy anon, service_role API Keys > anon public
  dev: {
    url: 'https://pbevuoiiqecuyqmetjic.supabase.co',
    key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBiZXZ1b2lpcWVjdXlxbWV0amljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwNTgwNTksImV4cCI6MjA4NTYzNDA1OX0.-0el6ewHU0FwZ83p3B_l-DCWlU7mPRgUjKp_y_GZuIU'
  },
  test: {
    url: 'https://pbevuoiiqecuyqmetjic.supabase.co',
    key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBiZXZ1b2lpcWVjdXlxbWV0amljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwNTgwNTksImV4cCI6MjA4NTYzNDA1OX0.-0el6ewHU0FwZ83p3B_l-DCWlU7mPRgUjKp_y_GZuIU'
  },
  prod: {
    url: 'https://ejtthyduoqbeelfztjub.supabase.co',
    key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqdHRoeWR1b3FiZWVsZnp0anViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkxMjc1ODksImV4cCI6MjA4NDcwMzU4OX0.MPBWeivDSPIj35dJbQXq4fuMlYDa2B0B99HJiZXupvA'
  }
};

if (!CONFIG[ENV]) {
  console.error('❌ ENV inválido:', ENV);
  throw new Error('ENV no válido');
}

const supabaseClient = window.supabase.createClient(
  CONFIG[ENV].url,
  CONFIG[ENV].key
);

// 🌍 Disponible globalmente para scripts.js
window.supabaseClient = supabaseClient;
console.log('✅ Supabase inicializado en:', ENV);

export { supabaseClient };
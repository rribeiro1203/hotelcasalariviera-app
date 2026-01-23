// 🔹 Inicializar Supabase
const SUPABASE_URL = 'https://ejtthyduoqbeelfztjub.supabase.co' // Project URL
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqdHRoeWR1b3FiZWVsZnp0anViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkxMjc1ODksImV4cCI6MjA4NDcwMzU4OX0.MPBWeivDSPIj35dJbQXq4fuMlYDa2B0B99HJiZXupvA' // anon public key

window.supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
)
---------------------------------------------
⚠️ IMPORTANTE
---------------------------------------------
📌 Al utilizar partials, se requiere servir los archivos desde un servidor, y no abrir con doble click el index.html en local.
En el TERMINAL en la carpeta del proyecto, ejecutar: 
  python -m http.server   // para inciciar un servidor local
  Ctrl + C                // para detener el servidor
  http://localhost:8000   // para abrir en el navegador


---------------------------------------------
💡 ARQUITECTURA
---------------------------------------------
	•	GitHub → código fuente (branches: main y test)
	•	Netlify → hosting del frontend (sirve la app)
	•	Wix → solo administra el Dominio y Subdominios (DNS)

GitHub (repo): hotelcasalariviera-app (branches)
│
├── main  ──▶ Netlify Site #1 (deploy automático) ──▶ app.hotelcasalariviera.com    (Wix - subdominio PROD / Administra los registros DNS > CNAME apuntando a la URL dada por Netlify)
│
└── test  ──▶ Netlify Site #2 (deploy automático) ──▶ test.hotelcasalariviera.com   (Wix - subdominio TEST / Administra los registros DNS > CNAME apuntando a la URL dada por Netlify)

BASE DE DATOS:
app.hotelcasalariviera.com (PROD)                   ──▶ (Supabase) hotelcasalariviera-app
test.hotelcasalariviera.com (TEST)                  ──▶ (Supabase) hotelcasalariviera-test
http://localhost:8000/pages/login/login.html (DEV)  ──▶ (Supabase) hotelcasalariviera-test


---------------------------------------------
🗄️ DOWNLOAD SUPABASE DATABASE SCHEMA
---------------------------------------------
Goal: Get the SQL Schema only with the structure (tables, columns, constraints), NO data, and run it in another project to create the same schema (to sync PROD > TEST environments database structure).

TERMINAL:

Preparation:
% brew install supabase/tap/supabase 		        // Install Supabase using CLI
% supabase --version				                // Verify installed version
https://www.docker.com/products/docker-desktop/	    // Install Docker Desktop

Execution:
% supabase login
% mkdir supabase-export				                // First time only
% cd supabase-export
% supabase link --project-ref TU_PROJECT_REF	
// Supabase Dashboard → Project Settings → General →Project ID

// Export ONLY the structure (schema)
% supabase db dump \
  --linked \
  --schema public \
  --file schema.sql
		
// View the file Microsoft Visual Studio
% open schema.sql					                // Copy the code
In Supabase: SQL Editor > New Query > Paste the code > Run

// To access the file in the folder:
rodang/supabase-export
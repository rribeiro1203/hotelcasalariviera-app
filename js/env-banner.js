import ENV from './env.js'

// Muestra un banner en la parte superior indicando el entorno actual
document.addEventListener('DOMContentLoaded', () => {
  const banner = document.getElementById('env-banner')
  if (!banner) return

  banner.classList.add('env-banner')

  if (ENV === 'dev') {
    banner.classList.add('env-dev')
    banner.textContent = 'DEV'
    document.body.classList.add('has-env-banner')
    return
  }

  if (ENV === 'test') {
    banner.classList.add('env-test')
    banner.textContent = 'TEST'
    document.body.classList.add('has-env-banner')
    return
  }

  // PROD → no banner
  banner.remove()
})
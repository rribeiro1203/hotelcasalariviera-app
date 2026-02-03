// Detección de ambiente según el hostname
const ENV = (() => {
  const host = window.location.hostname;

  if (host.includes('localhost')) return 'dev';
  if (host.includes('test.')) return 'test';
  return 'prod';
})();

export default ENV;
export function isExpired(timestamp) {
  const dataAtual = Math.floor(Date.now() / 1000); // Data atual em UNIX timestamp em segundos
  return timestamp < dataAtual; // Retorna true se o timestamp expirou, caso contrário retorna false
}
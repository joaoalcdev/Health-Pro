
export function formatPhoneNumber(number) {
  // Removendo caracteres não numéricos

  if (!number) return '-';
  let phoneNumber = number.replace(/\D/g);

  // Verificando se o número tem 11 dígitos
  if (phoneNumber.length === 11) {
    const newNumber = `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 3)} ${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7)}`

    return newNumber;
  } else {
    return 'Número de telefone inválido.';
  }
}




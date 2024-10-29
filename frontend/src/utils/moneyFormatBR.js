export function moneyFormat2BR(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
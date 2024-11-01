export function formatToBRL(value) {
  const formattedValue = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);

  return `R$ ${formattedValue.replace(/^R\$\s?/, '')}`;
}

export function formatToUSD(value) {
  return new Intl.NumberFormat('en-US',  {
    style: 'currency',
    currency: 'USD'
  }).format(value);
}
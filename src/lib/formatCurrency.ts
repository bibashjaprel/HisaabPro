export function formatCurrency(amount: number, compact = false): string {
  const formatter = new Intl.NumberFormat('en-NP', {
    notation: compact ? 'compact' : 'standard',
    maximumFractionDigits: 2,
  });

  return `Rs ${formatter.format(amount)}`;
}

export function formatCurrencyNepali(amount: number): string {
  const formatter = new Intl.NumberFormat('ne-NP', {
    maximumFractionDigits: 2,
  });

  return `रु ${formatter.format(amount)}`;
}

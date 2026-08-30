const CURRENCY_FORMATTER = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
});

export function formatCurrency(value) {
  return CURRENCY_FORMATTER.format(value);
}
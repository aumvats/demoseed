export function CurrencyCell({
  value,
}: {
  value: { amount: number; code: string };
}) {
  const formatted = new Intl.NumberFormat("en", {
    style: "currency",
    currency: value.code,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value.amount);

  return (
    <span className="text-[13px] font-medium text-ds-text-primary font-data tabular-nums text-right block">
      {formatted}
    </span>
  );
}

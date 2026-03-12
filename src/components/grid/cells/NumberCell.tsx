export function NumberCell({ value }: { value: number }) {
  return (
    <span className="text-[13px] text-ds-text-primary font-data tabular-nums">
      {value.toLocaleString()}
    </span>
  );
}

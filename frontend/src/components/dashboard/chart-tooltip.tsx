interface ChartTooltipEntry {
  name: string;
  value: number;
  color: string;
}

interface ChartTooltipProps {
  active?: boolean;
  payload?: ChartTooltipEntry[];
  label?: string;
  valueFormatter?: (value: number, name?: string) => string;
}

export function ChartTooltip({
  active,
  payload,
  label,
  valueFormatter,
}: ChartTooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border border-border bg-card px-4 py-3 shadow-lg text-sm">
      {label ? (
        <p className="mb-2 font-semibold text-foreground">{label}</p>
      ) : null}
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 py-0.5">
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="capitalize text-muted-foreground">{entry.name}:</span>
          <span className="ml-auto pl-4 font-medium text-foreground">
            {valueFormatter
              ? valueFormatter(entry.value, entry.name)
              : entry.value}
          </span>
        </div>
      ))}
    </div>
  );
}

type AdSlotProps = {
  label: string;
  compact?: boolean;
};

export function AdSlot({ label, compact = false }: AdSlotProps) {
  return (
    <div
      className={`rounded-[24px] border border-dashed border-[color:var(--border-strong)] bg-[color:var(--surface-muted)] text-center ${
        compact ? "px-4 py-5" : "px-5 py-7"
      }`}
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:var(--text-muted)]">
        Monetization Slot
      </p>
      <p className="mt-2 text-sm text-[color:var(--text-secondary)]">{label}</p>
    </div>
  );
}

// Controlled component — parent owns the state, passes value + onChange
// Same pattern as demonstrated in lecture (QuantityStepper)
function QuantityStepper({ value = 0, onChange, min = 0, max = 10, label = 'Weekly Sessions' }) {
  return (
    <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
      <span className="text-xs text-text-muted font-medium">{label}:</span>
      <div className="inline-flex items-center rounded-lg border border-border bg-[#161616] p-0.5">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          aria-label="Decrease quantity"
          className="w-7 h-7 flex items-center justify-center rounded text-sm font-bold text-text-secondary hover:text-accent hover:bg-card disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          −
        </button>
        <span className="w-8 text-center text-sm font-bold text-text-primary">
          {value}
        </span>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          aria-label="Increase quantity"
          className="w-7 h-7 flex items-center justify-center rounded text-sm font-bold text-text-secondary hover:text-accent hover:bg-card disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default QuantityStepper;

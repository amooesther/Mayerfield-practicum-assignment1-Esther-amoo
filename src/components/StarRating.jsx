// Controlled component — parent owns the state, passes value + onChange
function StarRating({ value = 0, onChange, max = 5 }) {
  return (
    <div className="flex items-center gap-2 mt-3">
      <div className="flex gap-1" role="radiogroup" aria-label="Trainer rating">
        {Array.from({ length: max }, (_, i) => i + 1).map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            aria-label={`Rate ${star} of ${max} stars`}
            aria-checked={star === value}
            role="radio"
            className={`text-xl leading-none transition-colors ${
              star <= value ? 'text-accent' : 'text-text-muted hover:text-accent/60'
            }`}
          >
            ★
          </button>
        ))}
      </div>
      {value > 0 && (
        <span className="text-xs text-text-muted font-medium">
          ({value}/{max})
        </span>
      )}
    </div>
  );
}

export default StarRating;

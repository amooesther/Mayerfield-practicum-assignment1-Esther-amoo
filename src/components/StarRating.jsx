// Controlled component — parent owns the state, passes value+onChange
function StarRating({ value, onChange, max = 5 }) {
  return (
    <div className="flex gap-1 mt-3">
      {Array.from({ length: max }, (_, i) => i + 1).map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
          className={`text-xl leading-none transition-colors ${
            star <= value ? 'text-accent' : 'text-text-muted'
          }`}
        >
          ★
        </button>
      ))}
    </div>
  );
}
export default StarRating;

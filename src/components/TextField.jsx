function TextField({ id, label, type, value, onChange, error, hint, autoComplete }) {
  const describedBy = (hint ? id + "-hint " : "") + (error ? id + "-error" : "");

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {hint && (
        <span id={id + "-hint"} className="small">
          {hint}
        </span>
      )}
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={describedBy.trim() || undefined}
      />
      {error && (
        <p id={id + "-error"} className="error-text">
          Error: {error}
        </p>
      )}
    </div>
  );
}

export default TextField;

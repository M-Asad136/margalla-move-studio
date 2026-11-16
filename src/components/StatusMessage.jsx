function StatusMessage({ status, onRetry }) {
  if (status === "loading") {
    return (
      <p className="notice" role="status">
        Loading the timetable...
      </p>
    );
  }

  if (status === "error") {
    return (
      <div className="notice notice-error" role="alert">
        <p>Error: the timetable could not be loaded.</p>
        <button type="button" className="button" onClick={onRetry}>
          Try again
        </button>
      </div>
    );
  }

  return null;
}

export default StatusMessage;

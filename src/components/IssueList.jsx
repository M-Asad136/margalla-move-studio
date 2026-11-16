function IssueList({ issues, onAdjust, onRemove }) {
  if (issues.length === 0) {
    return null;
  }

  return (
    <div className="notice notice-error" role="alert">
      <h2>Fix these before you continue</h2>
      <ul>
        {issues.map((issue) => (
          <li key={issue.id + issue.message}>
            <p>{issue.message}</p>
            {issue.fix === "adjust" && (
              <button type="button" className="button button-secondary" onClick={() => onAdjust(issue.id, issue.suggested)}>
                Change to {issue.suggested} attendee(s)
              </button>
            )}
            {issue.fix === "remove" && (
              <button type="button" className="button button-secondary" onClick={() => onRemove(issue.id)}>
                Remove this class
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default IssueList;

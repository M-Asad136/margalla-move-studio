import { useLocation, useSearchParams } from "react-router-dom";
import ClassCard from "../components/ClassCard.jsx";
import SearchControls from "../components/SearchControls.jsx";
import StatusMessage from "../components/StatusMessage.jsx";
import { useStudio } from "../context/StudioContext.jsx";
import { getRelaxSuggestions, getVisibleClasses } from "../utils/listing.js";

function readOptions(params) {
  return {
    q: params.get("q") || "",
    category: params.get("category") || "",
    level: params.get("level") || "",
    onlyAvailable: params.get("open") === "1",
    sort: params.get("sort") || "earliest",
  };
}

function getPlanAttendees(plan, id) {
  const entry = plan.find((planEntry) => planEntry.id === id);
  return entry ? entry.attendees : 0;
}

function Classes() {
  const { classes, status, reload, plan } = useStudio();
  const [params, setParams] = useSearchParams();
  const location = useLocation();
  const options = readOptions(params);

  function changeOption(name, value) {
    setParams(
      (oldParams) => {
        const newParams = new URLSearchParams(oldParams);
        if (value === "") {
          newParams.delete(name);
        } else {
          newParams.set(name, value);
        }
        return newParams;
      },
      { replace: true }
    );
  }

  function clearFilters() {
    setParams({}, { replace: true });
  }

  if (status !== "ready") {
    return (
      <section>
        <h1>Classes</h1>
        <StatusMessage status={status} onRetry={reload} />
      </section>
    );
  }

  const visible = getVisibleClasses(classes, options);
  const linkState = { from: location.search };
  const suggestions = getRelaxSuggestions(classes, options);

  return (
    <section>
      <h1>Classes</h1>
      <SearchControls values={options} onChange={changeOption} onClear={clearFilters} />

      <p className="result-count" role="status">
        Showing {visible.length} of {classes.length} classes
      </p>

      {classes.length === 0 && (
        <div className="notice">
          <h2>No classes are scheduled right now</h2>
          <p>The timetable is empty. New classes are added every Sunday, so please check again soon.</p>
        </div>
      )}

      {classes.length > 0 && visible.length === 0 && (
        <div className="notice">
          <h2>No classes match your search</h2>
          <p>Try one of these changes:</p>
          <ul>
            {suggestions.map((suggestion) => (
              <li key={suggestion.name}>
                <button type="button" className="button button-secondary" onClick={() => changeOption(suggestion.name, "")}>
                  Remove the {suggestion.label} ({suggestion.count === 1 ? "1 class" : suggestion.count + " classes"} would show)
                </button>
              </li>
            ))}
          </ul>
          <button type="button" className="button" onClick={clearFilters}>
            Clear filters
          </button>
        </div>
      )}

      <ul className="card-grid">
        {visible.map((item) => (
          <ClassCard key={item.id} item={item} linkState={linkState} planAttendees={getPlanAttendees(plan, item.id)} />
        ))}
      </ul>
    </section>
  );
}

export default Classes;

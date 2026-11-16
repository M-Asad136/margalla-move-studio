import { useState } from "react";
import { readFlags, saveFlags } from "../api/demoFlags.js";
import { useStudio } from "../context/StudioContext.jsx";

function DemoPanel() {
  const { reload } = useStudio();
  const [flags, setFlags] = useState(readFlags);

  function handleChange(event) {
    const { name, checked } = event.target;
    const newFlags = { ...flags, [name]: checked };
    setFlags(newFlags);
    saveFlags(newFlags);
  }

  return (
    <details className="demo-panel">
      <summary>Demo controls (for testing edge cases)</summary>
      <p className="small">Change a setting, then press "Reload timetable" to apply it.</p>

      <div className="field field-check">
        <input id="failLoading" name="failLoading" type="checkbox" checked={flags.failLoading} onChange={handleChange} />
        <label htmlFor="failLoading">Make loading fail</label>
      </div>
      <div className="field field-check">
        <input
          id="changedAvailability"
          name="changedAvailability"
          type="checkbox"
          checked={flags.changedAvailability}
          onChange={handleChange}
        />
        <label htmlFor="changedAvailability">Change seats (HIIT Burn: 1 left, Power Yoga: full)</label>
      </div>
      <div className="field field-check">
        <input id="emptyTimetable" name="emptyTimetable" type="checkbox" checked={flags.emptyTimetable} onChange={handleChange} />
        <label htmlFor="emptyTimetable">Empty timetable</label>
      </div>

      <button type="button" className="button button-secondary" onClick={reload}>
        Reload timetable
      </button>
    </details>
  );
}

export default DemoPanel;

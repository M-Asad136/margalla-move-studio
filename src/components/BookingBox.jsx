import { useState } from "react";
import { MAX_ATTENDEES, MIN_ATTENDEES, checkAttendees } from "../rules/attendeeRule.js";
import { describeLevelRequirement } from "../rules/levelRule.js";
import { GROUP_DISCOUNT_PERCENT, GROUP_MIN_ATTENDEES, calculateLinePrice } from "../rules/pricingRule.js";
import { formatPrice } from "../utils/format.js";

function BookingBox({ item, savedAttendees, onAdd, onRemove }) {
  const [value, setValue] = useState(String(savedAttendees || 1));
  const attendees = Number(value);
  const result = checkAttendees(attendees, item.seatsLeft);
  const price = result.valid ? calculateLinePrice(item.price, attendees) : null;
  const inPlan = savedAttendees > 0;

  function handleSubmit(event) {
    event.preventDefault();
    if (result.valid) {
      onAdd(item.id, attendees);
    }
  }

  return (
    <form className="booking-box" onSubmit={handleSubmit}>
      <h2>Book this class</h2>

      <ul className="rule-list">
        <li>
          Attendees: {MIN_ATTENDEES} to {MAX_ATTENDEES} per booking, up to the seats left ({item.seatsLeft}).
        </li>
        <li>Level: {describeLevelRequirement(item.level)}.</li>
        <li>
          Group price: {GROUP_DISCOUNT_PERCENT}% off when you book {GROUP_MIN_ATTENDEES} or more people.
        </li>
      </ul>

      <div className="field">
        <label htmlFor="attendees">Number of attendees</label>
        <input
          id="attendees"
          type="number"
          inputMode="numeric"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          aria-invalid={!result.valid}
          aria-describedby="attendees-message"
        />
      </div>

      <p id="attendees-message" className={result.valid ? "ok-text" : "error-text"} role="status">
        {result.valid ? "Seats are available for this number of attendees." : "Error: " + result.message}
      </p>

      {price && (
        <p className="price-line">
          Price for this class: {formatPrice(price.total)}
          {price.discount > 0 && " (group discount of " + formatPrice(price.discount) + " applied)"}
        </p>
      )}

      <div className="button-row">
        <button type="submit" className="button" disabled={!result.valid}>
          {inPlan ? "Update plan" : "Add to plan"}
        </button>
        {inPlan && (
          <button type="button" className="button button-secondary" onClick={() => onRemove(item.id)}>
            Remove from plan
          </button>
        )}
      </div>
    </form>
  );
}

export default BookingBox;

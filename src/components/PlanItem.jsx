import { Link } from "react-router-dom";
import { MAX_ATTENDEES } from "../rules/attendeeRule.js";
import { calculateLinePrice } from "../rules/pricingRule.js";
import { formatPrice } from "../utils/format.js";

function PlanItem({ line, onChangeAttendees, onRemove }) {
  const { item } = line;
  const price = calculateLinePrice(item.price, line.attendees);
  const options = [];
  for (let number = 1; number <= MAX_ATTENDEES; number++) {
    options.push(number);
  }

  return (
    <li className="plan-item">
      <div>
        <h3>
          <Link to={"/classes/" + item.id}>{item.name}</Link>
        </h3>
        <p className="card-meta">
          {item.day} {item.time} | {item.level} | {formatPrice(item.price)} per person
        </p>
        <p className="card-price">Line total: {formatPrice(price.total)}</p>
      </div>

      <div className="plan-actions">
        <div className="field">
          <label htmlFor={"attendees-" + item.id}>Attendees</label>
          <select
            id={"attendees-" + item.id}
            value={line.attendees}
            onChange={(event) => onChangeAttendees(item.id, Number(event.target.value))}
          >
            {options.map((number) => (
              <option key={number} value={number}>
                {number}
              </option>
            ))}
          </select>
        </div>
        <button type="button" className="button button-secondary" onClick={() => onRemove(item.id)}>
          Remove
        </button>
      </div>
    </li>
  );
}

export default PlanItem;

import { Link } from "react-router-dom";
import { useStudio } from "../context/StudioContext.jsx";
import { calculateLinePrice } from "../rules/pricingRule.js";
import { formatPrice } from "../utils/format.js";

function Confirmation() {
  const { booking } = useStudio();

  if (!booking) {
    return (
      <section className="notice">
        <h1>No booking to show</h1>
        <p>You have not completed a booking in this visit.</p>
        <Link className="button" to="/classes">
          Browse classes
        </Link>
      </section>
    );
  }

  return (
    <section>
      <h1>Booking confirmed (simulated)</h1>
      <p className="notice notice-ok" role="status">
        Success: your booking reference is <strong>{booking.reference}</strong>. No payment was taken and no real seats
        were reserved.
      </p>

      <h2>Your classes</h2>
      <ul className="plan-list">
        {booking.lines.map((line) => (
          <li key={line.id} className="plan-item">
            <div>
              <h3>{line.item.name}</h3>
              <p className="card-meta">
                {line.item.day} {line.item.time} | {line.attendees} attendee(s)
              </p>
            </div>
            <p className="card-price">{formatPrice(calculateLinePrice(line.item.price, line.attendees).total)}</p>
          </li>
        ))}
      </ul>

      <p className="card-price">Total to pay at the studio: {formatPrice(booking.totals.total)}</p>

      <Link className="button" to="/classes">
        Book more classes
      </Link>
    </section>
  );
}

export default Confirmation;

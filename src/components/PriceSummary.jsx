import { calculatePlanTotals } from "../rules/pricingRule.js";
import { formatPrice } from "../utils/format.js";

function PriceSummary({ lines }) {
  const totals = calculatePlanTotals(lines);

  return (
    <section className="summary" aria-label="Booking summary">
      <h2>Summary</h2>
      <dl className="facts">
        <dt>Classes</dt>
        <dd>{totals.classCount}</dd>
        <dt>Total attendees</dt>
        <dd>{totals.seatCount}</dd>
        <dt>Class time</dt>
        <dd>{totals.minutes} min per attendee</dd>
        <dt>Subtotal</dt>
        <dd>{formatPrice(totals.subtotal)}</dd>
        <dt>Group discount</dt>
        <dd>- {formatPrice(totals.discount)}</dd>
        <dt>Total to pay at the studio</dt>
        <dd className="total">{formatPrice(totals.total)}</dd>
      </dl>
    </section>
  );
}

export default PriceSummary;

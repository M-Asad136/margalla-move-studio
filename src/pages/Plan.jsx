import { Link } from "react-router-dom";
import IssueList from "../components/IssueList.jsx";
import PlanItem from "../components/PlanItem.jsx";
import PriceSummary from "../components/PriceSummary.jsx";
import StatusMessage from "../components/StatusMessage.jsx";
import { useStudio } from "../context/StudioContext.jsx";
import { checkPlan, getKnownLines, joinPlan } from "../rules/planRules.js";

function Plan() {
  const { classes, status, reload, plan, addToPlan, removeFromPlan } = useStudio();

  if (status !== "ready") {
    return (
      <section>
        <h1>My plan</h1>
        <StatusMessage status={status} onRetry={reload} />
      </section>
    );
  }

  if (plan.length === 0) {
    return (
      <section className="notice">
        <h1>My plan</h1>
        <p>Your plan is empty. Pick a class and choose how many people are coming.</p>
        <Link className="button" to="/classes">
          Browse classes
        </Link>
      </section>
    );
  }

  const lines = joinPlan(plan, classes);
  const knownLines = getKnownLines(lines);
  const issues = checkPlan(lines);

  return (
    <section>
      <h1>My plan</h1>
      <IssueList issues={issues} onAdjust={addToPlan} onRemove={removeFromPlan} />

      <div className="two-columns">
        <ul className="plan-list">
          {knownLines.map((line) => (
            <PlanItem key={line.id} line={line} onChangeAttendees={addToPlan} onRemove={removeFromPlan} />
          ))}
        </ul>

        <div>
          <PriceSummary lines={knownLines} />
          {issues.length === 0 ? (
            <Link className="button" to="/checkout">
              Continue to checkout
            </Link>
          ) : (
            <p className="error-text">Fix the problems above to continue.</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Plan;

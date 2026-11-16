import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import IssueList from "../components/IssueList.jsx";
import PriceSummary from "../components/PriceSummary.jsx";
import StatusMessage from "../components/StatusMessage.jsx";
import TextField from "../components/TextField.jsx";
import { useStudio } from "../context/StudioContext.jsx";
import { LEVELS } from "../rules/levelRule.js";
import { validateForm } from "../rules/formRules.js";
import { calculatePlanTotals } from "../rules/pricingRule.js";
import { checkExperience, checkPlan, getKnownLines, joinPlan } from "../rules/planRules.js";

const emptyForm = { name: "", email: "", phone: "", experience: "", terms: false };

function makeReference() {
  return "MMS-" + Math.floor(10000 + Math.random() * 90000);
}

function Checkout() {
  const { classes, status, reload, plan, addToPlan, removeFromPlan, clearPlan, setBooking } = useStudio();
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  if (status !== "ready") {
    return (
      <section>
        <h1>Checkout</h1>
        <StatusMessage status={status} onRetry={reload} />
      </section>
    );
  }

  if (plan.length === 0) {
    return (
      <section className="notice">
        <h1>Checkout</h1>
        <p>There is nothing to book yet.</p>
        <Link className="button" to="/classes">
          Browse classes
        </Link>
      </section>
    );
  }

  const lines = joinPlan(plan, classes);
  const knownLines = getKnownLines(lines);
  const planIssues = checkPlan(lines);
  const experienceIssues = checkExperience(lines, form.experience);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((oldForm) => ({ ...oldForm, [name]: value }));
    setErrors((oldErrors) => ({ ...oldErrors, [name]: "" }));
  }

  function handleTermsChange(event) {
    const checked = event.target.checked;
    setForm((oldForm) => ({ ...oldForm, terms: checked }));
    setErrors((oldErrors) => ({ ...oldErrors, terms: "" }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const newErrors = validateForm(form);
    setErrors(newErrors);

    const hasFormErrors = Object.keys(newErrors).length > 0;
    if (hasFormErrors || planIssues.length > 0 || experienceIssues.length > 0) {
      return;
    }

    setBooking({
      reference: makeReference(),
      lines: knownLines,
      totals: calculatePlanTotals(knownLines),
    });
    clearPlan();
    navigate("/confirmation");
  }

  const errorMessages = Object.values(errors).filter((message) => message !== "");

  return (
    <section>
      <h1>Checkout</h1>
      <p className="small">This is a simulated booking. Do not enter real payment details.</p>
      <IssueList issues={planIssues} onAdjust={addToPlan} onRemove={removeFromPlan} />

      <div className="two-columns">
        <form onSubmit={handleSubmit} noValidate>
          <h2>Your details</h2>

          {errorMessages.length > 0 && (
            <div className="notice notice-error" role="alert">
              <p>Please correct {errorMessages.length} field(s) below. Your other answers are kept.</p>
            </div>
          )}

          <TextField
            id="name"
            label="Full name"
            type="text"
            value={form.name}
            onChange={handleChange}
            error={errors.name}
            autoComplete="name"
          />
          <TextField
            id="email"
            label="Email"
            type="email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
            autoComplete="email"
          />
          <TextField
            id="phone"
            label="Mobile number"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            error={errors.phone}
            hint="Example: 0300 1234567"
            autoComplete="tel"
          />

          <div className="field">
            <label htmlFor="experience">Your experience level</label>
            <select
              id="experience"
              name="experience"
              value={form.experience}
              onChange={handleChange}
              aria-invalid={errors.experience ? "true" : "false"}
            >
              <option value="">Choose a level</option>
              {LEVELS.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
            {errors.experience && <p className="error-text">Error: {errors.experience}</p>}
          </div>

          {experienceIssues.length > 0 && (
            <div className="notice notice-error" role="alert">
              <p>Your level does not meet the requirement for:</p>
              <ul>
                {experienceIssues.map((issue) => (
                  <li key={issue.id}>{issue.message}</li>
                ))}
              </ul>
              <p>Remove these classes from your plan or choose a higher level if it is true.</p>
            </div>
          )}

          <div className="field field-check">
            <input id="terms" type="checkbox" checked={form.terms} onChange={handleTermsChange} />
            <label htmlFor="terms">I understand this booking is simulated.</label>
          </div>
          {errors.terms && <p className="error-text">Error: {errors.terms}</p>}

          <div className="button-row">
            <button type="submit" className="button">
              Confirm booking
            </button>
            <Link className="button button-secondary" to="/plan">
              Back to plan
            </Link>
          </div>
        </form>

        <PriceSummary lines={knownLines} />
      </div>
    </section>
  );
}

export default Checkout;

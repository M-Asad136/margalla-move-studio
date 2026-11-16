import { Link, useLocation, useParams } from "react-router-dom";
import BookingBox from "../components/BookingBox.jsx";
import ClassImage from "../components/ClassImage.jsx";
import StatusMessage from "../components/StatusMessage.jsx";
import { useStudio } from "../context/StudioContext.jsx";
import { formatDuration, formatPrice, formatSeats } from "../utils/format.js";

function ClassDetails() {
  const { id } = useParams();
  const { classes, status, reload, plan, addToPlan, removeFromPlan } = useStudio();
  const location = useLocation();
  const backLink = "/classes" + (location.state?.from || "");

  if (status !== "ready") {
    return (
      <section>
        <StatusMessage status={status} onRetry={reload} />
      </section>
    );
  }

  const item = classes.find((entry) => entry.id === id);

  if (!item) {
    return (
      <section className="notice">
        <h1>Class not found</h1>
        <p>There is no class with the code "{id}". It may have been removed or the link may be wrong.</p>
        <Link className="button" to="/classes">
          See all classes
        </Link>
      </section>
    );
  }

  const savedEntry = plan.find((entry) => entry.id === item.id);

  return (
    <section className="details">
      <Link to={backLink}>Back to classes</Link>
      <h1>{item.name}</h1>

      <div className="details-layout">
        <ClassImage src={item.image} alt={item.category + " class illustration"} category={item.category} />

        <dl className="facts">
          <dt>When</dt>
          <dd>
            {item.day} at {item.time} ({formatDuration(item.minutes)})
          </dd>
          <dt>Type and level</dt>
          <dd>
            {item.category}, {item.level}
          </dd>
          <dt>Instructor</dt>
          <dd>{item.instructor}</dd>
          <dt>Price</dt>
          <dd>{formatPrice(item.price)} per person</dd>
          <dt>Seats</dt>
          <dd>{formatSeats(item.seatsLeft)}</dd>
          <dt>What to bring</dt>
          <dd>{item.bring}</dd>
        </dl>
      </div>

      <h2>About this class</h2>
      <p>{item.description}</p>

      <BookingBox
        key={item.id + (savedEntry ? savedEntry.attendees : 0)}
        item={item}
        savedAttendees={savedEntry ? savedEntry.attendees : 0}
        onAdd={addToPlan}
        onRemove={removeFromPlan}
      />
    </section>
  );
}

export default ClassDetails;

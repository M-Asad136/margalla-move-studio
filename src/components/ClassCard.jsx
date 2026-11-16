import { Link } from "react-router-dom";
import ClassImage from "./ClassImage.jsx";
import { formatDuration, formatPrice, formatSeats } from "../utils/format.js";

function ClassCard({ item, linkState }) {
  const isFull = item.seatsLeft === 0;

  return (
    <li className="card">
      <ClassImage src={item.image} alt={item.category + " class illustration"} category={item.category} />
      <div className="card-body">
        <h3 className="card-title">{item.name}</h3>
        <p className="card-meta">
          {item.category} | {item.level}
        </p>
        <p className="card-meta">
          {item.day} {item.time} | {formatDuration(item.minutes)}
        </p>
        <p className="card-price">{formatPrice(item.price)} per person</p>
        <p className={isFull ? "badge badge-full" : "badge badge-open"}>{formatSeats(item.seatsLeft)}</p>
        <Link className="button button-secondary" to={"/classes/" + item.id} state={linkState}>
          View details
        </Link>
      </div>
    </li>
  );
}

export default ClassCard;

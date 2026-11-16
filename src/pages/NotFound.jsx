import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="notice">
      <h1>Page not found</h1>
      <p>This address does not exist on our website.</p>
      <Link className="button" to="/">
        Go to the home page
      </Link>
    </section>
  );
}

export default NotFound;

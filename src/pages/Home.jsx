import { Link } from "react-router-dom";

function Home() {
  return (
    <section>
      <h1>Move better in the middle of your week</h1>
      <p className="lead">
        Margalla Move Studio runs small yoga, HIIT, boxing, Pilates and trail classes in Islamabad for university
        students and office workers.
      </p>
      <Link className="button" to="/classes">
        Browse classes
      </Link>

      <div className="info-grid">
        <div className="info-box">
          <h2>Who it is for</h2>
          <p>Students and young professionals who want an hour of exercise that fits around lectures and work.</p>
        </div>
        <div className="info-box">
          <h2>Where we are</h2>
          <p>Studio in F-7 Markaz, Islamabad. Trail classes meet at the Margalla Hills trailhead gate.</p>
        </div>
        <div className="info-box">
          <h2>Booking rules</h2>
          <ul>
            <li>1 to 4 people per booking, and never more than the seats left.</li>
            <li>Your experience level must match the class level.</li>
            <li>Book 3 or more people in one class and get 10% off that class.</li>
          </ul>
        </div>
      </div>

      <p className="small">This is a student project. All bookings are simulated and no payment is taken.</p>
    </section>
  );
}

export default Home;

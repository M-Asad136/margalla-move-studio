import { NavLink, Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <NavLink to="/" className="brand">
          Margalla Move Studio
        </NavLink>
        <nav aria-label="Main">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/classes">Classes</NavLink>
        </nav>
      </header>

      <main id="main" className="page">
        <Outlet />
      </main>

      <footer className="site-footer">
        <p>Margalla Move Studio, F-7 Markaz, Islamabad. Simulated bookings only.</p>
      </footer>
    </>
  );
}

export default Layout;

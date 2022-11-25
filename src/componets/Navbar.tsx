import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-light bg-white py-3 shadow-sm">
      <div className="container-fluid">
        <button
          className="navbar-toggler m-2"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="bi bi-list"></i>
        </button>

        {/* collapse */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="navbar-nav mx-auto mb-2 mb-lg-0">
            <Link to="/" className="nav-item m-2" id="link">
              <i className="bi bi-house" />
              <span className="ms-1 none d-sm-inline">Home</span>
            </Link>

            <Link to="/projects" className="nav-item m-2" id="link">
              <i className="bi bi-table" />
              <span className="ms-1 none d-sm-inline">Projects</span>
            </Link>

            <Link to="/invoices" className="nav-item m-2" id="link">
              <i className="bi bi-card-list" />
              <span className="ms-1 none d-sm-inline">Invoices</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

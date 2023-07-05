import { Link } from "react-router-dom";
import Image1 from "../Assets/newlogo-removebg-preview.png";
function Header() {
  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <Link className="navbar-brand" to={`/`}>
            <img className="img-circle" alt="M4 mawgoda " src={Image1} />
            <p>
              UML
              <br />
              generator
            </p>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <Link to="/" aria-current="page" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about" aria-current="page" className="nav-link">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/signup" aria-current="page" className="nav-link">
                  <span className="glyphicon glyphicon-user"></span> Sign Up
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/login" aria-current="page" className="nav-link">
                  <span className="glyphicon glyphicon-log-in"></span> Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;

import "../css/index.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import Image1 from "../Assets/newlogo-removebg-preview.png";
import { auth } from "../firebase";

function HeaderSignedIn() {
  function Logout() {
    const navigate = useNavigate();
    auth.signOut();
    console.log("User has loged out");
    navigate("/sign-in");
  }
  let { user_id } = useParams();

  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <Link className="navbar-brand" to={`/projects/${user_id}`}>
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
            <ul className="navbar-nav ml-auto ">
              {/* <li className="nav-item">
                <Link className="nav-link active" to="/">
                  Home
                </Link>
              </li> */}
              <li className="nav-item">
                <Link
                  className="nav-link"
                  aria-current="page"
                  to={`/profile/${user_id}`}
                >
                  My profile
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link "
                  aria-current="page"
                  to={`/projects/${user_id}`}
                >
                  My projects
                </Link>
              </li>
              <li className="nav-item" onClick={Logout}>
                <Link className="nav-link" to="/">
                  Log out
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
export default HeaderSignedIn;

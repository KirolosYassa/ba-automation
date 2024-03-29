import "../css/index.css";
import Header from "../Components/Header";
import Image1 from "../Assets/image3_slider.png";
import Image2 from "../Assets/image2_slider.jpg";
import Image3 from "../Assets/image1_slider.jpg";
import { Link } from "react-router-dom";
import HeaderSignedIn from "../Components/HeaderSignedIn";

function Home_SignedIn() {
  return (
    <>
      <HeaderSignedIn />
      <h1 style={{ color: "white" }}>Home Page</h1>
      {/* slider */}
      <div
        id="carouselExampleControls"
        className="carousel slide container w-50"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner ">
          <div className="carousel-item active">
            <img
              src={Image1}
              className="rounded mx-auto d-block height-300"
              alt="Uml  1 slider"
            />
          </div>
          <div className="carousel-item">
            <img
              src={Image2}
              className="rounded mx-auto d-block w-500 height-300"
              alt="uml  2 slider"
            />
          </div>
          {/* <div className="carousel-item">
            <img
              src={Image3}
              className="rounded mx-auto d-block height-300"
              alt="uml  3 slider"
            />
          </div> */}
        </div>
        <button
          className="carousel-control-prev "
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <Link to="/login">
        <button className="create-uml-button btn btn-info">
          Create UML Diagram
        </button>
      </Link>
      {/* benefits and services  */}
      <p className="home-paragraph">
        In every software development team, the usage and requirement analysis
        tool and UML diagram modeling tool is so crucial. Because software has
        become much more complex in recent years, developers are finding it more
        challenging to build complex applications within short time periods.
      </p>
      {/* <br /> */}
      <hr className="line-separated" />
      <p className="home-paragraph">
        Even when they do, these software applications are often filled with
        bugs, and it can take programmers weeks to find and fix them. While
        software developers were forced to deal with more rudimentary issues in
        the past, languages like UML have now allowed them to focus on the
        structure and design of their software programs
      </p>
      <hr className="line-separated" />
    </>
  );
}

export default Home_SignedIn;

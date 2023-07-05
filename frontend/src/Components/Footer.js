import { Link } from "react-router-dom";
function Footer() {
  return (
    <>

      <footer className="text-center text-lg-start bg-secondary text-muted">
        <section className="Sec1">
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  <i className="fas fa-gem me-3"></i>About Us
                </h6>
                <p className="text-center" >
                  This Website afford an open-source tool for transforming User Stories and Functional
                  Requirements to a meaningful visual UML Diagrams, Exporting Diagrams,
                  and saving all what concerns your Projects all in one place.
                </p>
              </div>
              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">

                <h6 className="text-uppercase fw-bold mb-4">
                  Useful links
                </h6>
                <p>
                  <Link to="/about" className="text-reset">About</Link>
                </p>
                <p>
                  <Link to="/" className="text-reset">Home</Link>
                </p>
                <p>
                  {/* if there is time i'll make service page */}
                  <Link to="/" className="text-reset">Service</Link>
                </p>
                <p>
                  {/* if there is time i'll make help page form*/}
                  <a href="/#" className="text-reset">Help</a>
                </p>
              </div>
              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Contact Us</h6>
                <p>
                  <i className="fas fa-envelope me-3"></i>
                  UML@umlgenerate.com
                </p>
                <p><i className="fas fa-phone me-3"></i> + 201 234 567 88</p>
                <p><i className="fas fa-print me-3"></i> + 201 234 567 89</p>
              </div>
            </div>
          </div>
        </section>
        <div className="text-center p-4" style={{ backgroundColor: "tan" }}>
          © UML Generator Copyrights:
          {/* la da link 3adi 3ala el gp booklet bta3na isa  */}
          <a className="text-reset fw-bold" href="/#"> Docs </a>
        </div>
      </footer>
    </>
  );
}
export default Footer;

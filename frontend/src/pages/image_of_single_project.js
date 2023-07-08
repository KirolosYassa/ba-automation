import "../css/index.css";

function image_of_single_project() {
  return (
    <>
      <h1 className="text-left mt-3">Project Name:</h1>
      <h2 className="project-name-title"></h2>
      <div className="upload-section">
        <input type="file" name="myfile" accept=".txt" />
        <p>50 KB Max. Size is allowed</p>

        <button className={`btn btn-primary `}>Upload File</button>
      </div>

      <div className="fileBox">
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light ml-auto">
            {/* USE CASE DIAGRAM */}

            <button className="btn btn-dark">Generate Use Case Diagram</button>

            {/* CLASS DIAGRAM */}

            <button className="btn btn-dark">Generate Class Diagram</button>
            <button className="btn btn-danger" href="#">
              delete file
            </button>
          </nav>
        </div>
        <div className="fileShown"></div>
      </div>

      <br />
      <button to="/Projects" type="button" className="btn btn-danger size ">
        Delete Project
      </button>
    </>
  );
}
export default image_of_single_project;

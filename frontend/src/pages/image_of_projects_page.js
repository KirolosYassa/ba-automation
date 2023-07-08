import "../css/index.css";

function image_of_projects_page() {
  return (
    <>
      <h1 className="mt-3 ">My Projects</h1>
      {/* Cards of projects  */}
      <div className="row projects-section">
        <div className="col-12 col-md-6 col-lg-4 card pl-5 m-3 mt-5">
          <h2 className="card-title text-secondary">New Project?</h2>
          <div className="card-body">
            <br />
            <Link
              to={`/addproject/${user_id}`}
              className="btn btn-success mt-3"
            >
              Add
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
export default image_of_projects_page;

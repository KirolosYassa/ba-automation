import { useState, useEffect } from "react";
import HeaderSignedIn from "../Components/HeaderSignedIn";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import FullscreenLoading from "react-fullscreen-loading";
import EditImage from "../Assets/edit.svg";

function Myprojects() {
  let [projects, setProjects] = useState([]);
  let { user_id } = useParams();
  const [loading_state, setLoadingState] = useState(false);
  const navigate = useNavigate();

  const getProjects = () => {
    // fetch statment for getting all projects for a specific user
    axios
      .get(`http://localhost:8000/projects?user_id=${user_id}`)
      .then((data) => {
        console.log(data);
        // console.log(data.data.data);
        var projectsIds = data.data.data;
        // console.log(projectsIds);
        for (const key in projectsIds) {
          if (projectsIds.hasOwnProperty.call(projectsIds, key)) {
            // const element = projectsIds[key];
            console.log(key);
          }
        }

        let all_projects = [];

        for (const key in projectsIds) {
          if (projectsIds.hasOwnProperty.call(projectsIds, key)) {
            let project = {
              id: key,
              name: projectsIds[key].project_name,
              description: projectsIds[key].description,
            };
            all_projects.push(project);
          }
        }

        setProjects(all_projects);
        setLoadingState(false);
      });
  };

  const edit_project_data = () => {
    // navigate(`/edit_project_data/profile/${user_id}/project/${project_id}`);
  };

  useEffect(() => {
    setLoadingState(true);
    getProjects();
  }, []);
  return (
    <>
      <HeaderSignedIn />
      {loading_state ? (
        <div>
          <FullscreenLoading
            loading={loading_state}
            loaderColor="black"
            loaderSize="md"
            loaderText="Please wait..."
          />
          <h1 className="mt-3 ">My Projects</h1>
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
        </div>
      ) : (
        <div>
          <h1 className="mt-3 ">My Projects</h1>
          {/* Cards of projects  */}
          <div className="row projects-section">
            {/* Makan el projects . map 34an a Loop 3la kol elProjects */}
            {projects.map((project) => {
              return (
                <div className="col-12 col-md-6 col-lg-4" key={project.id}>
                  <div className="card  mt-5 ">
                    <span>
                      {/* Displaying cards for  project name , description, and button open project */}
                      <h2 className="card-title">{project.name}</h2>
                      <div className="card-body">
                        <p className="card-text">{project.description}</p>
                        <Link
                          className="btn btn-primary"
                          to={`/profile/user_id/${user_id}/project/${project.id}`}
                        >
                          Open
                        </Link>
                      </div>
                    </span>
                    <button
                      className="edit-button__badge"
                      onClick={() => {
                        navigate(
                          `/edit_project_data/profile/${user_id}/project/${project.id}/`
                        );
                      }}
                    >
                      <img src={EditImage} />
                    </button>
                  </div>
                </div>
              );
            })}
            <div className="col-12 col-md-6 col-lg-4 card pl-5 m-3 mt-5">
              <h2 className="card-title text-secondary">New Project?</h2>
              <div className="card-body">
                <br />
                <Link
                  to={`/addproject/${user_id}`}
                  className="btn btn-success mt-3"
                >
                  {" "}
                  Add{" "}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default Myprojects;

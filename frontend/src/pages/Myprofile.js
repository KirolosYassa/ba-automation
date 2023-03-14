import { useState, useEffect } from "react";
import HeaderSignedIn from "../Components/HeaderSignedIn";
import { Link, useParams, route } from "react-router-dom";
import axios from "axios";

function Myprofile() {
  let [projects, setProjects] = useState([]);
  let { user_id } = useParams();
  // const { user_id } = route.params;

  // const queryParameters = new URLSearchParams(window.location.search);
  // const user_id = queryParameters.get("user_id");

  const getProjects = () => {
    // fetch statment for getting all projects for a specific user
    console.log("user_id in profile route = " + user_id);
    axios
      .get(`http://localhost:8000/projects?user_id=${user_id}`)
      .then((data) => {
        console.log(data);
        console.log(data.data.data);
        let all_projects = [];
        let projectsComing = data.data.data;
        for (const key in projectsComing) {
          if (projectsComing.hasOwnProperty.call(projectsComing, key)) {
            all_projects.push(projectsComing[key]);
          }
        }
        // projectsComing.map((project) => {
        // });
        console.log(all_projects);
        setProjects(all_projects);
        // console.log({projects});
        // console.log(data.data);
      });
  };
  useEffect(() => {
    console.log("user_id in profile route = " + user_id);
    getProjects();
  }, []);
  return (
    <>
      <HeaderSignedIn />
      <h1 className="mt-3">My Projects</h1>
      {/* momken a7ot sidebar fe gamb a7ot fe my projects aw ashof y3ni a7ot fehom eh yemen w shemal */}
      {/* Cards of projects  */}
      <div className="row">
        {/* Makan el projects . map 34an a Loop 3la kol elProjects */}

        {projects.map((project) => {
          return (
            <div className="col-3" key={project}>
              <div className="card  mt-5 ">
                {/* Displaying cards for  project name , description, and button open project */}
                <h2 className="card-title">{project.name}</h2>
                <div className="card-body">
                  <p className="card-text">{project.description}</p>
                  <Link className="btn btn-primary" to={`/Projects/${project}`}>
                    Open
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
        <div className="col-2 card pl-5 m-3 mt-5">
          <h2 className="card-title text-secondary">New Project?</h2>
          <div className="card-body">
            <br />
            <Link to="/addproject" className="btn btn-success mt-3">
              {" "}
              Add{" "}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
export default Myprofile;

import { useState, useEffect } from "react";
import HeaderSignedIn from "../Components/HeaderSignedIn";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { set_user_id, set_logged_in_user } from "../Redux/user";

function Myprofile() {
  // let [projects, setProjects] = useState([]);
  let { user_id } = useParams();
  const {
    user_loggedin_id,
    email,
    first_name,
    last_name,
    role,
    user_projects,
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // const { user_id } = route.params;

  // const queryParameters = new URLSearchParams(window.location.search);
  // const user_id = queryParameters.get("user_id");

  const getProjects = () => {
    // fetch statment for getting all projects for a specific user
    // console.log("user_id in profile route = " + user_id);
    // axios
    //   .get(`http://localhost:8000/projects?user_id=${user_id}`)
    //   .then((data) => {
    //     console.log(data);
    //     // console.log(data.data.data);
    //     var projectsIds = data.data.data;
    //     // console.log(projectsIds);
    //     for (const key in projectsIds) {
    //       if (projectsIds.hasOwnProperty.call(projectsIds, key)) {
    //         // const element = projectsIds[key];
    //         console.log(key);
    //         // console.log(element);
    //       }
    //     }
    //     let all_projects = [];
    //     for (const key in projectsIds) {
    //       if (projectsIds.hasOwnProperty.call(projectsIds, key)) {
    //         let project = {
    //           id: key,
    //           name: projectsIds[key].project_name,
    //           description: projectsIds[key].description,
    //         };
    //         all_projects.push(project);
    //       }
    //     }
    //     // console.log(all_projects);
    //   });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/login?user_id=${user_id}`
        );
        console.log(response.data.data);
        dispatch(set_user_id(Object.keys(response.data.data)[0]));
        dispatch(set_logged_in_user(response.data.data));
        console.log(`email = ${email}`);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [dispatch]);
  return (
    <>
      <HeaderSignedIn />
      <h1 className="mt-3 ">My Projects</h1>
      {/* momken a7ot sidebar fe gamb a7ot fe my projects aw ashof y3ni a7ot fehom eh yemen w shemal */}
      {/* Cards of projects  */}
      <div className="row">
        {/* Makan el projects . map 34an a Loop 3la kol elProjects */}
        {user_projects.map((project) => {
          return (
            <div className="col-12 col-md-6 col-lg-4" key={project.id}>
              <div className="card  mt-5 ">
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
    </>
  );
}
export default Myprofile;

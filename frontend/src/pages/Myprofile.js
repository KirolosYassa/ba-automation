import { useState, useEffect } from "react";
import HeaderSignedIn from "../Components/HeaderSignedIn";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function Myprofile() {
  let [projects, setProjects] = useState([]);
  let { user_id } = useParams();
  // const queryParameters = new URLSearchParams(window.location.search);
  // const user_id = queryParameters.get("user_id");

  const getProjects = () => {
    // fetch statment for getting all projects for a specific user
    // console.log("user_id in profile route = " + user_id);
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
            // console.log(element);
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

        // console.log(all_projects);
        setProjects(all_projects);
      });
  };
  useEffect(() => {
    // console.log("user_id in profile route = " + user_id);
    getProjects();
  }, []);
  return (
    <div>
      <HeaderSignedIn />
      <h1 className="mt-3 ">My Profile</h1>

      <section className="row profile-setting-section">
        <div className="col-lg-5 col-sm-12 sub-section-profile">
          <h3 className="sub-section-profile-header">General information</h3>
          <form className="row" action="#">
            <div className="item-profile col-6">
              <label for="first-name" className="">
                First Name
              </label>
              <br />
              <input
                type="text"
                name="first-name"
                id="first-name"
                className=""
                placeholder="Bonnie"
                required=""
              />
            </div>
            <div className="item-profile col-6">
              <label for="last-name" className="">
                Last Name
              </label>
              <br />
              <input
                type="text"
                name="last-name"
                id="last-name"
                className=""
                placeholder="Green"
                required=""
              />
            </div>
            <div className="item-profile col-6">
              <label for="email" className="">
                Email
              </label>
              <br />
              <input
                type="email"
                name="email"
                id="email"
                className=""
                placeholder="example@company.com"
                required=""
              />
            </div>

            <div className="item-profile col-6">
              <label for="role" className="">
                Role
              </label>
              <br />
              <input
                type="text"
                name="role"
                id="role"
                className=""
                placeholder="Student"
                required=""
              />
            </div>

            <div className="">
              <button className="btn btn-primary" type="submit">
                Save general info
              </button>
            </div>
          </form>
        </div>

        <div class="col-2"></div>
        <div className="col-lg-5 col-sm-12  sub-section-profile">
          <h3 className="sub-section-profile-header">Password information</h3>
          <form className="row" action="#">
            <div className="item-profile col-6">
              <label for="current-password" className="">
                Current password
              </label>
              <br />
              <input
                type="text"
                name="current-password"
                id="current-password"
                className=""
                placeholder="••••••••"
                required=""
              />
            </div>
            <div className="item-profile col-6">
              <label for="new-password" className="">
                New password
              </label>
              <br />
              <input
                type="text"
                name="new-password"
                id="new-password"
                className=""
                placeholder="••••••••"
                required=""
              />
            </div>
            <div className="item-profile col-6">
              <label for="confirm-password" className="">
                Confirm password
              </label>
              <br />
              <input
                type="text"
                name="confirm-password"
                id="confirm-password"
                className=""
                placeholder="••••••••"
                required=""
              />
            </div>
            <div className="password-requirements">
              <div className="">Password requirements:</div>
              <ul className="">
                <li className="">At least 8 characters</li>
              </ul>
            </div>
            <div className="">
              <button className="btn btn-primary" type="submit">
                Save new password
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
export default Myprofile;

import { useState, useEffect } from "react";
import HeaderSignedIn from "../Components/HeaderSignedIn";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function Myprofile() {
  let [user_data, setUser_Data] = useState({
    first_name: "",
    last_name: "",
    email: "",
    role: "",
  });
  let { user_id } = useParams();

  const getProfile = () => {
    // fetch statment for getting all projects for a specific user
    axios
      .get(`http://localhost:8000/user_profile?user_id=${user_id}`)
      .then((data) => {
        let response = data.data.data;
        console.log(response[user_id]);
        setUser_Data({
          first_name: response[user_id]["first_name"],
          last_name: response[user_id]["last_name"],
          email: response[user_id]["email"],
          role: response[user_id]["role"],
        });
      })
      .then();
  };

  useEffect(() => {
    getProfile();
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
                placeholder={user_data["first_name"]}
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
                placeholder={user_data["last-name"]}
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
                placeholder={user_data["email"]}
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
                placeholder={user_data["role"]}
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

        <div className="col-2"></div>
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

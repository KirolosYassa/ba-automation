import "../css/index.css";
import { Link } from "react-router-dom";
import Header from "../Components/Header";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { useState } from "react";
import axios from "axios";
function Signup() {
  let [FName, setFName] = useState("");
  let [LName, setLName] = useState("");
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [Role, setRole] = useState("");

  var user_data = {
    first_name: FName,
    last_name: LName,
    email: username,
    password: password,
    role: Role,
  };
  const adduser = (e) => {
    var response = "";
    console.log(user_data);
    e.preventDefault();
    axios
      .post("http://localhost:8000/signup", user_data)
      .then((data) => {
        response = data;
        console.log(data.data);
        if (response.data === "UserAlreadyExists") {
          Swal.fire({
            title: "User already exists",
            icon: "error",
          }).then();
        } else if (
          response.data ===
          "Password must be more than or equal to 6 characters"
        ) {
          Swal.fire({
            title: response.data,
            icon: "warning",
          }).then();
        } else if (response.data === "User Added") {
          Swal.fire({
            title: "Successfully Signed Up",
            icon: "success",
          }).then();
        }
      })
      .then();

    // Swal.fire({
    //   title: `Project " ${Name}" added successfully `,
    //   icon: "info",
    //   showDenyButton: false,
    //   showConfirmButton:true,
    //   confirmButtonText:'OK'
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     navigate('/Projects');
    //   } else{
    //     Swal.fire('Project is not added', '', 'info')
    //   }
    // })
  };
  return (
    <>
      <Header />
      <form className="centering mt-5">
        <h3>Sign Up</h3>

        <div className="mb-3">
          <label>First name: </label>
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            onChange={(e) => {
              setFName(e.target.value);
            }}
          />
        </div>

        <div className="mb-3">
          <label>Last name: </label>
          <input
            type="text"
            className="form-control"
            placeholder="Last name"
            onChange={(e) => {
              setLName(e.target.value);
            }}
          />
        </div>

        <div className="mb-3">
          <label>Email address: </label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>

        <div className="mb-3">
          <label>Password: </label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>

        <div className="mb-3 from-control">
          <label>Role: </label>
          <br></br>
          <select
            name="Role"
            id="role"
            placeholder="choose role"
            className="mb-3 from-control w-100 h-100 rounded border border-secondary"
            onChange={(e) => {
              setRole(e.target.value);
            }}
          >
            <option className="mb-3 from-control" value="other">Other</option>
            <option className="mb-3 from-control" value="Business Analyst">Business Analyst</option>
            <option className="mb-3 from-control" value="Student">Student</option>
            <option className="mb-3 from-control" value="Product Owner">Product Owner</option>
          </select>
        </div>

        <div className="mb-3">
          <label>Other:</label>
          <input type="text" className="form-control" />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary" onClick={adduser}>
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right">
          Already registered <Link to="/login">Sign in?</Link>
        </p>
      </form>
    </>
  );
}
export default Signup;

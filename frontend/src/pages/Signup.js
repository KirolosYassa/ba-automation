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
    console.log(user_data);
    e.preventDefault();
    axios
      .post(
        "http://localhost:8000/signup",
        // axios.post("http://localhost:8000/users",
        user_data
      )
      .then((data) => {
        console.log(data);
      });
    Swal.fire({
      title: "Successfully Signed Up",
      icon: "success",
    }).then();

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

        <div className="mb-3">
          <label>Role: </label>
          <br></br>
          <select
            name="Role"
            id="role"
            placeholder="choose role"
            onChange={(e) => {
              setRole(e.target.value);
            }}
          >
            <option value="other">other</option>
            <option value="Business Analyst">Business Analyst</option>
            <option value="Student">Student</option>
            <option value="Product Owner">Product Owner</option>
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

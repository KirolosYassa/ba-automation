import "../css/index.css";
import { Link } from "react-router-dom";
import Header from "../Components/Header";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  let [FName, setFName] = useState("");
  let [LName, setLName] = useState("");
  let [email, setEmail] = useState("");
  let [emailExist, setEmailExist] = useState(false);
  let [password, setPassword] = useState("");
  let [passwordIncorrect, setPasswordIncorrect] = useState(false);
  let [Role, setRole] = useState("");
  const navigate = useNavigate();
  let [firstInteraction, setFirstInteraction] = useState(false);

  var user_data = {
    first_name: FName,
    last_name: LName,
    email: email,
    password: password,
    role: Role,
  };
  function check_form_inputs_if_empty() {
    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    if (user_data.first_name === "") {
      firstName.style.border = "1px solid red";
    }
    if (user_data.last_name === "") {
      lastName.style.border = "1px solid red";
    }
    if (user_data.email === "") {
      email.style.border = "1px solid red";
    }
    if (user_data.password === "") {
      password.style.border = "1px solid red";
    }

    if (
      user_data.first_name === "" ||
      user_data.last_name === "" ||
      user_data.email === "" ||
      user_data.password === ""
    ) {
      return true;
    } else {
      return false;
    }
  }
  const adduser = (e) => {
    setFirstInteraction(true);

    var response = "";
    console.log(user_data);
    e.preventDefault();

    if (check_form_inputs_if_empty()) return;

    const email = document.getElementById("email");
    const password = document.getElementById("password");

    axios
      .post("http://localhost:8000/signup", user_data)
      .then((data) => {
        response = data;
        console.log(data.data);
        try {
          if (response.data === "UserAlreadyExists") {
            email.style.border = "1px solid red";
            password.style.border = "1px solid red";
            setEmailExist(true);
          } else if (
            response.data ===
            "Password must be more than or equal to 6 characters"
          ) {
            password.style.border = "1px solid red";
            setPasswordIncorrect(true);
          } else if (response.data === "User Added") {
            setFirstInteraction(false);
            setEmailExist(false);
            setPasswordIncorrect(false);

            Swal.fire({
              title: "Successfully Signed Up",
              icon: "success",
            }).then(() => {
              navigate("/login");
            });
          }
        } catch (error) {
          Swal.fire({
            title: error,
            icon: "warning",
          }).then();
        }
      })
      .then();
  };

  return (
    <>
      <Header />
      <form className="centering mt-5">
        <h3>Sign Up</h3>

        {/* First Name */}
        <div className="mb-3">
          <label>First name: </label>

          {FName === "" && firstInteraction ? (
            <>
              <input
                type="text"
                className="form-control"
                style={{ border: "1px solid red" }}
                placeholder="First name"
                onChange={(e) => {
                  setFName(e.target.value);
                  setFirstInteraction(false);
                }}
                id="firstName"
                required
              />
              <p className="input-err-msg">Please enter your first name</p>
            </>
          ) : (
            <input
              type="text"
              className="form-control"
              placeholder="First name"
              onChange={(e) => {
                setFName(e.target.value);
                setFirstInteraction(false);
              }}
              id="firstName"
              required
            />
          )}
        </div>

        {/* Last Name */}
        <div className="mb-3">
          <label>Last name: </label>

          {LName === "" && firstInteraction ? (
            <>
              <input
                type="text"
                className="form-control"
                style={{ border: "1px solid red" }}
                placeholder="Last name"
                onChange={(e) => {
                  setLName(e.target.value);
                  setFirstInteraction(false);
                }}
                id="lastName"
                required
              />
              <p className="input-err-msg">Please enter your last name</p>
            </>
          ) : (
            <input
              type="text"
              className="form-control"
              placeholder="Last name"
              onChange={(e) => {
                setLName(e.target.value);
                setFirstInteraction(false);
              }}
              id="lastName"
              required
            />
          )}
        </div>
        {/* Email */}
        <div className="mb-3">
          <label>Email address: </label>

          {emailExist ? (
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              style={{ border: "1px solid red" }}
              onChange={(e) => {
                setEmail(e.target.value);
                setFirstInteraction(false);
                if (emailExist) {
                  setEmailExist(false);
                }
                if (passwordIncorrect) {
                  setPasswordIncorrect(false);
                }
              }}
              id="email"
              required
            />
          ) : (
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={(e) => {
                setEmail(e.target.value);
                setFirstInteraction(false);
                if (emailExist) {
                  setEmailExist(false);
                }

                if (passwordIncorrect) {
                  setPasswordIncorrect(false);
                }
              }}
              id="email"
              required
            />
          )}

          {email === "" && firstInteraction && (
            <p className="input-err-msg">Please enter your email address</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-3">
          <label>Password: </label>
          {emailExist ? (
            <input
              type="password"
              className="form-control"
              style={{ border: "1px solid red" }}
              placeholder="Enter password"
              onChange={(e) => {
                setPassword(e.target.value);
                setFirstInteraction(false);
                if (emailExist) {
                  setEmailExist(false);
                }

                if (passwordIncorrect) {
                  setPasswordIncorrect(false);
                }
              }}
              id="password"
              required
            />
          ) : (
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={(e) => {
                setPassword(e.target.value);
                setFirstInteraction(false);
                if (emailExist) {
                  setEmailExist(false);
                }
                if (passwordIncorrect) {
                  setPasswordIncorrect(false);
                }
              }}
              id="password"
              required
            />
          )}
          {/* Password incorrect? */}
          {passwordIncorrect === true && (
            <p className="input-err-msg">
              Password must be more than or equal to 6 characters
            </p>
          )}
          {/* Empty Password? */}
          {password === "" && firstInteraction && (
            <p className="input-err-msg">Please enter a password</p>
          )}
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
            <option className="mb-3 from-control" value="other">
              Other
            </option>
            <option className="mb-3 from-control" value="Business Analyst">
              Business Analyst
            </option>
            <option className="mb-3 from-control" value="Student">
              Student
            </option>
            <option className="mb-3 from-control" value="Product Owner">
              Product Owner
            </option>
          </select>
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary" onClick={adduser}>
            Sign Up
          </button>

          {emailExist && (
            <p className="input-err-msg" style={{ textAlign: "center" }}>
              This username isn't available. Please try another.
            </p>
          )}
        </div>
        <p className="forgot-password text-right">
          Already registered <Link to="/login">Sign in?</Link>
        </p>
      </form>
    </>
  );
}
export default Signup;

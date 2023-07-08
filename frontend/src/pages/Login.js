import "../css/index.css";
import { useState } from "react";
import Header from "../Components/Header";
// import { Link } from "react-router-dom";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import {
  auth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "../firebase";

function Login() {
  function changePassword() {
    return sendPasswordResetEmail(auth, user.email).then((a) => {
      Swal.fire({
        title: `Password reset email sent`,
        icon: "info",
      }).then();
    });
  }

  let [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  // const { email, password } = user;

  function onChange(e) {
    setUser((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  async function onSubmit(e) {
    console.log("user.email = " + user.email);
    console.log("Submit Function starts");
    e.preventDefault();
    try {
      console.log("Submit Function try begins");
      // const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );
      // console.log("userCredential = " + JSON.stringify(userCredential));
      console.log("userCredential.user.uid = " + userCredential.user.uid);
      if (userCredential.user) {
        console.log("Have been navigated");
        // navigate({
        //   pathname: "/profile",
        //   search: `?uesr_id=${userCredential.user.uid}`,
        // });

        navigate(`/projects/${userCredential.user.uid}`);
        // navigate.navigate(`/profile`, { user_id: userCredential.user.uid });
      }
    } catch (error) {
      let errorType = error.toString().split("/");
      errorType = errorType[1].replace(").", "");
      errorType = errorType.split("-").join(" ");
      console.log(errorType);
      Swal.fire({
        title: `${errorType}`,
        icon: "error",
      }).then();

      // const errorCode = error.code;
      // const errorMessage = error.message;
      console.log(error);
    }
  }

  return (
    <>
      <Header />
      <form className="centering mt-5" onSubmit={onSubmit}>
        <h3>Sign In</h3>
        <div className="mb-3">
          <label>Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={onChange}
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            id="password"
            name="password"
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>

        <div className="d-grid">
          <button
            // to="#"
            type="submit"
            className="btn btn-primary"
          >
            Log in
          </button>
        </div>
      </form>
      <p className="forgot-password text-right">
        {/* isa lw fe wa2t hb2a a3ml reset  password page form */}
        <a href=" " onClick={changePassword}>
          Forgot password?
        </a>
      </p>
    </>
  );
}
export default Login;

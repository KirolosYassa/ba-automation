import "../css/index.css";
import { useEffect, useState, Component } from "react";
import Header from "../Components/Header";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  let isValid = false;
  // lesa hn3ml el rember me w el forgot password
  let [users, setUsers] = useState([]);
  let [user, setUser] = useState({});
  let [input_username, setUsername] = useState("");
  let [input_pass, setPass] = useState("");
  const navigate = useNavigate();
  const getUsers = () => {
    // fetch statment or axios for getting all users
    axios.get("http://localhost:8000/users").then((data) => {
      // console.log(data.data);
      setUsers(data.data);
    });
  };
  // SHA8AAAAL
  var user_id = "";
  const checkusers = (e) => {
    // b3d myt2kd en el user mwgod yro7 l my proofile b navigate
    // lazem a3ml prevent default 3a4an myrg3 y3ml refresh
    e.preventDefault();
    var response = "";

    // for (const key of Object.keys(users)) {
    //   console.log(key + ":" + key["email"]);
    // }
    var user_data = {
      first_name: "",
      last_name: "",
      email: input_username,
      password: input_pass,
      role: "",
    };

    setUser({ email: input_username, password: input_pass });
    axios
      .post("http://localhost:8000/login", user_data)
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

    // for (const [key, value] of Object.entries(users)) {
    //   console.log(key + ":" + value.email);

    //   if (value.email == input_username && value.password == input_pass) {
    //     setUser(value);
    //     isValid = true;
    //     axios
    //       .get(`http://localhost:8000/user-id?email=${value.email}`)
    //       .then((data) => {
    //         console.log(data.data["id"]);
    //         console.log("USer ID 1 = " + data.data["id"]);
    //         setUsers(data.data);
    //         user_id = data.data["id"];
    //       })
    //       .then((data) => {
    //         console.log(value);
    //         console.log("USer ID 2 = " + user_id);
    //         navigate(`/projects?user_id=${user_id}`);
    //       });
    //   }
    // }
    // // users.map((user) => {
    // //   user.email == input_username &&
    // //     user.password == input_pass &&
    // //     setUser(user);
    // //   console.log(user);
    // //   // SHA8ALAAAAAA LOLOLOLOLOLYYYYY w bygeb el user el folany mazboot
    // // });
    // if (isValid) {
    //   // isValid = true;
    //   console.log("allaho akbar");
    // } else console.log("ya rabyyy");
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <>
      <Header />
      <form className="centering mt-5">
        <h3>Sign In</h3>
        <div className="mb-3">
          <label>Email address</label>
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
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e) => {
              setPass(e.target.value);
            }}
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
            to="#"
            type="submit"
            className="btn btn-primary"
            onClick={checkusers}
          >
            Log in
          </button>
        </div>
        <p className="forgot-password text-right">
          {/* isa lw fe wa2t hb2a a3ml reset  password page form */}
          <a href="#">Forgot password?</a>
        </p>
      </form>
    </>
  );
}
export default Login;

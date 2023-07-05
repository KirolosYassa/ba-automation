import axios from "axios";
// import { Button } from "bootstrap";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HeaderSignedIn from "../Components/HeaderSignedIn";
import Swal from "sweetalert2";

function Addproject() {
  let [project, setProject] = useState({
    name: "",
    description: "",
  });

  const navigate = useNavigate();
  let { user_id } = useParams();

  function onChange(e) {
    setProject((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  const addPro = (e) => {
    e.preventDefault();

    var project_data = {
      user_id: user_id,
      name: project.name,
      description: project.description,
    };
    // API WIth backends
    axios
      .post(`http://localhost:8000/addproject`, project_data)
      .then((response) => {
        console.log("response.status = " + response.status);
        console.log("response = " + response);
        if (response.status === 200) {
          Swal.fire({
            title: `Project " ${project.name}" added successfully `,
            icon: "success",
            showDenyButton: false,
            showConfirmButton: true,
            confirmButtonText: "OK",
          });
          navigate(`/profile/${user_id}`);
        } else {
          console.log("response = " + response);

          Swal.fire({
            title: "Project is not added",
            icon: "info",
          });
        }
      });
  };
  return (
    <>
      <HeaderSignedIn />
      <form className="centering mt-5">
        <h3>Add new Project</h3>
        <div className="mb-3">
          <label>Project name:</label>
          <input
            id="name"
            name="name"
            type="text"
            className="form-control"
            placeholder="Enter Project Name"
            onChange={onChange}
          />
        </div>

        <div className="mb-3">
          <label>Description:</label>
          <input
            id="description"
            name="description"
            type="text"
            className="form-control"
            placeholder="Enter description"
            onChange={onChange}
          />
        </div>

        <div className="d-grid">
          <button
            to="/Projects"
            type="submit"
            className="btn btn-primary"
            onClick={addPro}
          >
            Add
          </button>
        </div>
      </form>
    </>
  );
}
export default Addproject;

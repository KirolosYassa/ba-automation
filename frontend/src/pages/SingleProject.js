import "../css/index.css";
import { useEffect, useState, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import HeaderSignedIn from "../Components/HeaderSignedIn";
import axios from "axios";
import Swal from "sweetalert2";
import v4 from "../id_generator";
import {
  storage,
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
  uploadBytesResumable,
} from "../firebase";

function SingleProject() {
  const [project, setProject] = useState({
    name: "",
    description: "",
    user_id: "",
  });

  const { user_id, project_id } = useParams();
  const navigate = useNavigate();
  const deleteProject = () => {
    Swal.fire({
      title: "Do you want to delete the Project?",
      icon: "warning",
      showDenyButton: true,
      denyButtonText: "DELETE",
      showCancelButton: true,
      showConfirmButton: false,
    }).then((result) => {
      console.log(result);
      if (result.isDenied) {
        axios
          .delete(
            `http://localhost:8000/single_project?user_id=${user_id}&project_id=${project_id}`
          )
          .then((data) => {
            console.log(data);
            Swal.fire({
              title: "Project Deleted!",
              icon: "success",
            });
          })
          .then(() => {
            navigate(`/profile/${user_id}`);
          });
      } else {
        Swal.fire({
          title: "Project is not deleted.",
          icon: "info",
        });
      }
    });
  };
  const updateProject = () => {
    console.log(project.input_docs);
  };

  const getSingleProject = () => {
    // fetch or axios stat for getting project info from params then setting it with setProject
    axios
      .get(
        `http://localhost:8000/single_project?user_id=${user_id}&project_id=${project_id}`
      )
      .then((data) => {
        // console.log(data);
        console.log(data.data.data);
        let project_object = data.data.data;

        setProject({
          name: project_object[project_id].name,
          description: project_object[project_id].description,
          user_id: project_object[project_id].user_id,
        });
        console.log(project);
      });
  };

  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleUploadFiles = (files) => {
    const uploaded = [...uploadedFiles];
    files.some((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file);
      }
    });
    setUploadedFiles(uploaded);
  };

  const handleFileEvent = (e) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    handleUploadFiles(chosenFiles);
  };

  useEffect(() => {
    getSingleProject();
  }, []);
  return (
    <>
      <HeaderSignedIn />

      <h1 className="text-left mt-3">Project Name:</h1>
      <h2>{project.name}</h2>
      <input
        id="fileUpload"
        type="file"
        multiple
        accept="*"
        onChange={handleFileEvent}
      />

      <label htmlFor="fileUpload">
        <a className={`btn btn-primary `}>Upload Files</a>
      </label>
      <div className="container">
        <table
          id="example"
          className="table table-striped"
          style={{ width: "70%" }}
        >
          <thead>
            <tr>
              <th>Type</th>
              <th>Name</th>
              <th>Size</th>
              <th># of pages</th>
            </tr>
          </thead>
          <tbody>
            {console.log(`uploadedFiles Before Loop = ${uploadedFiles}`)}
            {uploadedFiles.map((file) => {
              console.log(file);
              console.log(file.name);
              return (
                <tr key={file.key}>
                  <td>{file.type}</td>
                  <td>{file.name}</td>
                  <td>{(parseFloat(file.size) / 1024).toFixed(2)} KB</td>
                  <td>###</td>
                </tr>
              );
            })}
          </tbody>
          {console.log(
            `uploadedFiles After Loop = ${uploadedFiles.toString()}`
          )}
          <tfoot>
            <tr>
              <th>Type</th>
              <th>Name</th>
              <th>Size</th>
              <th># of pages</th>
            </tr>
          </tfoot>
        </table>
      </div>

      <br />
      <button
        to="/Projects"
        type="button"
        className="btn btn-danger size "
        onClick={deleteProject}
      >
        Delete Project
      </button>
    </>
  );
}
export default SingleProject;

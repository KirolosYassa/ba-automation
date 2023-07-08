import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HeaderSignedIn from "../Components/HeaderSignedIn";
import Swal from "sweetalert2";
import FullscreenLoading from "react-fullscreen-loading";

import { storage, ref, listAll, deleteObject } from "../firebase";

function EditProjectData() {
  let { user_id, project_id } = useParams();
  const [loading_state, setLoadingState] = useState(true);

  let [project, setProject] = useState({
    user_id: user_id,
    project_name: "",
    description: "",
  });
  let [projectUpdated, setProjectUpdated] = useState({
    project_name: "",
    description: "",
  });
  const [reference, setReference] = useState("");

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
        console.log(`user_id = ${user_id}`);
        console.log(`project.user_name = ${project.user_name}`);
        console.log(`project_id = ${project_id}`);
        console.log(`project.name = ${project.name}`);
        axios
          .delete(`http://localhost:8000/single_project/`, {
            data: {
              user_id: user_id,
              project_id: project_id,
            },
          })
          .then((data) => {
            // Delete the project from firebase storage
            console.log(`reference = ${reference}`);
            const storageRef = ref(storage, reference + "/files");

            listAll(storageRef)
              .then((res) => {
                res.prefixes.forEach((folderRef) => {
                  // All the prefixes under listRef.
                  // You may call listAll() recursively on them.
                  console.log(folderRef);
                });
                res.items.forEach((itemRef) => {
                  // All the items under listRef.
                  console.log(itemRef);

                  // Delete the file
                  deleteObject(itemRef)
                    .then(() => {
                      // File deleted successfully
                      console.log(`${itemRef.name} deleted successfully`);
                    })
                    .catch((error) => {
                      // Uh-oh, an error occurred!
                      console.log(`error in deleting the file .. {error}`);
                    });
                });
              })
              .catch((error) => {
                // Uh-oh, an error occurred!
              });

            // uploadedFiles.forEach((file) => {
            //   console.log(file);
            // });
            console.log(data);
            Swal.fire({
              title: "Project Deleted!",
              icon: "success",
            });
          })
          .then(() => {
            navigate(`/projects/${user_id}`);
          });
      } else {
        Swal.fire({
          title: "Project is not deleted.",
          icon: "info",
        });
      }
    });
  };
  function onChange(e) {
    console.log(e.target.value);
    setProjectUpdated((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
    console.log(projectUpdated);
  }

  const edit_project_data = () => {
    axios
      .patch(
        `http://localhost:8000/edit_project?user_id=${user_id}&project_id=${project_id}&project_name=${projectUpdated["project_name"]}&description=${projectUpdated["description"]}`
      )
      .then((data) => {
        let response = data.data.data;
        console.log(response);

        Swal.fire({
          title: "Project is edited successfully",
          icon: "success",
        });

        window.location.reload();
      })
      .then();
  };
  const getProject = () => {
    axios
      .get(`http://localhost:8000/user_profile?user_id=${user_id}`)
      .then((data) => {
        let response = data.data.data;
        console.log(response);
        let the_project = response["projects"][project_id];
        console.log(the_project);
        setProject({
          project_name: the_project["project_name"],
          description: the_project["description"],
        });
        setProjectUpdated({
          project_name: the_project["project_name"],
          description: the_project["description"],
        });
        setLoadingState(false);
      })
      .then();
  };

  useEffect(() => {
    getProject();
    // setProjectUpdated(project);
  }, []);

  return (
    <>
      <HeaderSignedIn />
      {loading_state ? (
        <div>
          <FullscreenLoading
            loading={loading_state}
            loaderColor="black"
            loaderSize="md"
            loaderText="Please wait..."
          />
          <div>
            <form className="centering mt-5">
              <h3>Edit The Project</h3>
              <div className="mb-3">
                <label>Project name:</label>
                <input
                  id="project_name"
                  name="project_name"
                  type="text"
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label>Description:</label>
                <textarea
                  id="description"
                  name="description"
                  type="text"
                  className="form-control"
                  rows="5"
                />
              </div>

              <div className="d-grid">
                <button
                  to="/Projects"
                  type="submit"
                  className="btn btn-primary"
                >
                  Save
                </button>
              </div>

              <br />
              <button
                to="/Projects"
                type="button"
                className="btn btn-danger size "
              >
                Delete Project
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div>
          <form className="centering mt-5">
            <h3>Edit The Project</h3>
            <div className="mb-3">
              <label>Project name:</label>
              <input
                id="project_name"
                name="project_name"
                type="text"
                className="form-control"
                placeholder={project["project_name"]}
                onChange={onChange}
              />
            </div>

            <div className="mb-3">
              <label>Description:</label>
              <textarea
                id="description"
                name="description"
                type="text"
                className="form-control"
                placeholder={project["description"]}
                onChange={onChange}
                rows="5"
              />
            </div>

            <div className="d-grid">
              <button
                to="/Projects"
                type="submit"
                className="btn btn-primary"
                onClick={edit_project_data}
              >
                Save
              </button>
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
          </form>
        </div>
      )}
    </>
  );
}
export default EditProjectData;

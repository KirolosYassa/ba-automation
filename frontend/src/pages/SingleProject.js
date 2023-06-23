import "../css/index.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HeaderSignedIn from "../Components/HeaderSignedIn";
import axios from "axios";
import Swal from "sweetalert2";
import v4 from "../id_generator";
import ProgressBar from "react-bootstrap/ProgressBar";
import { btoa } from "base64-js";

import {
  storage,
  ref,
  listAll,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "../firebase";

var root_ref = "";
var files_ref = "";
function SingleProject() {
  const [project, setProject] = useState({
    name: "",
    description: "",
    project_id: "",
    user_id: "",
    user_name: "",
  });

  const { user_id, project_id } = useParams();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [reference, setReference] = useState("");
  const [currentFile, setCurrentFile] = useState({
    percent: 0,
    file_name: "",
  });
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

  const deleteFile = (e) => {
    console.log(e.target.value);
    let file_name = e.target.value;
    try {
      Swal.fire({
        title: `Do you want to delete ${file_name} File?`,
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
          console.log(`file_name = ${file_name}`);
          axios
            .delete(`http://localhost:8000/single_file/`, {
              data: {
                user_id: user_id,
                project_id: project_id,
                file_name: file_name,
              },
            })
            .then((data) => {
              // Delete the project from firebase storage
              console.log(`reference = ${reference}`);
              const storageRef = ref(storage, reference + "/files");

              // listAll(storageRef)
              //   .then((res) => {
              //     res.prefixes.forEach((folderRef) => {
              //       // All the prefixes under listRef.
              //       // You may call listAll() recursively on them.
              //       console.log(folderRef);
              //     });

              //     res.items.forEach((itemRef) => {
              //       // All the items under listRef.
              //       console.log(itemRef);
              //       if (itemRef.name.includes(file_name)) {
              //         // Delete the file
              //         deleteObject(itemRef)
              //           .then(() => {
              //             // File deleted successfully
              //             console.log(`${itemRef.name} deleted successfully`);
              //           })
              //           .catch((error) => {
              //             // Uh-oh, an error occurred!
              //             console.log(`error in deleting the file .. {error}`);
              //           });
              //       }
              //     });
              //   })
              //   .catch((error) => {
              //     console.log(error);
              //   });

              console.log(data);
              Swal.fire({
                title: "File Deleted!",
                icon: "success",
              });
            })
            .then(() => {});
          // navigate(`/profile/user_id/${user_id}/project/${project_id}`);
        } else {
          Swal.fire({
            title: "File is not deleted.",
            icon: "info",
          });
        }
      });
    } catch (error) {
    } finally {
      navigate(`/profile/user_id/${user_id}/project/${project_id}`);
    }
  };

  const handleUploadFiles = (files) => {
    const uploaded = [...uploadedFiles];
    files.some((uploadedFile) => {
      if (uploaded.findIndex((f) => f.name === uploadedFile.name) === -1) {
        // if (uploaded.findIndex((f) => f.uploaded != true) === -1) {
        uploaded.push(uploadedFile);
        // }
      } else {
        return;
      }
    });
    setUploadedFiles(uploaded);
  };

  const handleFileEvent = (e) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    handleUploadFiles(chosenFiles);
  };

  // "users/Kirolos_jxdKLSaFbaa9HO4kANUvN0p93y03/LMS_anaRzP1Z2w0ew0bSfdur/files/comment.txt_626390af-9f14-4bf9-9459-f985677afed6"
  function handle_upload_to_firebase_storage() {
    console.log(`reference = ${reference}`);
    console.log(`uploadedFiles = ${uploadedFiles}`);
    let length_of_uploaded_files = 0;
    uploadedFiles.forEach((file_uploaded) => {
      if (file_uploaded.uploaded === true) return;
      length_of_uploaded_files++;
      console.log(`file_uploaded.name = ${file_uploaded.name}`);
      console.log(`file_uploaded.type = ${file_uploaded.type}`);
      console.log(`file_uploaded.size = ${file_uploaded.size}`);

      let single_file_reference = `${reference}/files/${
        file_uploaded.name
      }_${v4()}`;
      file_uploaded["file_reference"] = single_file_reference;
      // axios post req to single_project

      const storageRef = ref(storage, single_file_reference);
      // progress can be paused and resumed. It also exposes progress updates. // Receives the storage reference and the uploadedFiles to upload.
      const uploadTask = uploadBytesResumable(storageRef, file_uploaded);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          ); // update progress

          setCurrentFile({
            percent: percent,
            file_name: file_uploaded.name,
          });
        },
        (err) => console.log(err),
        () => {
          console.log(`${file_uploaded.name} Downloaded`);
          // download url
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            file_uploaded["url_reference"] = url;
            file_uploaded["url_reference"] = encodeURIComponent(
              file_uploaded["url_reference"]
            );
            console.log(url);
            axios
              .post(
                `http://localhost:8000/single_project?user_id=${user_id}&project_id=${project_id}&file_name=${file_uploaded.name}&file_type=${file_uploaded.type}&file_size=${file_uploaded.size}&file_reference=${single_file_reference}&url_reference=${file_uploaded.url_reference}`
              )
              .then((response) => {
                console.log(response);
              });
          });
        }
      );
    });

    // let length_of_uploaded_files = Object.keys(uploadedFiles).length;

    if (length_of_uploaded_files === 0) {
      Swal.fire({
        title: `No New Files Selected`,
        icon: "info",
      });
    } else if (length_of_uploaded_files === 1) {
      Swal.fire({
        title: `${length_of_uploaded_files} file is uploading!`,
        icon: "success",
      });
    } else {
      Swal.fire({
        title: `${length_of_uploaded_files} files are uploading!`,
        icon: "success",
      });
    }
    setUploadedFiles([...uploadedFiles]);
  }

  function getSingleProject() {
    axios
      .get(
        `http://localhost:8000/single_project?user_id=${user_id}&project_id=${project_id}`
      )
      .then((data) => {
        // console.log(data);
        console.log(`data.data.data = ${data.data.data}`);
        let project_object = data.data.data;
        // console.log(project_object);
        let project_data = {
          name: project_object[project_id].project_name,
          description: project_object[project_id].description,
          project_id: project_object[project_id].project_id,
          user_id: project_object[project_id].user_id,
          user_name: project_object[project_id].user_name,
          files: project_object[project_id].files,
          diagrams: project_object[project_id].diagrams,
        };

        var array_of_files = [];
        let files = project_data.files;
        // console.log(`files = ${files}`);
        if (files != undefined) {
          for (const [key, value] of Object.entries(files)) {
            console.log(key, value);
            if (value.has_useCase_diagram == true) {
              array_of_files.push({
                name: value.name,
                type: value.type,
                size: value.size,
                reference: value.file_reference,
                url_reference: value.url_reference,
                uploaded: true,
                diagram_url_reference: value.diagram_url_reference,
              });
              continue;
            }
            array_of_files.push({
              name: value.name,
              type: value.type,
              size: value.size,
              reference: value.file_reference,
              url_reference: value.url_reference,
              uploaded: true,
            });
          }
        }

        setUploadedFiles(array_of_files);

        root_ref = `users/${project_data.user_name}_${project_data.user_id}/${project_data.name}_${project_data.project_id}`;
        setReference(root_ref);
        console.log(`root_ref = ${root_ref}`);
        files_ref = ref(storage, `${root_ref}/files/`);
        setProject(project_data);
        console.log("get Single Project axios data have come");
        console.log(`project_name = ${project.name}`);
        console.log(`project_name = ${project.user_name}`);
      });
  }

  const generateDiagram = (file_name, file_url_reference) => {
    console.log(file_name);
    console.log(file_url_reference);

    axios
      .post(
        `http://localhost:8000/generate_use_case_with_file?user_id=${user_id}&user_name=${project.user_name}&project_id=${project_id}&project_name=${project.name}&file_url_reference=${file_url_reference}&file_name=${file_name}`
      )
      .then((data) => {
        // console.log(data);
        console.log(`data.data.data = ${data.data.data}`);
        let project_object = data.data.data;
        console.log(project_object);
        // let project_data = {
        //   name: project_object[project_id].name,
        //   description: project_object[project_id].description,
        //   project_id: project_object[project_id].project_id,
        //   user_id: project_object[project_id].user_id,
        //   user_name: project_object[project_id].user_name,
        //   files: project_object[project_id].files,
        // };
      });
  };

  useEffect(() => {
    getSingleProject();
  }, []);
  return (
    <>
      <HeaderSignedIn />
      {/* {console.log(project)} */}
      <h1 className="text-left mt-3">Project Name:</h1>
      <h2>{project.name}</h2>
      <input
        id="fileUpload"
        type="file"
        multiple
        accept="*"
        onChange={handleFileEvent}
      />
      {currentFile.percent === 100 &&
        setCurrentFile({
          percent: 0,
          file_name: "",
        })}
      <ProgressBar
        className="progressBar"
        now={currentFile.percent}
        label={`${currentFile.file_name} - ${currentFile.percent}%`}
      />
      <label>
        <a
          href="#"
          className={`btn btn-primary `}
          onClick={handle_upload_to_firebase_storage}
        >
          Upload Files
        </a>
      </label>

      <div className="container">
        <table
          id="example"
          className="table table-striped"
          style={{ width: "100%" }}
        >
          <thead>
            <tr>
              <th style={{ width: "20%" }}>Type</th>
              <th>Name</th>
              <th>Size</th>
              <th># of pages</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {uploadedFiles.map((uploadedFile, key) => {
              return (
                <tr key={key}>
                  <td style={{ width: "20%" }}>{uploadedFile.type}</td>
                  <td>
                    <a target="_blank" href={uploadedFile.url_reference}>
                      {" "}
                      {uploadedFile.name}
                    </a>
                  </td>
                  <td>
                    {(parseFloat(uploadedFile.size) / 1024).toFixed(2)} KB
                  </td>
                  <td>###</td>
                  <td>
                    <a
                      className="btn btn-primary"
                      target="_blank"
                      href={uploadedFile.url_reference}
                    >
                      open
                    </a>
                  </td>
                  <td disabled="disabled">
                    <button
                      className="btn btn-danger"
                      target="_blank"
                      value={uploadedFile.name}
                      href={uploadedFile.url_reference}
                      onClick={deleteFile}
                    >
                      delete file
                    </button>
                  </td>
                  <td>
                    {uploadedFile.diagram_url_reference == null ? (
                      <button
                        className="btn btn-dark"
                        onClick={(event) =>
                          generateDiagram(
                            uploadedFile.name,
                            uploadedFile.url_reference
                          )
                        }
                      >
                        Generate Use Case Diagram
                      </button>
                    ) : (
                      <button className="btn btn-success">
                        <a
                          target="_blank"
                          href={uploadedFile.diagram_url_reference}
                        >
                          {uploadedFile.name} use case diagram
                        </a>
                      </button>
                    )}{" "}
                  </td>
                </tr>
              );
            })}
          </tbody>
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

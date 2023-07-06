import "../css/index.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HeaderSignedIn from "../Components/HeaderSignedIn";
import axios from "axios";
import Swal from "sweetalert2";
import v4 from "../id_generator";
// import ProgressBar from "react-bootstrap/ProgressBar";
// import { btoa } from "base64-js";
// import FileUploadForm from "../Components/uploaded File.js/uploadedFile";
// import TextEditor from "../Components/uploaded File.js/textEditor";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  // const [uploadedFiles, setUploadedFiles] = useState([]);
  const [reference, setReference] = useState("");
  const [currentFile, setCurrentFile] = useState({
    percent: 0,
    file_name: "",
  });

  const [lastfilename, setLastFileName] = useState();
  const [statefilename, setStateFileName] = useState();
  const [file, setFile] = useState({
    file_reference: "",
    file_size: "",
    file_type: "",
    url_reference: "",
    has_useCase_diagram: "",
    has_Class_diagram: "",
    usecase_diagram_url_reference: "",
    class_diagram_url_reference: "",
  });
  const [text, setText] = useState();

  const navigate = useNavigate();

  const notify = () =>
    toast("File Uploading", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: currentFile.percent,
      theme: "light",
    });

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
    // console.log(e.target.value);

    console.log(`file.name = ${file.name}`);
    let file_name = file.name;
    try {
      Swal.fire({
        title: `Do you want to delete the Last file "${file_name}"?`,
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
              // const storageRef = ref(storage, reference + "/files");
              // List all for deleting that single file in firebase database

              console.log(data);
              Swal.fire({
                title: "File Deleted!",
                icon: "success",
              });
              window.location.reload();

              // return true;
            })
            .then(() => {
              window.location.reload();
            });
          window.location.reload();

          // navigate(`/profile/user_id/${user_id}/project/${project_id}`);
        } else {
          Swal.fire({
            title: "File is not deleted.",
            icon: "info",
          });
          return false;
        }
      });
    } catch (error) {
      return false;
    } finally {
      // navigate(`/profile/user_id/${user_id}/project/${project_id}`);
    }
  };

  // "users/Kirolos_jxdKLSaFbaa9HO4kANUvN0p93y03/LMS_anaRzP1Z2w0ew0bSfdur/files/comment.txt_626390af-9f14-4bf9-9459-f985677afed6"
  function handle_upload_to_firebase_storage() {
    if (currentFile !== undefined) {
      // if (deleteFile()) {
      console.log(`reference = ${reference}`);
      // console.log(`uploadedFiles = ${uploadedFiles}`);

      console.log(`currentFile = ${currentFile}`);
      // console.log(`file_uploaded.size = ${file_uploaded.size}`);
      let file_uploaded = currentFile;
      if (file_uploaded.size > 51200) {
        alert("File upload Max size exceeded");
        return;
      }
      if (file_uploaded.type !== "text/plain") {
        alert("File Type is not supported");
        return;
      }
      notify();
      console.log(`file_uploaded.name = ${file_uploaded.name}`);
      let single_file_reference = `${reference}/files/${
        file_uploaded.name
      }_${v4()}`;
      file_uploaded["file_reference"] = single_file_reference;
      // axios post req to single_project
      const storageRef = ref(storage, single_file_reference);
      // 'file' comes from the Blob or File API
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
            setLastFileName(file_uploaded.name);

            console.log(url);
            axios
              .post(
                `http://localhost:8000/single_project?user_id=${user_id}&project_id=${project_id}&file_name=${file_uploaded.name}&file_type=${file_uploaded.type}&file_size=${file_uploaded.size}&file_reference=${single_file_reference}&url_reference=${file_uploaded.url_reference}`
              )
              .then((response) => {
                // console.log(response);
                window.location.reload();
              });
          });
        }
      );
      // }
    }
  }
  function getSingleProject() {
    console.log("getSingleProject is activavted");
    axios
      .get(
        `http://localhost:8000/single_project?user_id=${user_id}&project_id=${project_id}`
      )
      .then((data) => {
        // console.log(data);
        console.log(`data.data.data = ${JSON.stringify(data.data.data)}`);
        let project_object = data.data.data;
        // console.log(`project_object = ${project_object}`);
        // console.log(project_object);
        let project_data = {
          name: project_object[project_id].project_name,
          description: project_object[project_id].description,
          project_id: project_object[project_id].project_id,
          user_id: project_object[project_id].user_id,
          user_name: project_object[project_id].user_name,
          files: project_object[project_id].files,
        };
        setProject(project_data);
        console.log(`project data name = ${project_data.name}`);
        let files = project_data.files;
        console.log(`files = ${JSON.stringify(files)}`);
        if (files !== undefined) {
          const file_name = Object.keys(files)[0];
          console.log(`file name = ${file_name}`);
          let file_url_reference = files[file_name].url_reference;
          console.log(`file_url_reference = ${file_url_reference}`);
          let project_file = files[file_name];
          setFile(project_file);
          setLastFileName(project_file.name);

          fetch_content(file_url_reference);
        }
        // console.log(`file = ${file.url_reference}`);

        root_ref = `users/${project_data.user_name}_${project_data.user_id}/${project_data.name}_${project_data.project_id}`;
        setReference(root_ref);
        console.log(`root_ref = ${root_ref}`);
        files_ref = ref(storage, `${root_ref}/files/`);
        console.log("get Single Project axios data have come");
        // console.log(`project_name = ${project.name}`);
        // console.log(`project_name = ${project.user_name}`);
      });
  }

  const generateUseCaseDiagram = () => {
    let file_name = file.name;
    let file_url_reference = file.url_reference;
    console.log(file_name);
    console.log(`file_url_reference BEFORE ENCODING = ${file_url_reference}`);
    file_url_reference = encodeURIComponent(file_url_reference);
    console.log(`file_url_reference AFTER ENCODING = ${file_url_reference}`);

    axios
      .post(
        `http://localhost:8000/generate_use_case_with_file?user_id=${user_id}&user_name=${project.user_name}&project_id=${project_id}&project_name=${project.name}&file_url_reference=${file_url_reference}&file_name=${file_name}`
      )
      .then((data) => {
        // console.log(data);
        console.log(`data.data.data = ${data.data.data}`);
        let project_object = data.data.data;
        console.log(project_object);
      });
  };

  const generateClassDiagram = (file_name, file_url_reference) => {
    // console.log(file_name);
    // console.log(file_url_reference);
    // axios
    //   .post(
    //     `http://localhost:8000/generate_class_with_file?user_id=${user_id}&user_name=${project.user_name}&project_id=${project_id}&project_name=${project.name}&file_url_reference=${file_url_reference}&file_name=${file_name}`
    //   )
    //   .then((data) => {
    //     // console.log(data);
    //     console.log(`data.data.data = ${data.data.data}`);
    //     let project_object = data.data.data;
    //     console.log(project_object);
    //   });
  };
  const fetch_content = (url) => {
    console.log(`url BEFORE ENCODING at fetch_content = ${url}`);
    url = encodeURIComponent(url);
    console.log(`url AFTER ENCODING at fetch_content = ${url}`);
    axios
      .get(`http://localhost:8000/text_content?url=${url}`)
      .then((response) => {
        // console.log(`response.data: = ${response.data}`);
        setText(response.data);
      })
      .catch((error) => {
        console.error(`error = ${error}`);
      });
  };
  useEffect(() => {
    getSingleProject();
  }, []);

  function handleChange(event) {
    console.log(`event.target.files[0] = ${event.target.files}`);
    console.log(`event.target.files[0].name = ${event.target.files[0].name}`);
    setStateFileName(event.target.files[0].name);
    setCurrentFile(event.target.files[0]);
    // setFile(event.target.files[0]);
    console.log(`statefilename: ${statefilename}
    lastfilename: ${lastfilename}`);
  }

  let fileReader;

  const onChange = (e) => {
    handleChange(e);
    let file_selected = e.target.files;
    onFileRead(file_selected[0]);
  };

  const onFileRead = (file_selected) => {
    // console.log(`file_selected = ${file_selected}`);
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file_selected);
  };

  // const deleteLines = (string, n = 1) => {
  //   console.log("remove lines");
  //   return string.replace(new RegExp(`(?:.*?\n){${n - 1}}(?:.*?\n)`), "");
  // };

  const cleanContent = (string) => {
    string = string.replace(/^\s*[\r\n]/gm, "");
    let array = string.split(new RegExp(/[\r\n]/gm));
    // console.log(array);
    array.splice(0, 3);
    array.splice(-3);
    return array.join("\n");
  };

  const handleFileRead = (e) => {
    let content = fileReader.result;
    // let text = deleteLines(content, 3);
    content = cleanContent(content);
    // … do something with the 'content' …
    setText(content);
  };

  return (
    <>
      <HeaderSignedIn />
      {/* {console.log(project)} */}

      <h1 className="text-left mt-3">Project Name:</h1>
      <h2 className="project-name-title">{project.name}</h2>
      <div className=" upload-section">
        {/* <div className=" input-div"> */}
        <input type="file" name="myfile" onChange={onChange} accept=".txt" />
        <p>50 KB Max. Size is allowed</p>
        {/* </div> */}

        <div className="">
          <a
            href="#"
            className={`btn btn-primary `}
            onClick={handle_upload_to_firebase_storage}
          >
            Upload File
          </a>
        </div>
      </div>

      <div className="fileBox">
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light ml-auto">
            {statefilename === lastfilename ? (
              <h3 className="fileName">
                {statefilename}
                {/* <p className="">( {(parseInt(file.size) / 1024).toFixed(2)} KB)</p> */}
              </h3>
            ) : (
              <h3 className="fileName">
                {lastfilename}
                <p className="">
                  ( {(parseInt(file.size) / 1024).toFixed(2)} KB)
                </p>
              </h3>
            )}
            {/* USE CASE DIAGRAM */}

            {file.has_useCase_diagram ? (
              <button className="btn btn-success">
                <a target="_blank" href={file.usecase_diagram_url_reference}>
                  {file.name} Use Case Diagram
                </a>
              </button>
            ) : (
              <button className="btn btn-dark" onClick={generateUseCaseDiagram}>
                Generate Use Case Diagram
              </button>
            )}

            {/* CLASS DIAGRAM */}

            {file.has_Class_diagram ? (
              <button className="btn btn-success">
                <a target="_blank" href={file.class_diagram_url_reference}>
                  {file.name} Class Diagram
                </a>
              </button>
            ) : (
              <button
                className="btn btn-dark"
                onClick={generateClassDiagram(file.name, file.url_reference)}
              >
                Generate Class Diagram
              </button>
            )}
            <button className="btn btn-danger" href="#" onClick={deleteFile}>
              delete file
            </button>
          </nav>
        </div>
        <div className="fileShown">{text && <pre>{text}</pre>}</div>
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

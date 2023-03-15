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
  const [input_docs, setInputDocs] = useState([]);

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
  const [filesUploaded, setFilesUploaded] = useState(null);
  const [percent, setPercent] = useState(null);
  const [fileList, setFileList] = useState([null]);

  const handleFileChange = (e) => {
    setFileList(e.target.files);
  };
  const handleUploadClick = () => {
    if (!fileList) {
      return;
    }

    // 👇 Create new FormData object and append files
    const data = new FormData();
    files.forEach((file, i) => {
      data.append(`file-${i}`, file, file.name);
    });

    // 👇 Uploading the files using the fetch API to the server
    // fetch("https://httpbin.org/post", {
    //   method: "POST",
    //   body: data,
    // })
    //   .then((res) => res.json())
    //   .then((data) => console.log(data))
    //   .catch((err) => console.error(err));
  };

  // 👇 files is not an array, but it's iterable, spread to get an array of files
  const files = fileList ? [...fileList] : [];

  // const showUploadedFiles = async () => {
  //   const { value: uploaded } = await Swal.fire({
  //     title: "Select File",
  //     input: "file",
  //     inputAttributes: {
  //       accept: "*",
  //       multiple: "multiple",
  //       "aria-label": "Upload your text file ",
  //     },
  //   }).then((uploaded) => {
  //     console.log(uploaded);
  //     var files = uploaded.value;
  //     // console.log(files);
  //     let number_of_files = Object.keys(files).length;
  //     // console.log(file.value[1].name);
  //     if (number_of_files === 1) {
  //       Swal.fire({
  //         title: "You uploaded The file successfully.",
  //         icon: "success",
  //       });
  //     } else {
  //       Swal.fire({
  //         title: `You uploaded ${number_of_files} files successfully.`,
  //         icon: "success",
  //       });
  //     }
  //     let input_files = [];
  //     for (let i = 0; i < files.length; i++) {
  //       // console.log(v4());
  //       files[`${i}`].key = v4();
  //       input_files.push(files[`${i}`]);
  //     }
  //     console.log(input_files);
  //     // var temp_files = [];
  //     // input_files.forEach((item_file) => {
  //     //   temp_files.push(item_file);
  //     // });
  //     var temp_files = input_docs;
  //     input_files.forEach((item_file) => {
  //       temp_files.push(item_file);
  //     });
  //     // setInputDocs(...input_docs, input_files);
  //     // setInputDocs((input_files) => {
  //     //   return [input_files, ...input_docs];
  //     // });
  //     setInputDocs(temp_files);
  //     console.log(input_docs);
  //     return setInputDocs(temp_files);
  //   });
  // };
  // STOOOOOPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP
  // function handleUpload() {
  //   if (!file) {
  //     alert("Please choose a file first!");
  //   }
  //   const storageRef = ref(storage, `/files/${file.name}`);
  //   const uploadTask = uploadBytesResumable(storageRef, file);
  //   uploadTask.on(
  //     "state_changed",
  //     (snapshot) => {
  //       const percent = Math.round(
  //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //       ); // update progress
  //       setPercent(percent);
  //     },
  //     (err) => console.log(err),
  //     () => {
  //       // download url
  //       getDownloadURL(uploadTask.snapshot.ref).then((url) => {
  //         console.log(url);
  //       });
  //     }
  //   );
  // }
  // const addFile = () => {
  //   if (fileUploaded == null) return;
  //   // fileUploaded.forEach((fileUploaded) => {
  //   const fileRef = ref(storage, `files/${fileUploaded.name + v4()}`);
  //   uploadBytes(fileRef, fileUploaded).then(() => {
  //     alert("image uploaded");
  //   });
  //   // });

  //   // => {
  //   //   return [...input_docs, input_files];
  //   // });
  //   // const reader = new FileReader();
  //   // reader.onload = (e) => {
  //   //   Swal.fire({
  //   //     title: "You uploaded File successfully",
  //   //     icon: "success",
  //   //   });
  //   // };
  //   // reader.readAsDataURL(uploaded);
  //   // input_docs = uploaded;
  //   // console.log(uploaded);
  //   // project.input_docs = uploaded;
  //   // updateProject();
  //   // });
  // };
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
  useEffect(() => {
    getSingleProject();
    // showUploadedFiles();
  }, []);
  return (
    <>
      <HeaderSignedIn />

      <h1 className="text-left mt-3">Project Name:</h1>
      <h2>{project.name}</h2>
      {/* <input
        type="file"
        multiple
        onChange={(e) => {
          setFilesUploaded(e.target.files[0]);
          // setFileUploaded([e.target.files[0], ...fileUploaded]);
        }}
      /> */}
      <input type="file" onChange={handleFileChange} multiple />

      <button className="btn btn-success" onClick={handleFileChange}>
        Add File
      </button>
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
            {/* {console.log(`input_docs Before Loop = ${input_docs.toString()}`)} */}
            {files.map((file) => {
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
          {/* {console.log(`input_docs After Loop = ${input_docs.toString()}`)} */}
          {/* <tbody> */}
          {/* {console.log(`input_docs Before Loop = ${input_docs.toString()}`)} */}
          {/* {input_docs.map((file) => {
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
          </tbody> */}
          {/* {console.log(`input_docs After Loop = ${input_docs.toString()}`)} */}
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
      {/* 
      <div className="row px-5 mx-5 col-9">
        <table className="table table-bordered table-striped table-dark mt-5">
          <thead>
            <tr>
              <th>#</th>
              <th>User Story Docs</th>
              <th>Usecase Diagram</th>
              <th>Class Diagram</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>
                {project.input_docs == null ? (
                  <button className="btn btn-success" onClick={addFile}>
                    Add File
                  </button>
                ) : (
                  <a href="#">{project.input_docs}</a>
                )}
              </td>
              <td>
                {project.usecase_diagramPNG == null ? (
                  <button className="btn btn-success">Generate</button>
                ) : (
                  <a href="#">{project.usecase_diagramPNG}</a>
                )}{" "}
              </td>
              <td>
                {project.class_diagramPNG == null ? (
                  <button className="btn btn-success">Generate</button>
                ) : (
                  <a href="#">{project.class_diagramPNG}</a>
                )}{" "}
              </td>
            </tr>
          </tbody>
        </table>
      </div> */}
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

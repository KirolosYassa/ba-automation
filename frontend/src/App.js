/* 
cd .\frontend\
npm install


cd .\frontend\
npm start


cd .\frontend\
run npm build
npm start

npm run build 
firebase deploy 

*/
import "./css/index.css";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Footer from "./Components/Footer";
import Home from "./pages/Home";
// import Home_SignedIn from "./pages/Home_SignedIn";
import Myprofile from "./pages/Myprofile";
import Myprojects from "./pages/Myprojects";
import About from "./pages/About";
// import About_SignedIn from "./pages/About_SignedIn";
import SingleProject from "./pages/SingleProject";
import Addproject from "./pages/Addproject";
import EditProjectData from "./pages/edit_project_data";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  useEffect(() => {
    document.title = "UML generator";
  }, []);
  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="about" element={<About />} />
        {/* 3ayzeen nzbot el routeen dool 3a4an da el profile bta3 user mo3yn fa --> htb2a 8aleban '/:userid/myprojects' */}
        {/* <Route path="profile" element={<Myprofile />} /> */}
        <Route path="profile/:user_id" element={<Myprofile />} />
        <Route path="projects/:user_id" element={<Myprojects />} />
        <Route
          path="profile/user_id/:user_id/project/:project_id"
          element={<SingleProject />}
        />
        <Route path="addproject/:user_id" element={<Addproject />} />
        <Route
          path="edit_project_data/profile/:user_id/project/:project_id"
          element={<EditProjectData />}
        />
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;

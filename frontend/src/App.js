/* 
cd .\frontend\
npm start


cd .\frontend\
run npm build
npm start

*/
import "./css/index.css";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Footer from "./Components/Footer";
import Home from "./pages/Home";
import Myprofile from "./pages/Myprofile";
import About from "./pages/About";
import SingleProject from "./pages/SingleProject";
import Addproject from "./pages/Addproject";

function App() {
  useEffect(() => {
    document.title = "UML generator";
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="about" element={<About />} />
        {/* 3ayzeen nzbot el routeen dool 3a4an da el profile bta3 user mo3yn fa --> htb2a 8aleban '/:userid/myprojects' */}
        {/* <Route path="profile" element={<Myprofile />} /> */}
        <Route path="profile/:user_id" element={<Myprofile />} />
        <Route
          path="profile/user_id/:user_id/project/:project_id"
          element={<SingleProject />}
        />
        <Route path="addproject/:user_id" element={<Addproject />} />
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;

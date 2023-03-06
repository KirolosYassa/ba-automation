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
        <Route path="Projects" element={<Myprofile />} />
        <Route path="Projects/:projectid" element={<SingleProject />} />
        <Route path="addproject" element={<Addproject />} />
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
<<<<<<< HEAD

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./Pages/Home";
// import Signup from "./Pages/Signup";
// import Login from "./Pages/Login";

// function App() {
//   return (
//     <Router>
//       Hello World
//       <Routes>
//         <Route path="/" element={<Home />}></Route>
//         <Route path="/signup" element={<Signup />}></Route>
//         <Route path="/login" element={<Login />}></Route>
//       </Routes>
//     </Router>
//   );
// }

// export default App;

=======
>>>>>>> 7bf6c0f05205c174bcc68abc671bfb5c939f1d58

import { useEffect, useState } from "react";
import axios from "axios";
import Item from "./components/Item";

function App() {
  const [result, setResult] = useState(null);

  const message = async () => {
    try {
      let res = await axios.get("http://127.0.0.1:8000/");
      let result = res.data.msg;
      setResult(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    message();
  }, []);

  const [resultMsg, setResultMsg] = useState([]);

  const messageMsg = async () => {
    try {
      let res = await axios.get("http://127.0.0.1:8000/msgs");
      console.log(res);
      let resultMsg = res.data.msg;
      setResultMsg(resultMsg);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    messageMsg();
  }, []);

  return (
    <div>
      <p>{result}</p>
      <p>{resultMsg}</p>
      {resultMsg.map((item) => (
        <div>{item.msg}</div>
      ))}
      {/* <Item value="HEy" /> */}
      {/* <h1>This is H1 Line</h1> */}
    </div>
  );
}

export default App;

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

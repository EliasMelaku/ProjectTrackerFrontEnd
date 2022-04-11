import "./App.css";
import Nav from "./Components/Nav";
import Home from "./pages/Home";
import EditProfile from "./pages/EditProfile";

import Details from "./pages/Details";
import New from "./pages/New";

import Login from "./pages/Login";
import Register from "./pages/Register";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LoginProvider } from "./LoginContext";
import Landing from "./pages/Landing";


function App() {
  return (
    <Router>
      <div className="App">
        <LoginProvider>
        <Nav />
        <Routes>
          <Route path="/"            element={<Landing/>}/>
          <Route path="/home"        element={<Home />} />
          <Route path="/details"     element={<Details />} />
          <Route path="/editProfile" element={<EditProfile />} />
          <Route path="/item/:id"    element={<New />} />
          <Route path="/login"       element={<Login />} />
          <Route path="register"     element={<Register />} />
        </Routes>
        </LoginProvider>
      </div>
    </Router>
  );
}

export default App;

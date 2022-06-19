import "./App.css";
import Nav from "./Components/Nav";
import Home from "./pages/Home";
import EditProfile from "./pages/EditProfile";

import Details from "./pages/Details";
import NewProject from "./pages/NewProject";

import Login from "./pages/Login";
import Register from "./pages/Register";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LoginProvider } from "./LoginContext";
import Landing from "./pages/Landing";
import ActiveProjectDetail from "./pages/ActiveProjectDetail";
import CompletedProjectDetail from "./pages/CompletedProjectDetail";
import EditProject from "./pages/EditProject";
import CompletedProjects from "./pages/CompletedProjects";
import OtherProjects from "./pages/OtherProjects";
// import ViewPDF from "./pages/ViewPDF";


function App() {
  return (
    <Router>
      <div className="App">
        <LoginProvider>
        <Nav />
        <Routes>
          <Route path="/"            element={<Landing/>}/>
          <Route path="/home"        element={<Home />} />
          <Route path="/completedProjects"        element={<CompletedProjects />} />
          <Route path="/otherProjects"    element={<OtherProjects/>} />
          <Route path="/newproject"     element={<NewProject />} />
          <Route path="/editProject/:id"     element={<EditProject />} />
          <Route path="/editProfile" element={<EditProfile />} />
          <Route path="/activeProject/:id"    element={<ActiveProjectDetail />} />
          <Route path="/completedProject/:id"    element={<CompletedProjectDetail />} />
          <Route path="/item/:id"    element={<Details />} />
          <Route path="/login"       element={<Login />} />
          <Route path="/register"     element={<Register />} />
        </Routes>
        </LoginProvider>
      </div>
    </Router>
    // <ViewPDF report={"2physics_2(3).pdf"}/>
  );
}

export default App;

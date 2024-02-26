// import Nav from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
// import Home from "./pages/Home";
import Profile from "./pages/Profile";

function App() {
  return (
    <div className="text-black">
      {/* <Nav /> */}
      <Routes>
        <Route path="/" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;

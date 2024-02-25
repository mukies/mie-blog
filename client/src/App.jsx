// import Nav from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";

import Login from "./pages/Login";

function App() {
  return (
    <div className="text-black">
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      {/* <Nav /> */}
    </div>
  );
}

export default App;

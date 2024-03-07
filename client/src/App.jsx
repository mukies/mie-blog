// import Nav from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import PostPage from "./pages/PostPage";
import PageNotFound from "./pages/PageNotFound";
import AdminHome from "./pages/admin/AdminHome";
import ManageChats from "./pages/admin/ManageChats";
import ManageUsers from "./pages/admin/ManageUsers";
import UserDetails from "./components/layout/admin/UserDetails";
import UserFriendsPage from "./pages/admin/UserFriendsPage";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminRegister from "./pages/admin/AdminRegister";
import ProtectedRoute from "./protectedRoute/ProtectedRoute";

function App() {
  const auth = JSON.parse(localStorage.getItem("_L"));
  return (
    <div>
      {/* <Nav /> */}
      <Routes>
        <Route path="/" element={auth ? <Home /> : <Login />} />
        {/* <Route path="/" element={<Home />} /> */}
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/post/:id" element={<PostPage />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/mie-admin" element={<AdminLogin />} />
        <Route path="/mie-reg" element={<AdminRegister />} />
        {/* admin routes */}
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/chats" element={<ManageChats />} />
        <Route path="/admin/users" element={<ManageUsers />} />
        <Route path="/admin/users/:id" element={<UserDetails />} />
        <Route path="/admin/users/friend-list" element={<UserFriendsPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;

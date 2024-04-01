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
import UserDetails from "./pages/admin/UserDetails";
import UserFriendsPage from "./pages/admin/UserFriendsPage";
import ProtectedRoute from "./protectedRoute/ProtectedRoute";
import AdminNav from "./components/layout/admin/Nav";
import Nav from "./components/layout/user/Navbar";
import ChatListPage from "./pages/ChatListPage";
import MessagePage from "./pages/MessagePage";
import UserSuggestionPage from "./pages/UserSuggestionPage";
import PhotosPage from "./pages/PhotosPage";
import { AdminAuthentication } from "./pages/admin/AdminAuthentication";
import AdminProtectedRoute from "./protectedRoute/AdminProtectedRoute";
import SinglePostPage from "./pages/admin/SinglePostPage";
import UserPhotoPage from "./pages/admin/UserPhotoPage";
import UserMessagePage from "./pages/admin/UsersMessagePage";
import NewsFeed from "./pages/admin/NewsFeed";

function App() {
  const auth = JSON.parse(localStorage.getItem("_L"));
  const adminAuth = JSON.parse(localStorage.getItem("_A"));

  return (
    <div className="bg-gray-100">
      {auth && !adminAuth ? <Nav /> : !auth && adminAuth ? <AdminNav /> : ""}
      <Routes>
        <Route
          path="/"
          element={
            auth && !adminAuth ? (
              <Home />
            ) : adminAuth && !auth ? (
              <AdminHome />
            ) : (
              <Login />
            )
          }
        />
        <Route element={<ProtectedRoute />}>
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/chats" element={<ChatListPage />} />
          <Route path="/user-suggestion" element={<UserSuggestionPage />} />
          <Route path="/chats/:id" element={<MessagePage />} />
          <Route path="/photos" element={<PhotosPage />} />
        </Route>
        <Route path="/post/:id" element={<PostPage />} />
        {/* admin routes */}
        <Route path="/mie-admin" element={<AdminAuthentication />} />
        <Route path="/admin" element={<AdminProtectedRoute />}>
          <Route path="chats" element={<ManageChats />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="users/:id" element={<UserDetails />} />
          <Route path="post/:postID" element={<SinglePostPage />} />
          <Route path="users/friend-list" element={<UserFriendsPage />} />
          <Route path="user/photos/:username" element={<UserPhotoPage />} />
          <Route path="news-feed" element={<NewsFeed />} />
          <Route path="chats/:id" element={<UserMessagePage />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;

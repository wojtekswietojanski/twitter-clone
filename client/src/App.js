import "./App.css";
import PostPage from "./view/postPage";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./view/loginPage";
import RegisterPage from "./view/registerPage";
import { UserContextProvider } from "./userContext.js";
import ProfilePage from "./view/profilePage.js";
function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<PostPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/showUserPosts/:username" element={<ProfilePage />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;

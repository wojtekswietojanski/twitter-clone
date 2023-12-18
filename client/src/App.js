import "./App.css";
import PostPage from "./view/postPage";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./view/loginPage";
import RegisterPage from "./view/registerPage";
import { UserContextProvider } from "./userContext.js";
function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<PostPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;

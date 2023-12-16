import "./App.css";
import PostPage from "./view/postPage";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./view/loginPage";
import RegisterPage from "./view/registerPage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<PostPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;

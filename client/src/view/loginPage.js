import "../styling/loginPage/loginPage.css";
import Logo from "../assets/logoImg.png";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="formContainer">
      <form action="">
        <img src={Logo} alt="" />
        <input type="text" name="login" placeholder="Login" />
        <input type="password" name="password" placeholder="password" />
        <button>Login</button>
      </form>
      <Link to="/register">Nie masz konta?</Link>
    </div>
  );
};

export default LoginPage;

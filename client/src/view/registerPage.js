import "../styling/loginPage/loginPage.css";
import Logo from "../assets/logoImg.png";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <div className="formContainer">
      <form action="">
        <img src={Logo} alt="" />
        <input type="text" name="login" placeholder="Login" />
        <input type="password" name="password" placeholder="password" />
        <button>Register</button>
      </form>
      <Link to="/login">Masz już konto? zaloguj się</Link>
    </div>
  );
};

export default RegisterPage;

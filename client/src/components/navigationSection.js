import "../styling/navigationSection/navigationSection.css";
import Home from "../assets/home-icon-silhouette.png";
import Logo from "../assets/logoImg.png";
import { Link } from "react-router-dom";

const NavigationSection = () => {
  return (
    <aside id="leftAside">
      <div id="links">
        <Link to="/" className="navigationLink">
          <img src={Logo} alt="" />
          Logo
        </Link>
        <Link to="/" className="navigationLink">
          <img src={Home} alt="" />
          Home
        </Link>
      </div>
      <div id="loginOrRegister">
        <Link to="/login" id="login">
          Login
        </Link>
        <Link to="/register" id="register">
          Register
        </Link>
      </div>
    </aside>
  );
};

export default NavigationSection;

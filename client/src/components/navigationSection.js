import "../styling/navigationSection/navigationSection.css";
import Home from "../assets/home-icon-silhouette.png";
import Logo from "../assets/logoImg.png";
import { Link } from "react-router-dom";
import { useEffect, useContext } from "react";
import { UserContext } from "../userContext";

const NavigationSection = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);
  const logout = () => {
    fetch("http://localhost:4000/logout", {
      method: "POST",
      credentials: "include",
    });
    setUserInfo(null);
  };

  const username = userInfo?.username;

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
      {username && (
        <div id="loginOrRegister">
          <a id="logout" onClick={logout}>
            Logout
          </a>
          <Link to="/myProfile" id="myProfile">
            My profile
          </Link>
        </div>
      )}

      {!username && (
        <div id="loginOrRegister">
          <Link to="/login" id="login">
            Login
          </Link>
          <Link to="/register" id="register">
            Register
          </Link>
        </div>
      )}
    </aside>
  );
};

export default NavigationSection;

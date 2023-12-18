import "../styling/loginPage/loginPage.css";
import Logo from "../assets/logoImg.png";
import { Link } from "react-router-dom";
import { UserContext } from "../userContext";
import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState("");
  const { setUserInfo } = useContext(UserContext);

  async function login(event) {
    event.preventDefault();
    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (response.ok) {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
        setRedirect(true);
      });
    } else {
      alert("wrong credentials");
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="formContainer">
      <form action="" onSubmit={login}>
        <img src={Logo} alt="" />
        <input
          type="text"
          name="username"
          placeholder="Login"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <button>Login</button>
      </form>
      <Link to="/register">Nie masz konta?</Link>
    </div>
  );
};

export default LoginPage;

import "../styling/loginPage/loginPage.css";
import Logo from "../assets/logoImg.png";
import { Link } from "react-router-dom";
import { useState } from "react";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  async function register(event) {
    event.preventDefault();
    const response = await fetch("http://localhost:4000/register", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok == true) {
      alert("you are now registered");
    } else {
      alert("registration failed");
    }
  }

  return (
    <div className="formContainer">
      <form action="" onSubmit={register}>
        <img src={Logo} alt="" />
        <input
          type="text"
          name="username"
          placeholder="Login"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button>Register</button>
      </form>
      <Link to="/login">Masz już konto? zaloguj się</Link>
    </div>
  );
};

export default RegisterPage;

import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { useNotification } from "../components/NotificationProvider";

function Form({ route, method }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState(method || "login");
  const navigate = useNavigate();
  const { notify } = useNotification();
  const apiRoute = mode === "login" ? "/api/token/" : "/api/user/register/";
  const name = mode === "login" ? "Login" : "Register";

  const toggleMode = () =>
    setMode((m) => (m === "login" ? "register" : "login"));

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const response = await api.post(apiRoute, { username, password });
      if (mode === "login") {
        localStorage.setItem(ACCESS_TOKEN, response.data.access);
        localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
        navigate("/");
      } else {
        setMode("login");
        notify({
          message: "Registration was successful. Please log in",
          type: "success",
        });
      }
    } catch (error) {
      notify({ message: String(error), type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1>{name}</h1>
      <input
        type="text"
        className="form-input"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        className="form-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button className="form-button" type="submit">
        {name}
      </button>
      <button type="button" className="form-switch" onClick={toggleMode}>
        {mode === "login" ? "Switch to Register" : "Switch to Login"}
      </button>
    </form>
  );
}

export default Form;

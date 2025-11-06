import { useState } from "react";
import api from "../api";
import LoadingIndicator from "../components/LoadingIndicator";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { useNotification } from "../components/NotificationProvider";
import "../styles/Form.css";

function Form({ route, method, onSwitch }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { notify } = useNotification();
  const apiRoute = route;
  const name = method === "login" ? "Login" : "Register";
  const switchButtonText =
    method === "login" ? "Switch to Register" : "Switch to Login";

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const response = await api.post(apiRoute, { username, password });

      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, response.data.access);
        localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
        navigate("/");
      } else {
        notify({
          message: "Registration was successful. Please log in",
          type: "success",
        });
        navigate("/login");
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
      {loading && <LoadingIndicator />}
      <button className="form-button" type="submit" disabled={loading}>
        {loading ? "Loading..." : name}
      </button>
      <button type="button" className="form-switch" onClick={onSwitch}>
        {switchButtonText}
      </button>
    </form>
  );
}

export default Form;

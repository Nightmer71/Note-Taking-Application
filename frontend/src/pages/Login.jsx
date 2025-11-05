import Form from "../components/Form";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const handleSwitch = () => {
    navigate("/register");
  };

  return <Form route="/api/token/" method="login" onSwitch={handleSwitch} />;
}
export default Login;

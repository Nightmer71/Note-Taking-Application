import Form from "../components/Form";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const handleSwitch = () => {
    navigate("/login");
  };

  return (
    <Form
      route="/api/user/register/"
      method="register"
      onSwitch={handleSwitch}
    />
  );
}
export default Register;

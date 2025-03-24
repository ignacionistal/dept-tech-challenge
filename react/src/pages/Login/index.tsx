import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "api";
import "./index.scss";
import { AuthContext } from "contexts/AuthContext";

export const Login = () => {
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (): Promise<void> => {
    try {
      const token = await login("hardcoded-user-1");
      setToken(token);
      navigate("/")
    } catch (error) {
      console.error('Login error:', error);
      alert("Error during log in. Try Again!")
    }
  };

  return (
    <div className="login-page">
      <img
        src="https://www.deptagency.com/wp-content/themes/dept/public/logo-light-new.svg"
        alt="DEPT®"
        title="DEPT®"
      />
      <button onClick={handleLogin} className="glow-on-hover">
        LOG IN
      </button>
    </div>
  );
};

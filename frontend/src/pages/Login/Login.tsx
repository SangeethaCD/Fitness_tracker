import './Login.css';
import login from '../../assets/login.png';
import crystalDelta from '../../assets/1000082726.png';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  userId: number;
  email: string;
}

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ userName?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors: { userName?: string; password?: string } = {};

    if (!userName.trim()) newErrors.userName = "Username is must required";
    if (!password.trim()) newErrors.password = "Password is must required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/user/login", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userName, password })
      });

      const data = await response.json();
      if (!response.ok || !data.token) {
        alert(data.message || "Invalid username or password");
        return;
      }

      localStorage.setItem("token", data.token);

      const decoded: DecodedToken = jwtDecode(data.token);
      localStorage.setItem("userId", decoded.userId.toString());

      navigate("/user/Dashboard/");
    } catch (err) {
      console.error("There is some error in fetching the credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container gradient-left">
      <div className="left-side">
        <img
          className='fitness-logo'
          src={login}
          alt="Fitness Graphic"
        />
      </div>

      <div className="right-side">
        <div className="crystaldelta-logo">
          <img src={crystalDelta} alt="Crystal Delta Logo" />
        </div>

        <div className="login-form">
          <h3>Welcome Back!</h3>

          <input
            type="text"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          {errors.userName && <p className="error-text">{errors.userName}</p>}

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="error-text">{errors.password}</p>}

          <button onClick={handleLogin} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="login-register">
            Don't have an account? <Link to="/user/register">Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

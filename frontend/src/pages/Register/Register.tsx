import './Register.css';
import register from "../../assets/Register.png";
import crystalDelta from '../../assets/1000082726.png';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!userName.trim()) newErrors.userName = "Username is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = "Invalid email format";

    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";

    if (!confirmPassword) newErrors.confirmPassword = "Please confirm your password";
    else if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function handleRegistration() {
    if (!validate()) return;

    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userName, email, password })
      });

      if (!response.ok) {
        const data = await response.json();
        alert(data.message || "Registration failed");
        return;
      }

      navigate("/user/login");
    } catch (err) {
      console.error("There was an error during registration:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="Registration-container gradient-right">
      <div className="Register-left-side">
        <div className="crystaldelta-logo">
          <img src={crystalDelta} alt="Crystal Delta Logo" />
        </div>
        <div className="Registration-form">
          <h3>Please Fill out form to Register!</h3>

          <input
            type="text"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          {errors.userName && <p className="error-text">{errors.userName}</p>}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="error-text">{errors.email}</p>}

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="error-text">{errors.password}</p>}

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}

          <button onClick={handleRegistration} disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </div>

        <div className="login-register">
          Yes, I have an account?{" "}
          <Link to="/user/login">Login</Link>
        </div>
      </div>

      <div className="Register-right-side">
        <img className='Register-logo' src={register} alt="Register" />
      </div>
    </div>
  );
};

export default Register;

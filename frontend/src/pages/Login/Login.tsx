import './Login.css';
import login from '../../assets/login.png'
import crystalDelta from '../../assets/1000082726.png'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';


const Login = () => {
  const [userName,setUserName]=useState("");
  const [password,setPassword]=useState("");
  const navigate = useNavigate();
  async function handleLogin() {
    try{
      const response = await fetch("http://localhost:3000/user/login",{
        method:'POST',
        headers:{
          "Content-Type": "application/json"
        },
         body: JSON.stringify({ userName, password })
      })
      if(!response)
      {
        console.log("there is an error in the response");
      }
      navigate("/user/Dashboard/");    
    }
    catch(err)
    {
      console.log("There is some error in fetching the credentials.")
    }
    
  }
  return (
    <div className="login-container">
      <div className="left-side">
        <img
          className='fitness-logo'
          src={login}
          alt="Fitness Graphic"
        />
      </div>

      <div className="right-side">
        <div className="crystaldelta-logo">
          <img
            src={crystalDelta}
            alt="Crystal Delta Logo"
          />
        </div>
        <div className="login-form">
          <h3>Welcome Back!</h3>
          <input type="text" placeholder="Username" value={userName} onChange={(e)=>setUserName(e.target.value)} />
          <input type="password" placeholder="Password" value={password}  onChange={(e)=>setPassword(e.target.value)}/>
          <button onClick={handleLogin}>Login</button>
          <div className="login-register">
            Don't have an account?
            <Link to="/user/register">Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

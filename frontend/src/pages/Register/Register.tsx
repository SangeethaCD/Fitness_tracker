import './Register.css';
import register from "../../assets/Register.png"
import crystalDelta from '../../assets/1000082726.png'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
const Register = () => {
     const [userName,setUserName]=useState("");
     const [email,setEmail]=useState("");
     const[password,setPassword]=useState("");
     const navigate = useNavigate();
     async function handleRegistration()
     {
        try{
            const response = await fetch("http://localhost:3000/user/register",
                {
                    method:"POST",
                    headers:{
                        "Content-Type": "application/json"
                    },
                    body:JSON.stringify({userName,email,password})
                }
            )
            if(!response)
            {
                console.log("There is some error in the response");
            }
            const token = await response.json();
            localStorage.setItem("token",token);
            navigate("/user/login");
        }
        catch(err)
        {
            console.log("There is some error while fetching the users");
        }
     }
    return (
        <div className="Registration-container">

            <div className="Register-left-side">
                <div className="crystaldelta-logo">
                    <img
                        src={crystalDelta}
                        alt="Crystal Delta Logo"
                    />
                </div>
                <div className="Registration-form">
                    <h3>Please Fill out form to Register!</h3>
                    <input type="text" placeholder="Username" value={userName} onChange={(e)=>setUserName(e.target.value)} />
                    <input type='email' placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)} />
                    <input type="password" placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)} />
                    <input type="password" placeholder="confirm Password" />
                    <button onClick={handleRegistration} >Registration</button>
                </div>
                <div className="login-register">
                Yes i have an account? 
                <Link to="/user/login"><a >Login</a></Link>
                </div>
            </div>
             <div className="Register-right-side">
                    <img
                        className='Register-logo'
                        src={register}
                        alt="Register photo"
                    />
            </div>

        </div>
    );
};

export default Register;
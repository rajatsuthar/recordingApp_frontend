import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import './Login.css'; 

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  // const history = useHistory();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, name });
      console.log(response,"response");
      
    
      if(response.data.auth===false){
       
        toast.warning("You are not Existing user please signup");
        setTimeout(() => {
          navigate("/");
        }, 3000);
      
      }else{
        navigate("/recording");
      }
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='main-div'>
    <div className="login-container">
      <h2>Login To Recorder</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p className="signup-link">Don't have an account? <Link to="/">Sign up</Link></p>
    </div>
    </div>
  );
};

export default Login;

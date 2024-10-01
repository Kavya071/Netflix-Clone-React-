import React, { useState } from 'react';
import './Login.css';
import logo from '../../../assets/logo.png';
import { login, signup } from '../../../firebase';
import netflix_spinner from '../../../assets/netflix_spinner.gif'

const Login = () => {
  const [signState, setSignState] = useState("Sign In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");


  const user_auth = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      if (signState === "Sign In") {
        // Pass `email` and `password` to the login function
        await login(email, password);
      } else {
        await signup(name, email, password);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    isLoading?<div className="login-spinner">
      <img src={netflix_spinner} alt="" />
    </div>:
    <div className='login'>
      <img src={logo} alt="Netflix Logo" className='login-logo' />
      <div className="login-form">
        <h1>{signState}</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={user_auth}>
          {signState === "Sign Up" && (
            <input 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              type="text" 
              placeholder='Your name' 
              required 
            />
          )}
          <input 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            type="email" 
            placeholder='Email' 
            required 
          />
          <input 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            type="password" 
            placeholder='Password' 
            required 
          />
          <button type='submit' disabled={isLoading}>
            {isLoading ? "Please wait..." : signState}
          </button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember Me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>
        <div className="form-switch">
          {signState === "Sign In" ? (
            <p>New to Netflix? <span onClick={() => setSignState("Sign Up")}>Sign Up Now</span></p>
          ) : (
            <p>Already have an account? <span onClick={() => setSignState("Sign In")}>Sign In Now</span></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;

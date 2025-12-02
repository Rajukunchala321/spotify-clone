import React, {useRef, useState} from "react";
import "./Index.css";
import logo from "../../assests/music.png";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { Navigate, useNavigate } from "react-router-dom";

const Index = () => {
  const userInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [responseError, setResponseError] = useState<null | string>(null)

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault();

    try{
      const username = userInputRef.current?.value;
      const password = passwordInputRef.current?.value
      const userDetails = {username, password}
      const response = await axios.post("https://apis.ccbp.in/login", JSON.stringify(userDetails) )
      console.log(response);
       const token = response.data.jwt_token
       Cookies.set('jwtToken', token, {
        expires:30, 
        path:'/'
       });
       navigate("/", {replace:true})

    }catch(err){
      const error = err as AxiosError<{error_msg?: string}>;
      console.error(error?.response?.data?.error_msg || "Login faield")
     
      setResponseError(error?.response?.data?.error_msg || "Login faield")
    }
  }

if (Cookies.get("jwtToken")){
  return <Navigate to='/' replace/>
}
  return (
    <section className="loginpage-section">
      <div className="loginpage-main-container">
        <div className="form-container">
          <img src={logo} alt="music" />
          <h2>Spotify Remix</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="input-container">
              <label  htmlFor='username'>Username</label>
              <input ref={userInputRef} placeholder="user name" type="text" autoComplete='current-username'  id='username' />
            </div>
            <div className="input-container">
              <label htmlFor='password'>Password</label>
              <input ref={passwordInputRef} placeholder="password" type="password" id='password' autoComplete='current-password'/>
            </div>
            <button type="submit" className="login-btn">Login</button>
            {responseError && <p className="error">{responseError}</p>}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Index;

import React, { useState } from "react";
import API_BASE_URL from "../../../config/API_BASE_URL";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [username, setUsername] = useState(String);
  const [password, setPassword] = useState(String);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {username,password};

    try{
          const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
            if(response.ok){
                const data = await response.json();
                const fetchedUser = data.credentials.username;  
                localStorage.setItem('user',fetchedUser);
                navigate('/dashboard');
            }
            else{
                alert('INVALID CREDENTIALS');
            }
    }
    catch(err){
        console.error("ERROR SENDING DATA TO SERVER",err);
    }
  };
  

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Login</h2>

        <div className={styles.inputGroup}>
          <label>Username</label>
          <input
            type="text"
            name="email"
            onChange={(e)=> setUsername(e.target.value)}
            required
            placeholder="Username"
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Password</label>
          <input
            type="password"
            name="password"
            onChange={(e)=> setPassword(e.target.value)}
            required
            placeholder="Password"
          />
        </div>

        <button type="submit" className={styles.button}>
          Login
        </button>

      </form>
    </div>
  );
};

export default Login;

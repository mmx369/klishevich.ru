import React, { useState } from "react";
import {
  TextField,
  Button,
} from "@material-ui/core";
import loginService from '../services/login'

const Login = ({ user, setUser }) => {

  const [loginName, setLoginName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleChangeName = (event) => {
    setLoginName(event.target.value);
  };

  const handleChangePassword = (event) => {
    setLoginPassword(event.target.value);
  };


  const handleLogin = async (event) => {
    event.preventDefault();

    console.log("logging in with", loginName, loginPassword);

    try {
      user = await loginService.login({
        username: loginName,
        password: loginPassword
      });

      window.localStorage.setItem("loggedUser", JSON.stringify(user));

      setUser(user);
      setLoginName("");
      setLoginPassword("");
    } catch (e) { console.log(e) }
  };

  return (
    <div>
      <h2>login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <TextField value={loginName} onChange={handleChangeName} label="username" />
        </div>
        <div>
          <TextField value={loginPassword} onChange={handleChangePassword} label="password" type="password" />
        </div>
        <div>
          <Button variant="contained" color="primary" type="submit">
            Login
            </Button>
        </div>
      </form>
    </div>
  );
};

export default Login

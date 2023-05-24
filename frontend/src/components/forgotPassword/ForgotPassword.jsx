import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../action/User";
import "./ForgotPassword.css";
import { useNavigate, useParams } from "react-router-dom";


const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const params=useParams();
  const dispatch = useDispatch();
  const { error, loading, message } = useSelector((state) => state.user);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
    navigate(`/password/reset/${params.token}`)

  };

  useEffect(() => {
    if (error) {
    
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      
      dispatch({ type: "clearMessage" });
    }
  }, [error, dispatch, message]);
  return (
    <div className="forgotPassword">
      <form className="forgotPasswordForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Rudra Innovative
        </Typography>

        <input
          type="email"
          placeholder="Email"
          required
          className="forgotPasswordInputs"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button disabled={loading} type="submit">
          Send Token
        </Button>
      </form>

    </div>
  );
};

export default ForgotPassword;

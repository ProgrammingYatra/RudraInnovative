import { Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteMyProfile, logoutUser } from "../../action/User";
// import "./Account.css";

const Account = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, error } = useSelector((state) => state.user);

  const logoutHandler = () => {
    dispatch(logoutUser());
    toast.success("Logged out successfully");
    navigate("/logout");
  };

  const deleteProfileHandler = async () => {
    await dispatch(deleteMyProfile());
    dispatch(logoutUser());
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }
  }, [error, dispatch]);

  return (
    <div className="accountright">
      <Typography variant="h5">{user.name}</Typography>

      <Button variant="contained" onClick={logoutHandler}>
        Logout
      </Button>

      <Link to="/update/profile">Edit Profile</Link>
      <Link to="/forgot/password">Change Password</Link>

      <Button
        variant="text"
        style={{ color: "red", margin: "2vmax" }}
        onClick={deleteProfileHandler}
      >
        Delete My Profile
      </Button>
    </div>
  );
};

export default Account;

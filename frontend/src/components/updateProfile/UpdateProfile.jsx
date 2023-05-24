import { Typography, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./UpdateProfile.css";
import { loadUser, updateProfile } from "../../action/User";
import { toast } from "react-toastify";
import Loader from "../loader/Loader";

const UpdateProfile = () => {
  const { loading, error, user } = useSelector((state) => state.user);


  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState("");

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(updateProfile(name, email, phone));
    dispatch(loadUser());
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }
  }, [dispatch, error,]);
  return loading ? (
    <Loader />
  ) : (
    <div className="updateProfile">
      <form className="updateProfileForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Rudra Innovative
        </Typography>

        <input
          type="text"
          value={name}
          placeholder="Name"
          className="updateProfileInputs"
          required
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="updateProfileInputs"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="number"
          placeholder="Phone"
          className="updateProfileInputs"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <Button type="submit">
          Update
        </Button>
      </form>
    </div>
  );
};

export default UpdateProfile;

import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import AuthBox from "../../shared/components/AuthBox";
import RegisterPageInputs from "./RegisterPageInputs";
import RegisterPageFooter from "./RegisterPageFooter";
import { validateRegisterForm } from "../../shared/utils/validators";
import { useNavigate } from "react-router-dom";
import { register } from "../../api";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginReducer } from "../../store/reducers/authSlice";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mail, setMail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isFormValid, setIsFormValid] = useState(false);

  const handleRegister = async () => {
    const userDetails = {
      mail,
      password,
      username,
    };

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_DOMAIN}/api/auth/register`,
        userDetails
      );

      dispatch(loginReducer(res.data.userDetails));
      navigate("/");
      toast("signup successfull");
    } catch (error) {
      if (error?.response?.data) toast(error.response.data);
      else console.log(error);
    }
  };

  useEffect(() => {
    setIsFormValid(
      validateRegisterForm({
        mail,
        username,
        password,
      })
    );
  }, [mail, username, password, setIsFormValid]);

  return (
    <AuthBox>
      <Typography variant="h5" sx={{ color: "white " }}>
        Create an account
      </Typography>
      <RegisterPageInputs
        mail={mail}
        setMail={setMail}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      />
      <RegisterPageFooter
        handleRegister={handleRegister}
        isFormValid={isFormValid}
      />
    </AuthBox>
  );
};

export default RegisterPage;

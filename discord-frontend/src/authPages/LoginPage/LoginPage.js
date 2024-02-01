import React, { useEffect, useState } from "react";
import AuthBox from "../../shared/components/AuthBox";
import LoginPageHeader from "./LoginPageHeader";
import LoginPageInputs from "./LoginPageInputs";
import LoginPageFooter from "./LoginPageFooter";
import { validateLoginForm } from "../../shared/utils/validators";
import { useDispatch } from "react-redux";
import axios from "axios";
import { loginReducer } from "../../store/reducers/authSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(validateLoginForm({ mail, password }));
  }, [mail, password, setIsFormValid]);

  const handleLogin = async () => {
    const userDetails = {
      mail,
      password,
    };
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_DOMAIN}/api/auth/login`,
        userDetails
      );

      dispatch(loginReducer(res.data.userDetails));
      navigate("/");
      toast("Login successfull");
    } catch (error) {
      if (error?.response?.data) toast(error.response.data);
      else console.log(error);
    }
  };
  return (
    <AuthBox>
      <LoginPageHeader />
      <LoginPageInputs
        mail={mail}
        setMail={setMail}
        password={password}
        setPassword={setPassword}
      />
      <LoginPageFooter isFormValid={isFormValid} handleLogin={handleLogin} />
    </AuthBox>
  );
};

export default LoginPage;

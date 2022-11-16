import React, { useState } from 'react';
import {
  Input,
  Button,
  useToast,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import './loginPage.css';
import { useNavigate } from 'react-router-dom';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

const LoginPage = () => {
  const [input, setInput] = useState({
    username: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState({
    username: '',
    password: '',
  });
  const [isValidate, setIsValidate] = useState(false);
  const [isViewPassword, setIsViewPassword] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const usernameValidation = (username) => {
    const check1 = username.length >= 3;
    const check2 = username.length <= 30;
    return check1 && check2;
  };
  const passValidation = (password) => {
    const check1 = password.length >= 3;
    const check2 = password.length <= 10;
    const check3 = new RegExp('^(?=.*[A-Z]).+$').test(password);
    return check1 && check2 && check3;
  };
  const loginValidation = (temp) => {
    let isValid = true;
    Object.keys(temp).forEach((key) => {
      if (key === 'username') {
        if (!usernameValidation(temp.username)) {
          isValid = false;
        }
      }
      if (key === 'password') {
        if (!passValidation(temp.password)) {
          isValid = false;
        }
      }
    });
    return isValid;
  };
  const handleChange = (e) => {
    let temp = { ...input };
    let tempError = { ...errorMessage };
    if (e.target.name === 'password') {
      temp[e.target.name] = e.target.value;
      if (!passValidation(e.target.value)) {
        tempError[e.target.name] =
          '*Password must consist of 3 - 10 character with one capital letter';
      } else {
        tempError[e.target.name] = '';
      }
    } else if (e.target.name === 'username') {
      temp[e.target.name] = e.target.value;
      if (!usernameValidation(e.target.value)) {
        tempError[e.target.name] = '*Usename must consist of 3 - 30 character';
      } else {
        tempError[e.target.name] = '';
      }
    }
    setInput(temp);
    setErrorMessage(tempError);
    let validate = loginValidation(temp);
    if (validate) {
      setIsValidate(true);
    } else {
      setIsValidate(false);
    }
  };
  const handleLogin = () => {
    localStorage.setItem('username', input.username);
    toast({
      title: 'Login Success',
      description: 'Going to your homepage now.',
      status: 'success',
      position: 'top',
      duration: 2000,
      isClosable: true,
    });
    setTimeout(() => {
      navigate('/home');
    }, 2000);
  };
  return (
    <div className="login-page__container">
      <div className="login-page__content">
        <div className="login-page__title">LOGIN</div>
        <div className="login-page__input">
          <div className="login-page__username">
            <div className="login-page__input-label">Username</div>
            <Input
              className="login-page__input-text"
              placeholder="Please input your username"
              name="username"
              type="text"
              value={input.username}
              onChange={(event) => handleChange(event)}
              focusBorderColor="green.400"
            />
            <div className="login-page__error-message">
              {errorMessage.username}
            </div>
          </div>
          <div className="login-page__password">
            <div className="login-page__input-label">Password</div>
            <InputGroup>
              <Input
                className="login-page__input-text"
                placeholder="Please input your password"
                name="password"
                type={isViewPassword ? 'text' : 'password'}
                value={input.password}
                onChange={(event) => handleChange(event)}
                focusBorderColor="green.400"
              />
              <InputRightElement
                className="login-page__password-icon"
                children={
                  isViewPassword ? (
                    <ViewIcon
                      onClick={() => setIsViewPassword(!isViewPassword)}
                    />
                  ) : (
                    <ViewOffIcon
                      onClick={() => setIsViewPassword(!isViewPassword)}
                    />
                  )
                }
              />
            </InputGroup>
            <div className="login-page__error-message">
              {errorMessage.password}
            </div>
          </div>
        </div>
        <div className="login-page__button">
          <Button
            colorScheme="whatsapp"
            variant="solid"
            w="70%"
            onClick={handleLogin}
            isDisabled={!isValidate}
          >
            Login
          </Button>
        </div>
        <div className="login-page__register">
          Don't have an account?<span className="register-text">Register</span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

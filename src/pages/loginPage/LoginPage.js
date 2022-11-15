import React, { useState } from 'react';
import { Input, Button, useToast } from '@chakra-ui/react';
import './loginPage.css';
import { useNavigate } from 'react-router-dom';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
// import { useSelector, useDispatch } from 'react-redux';
// import { setUsername } from '../../store/action/usernameAction';

const LoginPage = () => {
  const [input, setInput] = useState({
    username: '',
    password: '',
  });
  //   const { username } = useSelector((state) => state.usernameReducer);
  const [isValidate, setIsValidate] = useState(false);
  const [isViewPassword, setIsViewPassword] = useState(false);
  const navigate = useNavigate();
  //   const dispatch = useDispatch();
  const toast = useToast();
  const handleChange = (e) => {
    let temp = { ...input };
    temp[e.target.name] = e.target.value;
    setInput(temp);
    let validate = loginValidation();
    if (validate) {
      setIsValidate(true);
    } else {
      setIsValidate(false);
    }
  };
  const handleLogin = () => {
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
  const loginValidation = () => {
    let isValid = true;
    Object.keys(input).forEach((key) => {
      if (key === 'username') {
        if (input[key].length < 3 || input[key].length > 20) {
          isValid = false;
        }
      }
      if (key === 'password') {
        const arr = input[key].split('');
        const isLoweredCase = (char) => {
          return char === char.toLowerCase();
        };
        if (
          input[key].length < 3 ||
          input[key].length > 10 ||
          arr.every(isLoweredCase)
        ) {
          isValid = false;
        }
      }
    });
    return isValid;
  };
  //   console.log(input);
  //   console.log(username);
  return (
    <div className="login-page__container">
      <div className="login-page__content">
        <div className="login-page__input">
          <div className="login-page__username">
            <div className="login-page__input-text">Username</div>
            <Input
              placeholder="Masukkan Nama Anda"
              name="username"
              type="text"
              value={input.username}
              onChange={(event) => handleChange(event)}
              focusBorderColor="green.400"
            />
          </div>
          <div className="login-page__password">
            <div className="login-page__input-text">Password</div>
            <Input
              placeholder="Masukkan Password Anda"
              name="password"
              type={isViewPassword ? 'text' : 'password'}
              value={input.password}
              onChange={(event) => handleChange(event)}
              focusBorderColor="green.400"
            />
            <div className="login-page__password-icon">
              {isViewPassword ? (
                <ViewIcon
                  w={6}
                  h={6}
                  onClick={() => setIsViewPassword(!isViewPassword)}
                />
              ) : (
                <ViewOffIcon
                  w={6}
                  h={6}
                  onClick={() => setIsViewPassword(!isViewPassword)}
                />
              )}
            </div>
          </div>
        </div>
        <div className="login-page__button">
          {isValidate ? (
            <Button
              colorScheme="whatsapp"
              variant="outline"
              w="50%"
              onClick={handleLogin}
            >
              Login
            </Button>
          ) : (
            <Button colorScheme="whatsapp" variant="outline" w="50%" disabled>
              Login
            </Button>
          )}
          {/* <p>{username}</p>
          <button onClick={() => dispatch(setUsername('HAMLELAA'))}>
            Change text
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

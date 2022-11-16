import React, { useState } from 'react';
import Header from '../../components/header/Header';
import './homePage.css';
import { Button, useDisclosure } from '@chakra-ui/react';
import HomeModal from './components/modal/HomeModal';
import { ImProfile } from 'react-icons/im';

const HomePage = () => {
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState({
    username: localStorage.getItem('username')
      ? localStorage.getItem('username')
      : localStorage.getItem('token'),
    email: localStorage.getItem('email'),
    telephone: localStorage.getItem('telephone'),
    address: localStorage.getItem('address'),
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Header page={'Home'} />
      <div className="home-page__container">
        <div className="home-page__welcome">
          Welcome{' '}
          <span className="home-page__welcome-username">{data.username}!</span>
        </div>
        <div className="home-page__content">
          <ImProfile
            style={{
              height: '40px',
              width: '40px',
              color: '#22c35e',
            }}
          />
          <div className="home-page__title">Personal Information</div>
          <div className="home-page__personal-information">
            <div className="home-page__username">
              <p className="home-page__information-label">Name</p>
              <p className="home-page__information-content">{data.username}</p>
            </div>
            <div className="home-page__email">
              <p className="home-page__information-label">Email</p>
              <p className="home-page__information-content">{data.email}</p>
            </div>
            <div className="home-page__telephone">
              <p className="home-page__information-label">Telephone</p>
              <p className="home-page__information-content">{data.telephone}</p>
            </div>
            <div className="home-page__address">
              <p className="home-page__information-label">Address</p>
              <p className="home-page__information-content">{data.address}</p>
            </div>
          </div>
          <div className="home-page__modal">
            <HomeModal data={data} isOpen={isOpen} onClose={onClose} />
          </div>
        </div>
      </div>
      <div className="home-page__button">
        <Button colorScheme="whatsapp" variant="solid" w="70%" onClick={onOpen}>
          Complete your data
        </Button>
      </div>
    </>
  );
};

export default HomePage;

import React, { useState } from 'react';
import Header from '../../components/header/Header';
import './homePage.css';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
} from '@chakra-ui/react';

const HomePage = () => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [data, setData] = useState({
    username: 'Seceplak',
    email: '',
    telephone: '',
    address: '',
  });
  const [modalData, setModalData] = useState({ ...data });
  const [isValidate, setIsValidate] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleChange = (e) => {
    let temp = { ...modalData };
    temp[e.target.name] = e.target.value;
    setModalData(temp);
    let validate = saveValidation();
    if (validate) {
      setIsValidate(true);
    } else {
      setIsValidate(false);
    }
  };
  const handleSave = () => {
    let temp = { ...modalData };
    setData(temp);
  };
  const saveValidation = () => {
    let isValid = true;
    Object.keys(modalData).forEach((key) => {
      if (key === 'username' || key === 'address' || key === 'email') {
        if (modalData[key].length === 0) {
          isValid = false;
        }
      }
      if (key === 'telephone') {
        if (
          modalData[key][0] === '0' ||
          modalData[key].length <= 9 ||
          modalData[key].length >= 13
        ) {
          isValid = false;
        }
      }
    });
    return isValid;
  };
  console.log(modalData);
  return (
    <div className="home-page__container">
      <Header page={'Home'} />
      <div className="home-page__content">
        <div className="home-page__personal-information">
          <p>Name : {data.username}</p>
          <p>Email : {data.email}</p>
          <p>Telepon : {data.telephone}</p>
          <p>Alamat : {data.address}</p>
        </div>
        <div className="home-page__button">
          <Button colorScheme="whatsapp" variant="outline" onClick={onOpen}>
            Lengkapi Data Diri Anda
          </Button>
        </div>
        <div className="home-page__modal">
          <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent w="90%">
              <ModalHeader>Personal Information</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <div className="home-page__personal-information">
                  <div className="home-page__username">
                    <div className="home-page__input-text">Username</div>
                    <Input
                      placeholder="Masukkan Nama Anda"
                      name="username"
                      type="text"
                      value={modalData.username}
                      focusBorderColor="green.400"
                      onChange={(event) => handleChange(event)}
                    />
                  </div>
                  <div className="home-page__email">
                    <div className="home-page__input-text">Email</div>
                    <Input
                      placeholder="Masukkan Email Anda"
                      name="email"
                      type="email"
                      value={modalData.email}
                      focusBorderColor="green.400"
                      onChange={(event) => handleChange(event)}
                    />
                  </div>

                  <div className="home-page__telephone">
                    <div className="home-page__input-text">Telepon</div>
                    <Input
                      placeholder="Masukkan Email Anda"
                      name="telephone"
                      type="number"
                      value={modalData.telephone}
                      focusBorderColor="green.400"
                      onChange={(event) => handleChange(event)}
                    />
                  </div>

                  <div className="home-page__address">
                    <div className="home-page__input-text">Alamat</div>
                    <Input
                      placeholder="Masukkan Email Anda"
                      name="address"
                      type="text"
                      value={modalData.address}
                      focusBorderColor="green.400"
                      onChange={(event) => handleChange(event)}
                    />
                  </div>
                </div>
              </ModalBody>

              <ModalFooter>
                <div className="home-page__modal-button">
                  {isValidate ? (
                    <Button
                      colorScheme="whatsapp"
                      variant="outline"
                      w="50%"
                      onClick={handleSave}
                    >
                      Save
                    </Button>
                  ) : (
                    <Button
                      colorScheme="whatsapp"
                      variant="outline"
                      w="50%"
                      disabled
                    >
                      Save
                    </Button>
                  )}
                </div>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

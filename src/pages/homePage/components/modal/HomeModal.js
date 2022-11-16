/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  useToast,
} from '@chakra-ui/react';
import './homeModal.css';

const HomeModal = ({ data, isOpen, onClose }) => {
  const [modalData, setModalData] = useState({
    username: '',
    email: '',
    telephone: '',
    address: '',
  });
  const [isValidate, setIsValidate] = useState(false);
  const toast = useToast();
  const handleChange = (e) => {
    let temp = { ...modalData };
    if (e.target.name === 'telephone') {
      temp[e.target.name] = e.target.value.slice(0, 13);
    } else {
      temp[e.target.name] = e.target.value;
    }
    setModalData(temp);
    let validate = saveValidation(temp);
    if (validate) {
      setIsValidate(true);
    } else {
      setIsValidate(false);
    }
  };
  const handleSave = () => {
    let temp = { ...modalData };
    setModalData(temp);
    localStorage.setItem('username', temp.username);
    localStorage.setItem('email', temp.email);
    localStorage.setItem('telephone', temp.telephone);
    localStorage.setItem('address', temp.address);
    toast({
      title: 'Saving Success',
      description: 'Your personal information has been updated.',
      status: 'success',
      position: 'top',
      duration: 1500,
      isClosable: true,
    });
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };
  const saveValidation = (temp) => {
    let isValid = true;
    Object.keys(temp).forEach((key) => {
      if (key === 'username' || key === 'address' || key === 'email') {
        if (temp[key].length === 0) {
          isValid = false;
        }
      }
      if (key === 'telephone') {
        if (
          temp[key][0] === '0' ||
          temp[key].length <= 9 ||
          temp[key].length >= 13
        ) {
          isValid = false;
        }
      }
    });
    return isValid;
  };
  useEffect(() => {
    if (isOpen) {
      setModalData(data);
    } else {
      setModalData({
        username: '',
        email: '',
        telephone: '',
        address: '',
      });
    }
  }, [isOpen]);
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent w="90%">
        <ModalHeader>Personal Information</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div className="home-page-modal__personal-information">
            <div className="home-page-modal__username">
              <div className="home-page-modal__input-label">Username</div>
              <Input
                className="home-page-modal__input-text"
                placeholder="Masukkan Nama Anda"
                name="username"
                type="text"
                value={modalData.username}
                focusBorderColor="green.400"
                onChange={(event) => handleChange(event)}
                required
              />
            </div>
            <div className="home-page-modal__email">
              <div className="home-page-modal__input-label">Email</div>
              <Input
                className="home-page-modal__input-text"
                placeholder="Masukkan Email Anda"
                name="email"
                type="email"
                value={modalData.email}
                focusBorderColor="green.400"
                onChange={(event) => handleChange(event)}
                required
              />
            </div>

            <div className="home-page-modal__telephone">
              <div className="home-page-modal__input-label">Telepon</div>
              <Input
                className="home-page-modal__input-text"
                placeholder="Masukkan Email Anda"
                name="telephone"
                type="number"
                value={modalData.telephone}
                focusBorderColor="green.400"
                onChange={(event) => handleChange(event)}
                required
              />
            </div>

            <div className="home-page-modal__address">
              <div className="home-page-modal__input-label">Alamat</div>
              <Input
                className="home-page-modal__input-text"
                placeholder="Masukkan Email Anda"
                name="address"
                type="text"
                value={modalData.address}
                focusBorderColor="green.400"
                onChange={(event) => handleChange(event)}
                required
              />
            </div>
          </div>
        </ModalBody>

        <ModalFooter>
          <div className="home-page-modal__button">
            <Button
              colorScheme="whatsapp"
              variant="outline"
              w="70%"
              onClick={handleSave}
              isDisabled={!isValidate}
            >
              Save
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default HomeModal;

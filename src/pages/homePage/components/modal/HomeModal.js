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
    name: '',
    email: '',
    telephone: '',
    address: '',
  });
  const [isValidate, setIsValidate] = useState(false);
  const toast = useToast();
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const saveValidation = (temp) => {
    let isValid = true;
    Object.keys(temp).forEach((key) => {
      if (key === 'name' || key === 'address') {
        if (temp[key].length === 0) {
          isValid = false;
        }
      }
      if (key === 'email') {
        if (!validateEmail(temp[key])) {
          isValid = false;
        }
      }
      if (key === 'telephone') {
        if (temp[key][0] === '0' || temp[key].length <= 9) {
          isValid = false;
        }
      }
    });
    return isValid;
  };
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
    localStorage.setItem('name', temp.name);
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
  useEffect(() => {
    if (isOpen) {
      setModalData(data);
    } else {
      setModalData({
        name: '',
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
            <div className="home-page-modal__name">
              <div className="home-page-modal__input-label">Name</div>
              <Input
                className="home-page-modal__input-text"
                placeholder="Please input your name"
                name="name"
                type="text"
                value={modalData.name}
                focusBorderColor="green.400"
                onChange={(event) => handleChange(event)}
                required
              />
            </div>
            <div className="home-page-modal__email">
              <div className="home-page-modal__input-label">Email</div>
              <Input
                className="home-page-modal__input-text"
                placeholder="Please input your email"
                name="email"
                type="email"
                value={modalData.email}
                focusBorderColor="green.400"
                onChange={(event) => handleChange(event)}
                required
              />
            </div>

            <div className="home-page-modal__telephone">
              <div className="home-page-modal__input-label">Telephone</div>
              <Input
                className="home-page-modal__input-text"
                placeholder="Please input your telephone"
                name="telephone"
                type="number"
                value={modalData.telephone}
                focusBorderColor="green.400"
                onChange={(event) => handleChange(event)}
                required
              />
            </div>

            <div className="home-page-modal__address">
              <div className="home-page-modal__input-label">Address</div>
              <Input
                className="home-page-modal__input-text"
                placeholder="Please input your address"
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

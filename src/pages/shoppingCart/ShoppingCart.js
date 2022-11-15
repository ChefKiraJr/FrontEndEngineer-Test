import React, { useState, useEffect } from 'react';
import './shoppingCart.css';
import Header from '../../components/header/Header';
import axios from 'axios';
// import { Row, Col } from 'reactstrap';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';

const ShoppingCart = () => {
  const [data, setData] = useState();
  const [isOrdered, setIsOrdered] = useState(false);
  const fetchData = async () => {
    try {
      const { data } = await axios.get('http://localhost:3004/cartData');
      setData(data);
    } catch (err) {
      console.log(err);
    }
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    fetchData();
  }, []);
  console.log(data);
  return (
    <div className="shopping-cart__container">
      <Header page={'Cart'} />
      {isOrdered ? (
        <div className="shopping-cart__success-content">
          <div className="shopping-cart__success-icon">
            <CheckCircleIcon color="green.400" w={48} h={48} />
          </div>
          <div className="shopping-cart__success-text">
            Yayy.. order success!
          </div>
          <div className="shopping-cart__success-button">
            <Button colorScheme="whatsapp" variant="outline">
              Go back to homepage
            </Button>
          </div>
        </div>
      ) : (
        <div className="shopping-cart__content">
          <div className="shopping-cart__ordered-items">
            {/* {data.length > 0 && (
      
          {data.map((value) => {
            return (
              <div className="shopping-cart__item">
                <Row>
                  <Col lg="4">
                    <div className="template">A</div>
                  </Col>
                  <Col lg="4">{value.title}</Col>
                  <Col lg="4"></Col>
                </Row>
              </div>
            );
          })}
        
      )} */}
          </div>
          <div className="shopping-cart__button">
            <Button
              colorScheme="whatsapp"
              variant="outline"
              onClick={onOpen}
              w="50%"
            >
              Review
            </Button>
          </div>
          <div className="shopping-cart__modal">
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Purchasing List</ModalHeader>
                <ModalCloseButton />
                <ModalBody>WAKWAW</ModalBody>

                <ModalFooter>
                  <div className="shopping-cart-modal__button">
                    <Button colorScheme="whatsapp" variant="outline">
                      Order
                    </Button>
                  </div>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;

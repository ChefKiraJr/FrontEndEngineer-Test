import React from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import './cartModal.css';
import { Row, Col } from 'reactstrap';

const CartModal = ({ data, isOpen, onClose, handleOrder }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent w="90%">
        <ModalHeader>Purchasing List</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div className="shopping-cart__purchase-list">
            <Row className="shopping-cart__purchase-title">
              <Col xs="9">
                <div>Name</div>
              </Col>
              <Col xs="3">
                <div>Qty</div>
              </Col>
            </Row>
            <div className="shopping-cart__purchase-items">
              {data.map((value) => {
                return (
                  <Row className="shopping-cart__purchase-item" key={value.id}>
                    <Col xs="9">
                      <div className="purchase-item__title">{value.title}</div>
                    </Col>
                    <Col xs="3">
                      <div className="purchase-item__quantity">
                        {value.quantity}
                      </div>
                    </Col>
                  </Row>
                );
              })}
            </div>
          </div>
        </ModalBody>

        <ModalFooter>
          <div className="shopping-cart-modal__button">
            <Button
              colorScheme="whatsapp"
              variant="outline"
              w="70%"
              onClick={handleOrder}
            >
              Order
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CartModal;

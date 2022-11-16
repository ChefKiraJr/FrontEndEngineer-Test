import React from 'react';
import { Row, Col } from 'reactstrap';
import { Button } from '@chakra-ui/react';
import axios from 'axios';
import './cartItem.css';

const CartItem = ({ value, fetchData, toast }) => {
  const handleReduce = async (value) => {
    try {
      if (value.quantity > 1) {
        const body = { quantity: value.quantity - 1 };
        await axios.patch(`http://localhost:3004/cartData/${value.id}`, body);
        toast({
          title: 'Reduce Success',
          description: 'Chosen film quantity has been reduced.',
          status: 'success',
          position: 'top',
          duration: 1000,
          isClosable: true,
        });
        await fetchData();
      } else {
        toast({
          title: 'Reduce Failed',
          description: `Chosen film quantity can't be less than 1.`,
          status: 'error',
          position: 'top',
          duration: 1000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleIncrease = async (value) => {
    try {
      const body = { quantity: value.quantity + 1 };
      await axios.patch(`http://localhost:3004/cartData/${value.id}`, body);
      toast({
        title: 'Increase Success',
        description: 'Chosen film quantity has been increased.',
        status: 'success',
        position: 'top',
        duration: 1000,
        isClosable: true,
      });
      await fetchData();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="shopping-cart__item" key={value.id}>
      <Row>
        <Col xs="4">
          <img
            src="https://images.unsplash.com/photo-1607829866698-a186b93fdd0f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8dGhlJTIwZGFyayUyMGtuaWdodHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            alt="film-banner"
            className="shopping-cart__item-image"
          />
        </Col>
        <Col xs="3" className="shopping-cart__item-title">
          <p>{value.title}</p>
        </Col>
        <Col xs="4" className="shopping-cart__item-quantity">
          <Button
            colorScheme="whatsapp"
            variant="outline"
            onClick={() => handleReduce(value)}
            h="30px"
          >
            -
          </Button>
          <div className="shopping-cart__quantity-number">{value.quantity}</div>
          <Button
            colorScheme="whatsapp"
            variant="outline"
            onClick={() => handleIncrease(value)}
            h="30px"
          >
            +
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default CartItem;

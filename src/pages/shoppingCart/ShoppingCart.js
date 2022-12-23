import React, { useState, useEffect } from 'react';
import './shoppingCart.css';
import Header from '../../components/header/Header';
import axios from 'axios';
import { useDisclosure, Button, useToast } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import CartItem from './components/cartItem/CartItem';
import CartModal from './components/cartModal/CartModal';
import { useNavigate } from 'react-router-dom';
import { BsCart3 } from 'react-icons/bs';

const ShoppingCart = () => {
  const [data, setData] = useState([]);
  const [isOrdered, setIsOrdered] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        'https://movie-shop-fake-api.onrender.com/cartData'
      );
      // const { data } = await axios.get('http://localhost:3004/cartData');
      setData(data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleOrder = async () => {
    try {
      const body = { isAdded: false };
      for (let i = 0; i < data.length; i++) {
        await axios.delete(
          `https://movie-shop-fake-api.onrender.com/cartData/${data[i].id}`
        );
        // await axios.delete(`http://localhost:3004/cartData/${data[i].id}`);
        await axios.patch(
          `https://movie-shop-fake-api.onrender.com/films/${data[i].id}`,
          body
        );
        // await axios.patch(`http://localhost:3004/films/${data[i].id}`, body);
      }
      toast({
        title: 'Order Success',
        description: 'Chosen film has been successfully ordered.',
        status: 'success',
        position: 'top',
        duration: 1000,
        isClosable: true,
      });
      setTimeout(() => {
        setIsOrdered(true);
      }, 1000);
      setTimeout(() => {
        navigate('/home');
      }, 3000);
    } catch (err) {
      console.log(err);
    }
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Header page={'Cart'} />

      {isOrdered ? (
        <div className="shopping-cart__success-content">
          <div className="shopping-cart__success-icon">
            <CheckCircleIcon color="#22c35e" w={48} h={48} />
          </div>
          <div className="shopping-cart__success-text">
            Yayy.. order success!
          </div>
        </div>
      ) : (
        <div className="shopping-cart__container">
          {data.length > 0 ? (
            <div className="shopping-cart__content">
              <div className="shopping-cart__content-header">
                <div className="shopping-cart__content-title">Cart Items</div>
                <div className="shopping-cart__content-icon">
                  <BsCart3
                    style={{
                      height: '30px',
                      width: '30px',
                      color: '#22c35e',
                    }}
                  />
                </div>
              </div>
              <div className="shopping-cart__ordered-items">
                {data.length > 0 && (
                  <>
                    {data.map((value) => {
                      return (
                        <CartItem
                          value={value}
                          fetchData={fetchData}
                          toast={toast}
                        />
                      );
                    })}
                  </>
                )}
              </div>
              <div className="shopping-cart__modal">
                <CartModal
                  data={data}
                  isOpen={isOpen}
                  onClose={onClose}
                  handleOrder={handleOrder}
                />
              </div>
            </div>
          ) : (
            <div className="shopping-cart__empty-message">
              Please make some order first on the store page
            </div>
          )}
        </div>
      )}

      {isOrdered ? (
        <div className="shopping-cart__success-button">
          <Button
            colorScheme="whatsapp"
            variant="solid"
            w="70%"
            onClick={() => navigate('/home')}
          >
            Go back to home page
          </Button>
        </div>
      ) : data.length > 0 ? (
        <div className="shopping-cart__button">
          <Button
            colorScheme="whatsapp"
            variant="solid"
            onClick={onOpen}
            w="70%"
          >
            Review
          </Button>
        </div>
      ) : (
        <div className="shopping-cart__empty-button">
          <Button
            colorScheme="whatsapp"
            variant="solid"
            w="70%"
            onClick={() => navigate('/store')}
          >
            Go back to store
          </Button>
        </div>
      )}
    </>
  );
};

export default ShoppingCart;

import React, { useState, useEffect } from 'react';
import './store.css';
import Header from '../../components/header/Header';
import axios from 'axios';
import { Grid, GridItem, Button, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FaStore } from 'react-icons/fa';
import LoadingStore from './components/loadingStore/LoadingStore';

const Store = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const toast = useToast();
  const isCompleted = () => {
    return (
      (localStorage.getItem('name') || localStorage.getItem('username')) &&
      localStorage.getItem('email') &&
      localStorage.getItem('telephone') &&
      localStorage.getItem('address')
    );
  };
  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        'https://frontend-test-fake-api.herokuapp.com/films'
      );
      setData(data);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  };
  const handleEditData = async (value) => {
    try {
      const body = { isAdded: value.isAdded ? false : true };
      await axios.patch(
        `https://frontend-test-fake-api.herokuapp.com/films/${value.id}`,
        body
      );
      await fetchData();
    } catch (err) {
      console.log(err);
    }
  };
  const handleAdd = async (value) => {
    try {
      const body = { ...value, quantity: 1 };
      await axios.post(
        'https://frontend-test-fake-api.herokuapp.com/cartData',
        body
      );
      await handleEditData(value);
      toast({
        title: 'Add Success',
        description: 'Chosen film has been added to shopping cart.',
        status: 'success',
        position: 'top',
        duration: 1000,
        isClosable: true,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const handleRemove = async (value) => {
    try {
      await axios.delete(
        `https://frontend-test-fake-api.herokuapp.com/cartData/${value.id}`
      );
      await handleEditData(value);
      toast({
        title: 'Remove Success',
        description: 'Chosen film has been removed from shopping cart.',
        status: 'success',
        position: 'top',
        duration: 1000,
        isClosable: true,
      });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Header page={'Store'} />
      <div className="store__container">
        {isCompleted() ? (
          <>
            {isLoading ? (
              <LoadingStore />
            ) : (
              <div className="store__content">
                <div className="store__content-header">
                  <div className="store__content-information">
                    <p className="store__content-title">All Products</p>
                    <p className="store__content-desc">
                      {data.length} products
                    </p>
                  </div>
                  <div className="store__content-icon">
                    <FaStore
                      style={{
                        height: '30px',
                        width: '30px',
                        color: '#22c35e',
                      }}
                    />
                  </div>
                </div>
                {data.length > 0 && (
                  <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                    {data.map((value) => {
                      return (
                        <div className="store__good-item" key={value.id}>
                          <GridItem w="100%">
                            <img
                              src="https://images.unsplash.com/photo-1607829866698-a186b93fdd0f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8dGhlJTIwZGFyayUyMGtuaWdodHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                              alt="film-banner"
                              className="store__good-image"
                            />
                            <div className="store__good-title">
                              {value.title}
                            </div>
                            <div className="store__good-button">
                              {value.isAdded ? (
                                <Button
                                  w="100%"
                                  colorScheme="whatsapp"
                                  variant="outline"
                                  onClick={() => handleRemove(value)}
                                >
                                  Remove
                                </Button>
                              ) : (
                                <Button
                                  w="100%"
                                  colorScheme="whatsapp"
                                  variant="outline"
                                  onClick={() => handleAdd(value)}
                                >
                                  Add
                                </Button>
                              )}
                            </div>
                          </GridItem>
                        </div>
                      );
                    })}
                  </Grid>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="store__incomplete-message">
            You need to fill out your personal data completely to have an access
            to store goods
          </div>
        )}
      </div>
      {isCompleted() ? (
        <div className="store__button">
          <Button
            colorScheme="whatsapp"
            variant="solid"
            w="70%"
            onClick={() => navigate('/cart')}
          >
            Go to shopping cart
          </Button>
        </div>
      ) : (
        <div className="store__incomplete-button">
          <Button
            colorScheme="whatsapp"
            variant="solid"
            w="70%"
            onClick={() => navigate('/home')}
          >
            Go to home page
          </Button>
        </div>
      )}
    </>
  );
};

export default Store;

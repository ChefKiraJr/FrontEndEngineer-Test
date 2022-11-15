import React, { useState, useEffect } from 'react';
import './store.css';
import Header from '../../components/header/Header';
import axios from 'axios';
import { Grid, GridItem, Button } from '@chakra-ui/react';

const Store = () => {
  const [data, setData] = useState();
  // const [isLoading, setIsLoading] = useState(false);
  // const [isAdded, setIsAdded] = useState(false);
  const fetchData = async () => {
    try {
      const { data } = await axios.get('https://swapi.dev/api/films');
      setData(data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleAdd = async (value) => {
    try {
      console.log(value);
      await axios.post('http://localhost:3004/cartData', value);
    } catch (err) {
      console.log(err);
    }
  };
  const handleRemove = async (id) => {
    try {
      console.log(id);
      await axios.delete(`http://localhost:3004/cartData/${id}`);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  console.log(data);
  return (
    <div className="store__container">
      <Header page={'Store'} />
      <div className="store__content">
        {data && (
          <Grid templateColumns="repeat(3, 1fr)" gap={6}>
            {data.results.map((value, index) => {
              return (
                <div className="store__good-item">
                  <GridItem w="100%" h="30vh">
                    <div className="template">A</div>
                    <div className="store__good-title">{value.title}</div>
                    <div className="store__button">
                      <Button
                        w="100%"
                        colorScheme="whatsapp"
                        variant="outline"
                        onClick={() => handleAdd(value)}
                      >
                        Add
                      </Button>
                      <Button
                        w="100%"
                        colorScheme="whatsapp"
                        variant="outline"
                        onClick={() => handleRemove(value.episode_id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </GridItem>
                </div>
              );
            })}
          </Grid>
        )}
      </div>
    </div>
  );
};

export default Store;

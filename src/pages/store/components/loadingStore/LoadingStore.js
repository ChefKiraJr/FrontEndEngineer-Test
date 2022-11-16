import React from 'react';
import '../../store.css';
import { Skeleton, GridItem, Grid, Button } from '@chakra-ui/react';
import { FaStore } from 'react-icons/fa';

const LoadingStore = () => {
  return (
    <div className="store__content">
      <div className="store__content-header">
        <div className="store__content-information">
          <Skeleton>
            <p className="store__content-title">All Products</p>
          </Skeleton>
          <Skeleton>
            <p className="store__content-desc">products</p>
          </Skeleton>
        </div>

        <Skeleton>
          <div className="store__content-icon">
            <FaStore
              style={{
                height: '32px',
                width: '32px',
                color: '#22c35e',
              }}
            />
          </div>
        </Skeleton>
      </div>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((value) => {
          return (
            <div className="store__good-item">
              <GridItem w="100%">
                <Skeleton>
                  <div className="store__good-image"></div>
                </Skeleton>
                <Skeleton>
                  <div className="store__good-title"></div>
                </Skeleton>
                <Skeleton>
                  <div className="store__good-button">
                    <Button w="100%" colorScheme="whatsapp" variant="outline">
                      Remove
                    </Button>
                  </div>
                </Skeleton>
              </GridItem>
            </div>
          );
        })}
      </Grid>
    </div>
  );
};

export default LoadingStore;

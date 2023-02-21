import React from 'react';

import styles from './Random.module.css';
import { useGetRandomNumberQuery } from '../../services/randomNumber';


export function Random() {
  // Using a query hook automatically fetches data and returns query values
  const { data, error, isLoading, refetch } = useGetRandomNumberQuery()
  // Individual hooks are also accessible under the generated endpoints:
  // const { data, error, isLoading } = randomApi.endpoints.getRandomNumber.useQuery()

  return (
    <>
      <div className={styles.row}>
        <button
          className={styles.button}
          onClick={refetch}
        >
          Random number generation using RTK Query
        </button>
      </div>

      <div className={styles.row}>
        {error ? (
          <>Oh no, there was an error</>
        ) : isLoading ? (
          <>Loading...</>
        ) : data ? (
          <span className={styles.value}>
            {data}
          </span>
        ) : null}
      </div>
    </>
  );
}

// See https://redux-toolkit.js.org/tutorials/rtk-query/

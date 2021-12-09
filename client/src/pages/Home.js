import React from 'react';
import { useQuery } from '@apollo/client'
import { QUERY_THOUGHTS } from '../utils/queries';

// when loading execute query for thought data (async), when finished data is stored in the destructured data property
const Home = () => {
  // use useQuery hook to make query request
  // loading conditionally renders data based on availability
  const { loading, data } = useQuery(QUERY_THOUGHTS)
  // access data from object
  // optional chaining (Node no) negates the need to check if an object even exists before accessing its properties
  // what this says is if data exists, store it in thoughts, if not store in []
  const thoughts = data?.thoughts || [];
  console.log(thoughts);
  return (
    <main>
      <div className='flex-row justify-space-between'>
        <div className='col-12 mb-3'>{/* PRINT THOUGHT LIST */}</div>
      </div>
    </main>
  );
};

export default Home;

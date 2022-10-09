import React from 'react';
import { useQuery } from '@apollo/client';

import ThoughtList from '../components/ThoughtList';
import ThoughtForm from '../components/ThoughtForm';

import { QUERY_THOUGHTS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  const thoughts = data?.thoughts || [];

  return (
    <main>
      <div className='mx-auto' style={{ border: '1px dotted #1a1a1a', width: '54rem' }}>
        <ThoughtForm />
      </div>
      <div className=" d-flex flex-column align-items-center">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ThoughtList
            thoughts={thoughts}
            title="So here are your thought(s)!"
          />
        )}
      </div>
    </main>
  );
};

export default Home;

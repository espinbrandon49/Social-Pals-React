import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_THOUGHTS } from '../utils/queries';
import ThoughtList from '../components/ThoughtList';
import ThoughtForm from '../components/ThoughtForm';

const Home = () => {
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  const thoughts = data?.thoughts || []
  return (
    <div>
      <div>
        <ThoughtForm />
      </div>
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ThoughtList
            thoughts={thoughts}
            title="So Thoughts"
          />
        )}
      </div>
    </div>

  )
}

export default Home
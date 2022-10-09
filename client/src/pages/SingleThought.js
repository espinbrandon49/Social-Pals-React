import React from 'react';

// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import ReactionList from '../components/ReactionList';
import ReactionForm from '../components/ReactionForm';

import { QUERY_SINGLE_THOUGHT } from '../utils/queries';

const SingleThought = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { thoughtId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_THOUGHT, {
    // pass URL parameter
    variables: { thoughtId: thoughtId },
  });

  const thought = data?.thought || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div >
      <div className='my-3' style={{backgroundColor: "#e9ecef"}}>
        <h3 className="roboto bg-secondary text-light p-2">
          {thought.username} <br />
          <span style={{ fontSize: '1rem' }}>
            had this thought on {thought.createdAt}
          </span>
        </h3>

        <div className=" text-dark p-3">
          <blockquote
            className="p-3"
            style={{
              fontSize: '1.5rem',
              fontStyle: 'italic',
              border: '2px dotted #dc3545',
              lineHeight: '1.5',
            }}
          >
            {thought.thoughtText}
          </blockquote>
        </div>
      </div>
      <div className="">
        <ReactionList reactions={thought.reactions} />
      </div>
      <div className="" style={{ border: '1px dotted #1a1a1a' }}>
        <ReactionForm thoughtId={thought._id} />
      </div>
    </div>
  );
};

export default SingleThought;

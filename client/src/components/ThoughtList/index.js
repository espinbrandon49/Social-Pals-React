import React from 'react';
import { Link, } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { REMOVE_THOUGHT } from '../../utils/mutations';
import Auth from '../../utils/auth';

const ThoughtList = ({
  thoughts,
  title,
  showTitle = true,
  showUsername = true,
}) => {

  const [removeThought, { error, data }] = useMutation(REMOVE_THOUGHT);

  if (!thoughts.length) {
    return <h3>No Thoughts Yet</h3>;
  }

  const handleDelete = async (singleThought) => {
    try {
      const { data } = await removeThought({
        variables: { _id: singleThought },
      });
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {thoughts &&
        thoughts.map((thought) => (
          <div key={thought._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {showUsername ? (
                <Link
                  className="text-light"
                  to={`/profiles/${thought.username}`}
                >
                  {thought.username} <br />
                  <span style={{ fontSize: '1rem' }}>
                    had this thought on {thought.createdAt}
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    You had this thought on {thought.createdAt}
                  </span>
                  {Auth.getProfile().data.username === thought.username && (<button onClick={() => handleDelete(thought._id)}>
                    Remove
                  </button>)}
                </>
              )}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{thought.thoughtText}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/thoughts/${thought._id}`}
            >
              Join the discussion on this thought.
            </Link>
          </div>
        ))}
    </div>
  );
};

export default ThoughtList;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_REACTION } from '../../utils/mutations';

import Auth from '../../utils/auth';

const ReactionForm = ({ thoughtId }) => {
  const [reactionText, setReactionText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [addReaction, { error }] = useMutation(ADD_REACTION);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addReaction({
        variables: {
          thoughtId,
          reactionText,
          username: Auth.getProfile().data.username,
        },
      });

      setReactionText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'reactionText' && value.length <= 280) {
      setReactionText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <h4>What are your thoughts on this thought?</h4>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
            {error && <span className="">{error.message}</span>}
          </p>
          <form
            className=""
            onSubmit={handleFormSubmit}
          >
            <div className="">
              <textarea
                name="reactionText"
                placeholder="Add your reaction..."
                value={reactionText}
                className=""
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="">
              <button className="" type="submit">
                Add Reaction
              </button>
            </div>
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your thoughts. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default ReactionForm;

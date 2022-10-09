import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_REACTION } from '../../utils/mutations';
import Auth from '../../utils/auth';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

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
    <div className='p-3' style={{ backgroundColor: "#f8f9fa" }}>
      <h3 className='roboto'>So, what do you think?</h3>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 roboto ${characterCount === 280 || error ? 'text-danger' : ''
              }`}
          >
            Character Count: {characterCount}/280
            {error && <span className="">{error.message}</span>}
          </p>
          <Form
            className=""
            onSubmit={handleFormSubmit}
          >

            <FloatingLabel
              controlId="floatingTextarea"
              label="A retort, response, risposte, or comparably meaningful, but not too colorful reaction"
              className="mb-3 roboto"
            >
              <Form.Control
                as="textarea"
                className='roboto'
                name="reactionText"
                value={reactionText}
                style={{ lineHeight: '1.5', resize: 'vertical', height: '100px' }}
                onChange={handleChange}
              />
            </FloatingLabel>

            {/* <div className="">
              <textarea
                name="reactionText"
                placeholder="Add your reaction..."
                value={reactionText}
                className=""
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div> */}

            <div >
              <button className="btn btn-dark" type="submit">
                Add Reaction
              </button>
            </div>

          </Form>
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

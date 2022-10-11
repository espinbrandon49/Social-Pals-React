import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_THOUGHT } from '../../utils/mutations';
import { QUERY_THOUGHTS, QUERY_ME } from '../../utils/queries';
import Auth from '../../utils/auth';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

const ThoughtForm = () => {
  const [thoughtText, setThoughtText] = useState('');
  const { loading, data } = useQuery(QUERY_ME);
  const [characterCount, setCharacterCount] = useState(0);

  const [addThought, { error }] = useMutation(ADD_THOUGHT, {
    update(cache, { data: { addThought } }) {
      try {
        const { thoughts } = cache.readQuery({ query: QUERY_THOUGHTS });

        cache.writeQuery({
          query: QUERY_THOUGHTS,
          data: { thoughts: [addThought, ...thoughts] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({
        query: QUERY_ME
      });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, thoughts: [...me.thoughts, addThought] } },
      });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addThought({
        variables: {
          thoughtText,
          username: Auth.getProfile().data.username,
        },
      });

      setThoughtText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'thoughtText' && value.length <= 280) {
      setThoughtText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div className='p-3' style={{ backgroundColor: "#f8f9fa" }}>
      <h3 className='roboto'>So what's on your mind?</h3>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`roboto ${characterCount === 280 || error ? 'text-danger' : 'roboto'}`}
          >
            Character Count: {characterCount}/280
          </p>
          <Form onSubmit={handleFormSubmit} >
            <FloatingLabel
              controlId="floatingTextarea"
              label="Something worth reacting to..."
              className="mb-3 roboto"
            >
              <Form.Control
                as="textarea"
                placeholder="Thoughts go here"
                className='roboto'
                name="thoughtText"
                value={thoughtText}
                style={{ lineHeight: '1.5', resize: 'vertical', height: '100px' }}
                onChange={handleChange}
              />
            </FloatingLabel>

            <div >
              <button className="btn btn-dark" type="submit">
                Add Thought
              </button>
            </div>
            {error && (
              <div className="">
                {error.message}
              </div>
            )}
          </Form>
        </>
      ) : (
        <p>
          You need to be logged in to share your thoughts. Please
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default ThoughtForm;

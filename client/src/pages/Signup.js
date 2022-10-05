import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div>
      {data ? (
        <p>
          Success! You may now head
          <Link to="/">back to homepage</Link>
        </p>
      ) : (
        <form onSubmit={handleFormSubmit} autoComplete="off">
          <input
          autoComplete="off"
            placeholder="Your username"
            name="username"
            type="text"
            value={formState.name}
            onChange={handleChange}
          />
          <input
          autoComplete="off"
            placeholder="Your email"
            name="email"
            type="email"
            value={formState.email}
            onChange={handleChange}
          />
          <input
          autoComplete="off"
            placeholder="******"
            name="password"
            type="password"
            value={formState.password}
            onChange={handleChange}
          />
          <button type="submit">Submit</button>
        </form>
      )}

      {error && (
        <div className="">
          {error.message}
        </div>
      )}
    </div>
  )
}

export default Signup

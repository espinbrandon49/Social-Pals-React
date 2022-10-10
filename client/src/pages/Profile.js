import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import ThoughtForm from '../components/ThoughtForm';
import ThoughtList from '../components/ThoughtList';
import FriendList from '../components/FriendList';

import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';
import { ADD_FRIEND } from '../utils/mutations';

const Profile = () => {
  const { username: userParam } = useParams();

  const notMe = userParam !== Auth.username;

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const [addFriend, { error2 }] = useMutation(ADD_FRIEND);

  if (!localStorage.getItem('id_token')) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  const user = data?.me || data?.user || {};
  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }
  let friendId = user._id
  let userId = Auth.getProfile().data._id
  let username = user._id
  // console.log(user)
  // console.log(Auth.getProfile().data)
  const addFriendHandle = async (event) => {
    event.preventDefault()
    try {
      const { data } = await addFriend({
        variables: {
          userId,
          friendId,
          username
        },
      });
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className='d-flex flex-column align-items-center'>
      <h2 className="roboto">
        Viewing {notMe ? `${user.username}'s` : 'your'} profile.
      </h2>

      {notMe && (
        <button type='button' onClick={addFriendHandle}>Add Friend</button>
      )}

      <ThoughtList
        thoughts={user.thoughts}
        title={`${user.username}'s thoughts...`}
        showTitle={true}
        showUsername={false}
      />

      {!userParam && (
        <>
          <div
            style={{ border: '1px dotted #dc3545' }}
          >
            <ThoughtForm />
          </div>
          <div>
            <FriendList/>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;

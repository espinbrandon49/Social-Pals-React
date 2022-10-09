import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import ThoughtForm from '../components/ThoughtForm';
import ThoughtList from '../components/ThoughtList';

import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

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

  return (
    <div className='d-flex flex-column align-items-center'>
      <h2 className="roboto">
        Viewing {userParam ? `${user.username}'s` : 'your'} profile.
      </h2>

      <ThoughtList
        thoughts={user.thoughts}
        title={`${user.username}'s thoughts...`}
        showTitle={false}
        showUsername={false}
      />

      {!userParam && (
        <div
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <ThoughtForm />
        </div>
      )}
    </div>
  );
};

export default Profile;

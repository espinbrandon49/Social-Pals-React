import React from 'react'
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';
import { REMOVE_FRIEND } from '../../utils/mutations';
import Auth from '../../utils/auth';
import ListGroup from 'react-bootstrap/ListGroup';

const FriendList = () => {

  const username = Auth.getProfile().data.username
  const userId = Auth.getProfile().data._id
  const { loading, data } = useQuery(QUERY_USER, {
    variables: { username }
  })

  const [removeFriend, { error, data2 }] = useMutation(REMOVE_FRIEND);

  const friendsList = data?.user.friends || []

  const removeFriendHandle = async (e) => {
    try {
      const { data } = await removeFriend({
        variables: {
          userId: userId,
          friendId: e.target.value
        },
      });
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className='my-4'>
      <h5 className='w-75 pb-3 roboto border-bottom border-danger m-auto text-center mb-3'>Pal's List</h5>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ListGroup variant="flush" className='bg-light'>
          {friendsList.map((value, i) => {
            return (
              <ListGroup.Item key={i} className="h6 roboto bg-light text-center">
                <Link to={`/profiles/${value.username}`}>{value.username}</Link>&nbsp;
                <button
                  value={value._id}
                  onClick={removeFriendHandle}
                  className="btn btn-outline-danger rounded-circle btn-sm "
                >
                  X
                </button>
              </ListGroup.Item>
            )
          })}
        </ListGroup>
      )
      }

    </div>
  )
}

export default FriendList

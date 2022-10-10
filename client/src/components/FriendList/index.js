import React from 'react'
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';
import {REMOVE_FRIEND} from '../../utils/mutations';
import Auth from '../../utils/auth';

const FriendList = () => {

  const username = Auth.getProfile().data.username
  const userId = Auth.getProfile().data._id
  console.log(userId)
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
    <div>
      Hello FriendList
      {friendsList.map((value, i) => {
        return (
          <p key={i}>
            {value.username}
            <button value={value._id} onClick={removeFriendHandle}>X</button>
            </p>
        )
      })}
    </div>
  )
}

export default FriendList

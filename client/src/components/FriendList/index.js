import React from 'react'
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';
import Auth from '../../utils/auth';

const FriendList = () => {

  const username = Auth.getProfile().data.username

  const { loading, data } = useQuery(QUERY_USER, {
    variables: { username }
  })
    
  const friendsList = data?.user.friends || []
  // console.log(friendsList[0]._id)

  return (
    <div>
      Hello FriendList
      {friendsList.map((value, i) => {
        return (
          <p key={i}>{value.username}</p>
        )
      })}
    </div>
  )
}

export default FriendList

import React from 'react';
import Auth from '../../utils/auth';
import { useMutation } from '@apollo/client';
import { REMOVE_REACTION } from '../../utils/mutations';
import { useParams } from 'react-router-dom';

const ReactionList = ({ reactions = [] }) => {
  const [removeReaction, { error, data }] = useMutation(REMOVE_REACTION);
  let thoughtId = useParams()
  console.log(thoughtId.thoughtId)
  if (!reactions.length) {
    return <h3>No Reactions Yet</h3>;
  }
  const handleDelete = async (singleReaction) => {
    console.log(singleReaction)
    try {
      const { data } = await removeReaction({
        variables: {
          thoughtId: thoughtId.thoughtId,
          reactionId: singleReaction,
          reactions: [reactions]
        },
      });
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <h3
        className="pb-2 mb-2 border-bottom border-danger roboto"
      >
        Reactions
      </h3>

      <div className="">
        {reactions &&
          reactions.map((reaction) => (
            <div key={reaction._id} className="p-2">

              <div className='bg-light text-secondary py-2 my-1'>
                <h5 className="roboto px-3 fw-semibold">
                  {reaction.username} reacted
                  <span className='fs-6'>&nbsp;
                    on {reaction.createdAt} &nbsp;

                    {Auth.getProfile().data.username === reaction.username && (<button className='btn btn-outline-danger btn-sm rounded-circle bg-white' onClick={() => handleDelete(reaction._id)}>
                      X
                    </button>)}
                  </span>
                </h5>
                <p className="roboto px-3">{reaction.reactionText}</p>
              </div>
              
            </div>
          ))}
      </div>
    </>
  );
};

export default ReactionList;

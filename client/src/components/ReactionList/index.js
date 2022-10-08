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
        className="p-5 display-inline-block"
        style={{ borderBottom: '1px dotted #1a1a1a' }}
      >
        Reactions
      </h3>
      <div className="flex-row my-4">
        {reactions &&
          reactions.map((reaction) => (
            <div key={reaction._id} className="col-12 mb-3 pb-3">
              <div className="p-3 bg-dark text-light">
                <h5 className="card-header">
                  {reaction.username} reacted
                  <span style={{ fontSize: '0.825rem' }}>
                    on {reaction.createdAt}
                  </span>
                </h5>
                <p className="card-body">{reaction.reactionText}</p>

                {Auth.getProfile().data.username === reaction.username && (<button onClick={() => handleDelete(reaction._id)}>
                  X
                </button>)}
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default ReactionList;

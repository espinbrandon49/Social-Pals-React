import React from 'react';

const ReactionList = ({ reactions = [] }) => {
  if (!reactions.length) {
    return <h3>No Reactions Yet</h3>;
  }

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
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default ReactionList;

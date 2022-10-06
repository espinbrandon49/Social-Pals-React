import React from 'react';
import { Link } from 'react-router-dom';

const ThoughtList = ({
  thoughts,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  if (!thoughts.length) {
    return <h3>No Thoughts Yet</h3>
  }
  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {thoughts &&
        thoughts.map((thought) => (
          <div key={thought._id}>
            <h4>
              {showUsername ? (
                <Link to={`/profiles/${thought.username}`}>
                  {thought.username} <br />
                  <span>
                    had this thought on {thought.createdAt}
                  </span>
                </Link>
              ) : (
                <>
                  <span>You had this thought on {thought.createdAt}</span>
                </>
              )}
            </h4>
            <div>
              <p>
                {thought.thoughtText}
              </p>
            </div>
            <Link to={`/thought/${thought._id}`}>
              Join the discussion this thought
            </Link>
          </div>
        ))}
    </div>
  )
}

export default ThoughtList

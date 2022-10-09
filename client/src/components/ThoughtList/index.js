import React from 'react';
import { Link, } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { REMOVE_THOUGHT } from '../../utils/mutations';
import Auth from '../../utils/auth';
import Card from 'react-bootstrap/Card';

const ThoughtList = ({
  thoughts,
  title,
  showTitle = true,
  showUsername = true,
}) => {

  const [removeThought, { error, data }] = useMutation(REMOVE_THOUGHT);

  if (!thoughts.length) {
    return <h3>No Thoughts Yet</h3>;
  }

  const handleDelete = async (singleThought) => {
    try {
      const { data } = await removeThought({
        variables: { _id: singleThought },
      });
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {showTitle && <h3 className='roboto my-3'>{title}</h3>}
      {thoughts &&
        thoughts.map((thought) => (
          <Card key={thought._id} style={{ width: '45rem' }} >
            <Card.Body>
              < >
                {showUsername ? (
                  <Link
                    className='noDeco'
                    to={`/profiles/${thought.username}`}
                  >
                    <Card.Title className=''>
                      {thought.username}
                    </Card.Title>
                    <Card.Subtitle className="pb-2 mb-2 border-bottom border-danger text-muted ">
                      had this thought on {thought.createdAt}
                    </Card.Subtitle>
                  </Link>
                ) : (
                  <>
                    <Card.Title >
                      You had this thought on {thought.createdAt}
                      {Auth.getProfile().data.username === thought.username && (<button className='mx-3 btn btn-outline-danger' onClick={() => handleDelete(thought._id)}>
                        Remove
                      </button>)}
                    </Card.Title>
                  </>
                )}
              </>
              <Card.Text className="noDeco pt-3 ">
                {thought.thoughtText}
              </Card.Text>
              <Card.Link className=""><Link
              className=''
                to={`/thoughts/${thought._id}`}
              >
                Join the discussion on this thought.
              </Link>
              </Card.Link>
            </Card.Body>
          </Card>
        ))}
    </div>
  );
};

export default ThoughtList;

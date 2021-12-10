import React from "react";
import { Link } from 'react-router-dom';

const ThoughtList = ({ thoughts, title }) => {
  if (!thoughts.length) {
    return <h3>No Thoughts Yet</h3>;
  }
  return (
    <div>
      <h3>{title}</h3>
      {thoughts &&
        thoughts.map((thought) => (
          <div key={thought._id} className="card mb-3">
            <p className="card-header">
              <Link
              to={`/profile/${thought.username}`}
              style={{ fontWeight: 700 }}
              className="text-light"
              >
              {thought.username}
              </Link>{' '}
              thought on {thought.createAt}
            </p>
            <div className="card-body">
              <Link to={`/thought/${thought.id}`}>
              <p>{thought.thoughtText}</p>
              <p className="mb-0">
                Reactions: {thought.reactionCount} || Click to{" "}
                {thought.reactionCount ? "see" : "start"} the discussion!
              </p>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ThoughtList;
// In both instances, we've added an extra path to the end of the Link component. For example, /profile/${thought.username} would become /profile/Zoe66 for that particular user.
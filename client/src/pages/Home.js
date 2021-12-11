import React from "react";

import ThoughtList from "../components/ThoughtList";
import FriendList from "../components/FriendList";
import ThoughtForm from "../components/ThoughtForm";

import { useQuery } from "@apollo/client";
import { QUERY_THOUGHTS, QUERY_ME_BASIC } from "../utils/queries";

import Auth from "../utils/auth";

// when loading execute query for thought data (async), when finished data is stored in the destructured data property
const Home = () => {
  // use useQuery hook to make query request
  // loading conditionally renders data based on availability
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  // use object destructuring to extract `data` from the `useQuery` hook
  const { data: userData } = useQuery(QUERY_ME_BASIC);

  // access data from object
  // optional chaining (Node no) negates the need to check if an object even exists before accessing its properties
  // what this says is if data exists, store it in thoughts, if not store in []
  const thoughts = data?.thoughts || [];

  const loggedIn = Auth.loggedIn();

  // ) : ( to conditionally render the ThoughtList comp
  return (
    <main>
      <div className="flex-row justify-space-between">
        {loggedIn && (
          <div className="col-12 mb-3">
            <ThoughtForm />
          </div>
        )}
        <div className={`col-12 mb-3 ${loggedIn && "col-lg-8"}`}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList
              thoughts={thoughts}
              title="Some Feed for Thought(s)..."
            />
          )}
        </div>
        {loggedIn && userData ? (
          <div className="col-12 col-lg-3 mb-3">
            <FriendList
              username={userData.me.username}
              friendCount={userData.me.friendCount}
              friends={userData.me.friends}
            />
          </div>
        ) : null}
      </div>
    </main>
  );
};

export default Home;

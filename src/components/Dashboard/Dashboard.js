import React, { useContext, useEffect, useState } from 'react';
import PostAPI from '../../api/PostAPI';
import context from '../../context/context';
import PostView from '../PostView/PostView';

export default function Dashboard(props) {
  const { user, token } = useContext(context);
  const [pendingPosts, setPendingPosts] = useState([]);

  const fetchPendingPosts = async (token) => {
    const { data, err } = await PostAPI.adminGetPosts(token);

    if (err) {
    } else {
      setPendingPosts(data);
    }
  };

  useEffect(() => {
    if (user.userType === 'Admin') {
      fetchPendingPosts(token);
    }
  }, []);

  return (
    <div className="m-1 mx-auto w-full max-w-screen-lg">
      {user.userType === 'Admin' && (
        <div className="pending-posts flex flex-col items-center p-1 bg-pink-400">
          <h3>
            <b>Pending posts</b>
          </h3>
          {pendingPosts.length !== 0 &&
            pendingPosts.map((post, index) => (
              <PostView result={post} key={index} admin={true} />
            ))}
        </div>
      )}
      <div className="your-posts"></div>
      <div className="personal-stats">
        <div className="salary"></div>
        <div className="reputation"></div>
      </div>
    </div>
  );
}

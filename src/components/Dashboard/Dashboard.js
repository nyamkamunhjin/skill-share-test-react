import React, { useContext, useEffect, useState } from 'react';
import PostAPI from '../../api/PostAPI';
import UserAPI from '../../api/UserAPI';
import context from '../../context/context';
import PostView from '../PostView/PostView';

export default function Dashboard(props) {
  const { user, token, updateUser } = useContext(context);
  const [pendingPosts, setPendingPosts] = useState([]);
  const [yourPosts, setYourPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const fetchPendingPosts = async (token) => {
    const { data, err } = await PostAPI.adminGetPosts(token);

    if (err) {
    } else {
      setPendingPosts(data);
    }
  };
  const fetchYourPosts = async (token) => {
    const { data, err } = await UserAPI.getUserPosts(token);
    if (err) {
    } else {
      setYourPosts(data);
      setFilteredPosts(data);
    }
  };

  const handlePostFilter = async (event) => {
    const filter = event.target.value.toLowerCase();
    console.log(filter);

    if (filter === 'all') {
      setFilteredPosts(yourPosts);
    } else {
      setFilteredPosts(yourPosts.filter((post) => post.approved === filter));
    }
  };

  useEffect(() => {
    if (user.userType === 'Admin') {
      fetchPendingPosts(token);
    }
    updateUser(token);
    fetchYourPosts(token);
  }, []);

  return (
    <div className="m-1 mx-auto w-full max-w-screen-lg h-screen">
      <div className="personal-stats flex justify-start overflow-auto overflow-x-hidden border-b-4">
        <div className="salary m-2 rounded shadow hover:shadow-lg w-36 h-24 grid place-items-center bg-indigo-100">
          <p>
            <b>Monthly Income</b>
          </p>
          <p>{user.reputationPoint * 150}₮</p>
        </div>
        <div className="reputation m-2 rounded shadow hover:shadow-lg w-36 h-24 grid place-items-center bg-indigo-100">
          <p>
            <b>Your reputation</b>
          </p>
          <p>{user.reputationPoint} points</p>
        </div>
      </div>
      <div className="flex flex-wrap md:flex-nowrap justify-start">
        <div className="your-posts w-full md:w-6/12 max-h-96 md:max-h-full  overflow-auto overflow-x-hidden m-2 rounded shadow hover:shadow-lg p-2 bg-indigo-100">
          <div className="w-full flex justify-between">
            <p className="text-2xl font-bold ">Your posts</p>
            <select
              className="rounded outline-none"
              onChange={handlePostFilter}
            >
              <option>All</option>
              <option>Approved</option>
              <option>Pending</option>
              <option>Declined</option>
            </select>
          </div>
          {filteredPosts.length !== 0 &&
            filteredPosts.map((post, index) => (
              <PostView
                result={post}
                key={index}
                showStatus={true}
                clickable={post.approved === 'approved'}
              />
            ))}
        </div>
        {user.userType === 'Admin' && (
          <div className="pending-posts flex flex-col items-center m-2 rounded shadow hover:shadow-lg p-2 w-full md:w-6/12 max-h-96 md:max-h-full overflow-auto bg-indigo-100">
            <p className="text-2xl text-yellow-500 font-bold">Pending posts</p>
            {pendingPosts.length !== 0 &&
              pendingPosts.map((post, index) => (
                <PostView result={post} key={index} admin={true} />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

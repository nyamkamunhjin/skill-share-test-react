import React from 'react';
import { useHistory } from 'react-router-dom';
import { formatDate } from '../../functions';

/**
 * @author
 * @function PostView
 **/

const PostView = ({ result, admin = false }) => {
  const history = useHistory();
  return (
    <div className="bg-green-300 rounded-md my-2 p-2 w-full max-w-2xl flex flex-col items-start shadow-md">
      <p
        className="text-2xl text-left text-black font-bold hover:text-purple-400 cursor-pointer"
        onClick={() =>
          history.push(`/${admin ? 'pending' : 'post'}/${result._id}`)
        }
      >
        {result.title}
      </p>
      <p>
        <b>on {formatDate(result.createdAt)}</b>
      </p>
      <p>
        By {result.author.firstName} {result.author.lastName}
      </p>
    </div>
  );
};

export default PostView;

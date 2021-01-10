import React from 'react';
import { useHistory } from 'react-router-dom';
import { formatDate } from '../../functions';
/**
 * @author
 * @function PostView
 **/

const PostView = ({ result, admin = false, showStatus = false }) => {
  const history = useHistory();
  return (
    <div className="bg-indigo-50 rounded-md my-2 p-2 w-full max-w-2xl flex flex-col items-start shadow-md">
      <div className="flex justify-between w-full">
        <div>
          <p
            className="text-2xl text-left text-black font-bold hover:text-purple-400 cursor-pointer"
            onClick={() =>
              history.push(`/${admin ? 'pending' : 'post'}/${result._id}`)
            }
          >
            {result.title}
          </p>
        </div>
        <div>
          {showStatus && (
            <span
              className={`${
                result.approved === 'approved'
                  ? 'bg-green-500'
                  : result.approved === 'pending'
                  ? 'bg-yellow-400'
                  : 'bg-red-500'
              } text-white p-1 text-sm rounded`}
            >
              {result.approved}
            </span>
          )}
        </div>
      </div>
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

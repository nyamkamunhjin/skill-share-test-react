import React from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
/**
 * @author
 * @function PostView
 **/

const PostView = ({
  result,
  admin = false,
  showStatus = false,
  clickable = true,
}) => {
  const history = useHistory();

  return (
    <div className="bg-indigo-50 rounded-md my-2 p-2 w-full max-w-2xl flex flex-col items-start shadow-md">
      <div className="flex justify-between w-full">
        <div>
          <p
            className={`text-2xl text-left text-black font-bold ${
              clickable && `hover:text-purple-400 cursor-pointer`
            }`}
            onClick={
              clickable
                ? () =>
                    history.push(`/${admin ? 'pending' : 'post'}/${result._id}`)
                : null
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
      <p className="text-sm font-bold">{moment(result.createdAt).fromNow()}</p>
      <div className="flex">
        <p className="mx-1">By</p>
        <p className="text-indigo-500 font-bold mx-1">
          {result.author.firstName} {result.author.lastName}
        </p>
      </div>
    </div>
  );
};

export default PostView;

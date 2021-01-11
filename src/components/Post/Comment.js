import moment from 'moment';
import React from 'react';

/**
 * @author
 * @function Comment
 **/

const Comment = ({ comment, createdAt }) => {
  return (
    <div className="my-4">
      <div className="flex">
        <p className="text-left text-indigo-500 font-bold mr-2">
          {comment.user
            ? `${comment.user.firstName} ${comment.user.lastName}`
            : 'Anonymous'}
        </p>
        <p className="text-sm">{moment(comment.createdAt).fromNow()}</p>
      </div>
      <p className="text-left ">{comment.comment}</p>
    </div>
  );
};

export default Comment;

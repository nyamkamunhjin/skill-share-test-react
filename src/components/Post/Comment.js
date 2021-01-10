import React from 'react';

/**
 * @author
 * @function Comment
 **/

const Comment = ({ comment }) => {
  return (
    <div className="my-4">
      <p className="text-left text-indigo-500 font-bold">
        {comment.user
          ? `${comment.user.firstName} ${comment.user.lastName}`
          : 'Anonymous'}
      </p>
      <p className="text-left ">{comment.comment}</p>
    </div>
  );
};

export default Comment;

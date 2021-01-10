import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import PostAPI from '../../api/PostAPI';
import context from '../../context/context';
import { formatDate } from '../../functions';
import CustomEditor from '../Editor/CustomEditor';

export default function PendingPost() {
  let { id } = useParams();
  const { user, token } = useContext(context);
  const [post, setPost] = useState(null);
  const history = useHistory();
  const fetchPost = async (id) => {
    const { data, err } = await PostAPI.adminGetPostById(id, token);
    console.log({ data, err });
    if (err || data.success === false) {
    } else {
      console.log('setting post');
      setPost(data);
    }
  };

  const handleApproveButton = () => {
    PostAPI.adminUpdatePost(
      id,
      {
        approved: 'approved',
      },
      token
    );
    history.push('/dashboard');
  };

  const handleDeclineButton = () => {
    PostAPI.adminUpdatePost(
      id,
      {
        approved: 'declined',
      },
      token
    );
    history.push('/dashboard');
  };

  useEffect(() => {
    fetchPost(id);
  }, [id]);

  return (
    <div className="w-full">
      {post && (
        <div className="mt-2 mx-auto max-w-screen-md">
          <div className="author-info flex flex-col items-start">
            <p>
              By {post.author.firstName} {post.author.lastName}
            </p>
            <p>
              <b>on {formatDate(post.createdAt)}</b>
            </p>
          </div>
          <CustomEditor readOnly={true} post={post} />
          <div className="w-full flex justify-end mt-2">
            <button
              className="btn-indigo ml-2 bg-red-500 hover:bg-red-600"
              onClick={handleDeclineButton}
            >
              Decline
            </button>
            <button
              className="btn-indigo ml-2 bg-green-500 hover:bg-green-600"
              onClick={handleApproveButton}
            >
              Approve
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

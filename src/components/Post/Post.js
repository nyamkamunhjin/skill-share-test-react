import { Editor, EditorState } from 'draft-js';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostAPI from '../../api/PostAPI';
import { formatDate } from '../../functions';
import CustomEditor from '../Editor/CustomEditor';

export default function Post() {
  let { id } = useParams();

  const [post, setPost] = useState(null);

  const fetchPost = async (id) => {
    const { data, err } = await PostAPI.getPostById(id);
    console.log({ data, err });
    if (err || data.success === false) {
    } else {
      setPost(data);
    }
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
          <div className="likes"></div>
          <div className="comments"></div>
        </div>
      )}
    </div>
  );
}

import { Editor, EditorState } from 'draft-js';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostAPI from '../../api/PostAPI';
import CustomEditor from '../Editor/CustomEditor';

export default function Post() {
  let { id } = useParams();

  const [post, setPost] = useState(null);

  const fetchPost = async (id) => {
    const post = await PostAPI.getPostById(id).then((res) => res.data);
    setPost(post);
  };

  useEffect(() => {
    fetchPost(id);
  }, [id]);

  return (
    <div>
      {post && (
        <div className="mt-2">
          <CustomEditor readOnly={true} post={post} />
        </div>
      )}
    </div>
  );
}

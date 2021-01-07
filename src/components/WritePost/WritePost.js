import React, { useContext, useState } from 'react';
import PostAPI from '../../api/PostAPI';
import context from '../../context/context';
import CustomEditor from '../Editor/CustomEditor';

/**
 * @author
 * @function WritePost
 **/

const WritePost = (props) => {
  const [content, setContent] = useState(null);
  const [titleContent, setTitleContent] = useState(null);
  const [title, setTitle] = useState(null);
  const { token } = useContext(context);
  const handleSubmit = () => {
    if (!content && !titleContent && !title) {
      // console.log('content is', content);
      console.log('handleSubmit error', { content, titleContent, title });
    } else {
      console.log(content);
      PostAPI.addPost(
        {
          title,
          titleContent: JSON.stringify(titleContent),
          content: JSON.stringify(content),
        },
        token
      )
        .then(({ data }) => {
          console.log(data);
          sessionStorage.removeItem('draftail:title');
          sessionStorage.removeItem('draftail:content');
        })
        .catch((err) => {
          // console.log('err', err.response.data);
        });
    }
  };

  return (
    <div className=" h-screen">
      <div className="flex p-2 justify-between">
        <h1>Write a story</h1>
        <button className="btn-indigo" onClick={handleSubmit}>
          Submit
        </button>
      </div>
      <CustomEditor
        bindContent={setContent}
        bindTitleContent={setTitleContent}
        bindTitle={setTitle}
      />
    </div>
  );
};

export default WritePost;

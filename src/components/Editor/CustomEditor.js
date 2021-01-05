import { Editor, EditorState } from 'draft-js';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import 'draft-js/dist/Draft.css';

const CustomEditor = (props) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const onChange = (newEditorState) => {
    const currentContentState = editorState.getCurrentContent();
    const newContentState = newEditorState.getCurrentContent();

    const currentSelectionState = editorState.getSelection();
    const newSelectionState = newEditorState.getSelection();
    if (currentContentState !== newContentState) {
      // change in content
    }

    if (currentSelectionState !== newSelectionState) {
      // change in selection
      console.log('change in selection');
      console.log(newSelectionState);
    }

    setEditorState(newEditorState);
  };

  return (
    <div className="">
      <Editor
        editorState={editorState}
        onChange={onChange}
        placeholder="Type something..."
      />
    </div>
  );
};

export default CustomEditor;

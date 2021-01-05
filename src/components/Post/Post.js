import { Editor, EditorState } from 'draft-js';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import CustomEditor from '../Editor/CustomEditor';

export default function Post() {
  let { id } = useParams();
  return (
    <div>
      <div className="mt-2">
        <CustomEditor />
      </div>
    </div>
  );
}

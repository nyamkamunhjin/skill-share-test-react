import { BLOCK_TYPE, DraftailEditor, INLINE_STYLE } from 'draftail';
import { EditorState } from 'draft-js';
import createInlineToolbarPlugin, {
  Separator,
} from 'draft-js-inline-toolbar-plugin';
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CodeBlockButton,
} from 'draft-js-buttons';

import React, { useState } from 'react';

import 'draft-js/dist/Draft.css';
import 'draftail/dist/draftail.css';
import 'draft-js-inline-toolbar-plugin/lib/plugin.css';
import 'draft-js/dist/Draft.css';
import './CustomEditor.css';

const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;

const initial = JSON.parse(sessionStorage.getItem('draftail:content'));

const onSave = (content) => {
  console.log('saving', content);
  sessionStorage.setItem('draftail:content', JSON.stringify(content));
};

const CustomEditor = (props) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  return (
    <div className="hover:bg-white hover:shadow-lg hover:border-transparent">
      <DraftailEditor
        rawContentState={initial || null}
        onSave={onSave}
        editorState={editorState}
        stripPastedStyles={true}
        onChange={setEditorState}
        placeholder="Type something..."
        plugins={[inlineToolbarPlugin]}
        topToolbar={null}
      />

      <InlineToolbar>
        {(externalProps) => (
          <React.Fragment>
            <BoldButton {...externalProps} />
            <ItalicButton {...externalProps} />
            <UnderlineButton {...externalProps} />
            <CodeButton {...externalProps} />
            <Separator {...externalProps} />

            <HeadlineOneButton {...externalProps} />
            <HeadlineTwoButton {...externalProps} />
            <HeadlineThreeButton {...externalProps} />

            <UnorderedListButton {...externalProps} />
            <OrderedListButton {...externalProps} />

            <CodeBlockButton {...externalProps} />
          </React.Fragment>
        )}
      </InlineToolbar>
    </div>
  );
};

export default CustomEditor;

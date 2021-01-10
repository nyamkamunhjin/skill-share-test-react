import {
  BLOCK_TYPE,
  DraftailEditor,
  ENTITY_TYPE,
  INLINE_STYLE,
} from 'draftail';
import { EditorState, convertFromRaw, convertToRaw, RichUtils } from 'draft-js';
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
  CodeBlockButton,
} from 'draft-js-buttons';

import React, { useEffect, useRef, useState } from 'react';

import 'draft-js/dist/Draft.css';
import 'draftail/dist/draftail.css';
import 'draft-js-inline-toolbar-plugin/lib/plugin.css';
import './CustomEditor.css';

const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;

const CustomEditor = ({
  bindContent,
  bindTitleContent,
  bindTitle,
  readOnly = false,
  post = null,
}) => {
  const initialTitle = !post
    ? JSON.parse(sessionStorage.getItem('draftail:title'))
    : JSON.parse(post.titleContent);

  const initialContent = !post
    ? JSON.parse(sessionStorage.getItem('draftail:content'))
    : JSON.parse(post.content);

  const [editorState, setEditorState] = useState(() => {
    if (initialTitle) {
      // console.log('initial title', initialTitle);
      return EditorState.createWithContent(convertFromRaw(initialTitle));
    }
    return EditorState.createEmpty();
  });

  const onSaveContent = (content) => {
    if (content && bindContent) {
      bindContent(content);
    }

    console.log('saving content', content);
    sessionStorage.setItem('draftail:content', JSON.stringify(content));
  };

  const onSaveTitle = (newEditorState) => {
    const content = convertToRaw(newEditorState.getCurrentContent());
    if (bindTitleContent && bindTitle) {
      bindTitle(newEditorState.getCurrentContent().getPlainText('\u0001'));
      bindTitleContent(content);
    }
    setEditorState(newEditorState);
    console.log('saving title', content);
    sessionStorage.setItem('draftail:title', JSON.stringify(content));
  };

  const bindPost = () => {
    if (initialContent && bindContent) {
      bindContent(initialContent);
    }
    if (initialTitle && bindTitleContent && bindTitle) {
      bindTitleContent(initialTitle);
      // extract title
      bindTitle(convertFromRaw(initialTitle).getPlainText('\u0001'));
    }
  };

  useEffect(() => {
    if (!readOnly) {
      bindPost();
    }
  }, []);

  return (
    <div className="hover:bg-white shadow-lg border-transparent max-w-screen-md">
      <div className="post-title">
        <DraftailEditor
          stripPastedStyles={true}
          readOnly={readOnly}
          editorState={editorState}
          onChange={!readOnly ? onSaveTitle : null}
          placeholder={!readOnly ? 'Your title...' : ''}
          topToolbar={null}
        />
      </div>
      <DraftailEditor
        rawContentState={initialContent || null}
        onSave={!readOnly ? onSaveContent : null}
        readOnly={readOnly}
        stripPastedStyles={true}
        placeholder={!readOnly ? 'Type something...' : ''}
        plugins={[inlineToolbarPlugin]}
        topToolbar={null}
        blockTypes={[
          { type: BLOCK_TYPE.HEADER_THREE },
          { type: BLOCK_TYPE.UNORDERED_LIST_ITEM },
        ]}
        inlineStyles={[
          { type: INLINE_STYLE.BOLD },
          { type: INLINE_STYLE.ITALIC },
          { type: INLINE_STYLE.UNDERLINE },
        ]}
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

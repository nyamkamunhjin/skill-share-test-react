import { Editor, EditorState } from 'draft-js';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useParams } from 'react-router-dom';
import PostAPI from '../../api/PostAPI';
import { formatDate } from '../../functions';
import CustomEditor from '../Editor/CustomEditor';
import { AiOutlineFire, AiFillFire } from 'react-icons/ai';
import Comment from './Comment';
import context from '../../context/context';
export default function Post() {
  let { id } = useParams();
  const { token, user } = useContext(context);
  const [post, setPost] = useState(null);
  const [likeToggle, setLikeToggle] = useState(false);
  const [usedLike, setUsedLike] = useState(false);
  // const [likes, setLikes] = useState([]);
  const commentRef = useRef();
  const fetchPost = async (id) => {
    const { data, err } = await PostAPI.getPostById(id);
    console.log({ data, err });
    if (err || data.success === false) {
    } else {
      setPost(data);
      if (user && user._id) {
        console.log('data', data.likedUsers);
        if (data.likedUsers.includes(user._id)) {
          setLikeToggle(true);
        } else {
          setLikeToggle(false);
        }
      } else {
        setLikeToggle(false);
      }
    }
  };

  const handleAddComment = async (event) => {
    event.preventDefault();
    console.log(commentRef.current.value);

    const { data, err } = await PostAPI.addComment(
      {
        postId: id,
        comment: commentRef.current.value,
        userId: user ? user._id : null,
      },
      token
    );

    if (err) {
    } else {
      console.log('added comment', data);
      setPost(data);
    }
  };

  const handleLikeButton = async () => {
    const { data, err } = user
      ? await PostAPI.like(
          {
            postId: id,
            userId: user ? user._id : null,
          },
          token
        )
      : !usedLike
      ? await PostAPI.like_anon({
          postId: id,
        })
      : { data: null, err: 'usedlike' };

    if (err) {
    } else {
      console.log('liked');
      setPost(data);
      if (user && user._id) {
        console.log('data', data.likedUsers);

        if (data.likedUsers.includes(user._id)) {
          setLikeToggle(true);
        } else {
          setLikeToggle(false);
        }
      } else {
        setUsedLike(true);
        setLikeToggle(!likeToggle);
      }
    }
  };

  useEffect(() => {
    fetchPost(id);
  }, [id]);

  return (
    <div className="w-full">
      {post && (
        <div className="mt-2 mx-auto max-w-screen-md">
          <div className="author-info flex flex-col items-start mx-3">
            <div className="my-4 w-full flex justify-start items-center">
              <p className="text-sm mx-1">Written by </p>
              <p className="mx-1 font-bold text-indigo-500">
                {post.author.firstName} {post.author.lastName}
              </p>
              <p className="text-sm text-gray-800 font-bold ml-auto">
                {formatDate(post.createdAt)}
              </p>
            </div>
          </div>
          <CustomEditor readOnly={true} post={post} />
          <div className="likes my-4 mx-3 flex items-center">
            <span
              className="text-3xl text-left"
              onClick={() => handleLikeButton()}
            >
              {!likeToggle ? (
                <AiOutlineFire />
              ) : (
                <AiFillFire className="text-yellow-500" />
              )}
            </span>
            <p className="text-yellow-500 font-bold ">{post.likes}</p>
          </div>
          <div className="comments mx-3">
            <form onSubmit={handleAddComment}>
              <div className="mb-4">
                <label className="block text-sm text-indigo-500 font-bold text-left group-hover:text-indigo-800">
                  Your name
                </label>
                <p className="text-left">
                  {user ? `${user.firstName} ${user.lastName}` : 'Anonymous'}
                </p>
              </div>
              <div className="mb-4">
                <label className="block text-sm text-indigo-500 font-bold text-left group-hover:text-indigo-800">
                  Comment
                </label>
                <textarea
                  className="border border-gray-400 appearance-none rounded w-full p-2 mt-1 focus:border-indigo-600 focus: outline-none active:border-indigo-600"
                  type="text"
                  placeholder="Comment..."
                  ref={commentRef}
                  spellCheck={false}
                />
              </div>
              <div className="flex justify-end">
                <button className="btn-indigo mx-1">Comment</button>
              </div>
            </form>
            <div className="mb-96">
              {post.comments.map((comment, index) => (
                <Comment comment={comment} key={`comment-${index}`} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

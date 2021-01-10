import axios from 'axios';
import resolver from './resolver';

const addPost = async (values, token) => {
  return await resolver(
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/post/add`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data)
      .catch((err) => err.response.data)
  );
};

const getPostById = async (id) => {
  return await resolver(
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/post/id/${id}`)
      .then((res) => res.data)
      .catch((err) => err.response.data)
  );
};

const searchPost = async (search, limit) => {
  return await resolver(
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/post/search`, {
        params: {
          query: search,
          limit,
        },
      })
      .then((res) => res.data)
      .catch((err) => err.response.data)
  );
};

const adminGetPostById = async (id, token) => {
  return await resolver(
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/post/pending/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data)
      .catch((err) => err.response.data)
  );
};

const adminGetPosts = async (token) => {
  return await resolver(
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/post/pending`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data)
      .catch((err) => err.response.data)
  );
};

const adminUpdatePost = async (id, values, token) => {
  return await resolver(
    axios
      .put(
        `${process.env.REACT_APP_BACKEND_URL}/api/post/update/${id}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => res.data)
      .catch((err) => err.response.data)
  );
};

const addComment = async (values, token) => {
  return await resolver(
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/api/post/addcomment`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => res.data)
      .catch((err) => err.response.data)
  );
};

const removeComment = async (values, token) => {
  return await resolver(
    axios
      .delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/post/removecomment`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => res.data)
      .catch((err) => err.response.data)
  );
};

const like = async (values, token) => {
  return await resolver(
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/post/like`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data)
      .catch((err) => err.response.data)
  );
};

const like_anon = async (values, token) => {
  return await resolver(
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/post/like-anon`, values)
      .then((res) => res.data)
      .catch((err) => err.response.data)
  );
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  addPost,
  getPostById,
  searchPost,
  adminGetPostById,
  adminGetPosts,
  adminUpdatePost,
  addComment,
  removeComment,
  like,
  like_anon,
};

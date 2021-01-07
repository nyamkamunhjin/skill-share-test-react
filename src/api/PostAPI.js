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

// eslint-disable-next-line import/no-anonymous-default-export
export default { addPost, getPostById };

import axios from 'axios';
import resolver from './resolver';

const signIn = async (values) => {
  return await resolver(
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, values)
      .then((res) => res.data)
  );
};

const signUp = async (userData) => {
  return await resolver(
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/auth/register`, userData)
      .then((res) => res.data)
  );
};

const getUser = async (token) => {
  return await resolver(
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data)
  );
};

const updateUser = async (token, update) => {
  return await resolver(
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/user/update`, update, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data)
  );
};

export default { signIn, getUser, signUp, updateUser };

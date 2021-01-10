import React, { useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import UserAPI from '../../api/UserAPI';
import context from '../../context/context';

/**
 * @author
 * @function Login
 **/

const Login = (props) => {
  const emailElRef = useRef('');
  const passwordElRef = useRef('');
  const history = useHistory();
  const { logIn } = useContext(context);

  const handleLogin = async (e) => {
    e.preventDefault();

    const { data, err } = await UserAPI.signIn({
      email: emailElRef.current.value,
      password: passwordElRef.current.value,
    });

    if (err) {
      console.error(err);
    } else {
      if (data) {
        logIn(data, () => history.push('/'));
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen px-2">
      <p className="text-3xl">Login</p>

      <form
        className="group w-full max-w-sm p-5 border rounded-xl border-opacity-50 m-5 border-indigo-500 transition-all hover:bg-indigo-50 hover:shadow-lg hover:border-transparent"
        onSubmit={(e) => handleLogin(e)}
      >
        <div className="mb-4">
          <label className="block text-sm text-indigo-500 font-bold text-left group-hover:text-indigo-800">
            Email
          </label>
          <input
            className="border border-gray-400 appearance-none rounded w-full p-2 mt-1 focus:border-indigo-600 focus: outline-none active:border-indigo-600"
            type="email"
            placeholder="Email"
            ref={emailElRef}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm text-indigo-500 font-bold text-left group-hover:text-indigo-800">
            Password
          </label>
          <input
            className="border border-gray-400 appearance-none rounded w-full p-2 mt-1 focus:border-indigo-600 focus: outline-none active:border-indigo-600"
            type="password"
            placeholder="Password"
            ref={passwordElRef}
          />
        </div>
        <div className="flex justify-center">
          <button type="submit" className="btn-indigo mx-1">
            Login
          </button>
          <button
            className="btn-indigo mx-1"
            onClick={() => history.push('/register')}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;

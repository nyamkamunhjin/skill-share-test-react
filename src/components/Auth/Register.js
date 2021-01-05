import React, { useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import UserAPI from '../../api/UserAPI';
import context from '../../context/context';

/**
 * @author
 * @function Register
 **/

const Register = (props) => {
  const emailElRef = useRef('');
  // const userTypeElRef = useRef('');
  const passwordElRef = useRef('');
  // const avatar = useRef('');
  const firstNameElRef = useRef('');
  const lastNameElRef = useRef('');
  // const addressElRef = useRef('');

  const history = useHistory();
  const { logIn } = useContext(context);

  const handleLogin = async (e) => {
    e.preventDefault();

    const { data, err } = await UserAPI.signUp({
      email: emailElRef.current.value,
      password: passwordElRef.current.value,
      firstName: firstNameElRef.current.value,
      lastName: lastNameElRef.current.value,
    });

    if (err) {
      console.error(err);
    } else {
      history.push('/login');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-indigo-200">
      <p className="text-3xl">Register</p>
      <form
        className="group w-full md:w-5/12 lg:w-3/12 p-5 border rounded-xl border-opacity-50 m-5 border-indigo-500 transition-all hover:bg-white hover:shadow-lg hover:border-transparent"
        onSubmit={(e) => handleLogin(e)}
      >
        <div className="mb-4">
          <label className="block text-sm text-indigo-500 font-bold text-left group-hover:text-indigo-800">
            Email
          </label>
          <input
            className="border border-gray-400 appearance-none rounded w-full p-2 mt-1 focus:border-indigo-600 focus: outline-none active:border-indigo-600"
            type="text"
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

        <div className="mb-4">
          <label className="block text-sm text-indigo-500 font-bold text-left group-hover:text-indigo-800">
            First Name
          </label>
          <input
            className="border border-gray-400 appearance-none rounded w-full p-2 mt-1 focus:border-indigo-600 focus: outline-none active:border-indigo-600"
            type="text"
            placeholder="First Name"
            ref={firstNameElRef}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-indigo-500 font-bold text-left group-hover:text-indigo-800">
            Last Name
          </label>
          <input
            className="border border-gray-400 appearance-none rounded w-full p-2 mt-1 focus:border-indigo-600 focus: outline-none active:border-indigo-600"
            type="text"
            placeholder="Last Name"
            ref={lastNameElRef}
          />
        </div>

        <div className="flex justify-center">
          <button type="submit" className="btn-indigo mx-1">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;

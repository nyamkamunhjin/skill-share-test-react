import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import context from '../../context/context';
import { redirect } from '../../functions';

/**
 * @author
 * @function Header
 **/

const Header = (props) => {
  const history = useHistory();

  const { user, logOut } = useContext(context);

  return (
    <nav className="py-2 flex flex-row items-center bg-indigo-100 w-full shadow-lg">
      <ul className="flex flex-row items-center my-3">
        <li className="mx-5 hover:text-indigo-600 active:text-indigo-600">
          <Link to="/">Home</Link>
        </li>
        {user && (
          <li className="mx-5 hover:text-indigo-600 active:text-indigo-600">
            <Link to="/dashboard">Dashboard</Link>
          </li>
        )}
      </ul>
      {user ? (
        <button
          className="btn-indigo ml-auto mr-4"
          onClick={() => logOut(() => history.push('/login'))}
        >
          Logout
        </button>
      ) : (
        <button
          className="btn-indigo ml-auto mr-4"
          onClick={() => history.push('/login')}
        >
          Login
        </button>
      )}
    </nav>
  );
};

export default Header;

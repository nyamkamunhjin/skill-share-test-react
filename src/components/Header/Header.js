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
    <nav className="py-1 flex flex-row justify-center items-center w-full shadow-lg">
      <div className="w-full max-w-screen-lg mx-auto px-2 flex flex-row justify-between items-center">
        <ul className="flex flex-row items-center my-3">
          <li className="mx-3 hover:text-indigo-600 active:text-indigo-600">
            <Link to="/">Home</Link>
          </li>
          {user && (
            <React.Fragment>
              <li className="mx-3 hover:text-indigo-600 active:text-indigo-600">
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li className="mx-3 hover:text-indigo-600 active:text-indigo-600">
                <Link to="/write">Write</Link>
              </li>
            </React.Fragment>
          )}
        </ul>
        {user ? (
          <button
            className="btn-indigo"
            onClick={() => logOut(() => history.push('/login'))}
          >
            Logout
          </button>
        ) : (
          <button className="btn-indigo" onClick={() => history.push('/login')}>
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Header;

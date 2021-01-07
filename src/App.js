import React, { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  useHistory,
} from 'react-router-dom';
import UserAPI from './api/UserAPI';
import './App.css';
import Login from './components/Auth/Login';

import Header from './components/Header/Header';
import Home from './components/Home/Home';
import context from './context/context';
import Cookies from 'universal-cookie';
import Register from './components/Auth/Register.js';
import Dashboard from './components/Dashboard/Dashboard';
import Post from './components/Post/Post';
import WritePost from './components/WritePost/WritePost';

function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const getUser = async (token) => {
    const { data, err } = await UserAPI.getUser(token);

    if (err) {
      console.error(err);
      console.log('getUser error');
    } else {
      setUser(data);
    }
  };

  const logIn = ({ token, expires }, callback) => {
    // console.log({ token, expires });
    new Cookies().set('token', token, {
      path: '/',
      expires: new Date(expires),
    });
    setToken(token);
    getUser(token);

    if (callback) {
      callback();
    }
  };

  const logOut = (callback) => {
    new Cookies().remove('token');
    setToken(null);
    setUser(null);

    if (callback) {
      callback();
    }
  };

  useEffect(() => {
    const token = new Cookies().get('token');

    if (token) {
      getUser(token);
      setToken(token);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App flex justify-center">
      <div className="w-full">
        <BrowserRouter>
          <context.Provider
            value={{
              token,
              user,
              logIn,
              logOut,
              setUser,
            }}
          >
            <Header />
            <div className="w-full flex justify-center">
              <div className="w-full">
                <Switch>
                  <Route path="/" component={Home} exact />
                  <Route path="/login" component={Login} />
                  <Route path="/register" component={Register} />
                  <Route path="/post/:id" component={Post} />
                  {user && (
                    <React.Fragment>
                      <Route path="/write" component={WritePost} />
                      <Route path="/dashboard" component={Dashboard} />
                    </React.Fragment>
                  )}
                </Switch>
              </div>
            </div>
          </context.Provider>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;

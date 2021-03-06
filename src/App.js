import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
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
import PendingPost from './components/Post/PendingPost';

import WritePost from './components/WritePost/WritePost';

function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const cookies = new Cookies();
  const updateUser = async (token) => {
    const { data, err } = await UserAPI.updateUser(token);

    if (err) {
      console.error(err);
      console.log('updateUser error');
    } else {
      setUser(data);
    }
  };

  const logIn = ({ token, expires }, callback) => {
    // console.log({ token, expires });
    cookies.set('token', token, {
      path: '/',
      expires: new Date(expires),
    });
    setToken(token);
    updateUser(token);

    if (callback) {
      callback();
    }
  };

  const logOut = (callback) => {
    cookies.remove('token');
    setToken(null);
    setUser(null);

    if (callback) {
      callback();
    }
  };

  useEffect(() => {
    const token = cookies.get('token');

    if (token) {
      updateUser(token);
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
              updateUser,
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
                    <Route path="/pending/:id" component={PendingPost} />
                  )}
                  {user && <Route path="/write" component={WritePost} />}
                  {user && <Route path="/dashboard" component={Dashboard} />}
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

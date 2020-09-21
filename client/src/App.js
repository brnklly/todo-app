import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import './App.scss';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';
import Header from './components/Header';
import Register from './components/Register';
import Alert from './components/Alert';
import Login from './components/Login';
import Lists from './components/Lists';
import Items from './components/Items';
import Account from './components/Account';
import PrivateRoute from './components/routing/PrivateRoute';

if (localStorage.token) {
  // if localstorage contains a token, set token to headers
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <div className='App'>
          <Header />
          <main>
            <Alert />
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <PrivateRoute exact path='/my-lists' component={Lists} />
              <PrivateRoute exact path='/my-lists/:id' component={Items} />
              <PrivateRoute exact path='/account' component={Account} />
            </Switch>
          </main>
        </div>
      </Router>
    </Provider>
  );
}

export default App;

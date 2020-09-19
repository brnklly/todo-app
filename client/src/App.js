import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import './App.scss';
import Header from './components/Header';
import Register from './components/Register';
import Alert from './components/Alert';
import Login from './components/Login';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/user';

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
              <Route path='/register' component={Register} />
              <Route path='/login' component={Login} />
            </Switch>
          </main>
        </div>
      </Router>
    </Provider>
  );
}

export default App;

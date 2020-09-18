import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import './App.scss';
import Header from './components/Header';
import Register from './components/Register';
import Alert from './components/Alert';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className='App'>
          <Header />
          <main>
            <Alert />
            <Switch>
              <Route path='/register' component={Register} />
            </Switch>
          </main>
        </div>
      </Router>
    </Provider>
  );
}

export default App;

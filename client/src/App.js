import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.scss';
import Header from './components/Header';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <div className='App'>
        <Header />
        <main>
          <Switch>
            <Route path='/register' component={Register} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;

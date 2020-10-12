import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import LoginForm from './components/LoginForm';

function App() {
  return (
    <HashRouter>
      <Route path="/" exact={true} component={MainLayout} />
      <Route path="/Login" component={LoginForm} />
    </HashRouter>
  );
}

export default App;

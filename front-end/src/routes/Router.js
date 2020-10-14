import React from 'react';
import { Switch , Route, HashRouter } from 'react-router-dom';
import MainLayout from '../components/Layout/MainLayout';
import LoginForm from '../components/LoginForm';
import HomeRoute from './HomeRoute';
import RestrictRoute from './RestrictRoute';
import Home from '../components/Home';
import NotFound from '../components/Error/NotFound';

function Router() {
  return (    
    <React.Fragment>
      <HashRouter>
        <Switch>
          <HomeRoute exact path="/" component={Home} layout={MainLayout}/>
          {/* <RestrictRoute path="/Login" component={LoginForm} /> */}
          <Route component={NotFound} />
        </Switch>
      </HashRouter>
    </React.Fragment>
  );
}

export default Router;



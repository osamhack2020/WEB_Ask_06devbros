import React from 'react';
import { Switch , Route, HashRouter } from 'react-router-dom';
import MainLayout from '../components/Layout/MainLayout';
import HomeRoute from './HomeRoute';
import RestrictRoute from './RestrictRoute';
import Home from '../components/Home';
import NotFound from '../components/Error/NotFound';
import loadable from '@loadable/component';

const AsyncLoginForm = loadable(() => import('../containers/LoginContainer'));
const AsyncRegisterForm = loadable(() => import('../containers/RegisterContainer'));

function Router() {
  return (    
    <React.Fragment>
      <HashRouter>
        <Switch>
          <HomeRoute exact path="/" component={Home} layout={MainLayout}/>
          <RestrictRoute path="/login" component={AsyncLoginForm} />
          <RestrictRoute path="/register" component={AsyncRegisterForm} />
          <Route component={NotFound} />
        </Switch>
      </HashRouter>
    </React.Fragment>
  );
}

export default Router;



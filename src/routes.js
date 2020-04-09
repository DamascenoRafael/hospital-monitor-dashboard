import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Monitor from './pages/Monitor';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Monitor} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import Monitor from './pages/Monitor';
import HospitalBed from './pages/HospitalBed';

const Routes = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" exact component={Monitor} />
        <Route path="/beds/:id" component={HospitalBed} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;

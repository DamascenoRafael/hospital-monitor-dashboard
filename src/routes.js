import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import Monitor from './pages/Monitor';
import HospitalBed from './pages/HospitalBed';
import Charts from './pages/Charts';
import Reports from './pages/Reports';

const Routes = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" exact component={Monitor} />
        <Route path="/beds/:id" component={HospitalBed} />
        <Route path="/charts" component={Charts} />
        <Route path="/reports" component={Reports} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;

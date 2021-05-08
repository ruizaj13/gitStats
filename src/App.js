import React from 'react';
import {Route, Switch} from 'react-router-dom';
import UserStats from './components/userStats';
import LandingPage from './components/LandingPage';
import NotFound from './components/NotFound';
import Particles from 'react-particles-js';
import particleStyle from './assets/particles-style';
import 'antd/dist/antd.css';


function App() {
  return (
    <>
      <Switch>
        <Route exact path='/' component={LandingPage}/>
        <Route exact path='/userStats' component={UserStats}/>
        <Route exact path='*' component={NotFound}/>
      </Switch>
        <Particles params={particleStyle}/>
    </>
  )
}

export default App;

import React from 'react'
import {Route, Switch} from 'react-router-dom'
import UserStats from './components/userStats'
import LandingPage from './components/LandingPage'
import Particles from 'react-particles-js'
import particleStyle from './assets/particles-style'
import 'antd/dist/antd.css'


function App() {
  return (
    <>
      <Switch>
        <Route exact path='/' component={LandingPage}/>
        <Route exact path='/userStats' component={UserStats}/>
      </Switch>
        <Particles params={particleStyle}/>
    </>
  )
}

export default App;

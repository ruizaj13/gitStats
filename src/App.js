import React from 'react'
import {Route, Switch} from 'react-router-dom'
import userStats from './components/userStats'
import LandingPage from './components/LandingPage'
import Particles from 'react-particles-js'
import particleStyle from './assets/particles-style'



function App() {
  return (
    <>
      <Switch>
        <Route exact path='/' component={LandingPage}/>
        <Route exact path='/userStats' component={userStats}/>
      </Switch>
        <Particles params={particleStyle}/>
    </>
  )
}

export default App;

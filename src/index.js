import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css'
import { BrowserRouter as Router } from "react-router-dom";
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import {userDataReducer} from './reducers/data.js'
import thunk from 'redux-thunk'

const store = createStore(userDataReducer, applyMiddleware(thunk))


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);


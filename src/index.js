import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './ducks/root';
import thunk from 'redux-thunk';
// import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import { getToken, setToken } from './ducks/authReducer';
import jwtDecode from 'jwt-decode'

export const store = createStore(
  rootReducer, applyMiddleware(thunk)
);

let authToken = getToken()
if(authToken){
  setToken(authToken)
  store.dispatch({type:'LOGIN_CURRENT_USER',payload:jwtDecode(authToken)})
}



ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

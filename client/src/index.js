import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from "redux-thunk"
import rootReducer  from './redux/reducers';
import "./index.css"

const store = createStore(rootReducer, compose(applyMiddleware(thunk)))

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
<Provider store={store}>
<App />
</Provider>
)

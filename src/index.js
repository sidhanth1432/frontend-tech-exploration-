import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux'
import store from './store';

import { HTML5Backend } from 'react-dnd-html5-backend'
import {TouchBackend} from "react-dnd-touch-backend"


import { DndProvider } from 'react-dnd'

const root = ReactDOM.createRoot(document.getElementById('root'));

const isSmallDevice=window.innerWidth<800;
root.render(
  <Provider store={store}>
<DndProvider backend={isSmallDevice?TouchBackend:HTML5Backend}>

 
    <App />

    
    </DndProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

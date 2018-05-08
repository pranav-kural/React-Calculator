import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import StoreTest from './Test/store-test'

console.log(StoreTest())

alert("running")

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

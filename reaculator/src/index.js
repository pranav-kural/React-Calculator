import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import storeFactory from './Store'
import { addNumToCalc } from './Actions/ActionsCreators';

const store = storeFactory()
store.dispatch(
    addNumToCalc("3")
)


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

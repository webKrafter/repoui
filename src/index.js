import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import App from './App';

import './index.css';

export default require( 'react-dom' ).hydrate( 
    <Provider store={ require( './state-manager/store' ).default }>
        <ConnectedRouter history={ require( './state-manager/store' ).history }>
            <App />
        </ConnectedRouter>
    </Provider>, 
    document.getElementById( 'root' )
);

require( './registerServiceWorker' ).default();

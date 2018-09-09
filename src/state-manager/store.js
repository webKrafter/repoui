import { createStore, applyMiddleware, compose } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { Map } from 'immutable';
import thunk from 'redux-thunk';
import bounce from './middlewares/bounce';

export let history = null;

let reducer = require( './reducer' ).default,
    middleware = null;

const isBrowser = typeof window !== 'undefined',
      toImmutableStates = jsStates => Object.keys( jsStates ).reduce(( states, key ) => ({ 
          ...states, 
          [ key ]: Map( jsStates[ key ])
        }), {} );

if( isBrowser ){
  history = require( 'history/createBrowserHistory' ).default();
  reducer = connectRouter( history )( reducer );
  const enhancers = [];
  if( window.ISDEV ) {
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;
    typeof devToolsExtension === 'function' && enhancers.push( devToolsExtension() );
  }
  middleware = compose( applyMiddleware( bounce, thunk, routerMiddleware( history )), ...enhancers );
} 
else {
  middleware = applyMiddleware( bounce, thunk );
}

export default createStore( reducer, isBrowser && window.__PRELOADED_STATE__ ? toImmutableStates( window.__PRELOADED_STATE__ ) : {}, middleware );

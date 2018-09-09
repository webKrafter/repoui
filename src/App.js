import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import LogoLink from './components/ExtLogoLink';

import reactLogo from './logos/react.svg';
import reduxLogo from './logos/redux.svg';

import './App.css';

const { default: { routes=[], redirects=[] }} = require( './routes' );

export default () => 
  <div className="app">
    <header>
      <span className="caption">Github Store</span>
    </header>
    <div className="intro">
      <span>Click or tap on a row to view specific github repo details.</span>
    </div>
    <main>
      <Switch>
        { routes.map( r => <Route key={ `${ r.path }_ROUTE` } { ...r } /> )}
        { redirects.map( r => <Route key={ `REDIRECT_${ r.from }` }
                                     render={({ staticContext }) => {
                                      if( staticContext ){
                                        staticContext.status = r.status;
                                      }
                                      return <Redirect { ...r } />;
                                     }} />
        )}
      </Switch>
    </main>
    <footer>
      <div className="engine-info">
        <span>Powered by </span> 
        <LogoLink href="https://reactjs.org" img={{ alt: 'react', className: 'engine-logo', src: reactLogo }} />
        <span className="and">+</span>
        <LogoLink href="https://redux.js.org" img={{ alt: 'redux', className: "engine-logo", src: reduxLogo }} />
      </div>
    </footer>
  </div>;

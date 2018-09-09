import 'regenerator-runtime/runtime';
import express from 'express';
import React from 'react';
import mustache from 'mustache-express';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter as Router, matchPath } from 'react-router';
import { readdirSync } from 'fs';
import App from '../src/App';
import store from '../src/state-manager/store';
import { setRouter } from '../src/state-manager/reducers/server/route-state';
import routeBank from '../src/routes';

let scriptFilenames = null;

const app = express(),  
      __buildPath = `${ process.env.PWD }/build`,
      isDev = process.env.NODE_ENV === 'development',
      getRouteMatcher = path => route => matchPath( path, route ),
      addParams = ({ path, query }, route ) => {
        if( route ){
            const pTokens = path.split( '/' ),
                rTokens = route.path.split( '/' );      
            let params = { ...query },
                ptLen = pTokens.length, 
                rtLen = rTokens.length,
                descs = [ new RegExp( /^:/ ), new RegExp( /\(.*\)$/ )];
            for( let t = 0, len = ptLen < rtLen ? ptLen : rtLen; t < len; t++ ){
                if( !rTokens[ t ].startsWith( ':' )){ 
                    continue; 
                }
                params[ rTokens[ t ].replace( descs[ 0 ], '' ).replace( descs[ 1 ], '' )] = pTokens[ t ];
            }
            route[ 'params' ] = params;
        }
        return route;
      },
      getScriptsStartingWith = ({ protocol = 'http', headers: { host }}, ...filenames ) => {
          if( scriptFilenames === null ) {
            scriptFilenames = readdirSync( `${ __buildPath }/static/js` )
                                .filter( file => ( /.+\.js$/ ).test( file ))
                                    .map( file => file.substring( file.lastIndexOf( '\\' ) + 1 ));
          }
          let temp = null;
          const domain = `${ protocol }://${ host }`;
          return filenames.reduce(( tagsText, filename ) => {
              temp = scriptFilenames.find( file => file.startsWith( filename ));
              return !temp ? tagsText : `${ tagsText }<script src='${ domain }/dist/static/js/${ temp }' /></script>\n` 
          }, '' );
      },
      findPath = ( req, routes ) => addParams( req, routes.find( getRouteMatcher( req.path ))),
      storeRouteInfo = ( dispatch, req ) => dispatch( setRouter({
            action: "PUSH",
            location: {
                hash: req.hash,
                key: undefined,
                pathname: req.path,
                search: req.query,
                state: undefined
            }
      })),
      getState = state => JSON.stringify(
        Object.keys( state ).reduce(( stateObj, key ) => ({ 
            ...stateObj, 
            [ key ]: state[ key ].toJS() 
        }), {} )
      );

app.use( '/dist', express.static( __buildPath ));
app.engine( 'mustache', mustache() );
app.set( 'view engine', 'mustache' );
app.set( 'views', __buildPath );
app.get( '*', async ( req, res ) => {
    let { component = {}, params = {} } = findPath( req, routeBank.routes ) || {};
    try{
        storeRouteInfo( store.dispatch, req );
        component.getServerActions && await Promise.all( component.getServerActions( params ).map( creator => store.dispatch( creator() )));
        let context = {};
        const html = renderToString( 
            <Provider store={ store }>
                <Router context={ context } location={ req.url }>
                    <App />
                </Router>
            </Provider>
        );
        if( context.url ){
            return res.redirect( context.status, `${ req.protocol }://${ req.headers.host }${ context.url }` );
        }
        res.render( 'index', {
            html,
            isDev: isDev ? 'window.__ISDEV__ = true' : '',
            scripts: getScriptsStartingWith( req, 'main' ), 
            state: getState( store.getState() ),
            title: req.path.match( /^\/[0-9]+$/ ) ? 'Repo Details' : 'Github UI App'
        });
    }
    catch( err ){
        console.log( err );
    }
});

const port = process.env.PORT || 9600;
app.listen( port, () => console.log(`Server is listening on port ${ port }` ));

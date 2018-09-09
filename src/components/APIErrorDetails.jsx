import React from 'react';

import './APIErrorDetails.css';

const isDev = typeof window !== 'undefined' ? window.ISDEV 
                                            : require( 'lodash.get' )(( process || {} ), 'env.NODE_ENV' ) === 'development',
      defaultErrorMsg = 'No repositories available momentarily';

export default ({ messages = defaultErrorMsg }) => 
        !messages ? null 
                  : <div className="messages">
                        <ul>
                        { 
                            isDev ? ( !Array.isArray( messages ) ? [ messages ] : messages ).map( m => <li>{ m }</li> )
                                  : <li>{ defaultErrorMsg }</li>
                        }
                        </ul>
                    </div>;
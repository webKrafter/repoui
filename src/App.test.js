import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import App from './App';

it( 'renders without crashing', () => {
  new ShallowRenderer().render( <App />);
});

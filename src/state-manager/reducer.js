const reducers = {
  repo: require( './reducers/repo' ).default
};

export default require( 'redux' ).combineReducers( 
  typeof window !== 'undefined' ? reducers : {
      ...reducers,
      router: require( './reducers/server/route-state' ).routerReducer
    });
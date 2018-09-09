import { Map } from 'immutable';

export const setRouter = router => ({
    type: 'SET_ROUTER',
    router
}); 

export const routerReducer = ( state = Map(), action ) => action.type === 'SET_ROUTER' ? Map( action.router ) : state;

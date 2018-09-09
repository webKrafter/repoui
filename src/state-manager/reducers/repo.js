import { Map } from 'immutable';

const defaultStateJSON = {
    activeIndex: -1,
    items: [],
    fetchError: {},
    isFetching: false
};

export const defaultState = Map( defaultStateJSON );

const initiateFetch = () => defaultState.set( 'isFetching', true ); 

const storeRepos = items => defaultState.set( 'items', items );

const repoFetchError = fetchError => defaultState.set( 'fetchError', fetchError );

const setActiveRepoIndex = ( state, index ) => state.set( 'activeIndex', index < 0 || index >= state.get( 'items' ).length ? defaultStateJSON.activeIndex : index );

const setActiveRepoIndexMatchingId = ( state, repoId ) => state.set( 'activeIndex', state.get( 'items' ).findIndex(({ id }) => id === repoId ));

export default function( state = defaultState, action ){
    switch( action.type ) {
        case 'FETCH_ALL_REPOS_INITIATED' : return initiateFetch();
        case 'STORE_ALL_REPOS' : return storeRepos( action.repos );
        case 'REPORT_REPO_FETCH_ISSUES': return repoFetchError( action.error );
        case 'UPDATE_ACTIVE_REPO_INDEX': return setActiveRepoIndex( state, action.index );
        case 'UPDATE_ACTIVE_REPO_INDEX_BY_ID': return setActiveRepoIndexMatchingId( state, action.id );
        default: return state;
    }
};

import { push } from 'connected-react-router';
import get from 'lodash.get';
import Details from '../components/Details';
    
const { onFetchAllRepos, onUpdateActiveRepoIndexById } = require( '../state-manager/action-creators' );
    
const DetailsContainer = require( 'react-redux' ).connect(
    ({ repo, router }) => {
        const _id = Number.parseInt( get( router, 'location.pathname', '' ).replace( '/', '' ), 10 );
        return Number.isInteger( _id ) ? repo.get( 'items' ).find(({ id }) => id === _id ) : { id: null };
    }, {
        push 
    }, 
    ( state, { push }) => !state.id ? push( '/not-found' ) : state
)( Details );

DetailsContainer.getServerActions = ({ id = 0 }) => [ 
    async () => {
        const { default: { dispatch }} = require( '../state-manager/store' );
        return new Promise( async ( resolve, reject ) => {
            try{
                await dispatch( onFetchAllRepos() );
                dispatch( onUpdateActiveRepoIndexById( id ));
                resolve();
            }
            catch( e ){
                console.log( 'SERVER ACTION ERROR:', e );
                reject( e );
            }
        });
    }
];

export default DetailsContainer;
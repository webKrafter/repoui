import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import Repos from '../components/Repos';

const { onFetchAllRepos, onUpdateActiveRepoIndex } = require( '../state-manager/action-creators' );

const ReposContainer = connect(
        state => state.repo.toJS(), { 
            onFetchAllRepos,
            onUpdateActiveRepoIndex,
            push
        },
        ( state, { onFetchAllRepos, onUpdateActiveRepoIndex, push }) => ({
            ...state,
            onFetchAllRepos,
            onChooseRepo: index => {
                onUpdateActiveRepoIndex( index );
                push( `/${ state.items[ index ].id }` );
            }
        })
    )( Repos );

ReposContainer.getServerActions = () => [ onFetchAllRepos ];

export default ReposContainer;

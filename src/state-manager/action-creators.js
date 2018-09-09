import { get } from 'axios';

const { GITHUB_API: { ALL_REPOS }} = require( `../properties/${ process.env.NODE_ENV || 'production' }` ),
    { default: { dispatch, getState }} = require( './store' ),
    onInitiateFetchAllRepos = () => ({
        type: 'FETCH_ALL_REPOS_INITIATED'
    }),
    onStoreAllRepos = repos => ({
        type: 'STORE_ALL_REPOS',
        repos
    }),
    onReportFetchRepoIssues = error => ({
        type: 'REPORT_REPO_FETCH_ISSUES',
        error
    }),
    select = ({ description = '', id, name, owner: { login: ownerName, avatar_url: ownerImgSrc = '' }, url }) => 
                ({ description, id, name, ownerImgSrc, ownerName, url }); 

export const onFetchAllRepos = () => {
    if( getState().repo.isFetching ){
        return onDoNothing();
    }
    dispatch( onInitiateFetchAllRepos() );
    return new Promise( async ( resolve, reject ) => {
        try {
            const response = await get( `${ ALL_REPOS }` );
            dispatch( onStoreAllRepos( response.data.map( select )));
            resolve( response );
        }
        catch( e ) {
            dispatch( onReportFetchRepoIssues() );
            reject( e );
        }
    });
};

export const onUpdateActiveRepoIndex = index => ({
    type: 'UPDATE_ACTIVE_REPO_INDEX',
    index
});

export const onUpdateActiveRepoIndexById = id => ({
    type: 'UPDATE_ACTIVE_REPO_INDEX_BY_ID',
    id
});

export const onDoNothing = () => ({
    type: 'DO_NOTHING'
});
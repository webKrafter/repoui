import { fromJS } from 'immutable';
import * as matchers from 'jest-immutable-matchers';
import reducer, { defaultState } from './repo';

describe( 'repo reducer testing', () => {
    beforeEach(() => jest.addMatchers( matchers ));
    describe( 'DO_NOTHING', () => {
        it( 'should return state as is', () => {
            const actual = reducer( defaultState, { type: 'DO_NOTHING' });
            expect( actual ).toEqualImmutable( defaultState );
        });
    });
    describe( 'FETCH_ALL_REPOS_INITIATED', () => {
        let isFetching;
        beforeAll(() => {
            const actual = reducer( defaultState, { type: 'FETCH_ALL_REPOS_INITIATED' });
            isFetching = actual.get( 'isFetching' );
        });
        it( 'should set isFetching state to true', () => expect( isFetching).toEqual( true ));
        it( 'should set isFetching state opposite of its default', () => expect( isFetching ).not.toEqual( defaultState.get( 'isFetching' )));
        describe( 'clearing current items', () => {
            let newDefault, actual;
            beforeAll(() => {
                newDefault = defaultState.set( 'items', [ 'a', 'b', 'c' ]);
                actual = reducer( newDefault, { type: 'FETCH_ALL_REPOS_INITIATED' });
            });
            it( 'should update state', () => expect( actual ).not.toEqualImmutable( newDefault ));
            it( 'should update with 0 items', () => expect( actual.get( 'items' )).toHaveLength( 0 ));
        });
    });
    describe( 'STORE_ALL_REPOS', () => {
        let newDefault, isFetching, items;
        beforeAll(() => {
            newDefault = defaultState.set( 'isFetching', true );
            const actual = reducer( newDefault, { 
                type: 'STORE_ALL_REPOS',
                repos: [ 'a', 'b', 'c' ]
             });
            isFetching = actual.get( 'isFetching' );
            items = actual.get( 'items' );
        });
        it( 'should update items state with new items', () => expect( items ).not.toEqual( newDefault.get( 'items' )));
        it( 'should set isFetching state its default', () => expect( isFetching ).not.toEqual( newDefault.get( 'isFetching' )));
    });
    describe( 'REPORT_REPO_FETCH_ISSUES', () => {
        let newDefault, actual;
        beforeAll(() => {
            newDefault = defaultState.set( 'isFetching', true );
            actual = reducer( newDefault, { 
                type: 'REPORT_REPO_FETCH_ISSUES',
                error: 'error test'
             });
        });
        it( 'should update error state with new error', () => expect( actual.get( 'fetchError' )).not.toEqual( newDefault.get( 'fetchError' )));
        it( 'should maintain default items', () => expect( actual.get( 'items' )).toEqualImmutable( newDefault.get( 'items' )));
        it( 'should set isFetching state its default', () => expect( actual.get( 'isFetching' )).not.toEqual( newDefault.get( 'isFetching' )));
    });
    describe( 'UPDATE_ACTIVE_REPO_INDEX', () => {
        let newDefault;
        beforeAll(() => newDefault = defaultState.set( 'items', [ 'a', 'b', 'c', 'd', 'e' ]));
        it( 'should set new active index when within item count range', () => {
            const actual = reducer( newDefault, { 
                type: 'UPDATE_ACTIVE_REPO_INDEX',
                index: 3
             });
            expect( actual.get( 'activeIndex' )).toEqual( 3 );
        });
        it( 'should not update for new active index that falls out of range', () => {
            const actual = reducer( newDefault, { 
                type: 'UPDATE_ACTIVE_REPO_INDEX',
                index: 10
             });
            expect( actual.get( 'activeIndex' )).toEqual( newDefault.get( 'activeIndex' ));
        });
        it( 'should not update for new active index that falls below', () => {
            const actual = reducer( newDefault, { 
                type: 'UPDATE_ACTIVE_REPO_INDEX',
                index: -1
             });
            expect( actual.get( 'activeIndex' )).toEqual( newDefault.get( 'activeIndex' ));
        });
    });
    describe( 'UPDATE_ACTIVE_REPO_INDEX_BY_ID', () => {
        let newDefault;
        beforeAll(() => newDefault = defaultState.set( 'items', [{ id:'a' }, { id:'b' }, { id:'c' }, { id:'d' }, { id:'e' }]));
        it( 'should set new active index for item id matching action id parameter', () => {
            const actual = reducer( newDefault, { 
                type: 'UPDATE_ACTIVE_REPO_INDEX_BY_ID',
                id: 'b'
             });
            expect( actual.get( 'activeIndex' )).toEqual( 1 );
        });
        it( 'should not set new active index where no item id matches action id parameter', () => {
            const actual = reducer( newDefault, { 
                type: 'UPDATE_ACTIVE_REPO_INDEX_BY_ID',
                id: 'w'
             });
            expect( actual.get( 'activeIndex' )).toEqual( newDefault.get( 'activeIndex' ));
        });
    });
});
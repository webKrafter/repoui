import React, { Component } from 'react';
import { arrayOf, bool, func, object } from 'prop-types';
import Rows from './Rows';
import ErrorDetails from './APIErrorDetails';
import Progress from './Progress';

export default class extends Component {

    static defaultProps = {
        isFetching: false,
        items: [],
        onChooseRepo: () => {},
        onFetchAllRepos: () => {}
    };

    static propTypes = {
        isFetching: bool,
        items: arrayOf( object ),
        onChooseRepo: func,
        onFetchAllRepos: func
    };
    
    componentDidMount(){
        const { isFetching, items: { length = 0 }, onFetchAllRepos } = this.props;
        !length && !isFetching && onFetchAllRepos();
    }
    
    render(){
        const { activeIndex, fetchError, items, onChooseRepo, isFetching } = this.props;
        return items.length === 0 
            ? ( isFetching ? <Progress /> : <ErrorDetails messages={ fetchError } /> )
            : <Rows activeIndex={ activeIndex } addLineNum items={ items } onSelect={ onChooseRepo } />;
    }

}

import React from 'react';
import { arrayOf, bool, func, number, shape, string } from 'prop-types';
import './Rows.css';

const getLineNum = shouldAddLineNum => shouldAddLineNum ? ({ num }) => <div>{ num }</div> 
                                                        : () => null,

      Row = ({ isActive, numField, onClick, repo: { name, url }}) => <div className={ `row${ isActive ? ' active': '' }` }>
                { numField }
                <div>{ name }</div>
                <div>
                    <span onClick={ onClick }>{ url }</span>
                </div>
            </div>,

      Rows = ({ activeIndex=-1, addLineNum=false, items, onSelect=( ()=>{} )}) => {
                const LineNum = getLineNum( addLineNum );
                return <section className={ `rows ${ addLineNum ? 'three' : 'two' }-cols` }>
                    <header>
                        { addLineNum ? <h5>s/no.</h5> : null }
                        <h5>Name</h5>
                        <h5>Details location</h5>
                    </header>
                    { items.map(( item, i ) => <Row key={ item.id } 
                                                    numField={ <LineNum num={ i + 1 } /> }
                                                    isActive={ i === activeIndex } 
                                                    repo={ item }
                                                    onClick={ () => onSelect( i )} /> 
                    )}
                </section>;
      };

Rows.propTypes = {
    activeIndex: number,
    addLineNum: bool,
    items: arrayOf( shape({
        name: string.isRequired,
        url: string.isRequired
    })).isRequired,
    onSelect: func
};

export default Rows;

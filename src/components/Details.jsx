import React from 'react';
import { Link } from 'react-router-dom';

import './Details.css';

const urlSchemePattern = new RegExp( /^(.+:)?\/\// );

const Row = ({ label, value }) => <div className='row'>
                                    <div>{ urlSchemePattern.test( label ) 
                                            ? <img src={ label } alt='' className='avatar' /> 
                                            : label   }
                                    </div>
                                    <div>{ value }</div>
                                </div>;

export default ({ name, description, ownerImgSrc, ownerName }) => 
    <section className='details'>
        <header>
            <Link to='/'>Home</Link>
        </header>
        <article>
            <Row label={ ownerImgSrc } value={ ownerName } />
            <Row label='Repo name:' value={ name } />
            <Row label='Description:' value={ description } />
            <Row label='Owner:' value={ ownerName } />
        </article>
    </section>;

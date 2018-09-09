import React from 'react';
import './ExtLogoLink.css';

export default ({ href, 
                  img: { alt='', 
                         className='', 
                         src 
                  } = {}, 
                  target='blank' 
               }) => <a href={ href } target={ target } className="logo-link">
                        <img alt={ alt } className={ className } src={ src } />
                     </a>;
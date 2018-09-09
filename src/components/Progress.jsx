import React from 'react';
import { node } from 'prop-types';

import './Progress.css';

const Progress = ({ children = <span>Loading...</span> }) => <div className="progress"><div>{ children }</div></div>;
 
Progress.propTypes = {
    message: node
};

export default Progress;
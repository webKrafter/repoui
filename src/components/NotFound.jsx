import React from 'react';
import { Link } from 'react-router-dom';

import Progress from './Progress';

export default () => <Progress>
    <div className='not-found-content'>
        <h5>Requested page not found</h5>
        <div>
            <Link to='/'>Click to get home</Link>
        </div>
    </div>
</Progress>
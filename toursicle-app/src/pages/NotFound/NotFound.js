import React from 'react';
import './NotFound.scss';

// Redirect and show this page when invalid url accessed on client device
const NotFound = () => {
    return (
        <div className='notFoundDiv'>
            <h1>404</h1>
            <h3>Resource not found</h3>
        </div>
    )
}

export default NotFound;
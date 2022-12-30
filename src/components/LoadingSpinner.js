import React from 'react';

const LoadingSpinner = () => {
    return (
        <div className='d-flex flex-column align-items-center justify-content-center'>
            <div className='row'>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
            <div className='row'>
                <strong>Loading...</strong>
            </div>
        </div>
    );
};

export default LoadingSpinner;
import React from 'react';

const LoadingSpinner = ({text}) => {
    return (
        <div className='d-flex flex-column align-items-center justify-content-center'>
            <div className=''>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">{text}</span>
                </div>
            </div>
            <div className='row'>
                <strong>{text}</strong>
            </div>
        </div>
    );
};

export default LoadingSpinner;
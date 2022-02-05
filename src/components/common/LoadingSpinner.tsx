import React from 'react';

const LoadingSpinner: React.FC = () => {
    return (
        <div className="u-padding">
            <div className="u-center">
                <div className="o-h-list o-h-list--x4">
                    <div className="c-loading-card a-spin a-spin--1"></div>
                    <div className="c-loading-card a-spin a-spin--2"></div>
                    <div className="c-loading-card a-spin a-spin--3"></div>
                </div>
            </div>
        </div>
    );
};

export default LoadingSpinner;

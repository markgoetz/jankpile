import React from 'react';
import NetworkStatus from '../../definitions/NetworkStatus';
import LoadingSpinner from './LoadingSpinner';

type Props = {
    status: NetworkStatus,
};

const LoadingWrapper: React.FC<Props> = ({ status, children }) => {
    if (status === 'loading') {
        return <LoadingSpinner />;
    }

    return <>{ children }</>;
};

export default LoadingWrapper;

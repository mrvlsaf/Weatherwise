import React from 'react';
import "./SkeletonLoader.css";
import Skeleton from '@mui/material/Skeleton';

export default function SkeletonLoader() {

    const rowArray = Array.from({ length: 13 }, (_, index) => index);

    return (
        <div className='skeleton-container'>
            {rowArray.map((index) => (
                <Skeleton key={index} height={40} animation="wave" />
            ))}
        </div>
    )
}

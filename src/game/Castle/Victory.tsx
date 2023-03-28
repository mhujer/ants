import React from 'react';
import styles from './Victory.module.scss';

export const Victory: React.FC<{ color: 'black' | 'red' }> = ({ color }) => {
    return (
        <>
            {color === 'black' && <div className={styles.victoryBlack}></div>}
            {color === 'red' && <div className={styles.victoryRed}></div>}
        </>
    );
};

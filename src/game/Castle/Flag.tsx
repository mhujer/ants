import React from 'react';
import styles from './Flag.module.scss';

export const Flag: React.FC<{ color: 'black' | 'red' }> = ({ color }) => {
    return (
        <>
            {color === 'black' && <div className={styles.flagBlack}></div>}
            {color === 'red' && <div className={styles.flagRed}></div>}
        </>
    );
};

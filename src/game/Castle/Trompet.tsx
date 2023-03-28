import React from 'react';
import styles from './Trompet.module.scss';

import trompetBlack from '../../assets/images/victory/trompet-black.png';
import trompetRed from '../../assets/images/victory/trompet-red.png';

export const Trompet: React.FC<{ color: 'black' | 'red' }> = ({ color }) => {
    return (
        <>
            {color === 'black' && <img src={trompetBlack} className={styles.trompet}></img>}
            {color === 'red' && <img src={trompetRed} className={styles.trompet}></img>}
        </>
    );
};

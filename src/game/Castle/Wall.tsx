import React from 'react';
import wallImage from '../../assets/images/wall/wall.png';
import styles from './Wall.module.scss';

export const Wall: React.FC<{ height: number }> = ({ height }) => {
    const heightPercent = height >= 100 ? 100 : height; // to prevent overflowing //@todo test

    return (
        <div className={styles.wall}>
            <div className={styles.wallImageWrapper}>
                <img
                    src={wallImage}
                    className={styles.wallImage}
                    style={{
                        bottom: -(100 - heightPercent) * 2 - 4,
                    }}
                />
            </div>
        </div>
    );
};

// @todo vlajka

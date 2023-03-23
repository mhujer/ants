import React from 'react';
import styles from './PlayerDashboardStats.module.scss';

import castleIcon from '../../assets/images/dashboard-icons/castle.png';
import wallIcon from '../../assets/images/dashboard-icons/wall.png';

interface Props {
    castle: number;
    wall: number;
}

export const PlayerDashboardCastleStats: React.FC<Props> = ({ castle, wall }) => {
    return (
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        <div className={`${styles.playerStats} ${styles.resourceCastle}`}>
            <div className={styles.row}>
                <div className={styles.iconWrapper}>
                    <div className={styles.icon}>
                        <img src={castleIcon} />
                    </div>
                    <div className={styles.iconLabel}>Hrad</div>
                </div>
                <div className={styles.valueWrapper}>{castle}</div>
            </div>
            <div className={styles.row}>
                <div className={styles.iconWrapper}>
                    <div className={styles.icon}>
                        <img src={wallIcon} />
                    </div>
                    <div className={styles.iconLabel}>Hradba</div>
                </div>
                <div className={styles.valueWrapper}>{wall}</div>
            </div>
        </div>
    );
};

import React from 'react';
import styles from './PlayerDashboardStats.module.scss';
import { Resource } from '../Resource/Resource';

interface Props {
    resourceType: Resource;
    creatorsLabel: string;
    creatorsIcon: string;
    creators: number;
    creatorsChange: number;
    amountLabel: string;
    amountIcon: string;
    amount: number;
    amountChange: number;
}

export const PlayerDashboardStats: React.FC<Props> = ({
    resourceType,
    creatorsLabel,
    creatorsIcon,
    creators,
    creatorsChange,
    amountLabel,
    amountIcon,
    amount,
    amountChange,
}) => {
    let resourceClassname = null;
    switch (resourceType) {
        case 'bricks':
            resourceClassname = styles.resourceBricks;
            break;
        case 'weapons':
            resourceClassname = styles.resourceWeapons;
            break;
        case 'crystals':
            resourceClassname = styles.resourceCrystals;
            break;
    }

    return (
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        <div className={`${styles.playerStats} ${resourceClassname}`}>
            <div className={styles.row}>
                <div className={styles.iconWrapper}>
                    <div className={styles.icon}>
                        <img src={creatorsIcon} />
                    </div>
                    <div className={styles.iconLabelCreators}>{creatorsLabel}</div>
                </div>
                <div className={styles.valueWrapper}>
                    <div className={styles.valueCreators}>{creators}</div>
                    {creatorsChange !== 0 && <div className={styles.amountChange}>{creatorsChange}</div>}
                </div>
            </div>
            <div className={styles.row}>
                <div className={styles.iconWrapper}>
                    <div className={styles.icon}>
                        <img src={amountIcon} />
                    </div>
                    <div className={styles.iconLabel}>{amountLabel}</div>
                </div>
                <div className={styles.valueWrapper}>
                    {amount}
                    {amountChange !== 0 && <div className={styles.amountChange}>{amountChange}</div>}
                </div>
            </div>
        </div>
    );
};

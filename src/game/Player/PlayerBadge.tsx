import React from 'react';
import styles from './PlayerBadge.module.scss';
import { Player } from './Player';

interface Props {
    player: Player;
    isOnTurn: boolean;
}

export const PlayerBadge: React.FC<Props> = ({ player, isOnTurn }) => {
    return (
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        <div className={`${styles.badge} ${isOnTurn ? styles.badgeActive : ''}`}>
            {isOnTurn}
            {player === 'black' ? 'Černí' : 'Červení'}
        </div>
    );
};

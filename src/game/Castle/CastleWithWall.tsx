import React from 'react';
import { Player } from '../Player/Player';
import { Castle } from './Castle';
import { Wall } from './Wall';
import styles from './CastleWithWall.module.css';

interface Props {
    player: Player;
    castleHeight: number;
    wallHeight: number;
    isVictor: boolean;
    showVictoryAnts: boolean;
}

export const CastleWithWall: React.FC<Props> = ({ player, castleHeight, wallHeight, isVictor, showVictoryAnts }) => {
    if (player === 'black') {
        return (
            <div className={styles.castleWithWall}>
                <Castle player={player} height={castleHeight} isVictor={isVictor} showVictoryAnts={showVictoryAnts} />
                <Wall height={wallHeight} />
            </div>
        );
    }

    return (
        <div className={styles.castleWithWall}>
            <Wall height={wallHeight} />
            <Castle player={player} height={castleHeight} isVictor={isVictor} showVictoryAnts={showVictoryAnts} />
        </div>
    );
};

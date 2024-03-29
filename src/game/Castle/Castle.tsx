import React from 'react';
import castleBlackImage from '../../assets/images/castle/castle-black.png';
import castleRedImage from '../../assets/images/castle/castle-red.png';
import grassImage from '../../assets/images/castle/grass.png';
import { Player } from '../Player/Player';
import styles from './Castle.module.scss';
import { Flag } from './Flag';
import { Victory } from './Victory';
import { Trompet } from './Trompet';

export const Castle: React.FC<{ player: Player; height: number; isVictor: boolean; showVictoryAnts: boolean }> = ({
    player,
    height,
    isVictor,
    showVictoryAnts,
}) => {
    const heightPercent = height >= 100 ? 100 : height; // to prevent overflowing //@todo test

    let castleImage = null;
    switch (player) {
        case 'black':
            castleImage = castleBlackImage;
            break;
        case 'red':
            castleImage = castleRedImage;
            break;
    }

    const castleImageBottom = -(100 - heightPercent) * 2 - 4;

    return (
        <div className={styles.castle}>
            <div className={styles.castleImageWrapper}>
                {isVictor && (
                    <div
                        className={styles.trompetWrapper}
                        style={{
                            bottom: castleImageBottom + 200,
                        }}
                    >
                        <Trompet color={player} />
                    </div>
                )}
                <div
                    className={styles.flagWrapper}
                    style={{
                        bottom: castleImageBottom + 200,
                    }}
                >
                    <Flag color={player} />
                </div>
                <img
                    src={castleImage}
                    className={styles.castleImage}
                    style={{
                        bottom: castleImageBottom,
                    }}
                />
            </div>
            {isVictor && showVictoryAnts && (
                <div className={styles.victoryAntsWrapper}>
                    <Victory color={player} />
                </div>
            )}
            <div className={styles.grassImage}>
                <img src={grassImage} />
            </div>
        </div>
    );
};

// @todo vlajka

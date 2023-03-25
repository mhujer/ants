import React from 'react';
import styles from './Game.module.scss';
import { PlayerDashboard } from './Player/PlayerDashboard';
import { CastleWithWall } from './Castle/CastleWithWall';
import { CardComponent } from './Card/CardComponent';
import { CardBack } from './Card/CardBack';

export const Game: React.FC = () => {
    return (
        <div className={styles.wholeGameWrapper}>
            <div className={styles.dashboardWrapper}>
                <div>
                    <PlayerDashboard builders={2} bricks={10} soldiers={2} weapons={10} mages={2} crystals={10} />
                </div>
                <div className={styles.deckCastlesWrapper}>
                    <div className={styles.decksWrapper}>
                        <CardBack />
                        <CardBack />
                    </div>
                    <div className={styles.castlesWrapper}>
                        <div className={styles.castleBlack}>
                            <CastleWithWall player={'black'} castleHeight={30} wallHeight={20} />
                        </div>
                        <div className={styles.castleRed}>
                            <CastleWithWall player={'red'} castleHeight={30} wallHeight={20} />
                        </div>
                    </div>
                </div>
                <div>
                    <PlayerDashboard builders={2} bricks={10} soldiers={2} weapons={10} mages={2} crystals={10} />
                </div>
            </div>
            <div className={styles.cardsWrapper}>
                <div key={'foundations'} style={{ display: 'inline-block' }}>
                    <CardComponent key={'foundations'} cardId={'foundations'} />
                </div>
                <div key={'curse'} style={{ display: 'inline-block' }}>
                    <CardComponent key={'curse'} cardId={'curse'} />
                </div>
                <div key={'recruit'} style={{ display: 'inline-block' }}>
                    <CardComponent key={'recruit'} cardId={'recruit'} />
                </div>
            </div>
        </div>
    );
};

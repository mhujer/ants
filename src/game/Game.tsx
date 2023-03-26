import React, { useEffect, useRef } from 'react';
import styles from './Game.module.scss';
import { PlayerDashboard } from './Player/PlayerDashboard';
import { CastleWithWall } from './Castle/CastleWithWall';
import { CardBack } from './Card/CardBack';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectGame, soundPlayed } from '../store/gameSlice';
import { DiscardDeck } from './Card/DiscardDeck';
import { CardsInHand } from './CardsInHand';
import { playSound } from '../sounds/Sounds';

export const Game: React.FC = () => {
    const discardDeckRef = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();
    const game = useAppSelector(selectGame);

    const playerOnTurn = game.playerOnTurn;

    // play sound
    useEffect(() => {
        if (game.playSound !== null) {
            playSound(game.playSound);
            dispatch(soundPlayed());
        }
    }, [game.playSound]);

    return (
        <div className={styles.wholeGameWrapper}>
            <div className={styles.dashboardWrapper}>
                <div>
                    <PlayerDashboard
                        isOnTurn={game.playerOnTurn === 'black'}
                        player={'black'}
                        builders={game.playerBlack.builders}
                        bricks={game.playerBlack.bricks}
                        soldiers={game.playerBlack.soldiers}
                        weapons={game.playerBlack.weapons}
                        mages={game.playerBlack.mages}
                        crystals={game.playerBlack.crystals}
                        castle={game.playerBlack.castle}
                        wall={game.playerBlack.wall}
                    />
                </div>
                <div className={styles.deckCastlesWrapper}>
                    <div className={styles.decksWrapper}>
                        <CardBack />
                        <DiscardDeck ref={discardDeckRef} card={game.lastPlayedCard} />
                    </div>
                    <div className={styles.castlesWrapper}>
                        <div className={styles.castleBlack}>
                            <CastleWithWall
                                player={'black'}
                                castleHeight={game.playerBlack.castle}
                                wallHeight={game.playerBlack.wall}
                            />
                        </div>
                        <div className={styles.castleRed}>
                            <CastleWithWall
                                player={'red'}
                                castleHeight={game.playerRed.castle}
                                wallHeight={game.playerRed.wall}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <PlayerDashboard
                        isOnTurn={game.playerOnTurn === 'red'}
                        player={'red'}
                        builders={game.playerRed.builders}
                        bricks={game.playerRed.bricks}
                        soldiers={game.playerRed.soldiers}
                        weapons={game.playerRed.weapons}
                        mages={game.playerRed.mages}
                        crystals={game.playerRed.crystals}
                        castle={game.playerRed.castle}
                        wall={game.playerRed.wall}
                    />
                </div>
            </div>
            <div className={styles.cardsWrapper}>
                <CardsInHand
                    cards={playerOnTurn === 'black' ? game.playerBlack.cards : game.playerRed.cards}
                    discardDeckRef={discardDeckRef}
                />
            </div>
        </div>
    );
};

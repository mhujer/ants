import React, { useEffect, useRef, useState } from 'react';
import styles from './Game.module.scss';
import { PlayerDashboard } from './Player/PlayerDashboard';
import { CastleWithWall } from './Castle/CastleWithWall';
import { NewCardsDeck } from './Card/NewCardsDeck';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectGame, soundPlayed } from '../store/gameSlice';
import { DiscardDeck } from './Card/DiscardDeck';
import { CardsInHand } from './CardsInHand';
import { playSound } from '../sounds/Sounds';

export const Game: React.FC = () => {
    const discardDeckRef = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();
    const game = useAppSelector(selectGame);

    const [birdsPlaying, setBirdsPlaying] = useState<boolean>(false);

    const playerOnTurn = game.playerOnTurn;

    // play sound
    useEffect(() => {
        if (game.playSound !== null) {
            playSound(game.playSound);
            dispatch(soundPlayed());
        }
    }, [game.playSound]);

    // play bird sound
    useEffect(() => {
        if (birdsPlaying || game.playerOnTurn !== 'red') {
            return;
        }
        // playSound('birds', true);
        setBirdsPlaying(true);
    }, [game.playerOnTurn, birdsPlaying]);

    return (
        <div className={styles.wholeGameWrapper}>
            <div className={styles.background}></div>
            <div className={styles.gameWrapperInner}>
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
                            resourceChange={game.resourceChange !== null ? game.resourceChange.playerBlack : null}
                        />
                    </div>
                    <div className={styles.deckCastlesWrapper}>
                        <div className={styles.decksWrapper}>
                            <NewCardsDeck newCard={game.ui.newCard} />
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
                            resourceChange={game.resourceChange !== null ? game.resourceChange.playerRed : null}
                        />
                    </div>
                </div>
                <div className={styles.cardsWrapper}>
                    <CardsInHand
                        cards={playerOnTurn === 'black' ? game.playerBlack.cards : game.playerRed.cards}
                        playerResources={playerOnTurn === 'black' ? game.playerBlack : game.playerRed}
                        discardDeckRef={discardDeckRef}
                    />
                    <CardsInHand
                        cards={game.playerBlack.cards}
                        playerResources={game.playerBlack}
                        discardDeckRef={discardDeckRef}
                    />
                    <CardsInHand
                        cards={game.playerRed.cards}
                        playerResources={game.playerRed}
                        discardDeckRef={discardDeckRef}
                    />
                </div>
            </div>
        </div>
    );
};

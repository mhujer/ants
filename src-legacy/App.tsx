import React, { useEffect, useRef } from 'react';
import { PlayerDashboard } from './PlayerDashboard';
import { Castle } from './Castle';
import './App.css';
import { CardComponent } from './CardComponent';
import { Card } from './Card';
import { Player } from './Player';
import { Cards } from './Cards';
import { playSound, Sound } from './Sounds';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { discardCard, playCard, playSound as playSoundAction, selectGame } from './store/game/gameSlice';
import { cumulativeOffset } from '../src/utils';

const App: React.FC = () => {
    const gameState = useAppSelector(selectGame);
    const dispatch = useAppDispatch();

    const discardDeckWrapperRef = useRef<HTMLDivElement>(null);

    /*
    const playerOnTurn = useAppSelector((state) => state.game.playerOnTurn);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            // @todo canCardBePlayed asi přehodit do state
            const aiAction = dummyAi(gameState);
            console.dir('AI...');
            console.dir(aiAction);
            if (aiAction.type === 'play') {
                dispatch(playCard(aiAction.card));
            } else if (aiAction.type === 'discard') {
                dispatch(discardCard(aiAction.card));
            }
        }, 200);

        return () => {
            clearTimeout(timeoutId);
        }
    }, [playerOnTurn, gameState]);*/

    // play sound
    useEffect(() => {
        setTimeout(() => {
            if (gameState.playSound !== null) {
                playSound(gameState.playSound);
                dispatch(playSoundAction());
                // deal new card
                //setTimeout(() => {
                //    playSound(Sound.CARD_PLAYED);
                //}, 500);
            }
        }, 500);
    }, [gameState.playSound]);

    // play card sound
    useEffect(() => {
        if (gameState.lastPlayedCard !== undefined) {
            playSound(Sound.CARD_PLAYED);
        }
    }, [gameState.lastPlayedCard]);

    function playCardHandler(card: Card) {
        dispatch(playCard(card));
    }

    function discardCardHandler(card: Card) {
        dispatch(discardCard(card));
    }

    let playerWonContent = null;
    if (gameState.playerWon !== undefined) {
        if (gameState.playerWon === Player.BLACK_ANTS) {
            playerWonContent = <h1>Černí mravenci vyhráli!</h1>;
        }
        if (gameState.playerWon === Player.RED_ANTS) {
            playerWonContent = <h1>Červení mravenci vyhráli!</h1>;
        }
    }

    const playerOnTurnData = gameState.playerOnTurn === Player.BLACK_ANTS ? gameState.playerBlack : gameState.playerRed;

    //const allCards = cardDefinitions.map((cardDefinition) => new Card(cardDefinition));
    //const allCardsComponents = allCards.map((card) => <CardComponent card={card} key={card.id} />);

    let discardDeckWrapperX = 0;
    let discardDeckWrapperY = 0;
    if (discardDeckWrapperRef.current !== null) {
        //discardDeckWrapperX = discardDeckWrapperRef.current.offsetLeft;
        //discardDeckWrapperY = discardDeckWrapperRef.current.offsetTop;
        const offset = cumulativeOffset(discardDeckWrapperRef.current);
        discardDeckWrapperX = offset.left;
        discardDeckWrapperY = offset.top;
    }

    return (
        <>
            {playerWonContent}
            <div className="game">
                <PlayerDashboard
                    isOnTurn={gameState.playerOnTurn === Player.BLACK_ANTS}
                    builders={gameState.playerBlack.builders}
                    bricks={gameState.playerBlack.bricks}
                    soldiers={gameState.playerBlack.soldiers}
                    weapons={gameState.playerBlack.weapons}
                    mages={gameState.playerBlack.mages}
                    crystals={gameState.playerBlack.crystals}
                    castle={gameState.playerBlack.castle}
                    wall={gameState.playerBlack.wall}
                />
                <Castle castle={gameState.playerBlack.castle} wall={gameState.playerBlack.wall} />
                <div ref={discardDeckWrapperRef}>
                    {gameState.lastPlayedCard !== undefined ? (
                        <CardComponent
                            key={gameState.lastPlayedCard.id}
                            card={gameState.lastPlayedCard}
                            coords={{ x: 0, y: 0 }}
                        />
                    ) : null}
                    {/*<CardComponent key={gameState.playerBlack.cards[0]!.id} card={gameState.playerBlack.cards[0]} />*/}
                </div>
                <Castle castle={gameState.playerRed.castle} wall={gameState.playerRed.wall} />
                <PlayerDashboard
                    isOnTurn={gameState.playerOnTurn === Player.RED_ANTS}
                    builders={gameState.playerRed.builders}
                    bricks={gameState.playerRed.bricks}
                    soldiers={gameState.playerRed.soldiers}
                    weapons={gameState.playerRed.weapons}
                    mages={gameState.playerRed.mages}
                    crystals={gameState.playerRed.crystals}
                    castle={gameState.playerRed.castle}
                    wall={gameState.playerRed.wall}
                />
            </div>
            <Cards
                discardDeckCoordinates={{ x: discardDeckWrapperX, y: discardDeckWrapperY }}
                playerResources={{
                    bricks: playerOnTurnData.bricks,
                    weapons: playerOnTurnData.weapons,
                    crystals: playerOnTurnData.crystals,
                }}
                cardsInHand={playerOnTurnData.cards}
                playCardHandler={(card: Card) => playCardHandler(card)}
                discardCardHandler={(card: Card) => discardCardHandler(card)}
            />
            {/*<div style={{ display: 'flex', flexDirection: 'row' }}>{allCardsComponents}</div>*/}
        </>
    );
};

export default App;

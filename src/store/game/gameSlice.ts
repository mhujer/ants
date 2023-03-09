import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

import { Card, generateCard } from '../../Card';
import { Player } from '../../Player';
import { Sound } from '../../Sounds';

interface PlayerGameState {
    readonly builders: number;
    readonly bricks: number;
    readonly soldiers: number;
    readonly weapons: number;
    readonly mages: number;
    readonly crystals: number;
    readonly castle: number;
    readonly wall: number;
    readonly cards: Card[];
}

export interface GameState {
    readonly playerOnTurn: Player;
    readonly playerWon?: Player;
    lastPlayedCard?: Card;
    readonly playerBlack: PlayerGameState;
    readonly playerRed: PlayerGameState;
    playSound: Sound | null;
}

const initialState: GameState = getInitialState();

function getInitialState(): GameState {
    return {
        playerOnTurn: Player.BLACK_ANTS,
        playerBlack: {
            builders: 2,
            bricks: 5,
            soldiers: 2,
            weapons: 5,
            mages: 2,
            crystals: 5,
            castle: 30,
            wall: 10,
            cards: [
                generateCard(),
                generateCard(),
                generateCard(),
                generateCard(),
                generateCard(),
                generateCard(),
                generateCard(),
                generateCard(),
            ],
        },
        playerRed: {
            builders: 2,
            bricks: 5,
            soldiers: 2,
            weapons: 5,
            mages: 2,
            crystals: 5,
            castle: 30,
            wall: 10,
            cards: [
                generateCard(),
                generateCard(),
                generateCard(),
                generateCard(),
                generateCard(),
                generateCard(),
                generateCard(),
                generateCard(),
            ],
        },
        playSound: null,
    };
}

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        playCard: (state, action: PayloadAction<Card>) => {
            const minimalGameStateValues = {
                builders: 1,
                bricks: 0,
                soldiers: 1,
                weapons: 0,
                mages: 1,
                crystals: 0,
                castle: 0,
                wall: 0,
            };

            if (state.playerWon !== undefined) {
                console.error('Game is over!');
                return;
            }

            const card = action.payload;
            const cardDefinition = card.type;

            const playerState = state.playerOnTurn === Player.BLACK_ANTS ? state.playerBlack : state.playerRed;
            const opponentState = state.playerOnTurn === Player.BLACK_ANTS ? state.playerRed : state.playerBlack;

            if (cardDefinition.requiredResources.bricks !== undefined) {
                if (playerState.bricks < cardDefinition.requiredResources.bricks) {
                    throw new Error('Should not happen!');
                }
                playerState.bricks -= cardDefinition.requiredResources.bricks;
            } else if (cardDefinition.requiredResources.weapons !== undefined) {
                if (playerState.weapons < cardDefinition.requiredResources.weapons) {
                    throw new Error('Should not happen!');
                }
                playerState.weapons -= cardDefinition.requiredResources.weapons;
            } else if (cardDefinition.requiredResources.crystals !== undefined) {
                if (playerState.crystals < cardDefinition.requiredResources.crystals) {
                    throw new Error('Should not happen!');
                }
                playerState.crystals -= cardDefinition.requiredResources.crystals;
            }

            if (cardDefinition.impact.player !== undefined) {
                if (cardDefinition.impact.player.castle !== undefined) {
                    playerState.castle += cardDefinition.impact.player.castle;
                    if (playerState.castle < minimalGameStateValues.castle) {
                        playerState.castle = minimalGameStateValues.castle;
                    }
                }
                if (cardDefinition.impact.player.wall !== undefined) {
                    playerState.wall += cardDefinition.impact.player.wall;
                    if (playerState.wall < minimalGameStateValues.wall) {
                        playerState.wall = minimalGameStateValues.wall;
                    }
                }
                if (cardDefinition.impact.player.builders !== undefined) {
                    playerState.builders += cardDefinition.impact.player.builders;
                    if (playerState.builders < minimalGameStateValues.builders) {
                        playerState.builders = minimalGameStateValues.builders;
                    }
                }
                if (cardDefinition.impact.player.bricks !== undefined) {
                    playerState.bricks += cardDefinition.impact.player.bricks;
                    if (playerState.bricks < minimalGameStateValues.bricks) {
                        playerState.bricks = minimalGameStateValues.bricks;
                    }
                }
                if (cardDefinition.impact.player.soldiers !== undefined) {
                    playerState.soldiers += cardDefinition.impact.player.soldiers;
                    if (playerState.soldiers < minimalGameStateValues.soldiers) {
                        playerState.soldiers = minimalGameStateValues.soldiers;
                    }
                }
                if (cardDefinition.impact.player.weapons !== undefined) {
                    playerState.weapons += cardDefinition.impact.player.weapons;
                    if (playerState.weapons < minimalGameStateValues.weapons) {
                        playerState.weapons = minimalGameStateValues.weapons;
                    }
                }
                if (cardDefinition.impact.player.mages !== undefined) {
                    playerState.mages += cardDefinition.impact.player.mages;
                    if (playerState.mages < minimalGameStateValues.mages) {
                        playerState.mages = minimalGameStateValues.mages;
                    }
                }
                if (cardDefinition.impact.player.crystals !== undefined) {
                    playerState.crystals += cardDefinition.impact.player.crystals;
                    if (playerState.crystals < minimalGameStateValues.crystals) {
                        playerState.crystals = minimalGameStateValues.crystals;
                    }
                }
            }

            let wasCastleAttacked = false;

            if (cardDefinition.impact.opponent !== undefined) {
                if (cardDefinition.impact.opponent.attack !== undefined) {
                    const attack = cardDefinition.impact.opponent.attack;
                    const attackEffectOnWall = opponentState.wall >= attack ? attack : opponentState.wall;
                    let attackEffectOnCastle = 0;
                    if (attackEffectOnWall < attack) {
                        attackEffectOnCastle = attack - attackEffectOnWall;
                        wasCastleAttacked = true;
                    }
                    opponentState.wall -= attackEffectOnWall;
                    opponentState.castle -= attackEffectOnCastle;
                }
                if (cardDefinition.impact.opponent.castle !== undefined) {
                    opponentState.castle += cardDefinition.impact.opponent.castle;
                    if (opponentState.castle < minimalGameStateValues.castle) {
                        opponentState.castle = minimalGameStateValues.castle;
                    }
                }
                if (cardDefinition.impact.opponent.wall !== undefined) {
                    opponentState.wall += cardDefinition.impact.opponent.wall;
                    if (opponentState.wall < minimalGameStateValues.wall) {
                        opponentState.wall = minimalGameStateValues.wall;
                    }
                }
                if (cardDefinition.impact.opponent.builders !== undefined) {
                    opponentState.builders += cardDefinition.impact.opponent.builders;
                    if (opponentState.builders < minimalGameStateValues.builders) {
                        opponentState.builders = minimalGameStateValues.builders;
                    }
                }
                if (cardDefinition.impact.opponent.bricks !== undefined) {
                    opponentState.bricks += cardDefinition.impact.opponent.bricks;
                    if (opponentState.bricks < minimalGameStateValues.bricks) {
                        opponentState.bricks = minimalGameStateValues.bricks;
                    }
                }
                if (cardDefinition.impact.opponent.soldiers !== undefined) {
                    opponentState.soldiers += cardDefinition.impact.opponent.soldiers;
                    if (opponentState.soldiers < minimalGameStateValues.soldiers) {
                        opponentState.soldiers = minimalGameStateValues.soldiers;
                    }
                }
                if (cardDefinition.impact.opponent.weapons !== undefined) {
                    opponentState.weapons += cardDefinition.impact.opponent.weapons;
                    if (opponentState.weapons < minimalGameStateValues.weapons) {
                        opponentState.weapons = minimalGameStateValues.weapons;
                    }
                }
                if (cardDefinition.impact.opponent.mages !== undefined) {
                    opponentState.mages += cardDefinition.impact.opponent.mages;
                    if (opponentState.mages < minimalGameStateValues.mages) {
                        opponentState.mages = minimalGameStateValues.mages;
                    }
                }
                if (cardDefinition.impact.opponent.crystals !== undefined) {
                    opponentState.crystals += cardDefinition.impact.opponent.crystals;
                    if (opponentState.crystals < minimalGameStateValues.crystals) {
                        opponentState.crystals = minimalGameStateValues.crystals;
                    }
                }
            }

            // if the attack overflows from wall to castle, play sound of castle being destroyed
            if (cardDefinition.sound === Sound.DESTROY_WALL && wasCastleAttacked) {
                state.playSound = Sound.DESTROY_CASTLE;
            } else {
                state.playSound = cardDefinition.sound;
            }

            // draw a new card
            state.lastPlayedCard = card;
            const playedCardIndex = playerState.cards.indexOf(card);
            playerState.cards[playedCardIndex] = generateCard();

            if (playerState.castle >= 100) {
                state.playerWon = state.playerOnTurn;
                state.playSound = Sound.FANFARE;
            }
            if (opponentState.castle <= 0) {
                state.playerWon = state.playerOnTurn;
                state.playSound = Sound.FANFARE;
            }

            // next turn
            const nextPlayerState = state.playerOnTurn === Player.BLACK_ANTS ? state.playerRed : state.playerBlack;
            nextPlayerState.bricks += nextPlayerState.builders;
            nextPlayerState.weapons += nextPlayerState.soldiers;
            nextPlayerState.crystals += nextPlayerState.mages;

            state.playerOnTurn = state.playerOnTurn === Player.BLACK_ANTS ? Player.RED_ANTS : Player.BLACK_ANTS;
        },
        discardCard: (state, action: PayloadAction<Card>) => {
            if (state.playerWon !== undefined) {
                console.error('Game is over!');
                return;
            }

            const card = action.payload;

            const playerState = state.playerOnTurn === Player.BLACK_ANTS ? state.playerBlack : state.playerRed;

            card.discarded = true;

            // @todo this case is monstly duplicated
            // draw a new card
            state.lastPlayedCard = card;
            const playedCardIndex = playerState.cards.indexOf(card);
            playerState.cards[playedCardIndex] = generateCard();

            // next turn
            const nextPlayerState = state.playerOnTurn === Player.BLACK_ANTS ? state.playerRed : state.playerBlack;
            nextPlayerState.bricks += nextPlayerState.builders;
            nextPlayerState.weapons += nextPlayerState.soldiers;
            nextPlayerState.crystals += nextPlayerState.mages;

            state.playerOnTurn = state.playerOnTurn === Player.BLACK_ANTS ? Player.RED_ANTS : Player.BLACK_ANTS;
        },

        playSound: (state) => {
            state.playSound = null;
        },
    },
});

export const { playCard, discardCard, playSound } = gameSlice.actions;

export const selectGame = (state: RootState): GameState => state.game;

export default gameSlice.reducer;

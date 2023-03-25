import { createSlice } from '@reduxjs/toolkit';
import { Player } from '../game/Player/Player';
import { RootState } from './store';

/*
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
}*/

export interface GameState {
    readonly playerOnTurn: Player;
    readonly playerWon?: Player;
    // lastPlayedCard?: Card;
    // readonly playerBlack: PlayerGameState;
    // readonly playerRed: PlayerGameState;
    // playSound: Sound | null;
}

function getInitialState(): GameState {
    return {
        playerOnTurn: 'black',
        /* playerBlack: {
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
         playSound: null,*/
    };
}

export const gameSlice = createSlice({
    name: 'game',
    initialState: getInitialState(),
    reducers: {},
});

export const selectGame = (state: RootState): GameState => state.game;

export default gameSlice.reducer;

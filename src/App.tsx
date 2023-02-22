import React, { useReducer } from 'react';
import { PlayerDashboard } from './PlayerDashboard';
import { Castle } from './Castle';
import './App.css';

enum Player {
    BLACK_ANTS,
    RED_ANTS,
}

enum ResourceType {
    BRICKS,
}

// základy = foundations
// hrad + 2, 1 cihla

interface CardDefinition {
    id: string;
    name: string;
    actionDescription: string,
    resourceRequired: ResourceType;
    resourceRequiredAmount: 1;
}

const cardDefinitions: CardDefinition[] = [
    {
        id: 'foundations',
        name: 'Základy',
        actionDescription: 'Hrad + 2',
        resourceRequired: ResourceType.BRICKS,
        resourceRequiredAmount: 1,
    },
];
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const cardFoundations = cardDefinitions[0]!;

interface PlayerGameState {
    castle: number,
    bricks: number,
}

interface GameState {
    playerOnTurn: Player;
    playerBlack: PlayerGameState,
    playerRed: PlayerGameState,
}

interface PlayCardAction {
    type: 'playCard';
    card: CardDefinition;
}

type GameAction = PlayCardAction;

const gameStateReducer = (gameState: GameState, action: GameAction): GameState => {
    console.dir(gameState);
    console.dir(action);

    switch (action.type) {
        case 'playCard': {
            const card = action.card;

            if (card.id === 'foundations') {

                if (gameState.playerOnTurn === Player.BLACK_ANTS) {
                    const newState = {
                        ...gameState,
                        playerBlack: {
                            ...gameState.playerBlack,
                            castle: gameState.playerBlack.castle + 1,
                            // @todo použít resource type
                            bricks: gameState.playerBlack.bricks - card.resourceRequiredAmount,
                        },
                        playerOnTurn: Player.RED_ANTS,
                    };

                    const extraNewState = {
                        ...newState,
                        playerRed: {
                            ...newState.playerRed,
                            bricks: newState.playerRed.bricks + 3,
                        },
                    };

                    return extraNewState;
                }

                // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                if (gameState.playerOnTurn === Player.RED_ANTS) {
                    const newState = {
                        ...gameState,
                        playerRed: {
                            ...gameState.playerRed,
                            castle: gameState.playerRed.castle + 1,
                            // @todo použít resource type
                            bricks: gameState.playerRed.bricks - card.resourceRequiredAmount,
                        },
                        playerOnTurn: Player.BLACK_ANTS,
                    };

                    const extraNewState = {
                        ...newState,
                        playerBlack: {
                            ...newState.playerBlack,
                            bricks: newState.playerBlack.bricks + 3,
                        },
                    };

                    return extraNewState;
                }
            }

            throw new Error(`Unhandled "${card.id}"!`);
        }
        default: {
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            throw new Error(`Uhandled "${(action.type)}"!`);
        }

    }
};

const App: React.FC = () => {
    const [gameState, dispatch] = useReducer(gameStateReducer, {
        playerOnTurn: Player.BLACK_ANTS,
        playerBlack: {
            castle: 30,
            bricks: 8,
        },
        playerRed: {
            castle: 30,
            bricks: 8,
        }
    });

    function playCard(card: CardDefinition) {
        dispatch({
            type: 'playCard',
            card: card,
        });
    }

    return (
        <div className='game'>
            <button disabled={gameState.playerOnTurn !== Player.BLACK_ANTS} onClick={() => playCard(cardFoundations)}>
                Black build
            </button>
            <PlayerDashboard
                builders={3}
                bricks={gameState.playerBlack.bricks}
                soldiers={2}
                weapons={6}
                mages={2}
                crystals={7}
                castle={gameState.playerBlack.castle}
                wall={20}
            />
            <Castle castle={gameState.playerBlack.castle} wall={20} />
            <Castle castle={gameState.playerRed.castle} wall={8} />
            <PlayerDashboard
                builders={3}
                bricks={gameState.playerRed.bricks}
                soldiers={3}
                weapons={7}
                mages={3}
                crystals={8}
                castle={gameState.playerRed.castle}
                wall={8}
            />
            <button disabled={gameState.playerOnTurn !== Player.RED_ANTS} onClick={() => playCard(cardFoundations)}>
                Red build
            </button>
        </div>
    );
};

export default App;

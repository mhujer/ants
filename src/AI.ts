import { GameState } from './store/game/gameSlice';
import { Card } from './Card';
import { canBeCardPlayed } from './CardComponentPlayable';
import { Player } from './Player';

interface AiAction {
    type: 'play' | 'discard';
    card: Card;
}

export const dummyAi = (gameState: GameState): AiAction => {
    // @todo nějaký check na to, za kterého hráče vybírá;

    const playerState = gameState.playerOnTurn === Player.BLACK_ANTS ? gameState.playerBlack : gameState.playerRed;

    const cards = playerState.cards;

    const playableCards = cards.filter((card) => canBeCardPlayed(playerState, card));
    if (playableCards.length > 0) {
        const firstCard = playableCards[0];
        if (firstCard === undefined) {
            throw new Error('!');
        }
        return {
            type: 'play',
            card: firstCard,
        };
    }

    const firstCard = cards[0];
    if (firstCard === undefined) {
        throw new Error('!');
    }
    return {
        type: 'discard',
        card: firstCard,
    };
};

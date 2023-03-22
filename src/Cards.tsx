import React from 'react';
import { Card } from './Card';
import { CardComponentPlayable, PlayerResources } from './CardComponentPlayable';

interface Props {
    discardDeckCoordinates: { x: number; y: number };
    playerResources: PlayerResources;
    cardsInHand: Card[];
    playCardHandler: (card: Card) => void;
    discardCardHandler: (card: Card) => void;
}

export const Cards: React.FC<Props> = ({
    discardDeckCoordinates,
    playerResources,
    cardsInHand,
    playCardHandler,
    discardCardHandler,
}) => {
    const cards = cardsInHand.map((card) => {
        return (
            <CardComponentPlayable
                key={card.id}
                card={card}
                discardDeckCoordinates={discardDeckCoordinates}
                playerResources={playerResources}
                playCardHandler={() => playCardHandler(card)}
                discardCardHandler={() => discardCardHandler(card)}
            />
        );
    });

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
            }}
        >
            {cards}
        </div>
    );
};

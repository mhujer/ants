import React from 'react';
import { Card } from './Card';
import { CardComponentPlayable, PlayerResources } from './CardComponentPlayable';

interface Props {
    playerResources: PlayerResources;
    cardsInHand: Card[];
    playCardHandler: (card: Card) => void;
}

export const Cards: React.FC<Props> = ({ playerResources, cardsInHand, playCardHandler }) => {
    const cards = cardsInHand.map((card) => {
        return (
            <CardComponentPlayable
                key={card.getId()}
                card={card}
                playerResources={playerResources}
                playCardHandler={() => playCardHandler(card)}
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
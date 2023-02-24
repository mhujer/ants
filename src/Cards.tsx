import React from 'react';
import { Card } from './Card';
import { CardComponent } from './CardComponent';

interface Props {
    cardsInHand: Card[];
    playCardHandler: (card: Card) => void;
}

export const Cards: React.FC<Props> = ({ cardsInHand, playCardHandler }) => {
    const cards = cardsInHand.map((card) => {
        return <CardComponent key={card.getId()} card={card} playCardHandler={() => playCardHandler(card)} />;
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

import React, { RefObject } from 'react';
import { Card } from './Card/Card';
import styles from './CardsInHand.module.scss';
import { CardInHand, PlayerResources } from './CardInHand';

export const CardsInHand: React.FC<{
    cards: Card[];
    playerResources: PlayerResources;
    discardDeckRef: RefObject<HTMLDivElement>;
}> = ({ cards, playerResources, discardDeckRef }) => {
    return (
        <div className={styles.cardsWrapper}>
            {cards.map((card) => (
                <CardInHand
                    key={card.id}
                    card={card}
                    playerResources={playerResources}
                    discardDeckRef={discardDeckRef}
                />
            ))}
        </div>
    );
};

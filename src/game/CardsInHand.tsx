import React, { RefObject } from 'react';
import { Card } from './Card/Card';
import styles from './CardsInHand.module.scss';
import { CardInHand } from './CardInHand';

export const CardsInHand: React.FC<{ cards: Card[]; discardDeckRef: RefObject<HTMLDivElement> }> = ({
    cards,
    discardDeckRef,
}) => {
    return (
        <div className={styles.cardsWrapper}>
            {cards.map((card) => (
                <CardInHand key={card.id} card={card} discardDeckRef={discardDeckRef} />
            ))}
        </div>
    );
};

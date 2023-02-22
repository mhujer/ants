import { forwardRef } from 'react';
import styles from './DiscardDeck.module.scss';
import { Card } from './Card';
import { CardComponent } from './CardComponent';
import { CardDiscarded } from './CardDiscarded';

export const DiscardDeck = forwardRef<HTMLDivElement, { card: Card | null }>(function DiscardDeck({ card }, ref) {
    const deckWithCardStyles = card !== null ? styles.deckWithCard : '';

    return (
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        <div className={`${styles.deck} ${deckWithCardStyles}`} ref={ref}>
            {card !== null && !card.discarded && <CardComponent cardId={card.type} />}
            {/* eslint-disable-next-line @typescript-eslint/prefer-optional-chain */}
            {card !== null && card.discarded && <CardDiscarded cardId={card.type} />}
        </div>
    );
});

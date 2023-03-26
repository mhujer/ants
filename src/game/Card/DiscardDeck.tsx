import { forwardRef } from 'react';
import styles from './DiscardDeck.module.scss';
import { Card } from './Card';
import { CardComponent } from './CardComponent';
import { CardDiscarded } from './CardDiscarded';

export const DiscardDeck = forwardRef<HTMLDivElement, { card: Card | undefined }>(function DiscardDeck({ card }, ref) {
    const deckWithCardStyles = card !== undefined ? styles.deckWithCard : '';

    return (
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        <div className={`${styles.deck} ${deckWithCardStyles}`} ref={ref}>
            {card && !card.discarded && <CardComponent cardId={card.type} />}
            {card && card.discarded && <CardDiscarded cardId={card.type} />}
        </div>
    );
});

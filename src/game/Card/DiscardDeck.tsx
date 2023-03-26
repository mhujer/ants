import { forwardRef } from 'react';
import styles from './DiscardDeck.module.scss';
import { Card } from './Card';
import { CardComponent } from './CardComponent';

export const DiscardDeck = forwardRef<HTMLDivElement, { card: Card | undefined }>(function DiscardDeck({ card }, ref) {
    const deckWithCardStyles = card !== undefined ? styles.deckWithCard : '';

    return (
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        <div className={`${styles.deck} ${deckWithCardStyles}`} ref={ref}>
            {card && <CardComponent cardId={card.type} />}
        </div>
    );
});

import { forwardRef } from 'react';
import styles from './DiscardDeck.module.scss';
import { Card } from './Card';
import { CardComponent } from './CardComponent';

export const DiscardDeck = forwardRef<HTMLDivElement, { card?: Card }>(function DiscardDeck({ card }, ref) {
    return (
        <div className={styles.deck} ref={ref}>
            {card && <CardComponent cardId={card.type} />}
        </div>
    );
});

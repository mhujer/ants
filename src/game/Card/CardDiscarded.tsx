import React from 'react';
import styles from './CardDiscarded.module.scss';
import { CardId } from './CardDefinitions';
import { CardComponent } from './CardComponent';

export const CardDiscarded: React.FC<{ cardId: CardId }> = ({ cardId }) => {
    return (
        <div>
            <div className={styles.label}>Odloženo</div>
            <div className={styles.cardDiscarded}>
                <CardComponent cardId={cardId} />
            </div>
        </div>
    );
};

import React from 'react';
import styles from './CardComponent.module.scss';
import { cardDefinitions, CardId } from './CardDefinitions';
import { Resource } from '../Resource/Resource';
import { ResourceIcon } from '../Resource/ResourceIcon';

export const CardComponent: React.FC<{ cardId: CardId }> = ({ cardId }) => {
    const cardDefinition = cardDefinitions[cardId];

    let cardRequirementsAmount: number | null = null;
    let cardRequirementsType: Resource | null = null;
    let cardTypeClassName = null;
    if (cardDefinition.requiredResources.bricks !== undefined) {
        cardRequirementsAmount = cardDefinition.requiredResources.bricks;
        cardRequirementsType = 'bricks';
        cardTypeClassName = styles.cardBuilding;
    } else if (cardDefinition.requiredResources.weapons !== undefined) {
        cardRequirementsAmount = cardDefinition.requiredResources.weapons;
        cardRequirementsType = 'weapons';
        cardTypeClassName = styles.cardArmy;
    } else if (cardDefinition.requiredResources.crystals !== undefined) {
        cardRequirementsAmount = cardDefinition.requiredResources.crystals;
        cardRequirementsType = 'crystals';
        cardTypeClassName = styles.cardMagic;
    }
    if (cardRequirementsType === null || cardRequirementsAmount === null) {
        throw new Error('Should not happen');
    }

    return (
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        <div className={`${styles.card} ${cardTypeClassName}`}>
            <div className={styles.resourceIcon}>
                <ResourceIcon resourceType={cardRequirementsType} />
            </div>
            <div className={styles.resourceAmount}>{cardRequirementsAmount}</div>
            <div className={styles.cardNameWrapper}>
                <h1 className={styles.cardName}>{cardDefinition.name}</h1>
            </div>
            <div
                className={styles.cardImage}
                style={{
                    backgroundImage: `url("${cardDefinition.imageUrl}")`,
                }}
            ></div>
            <div className={styles.description}>{cardDefinition.description}</div>
        </div>
    );
};

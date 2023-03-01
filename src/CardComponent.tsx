import React from 'react';
import { ResourceIcon } from './ResourceIcon';
import { Card } from './Card';
import { ResourceType } from './ResourceType';
import styles from './CardComponent.module.scss';

interface Props {
    card: Card;
}

export const CardComponent: React.FC<Props> = ({ card }) => {
    const cardDefinition = card.getType();

    let cardRequirementsAmount;
    let cardRequirementsType;
    let cardTypeClassName = null;
    if (cardDefinition.requiredResources.bricks !== undefined) {
        cardRequirementsAmount = cardDefinition.requiredResources.bricks;
        cardRequirementsType = ResourceType.BRICKS;
        cardTypeClassName = styles.cardBuilding;
    } else if (cardDefinition.requiredResources.weapons !== undefined) {
        cardRequirementsAmount = cardDefinition.requiredResources.weapons;
        cardRequirementsType = ResourceType.WEAPONS;
        cardTypeClassName = styles.cardArmy;
    } else if (cardDefinition.requiredResources.crystals !== undefined) {
        cardRequirementsAmount = cardDefinition.requiredResources.crystals;
        cardRequirementsType = ResourceType.CRYSTALS;
        cardTypeClassName = styles.cardMagic;
    }
    if (cardRequirementsType === undefined) {
        throw new Error('Should not happen');
    }

    return (
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        <div className={`${styles.cardXyz} ${cardTypeClassName}`}>
            {card.wasDiscarded() && <h4>ODHOZENO</h4>}
            <ResourceIcon resourceType={cardRequirementsType} />
            <div>{cardRequirementsAmount}</div>
            <h4>{cardDefinition.name}</h4>
            <div
                style={{
                    backgroundPositionY: -40,
                    backgroundImage: `url("${cardDefinition.imageUrl}")`,
                    minHeight: 40,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    overflow: 'hidden',
                }}
            ></div>
            {/*<div><img src={cardDefinition.imageUrl}/></div>*/}
            <small>{cardDefinition.description}</small>
            {/*<pre>
                {JSON.stringify(cardDefinition, null, 4)}
            </pre>*/}
        </div>
    );
};

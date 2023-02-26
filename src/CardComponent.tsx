import React from 'react';
import { ResourceIcon } from './ResourceIcon';
import { Card } from './Card';
import { ResourceType } from './ResourceType';
import css from './CardComponent.module.scss';

interface Props {
    card: Card;
}

export const CardComponent: React.FC<Props> = ({ card }) => {
    const cardDefinition = card.getType();

    let cardRequirementsAmount;
    let cardRequirementsType;
    if (cardDefinition.requiredResources.bricks !== undefined) {
        cardRequirementsAmount = cardDefinition.requiredResources.bricks;
        cardRequirementsType = ResourceType.BRICKS;
    } else if (cardDefinition.requiredResources.weapons !== undefined) {
        cardRequirementsAmount = cardDefinition.requiredResources.weapons;
        cardRequirementsType = ResourceType.WEAPONS;
    } else if (cardDefinition.requiredResources.crystals !== undefined) {
        cardRequirementsAmount = cardDefinition.requiredResources.crystals;
        cardRequirementsType = ResourceType.CRYSTALS;
    }
    if (cardRequirementsType === undefined) {
        throw new Error('Should not happen');
    }

    return (
        <div className={css.cardXyz}>
            {card.wasDiscarded() && <h4>ODHOZENO</h4>}
            <ResourceIcon resourceType={cardRequirementsType} />
            <div>{cardRequirementsAmount}</div>
            <h1>{cardDefinition.name}</h1>
            <p>{cardDefinition.description}</p>
            {/*<pre>
                {JSON.stringify(cardDefinition, null, 4)}
            </pre>*/}
        </div>
    );
};

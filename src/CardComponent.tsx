import React from 'react';
import { Card, ResourceType } from './App';
import { ResourceIcon } from './ResourceIcon';

interface Props {
    card: Card;
    playCardHandler: () => void;
}

export const CardComponent: React.FC<Props> = ({ card, playCardHandler }) => {
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
        <div
            onClick={playCardHandler}
            style={{
                width: '7em',
                height: '12em',
                border: '1px dotted silver',
                borderRadius: 15,
                padding: 10,
                margin: 10,
            }}
        >
            <ResourceIcon resourceType={cardRequirementsType} />
            <div>{cardRequirementsAmount}</div>
            <h1>{cardDefinition.name}</h1>
            <p>{cardDefinition.description}</p>
        </div>
    );
};

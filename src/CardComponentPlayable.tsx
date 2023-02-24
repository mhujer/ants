import React from 'react';
import { Card } from './Card';
import { CardComponent } from './CardComponent';

export interface PlayerResources {
    bricks: number;
    weapons: number;
    crystals: number;
}

interface Props {
    playerResources: PlayerResources;
    card: Card;
    playCardHandler: (() => void) | undefined;
}

export const CardComponentPlayable: React.FC<Props> = ({ playerResources, card, playCardHandler }) => {
    const isCardPlayable = canBeCardPlayed(playerResources, card);

    if (isCardPlayable) {
        return (
            <div onClick={playCardHandler}>
                <CardComponent card={card} />
            </div>
        );
    }

    return (
        <div className="not-playable">
            <CardComponent card={card} />
        </div>
    );
};

function canBeCardPlayed(playerResources: PlayerResources, card: Card): boolean {
    const requiredResources = card.getType().requiredResources;
    if (requiredResources.bricks !== undefined) {
        return playerResources.bricks >= requiredResources.bricks;
    }
    if (requiredResources.weapons !== undefined) {
        return playerResources.weapons >= requiredResources.weapons;
    }
    if (requiredResources.crystals !== undefined) {
        return playerResources.crystals >= requiredResources.crystals;
    }

    throw new Error('Should not happen!' + JSON.stringify([playerResources, card]));
}

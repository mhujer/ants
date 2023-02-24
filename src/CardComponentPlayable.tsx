import React, { MouseEvent } from 'react';
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
    playCardHandler: () => void;
    discardCardHandler: () => void;
}

export const CardComponentPlayable: React.FC<Props> = ({
    playerResources,
    card,
    playCardHandler,
    discardCardHandler,
}) => {
    const isCardPlayable = canBeCardPlayed(playerResources, card);

    function clickHandler(e: MouseEvent) {
        e.preventDefault();
        if (e.type === 'click') {
            playCardHandler();
            return;
        }
        if (e.type === 'contextmenu') {
            discardCardHandler();
            return;
        }
        console.dir(e);
    }

    if (isCardPlayable) {
        return (
            <div onClick={clickHandler} onContextMenu={clickHandler}>
                <CardComponent card={card} />
            </div>
        );
    }

    return (
        <div className="not-playable" onContextMenu={clickHandler}>
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

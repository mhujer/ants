import React, { MouseEvent, useRef, useState } from 'react';
import { Card } from './Card';
import { CardComponent } from './CardComponent';
import { cumulativeOffset } from './utils';

export interface PlayerResources {
    bricks: number;
    weapons: number;
    crystals: number;
}

interface Props {
    discardDeckCoordinates: { x: number; y: number };
    playerResources: PlayerResources;
    card: Card;
    playCardHandler: () => void;
    discardCardHandler: () => void;
}

export const CardComponentPlayable: React.FC<Props> = ({
    discardDeckCoordinates,
    playerResources,
    card,
    playCardHandler,
    discardCardHandler,
}) => {
    const isCardPlayable = canBeCardPlayed(playerResources, card);

    const cardWrapperDivRef = useRef<HTMLDivElement>(null);

    function clickHandler(e: MouseEvent) {
        e.preventDefault();
        if (e.type === 'click') {
            startCardAnimation(card);
            return;
        }
        if (e.type === 'contextmenu') {
            discardCardHandler();
            return;
        }
        console.dir(e);
    }

    const [cardXY, setCardXY] = useState({ x: 0, y: 0 });

    function startCardAnimation(event: MouseEvent) {
        /*// @ts-expect-error eslint-disable-line @typescript-eslint/ban-ts-comment
        const cardOffsetTop = event.target.offsetTop as number;
        // @ts-expect-error eslint-disable-line @typescript-eslint/ban-ts-comment
        const cardOffsetLeft = event.target.offsetLeft as number;


        console.log(`Discard deck X: ${discardDeckCoordinates.x}, Y: ${discardDeckCoordinates.y} `)
        console.log(`Card  left (X): ${cardOffsetLeft}  top (Y): ${cardOffsetTop}`)
        console.log({x: (discardDeckCoordinates.x - cardOffsetLeft), y: (discardDeckCoordinates.y - cardOffsetTop)});

        setCardXY({x: (discardDeckCoordinates.x - cardOffsetLeft), y: (discardDeckCoordinates.y - cardOffsetTop)});*/
        const div = cardWrapperDivRef.current;
        if (div === null) {
            throw new Error('!');
        }
        const offset = cumulativeOffset(div);

        console.log(`Discard deck X: ${discardDeckCoordinates.x}, Y: ${discardDeckCoordinates.y} `);
        console.log(`Card  left (X): ${offset.left}  top (Y): ${offset.top}}`);
        console.log({ x: discardDeckCoordinates.x - offset.left, y: discardDeckCoordinates.y - offset.top });

        setCardXY({ x: discardDeckCoordinates.x - offset.left, y: discardDeckCoordinates.y - offset.top });
    }

    if (isCardPlayable) {
        return (
            <div
                onClick={clickHandler}
                onContextMenu={clickHandler}
                onTransitionEnd={() => {
                    playCardHandler();
                }}
                ref={cardWrapperDivRef}
            >
                <CardComponent card={card} coords={cardXY} />
            </div>
        );
    }

    return (
        <div
            className="not-playable"
            onContextMenu={clickHandler}
            onTransitionEnd={() => {
                playCardHandler();
            }}
            ref={cardWrapperDivRef}
        >
            <CardComponent card={card} coords={cardXY} />
        </div>
    );
};

export function canBeCardPlayed(playerResources: PlayerResources, card: Card): boolean {
    const requiredResources = card.type.requiredResources;
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

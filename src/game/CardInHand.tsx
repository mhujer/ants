import React, { MouseEvent, RefObject, TransitionEventHandler, useRef, useState } from 'react';
import { CardComponent } from './Card/CardComponent';
import { Card } from './Card/Card';
import { cumulativeOffset } from '../utils';
import styles from './CardInHand.module.scss';
import { useAppDispatch } from '../store/hooks';
import { cardAnimationStarted, cardDiscarded, cardPlayed } from '../store/gameSlice';
import { cardDefinitions } from './Card/CardDefinitions';
import { CardDiscarded } from './Card/CardDiscarded';

export interface PlayerResources {
    bricks: number;
    weapons: number;
    crystals: number;
}

export const CardInHand: React.FC<{
    card: Card;
    playerResources: PlayerResources;
    discardDeckRef: RefObject<HTMLDivElement | null>;
}> = ({ card, playerResources, discardDeckRef }) => {
    const cardWrapperDivRef = useRef<HTMLDivElement>(null);
    const [cardXY, setCardXY] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [cardAction, setCardAction] = useState<'play' | 'discard' | null>(null);

    const dispatch = useAppDispatch();

    function handleCardClick() {
        if (discardDeckRef.current === null) {
            throw new Error('!');
        }
        if (cardWrapperDivRef.current === null) {
            throw new Error('!');
        }

        // @todo ošetřit, aby šlo kliknout jen na jednu kartu - teď jdou odehrát 3 najednou

        const discardDeckWrapperOffset = cumulativeOffset(discardDeckRef.current);
        const discardDeckX = discardDeckWrapperOffset.left;
        const discardDeckY = discardDeckWrapperOffset.top;

        const cardOffset = cumulativeOffset(cardWrapperDivRef.current);
        const cardX = cardOffset.left;
        const cardY = cardOffset.top;

        //console.log(`Discard deck X: ${discardDeckX}, Y: ${discardDeckY} `);
        //console.log(`Card  X: ${cardX} Y: ${cardY}`);
        //console.log({ x: discardDeckX - cardX, y: discardDeckY - cardY });

        setCardXY({ x: discardDeckX - cardX, y: discardDeckY - cardY });

        dispatch(cardAnimationStarted({ x: cardX, y: cardY }));
    }

    const playCardHandler: TransitionEventHandler<HTMLDivElement> = (e) => {
        if (e.nativeEvent.propertyName === 'left') {
            // both 'top' and 'left' are animated and card should be played only once
            return;
        }

        if (cardAction === null) {
            throw new Error('!');
        }

        if (cardAction === 'play') {
            dispatch(cardPlayed(card));
        } else {
            dispatch(cardDiscarded(card));
        }
    };

    function clickHandler(e: MouseEvent) {
        e.preventDefault();
        if (e.type === 'click') {
            setCardAction('play');
            handleCardClick();
            return;
        }
        if (e.type === 'contextmenu') {
            setCardAction('discard');
            handleCardClick();
            return;
        }
        console.dir(e);
    }

    // cardAction !== null handles situation when Card is transitioned to discard deck
    const canCardBePlayed = canBeCardPlayed(playerResources, card) || cardAction !== null;

    if (canCardBePlayed) {
        return (
            <div
                key={card.id}
                className={styles.card}
                ref={cardWrapperDivRef}
                onClick={clickHandler}
                onContextMenu={clickHandler}
                onTransitionEnd={playCardHandler}
                style={{
                    left: cardXY.x,
                    top: cardXY.y,
                }}
            >
                {cardAction !== 'discard' && <CardComponent key={card.id} cardId={card.type} />}
                {cardAction === 'discard' && <CardDiscarded key={card.id} cardId={card.type} />}
            </div>
        );
    }

    return (
        <div
            key={card.id}
            className={`${styles.card} ${styles.cardNotPlayable}`} // eslint-disable-line @typescript-eslint/restrict-template-expressions
            ref={cardWrapperDivRef}
            onContextMenu={clickHandler}
            onTransitionEnd={playCardHandler}
            style={{
                left: cardXY.x,
                top: cardXY.y,
            }}
        >
            {cardAction !== 'discard' && <CardComponent key={card.id} cardId={card.type} />}
            {cardAction === 'discard' && <CardDiscarded key={card.id} cardId={card.type} />}
        </div>
    );
};

function canBeCardPlayed(playerResources: PlayerResources, card: Card): boolean {
    const requiredResources = cardDefinitions[card.type].requiredResources;
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

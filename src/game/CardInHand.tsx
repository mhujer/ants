import React, { RefObject, TransitionEventHandler, useRef, useState } from 'react';
import { CardComponent } from './Card/CardComponent';
import { Card } from './Card/Card';
import { cumulativeOffset } from '../utils';
import styles from './CardInHand.module.scss';
import { useAppDispatch } from '../store/hooks';
import { cardAnimationStarted, cardPlayed } from '../store/gameSlice';

export const CardInHand: React.FC<{ card: Card; discardDeckRef: RefObject<HTMLDivElement | null> }> = ({
    card,
    discardDeckRef,
}) => {
    const cardWrapperDivRef = useRef<HTMLDivElement>(null);
    const [cardXY, setCardXY] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

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

        dispatch(cardAnimationStarted());
    }

    const playCardHandler: TransitionEventHandler<HTMLDivElement> = (e) => {
        if (e.nativeEvent.propertyName === 'left') {
            // both 'top' and 'left' are animated and card should be played only once
            return;
        }

        dispatch(cardPlayed(card));
    };

    return (
        <div
            key={card.id}
            className={styles.card}
            ref={cardWrapperDivRef}
            onClick={handleCardClick}
            onTransitionEnd={playCardHandler}
            style={{
                left: cardXY.x,
                top: cardXY.y,
            }}
        >
            <CardComponent key={card.id} cardId={card.type} />
        </div>
    );
};

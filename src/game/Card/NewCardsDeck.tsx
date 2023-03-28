import React, { useEffect, useRef, useState } from 'react';
import styles from './NewCardsDeck.module.scss';
import { Card } from './Card';
import { CardComponent } from './CardComponent';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { newCardTransitionEnded, selectGame } from '../../store/gameSlice';
import { cumulativeOffset } from '../../utils';

export const NewCardsDeck: React.FC<{ newCard: Card | null }> = ({ newCard }) => {
    const newCardDeckDivRef = useRef<HTMLDivElement>(null);

    const [cardXY, setCardXY] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

    const game = useAppSelector(selectGame);

    const dispatch = useAppDispatch();

    function newCardTransitionEndedHandler() {
        dispatch(newCardTransitionEnded());
    }

    useEffect(() => {
        if (newCard !== null && game.ui.oldCardCoordinates !== null && newCardDeckDivRef.current !== null) {
            const newCardDeckWrapperOffset = cumulativeOffset(newCardDeckDivRef.current);
            const newCardDeckX = newCardDeckWrapperOffset.left;
            const newCardDeckY = newCardDeckWrapperOffset.top;

            setCardXY({
                x: game.ui.oldCardCoordinates.x - newCardDeckX,
                y: game.ui.oldCardCoordinates.y - newCardDeckY,
            });
        } else {
            // reset state when the new card is created
            setCardXY({ x: 0, y: 0 });
        }
    }, [newCard]);

    if (newCard !== null) {
        return (
            <div
                ref={newCardDeckDivRef}
                className={styles.newCard}
                style={{
                    left: cardXY.x,
                    top: cardXY.y,
                }}
                onTransitionEnd={newCardTransitionEndedHandler}
            >
                <CardComponent cardId={newCard.type} />
            </div>
        );
    }

    return <div className={styles.card}></div>;
};

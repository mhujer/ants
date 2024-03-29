import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import gameReducer, {
    cardPlayed,
    hideResourcesChangeAnimation,
    playApplause,
    playResourcesChangeAnimation,
    soundPlayed,
} from './gameSlice';
import { listenerMiddleware, startAppListening } from './listenerMiddleware';

startAppListening({
    actionCreator: cardPlayed,
    effect: async (_action, listenerApi) => {
        const originalGameState = listenerApi.getOriginalState().game;

        listenerApi.dispatch(playResourcesChangeAnimation(originalGameState));

        await listenerApi.delay(900);

        listenerApi.dispatch(hideResourcesChangeAnimation());
    },
});

startAppListening({
    actionCreator: soundPlayed,
    effect: async (_action, listenerApi) => {
        const originalGameState = listenerApi.getOriginalState().game;

        if (originalGameState.playSound === 'fanfare') {
            await listenerApi.delay(2500);
            listenerApi.dispatch(playApplause());
        }
    },
});

export const store = configureStore({
    reducer: {
        game: gameReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

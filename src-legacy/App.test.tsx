import App from './App';
import renderer from 'react-test-renderer';
import { describe, expect, it } from 'vitest';
import { Provider } from 'react-redux';
import { store } from './store/store';

describe('App', () => {
    it('renders timer for 0 seconds', () => {
        const domTree = renderer
            .create(
                <Provider store={store}>
                    <App />
                </Provider>,
            )
            .toJSON();
        expect(domTree).toMatchSnapshot();
    });
});

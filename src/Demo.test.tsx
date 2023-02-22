import renderer from 'react-test-renderer';
import { describe, expect, it } from 'vitest';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Demo } from './Demo';

describe('Demo of all copomenents can be rendered', () => {
    it('renders demo components', () => {
        const domTree = renderer
            .create(
                <Provider store={store}>
                    <Demo />
                </Provider>,
            )
            .toJSON();
        expect(domTree).toMatchSnapshot();
    });
});

import App from './App';
import renderer from 'react-test-renderer';
import { describe, expect, it } from 'vitest';

describe('App', () => {
    it('renders timer for 0 seconds', () => {
        const domTree = renderer.create(<App />).toJSON();
        expect(domTree).toMatchSnapshot();
    });
});

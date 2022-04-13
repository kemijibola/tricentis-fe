import React from 'react';
import { render, screen } from '@testing-library/react';
import Songs from 'components/songs/songs';

describe('Songs test suite', () => {
    afterAll(() => console.log('============================ End of Songs test suite ============================'));

    test('renders songs component', async () => {
        const { findByTestId } = render(<Songs />);
        const songsComponent = await findByTestId('songs-component');
        expect(songsComponent).toBeInTheDocument();
    });

    test('should have 5 elements displayed on page', async () => {
        render(<Songs />);
        const resultLists = screen.getAllByTestId('elements');
        expect(resultLists.length).toBe(5);
    });
});

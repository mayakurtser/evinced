import React from 'react';
import { render, waitFor, screen, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Report } from '..';


describe('Report', () => {
    beforeAll(() => {
        global.fetch = jest.fn();
    });

    beforeEach(() => {
        fetch.mockClear();
    });

    it('renders without crashing', () => {

        render(
            <MemoryRouter>
                <Report/>
            </MemoryRouter>
        );
    });

    it('handles successful data fetch', async () => {
        const mockData = {
            name: 'MAYA REPORT',
            date: '2023-09-09',
            content: {
                "https://www.ynet.co.il/home/0,7340,L-10677,00.html": [],
                "https://www.ynet.co.il/home/0,7340,L-2758,00.html": []
            },
        };

        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockData,
        });

        render(
            <MemoryRouter initialEntries={["/report/scan-01"]}>
                <Report/>
            </MemoryRouter>
        );
        await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

        act(() => {

            expect(screen.getByText('Site Tree')).toBeInTheDocument();
        });

    });

});

import React from 'react';
import { render, fireEvent, waitForDomChange, waitForElement, queryByText } from '@testing-library/react';
import  UserPage from './UserPage';

describe('Home Page', () => {
    describe('Layout', () => {
        it('has root page div', () => {
           const {queryByTestId} =  render(<UserPage />);
           const homePageDiv = queryByTestId('userpage');
           expect(homePageDiv).toBeInTheDocument();
        })
    }
    )
})
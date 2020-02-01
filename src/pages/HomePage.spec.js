import React from 'react';
import { render, fireEvent, waitForDomChange, waitForElement, queryByText } from '@testing-library/react';
import  HomePage from './HomePage';

describe('Home Page', () => {
    describe('Layout', () => {
        it('has root page div', () => {
           const {queryByTestId} =  render(<HomePage />);
           const homePageDiv = queryByTestId('homepage');
           expect(homePageDiv).toBeInTheDocument();
        })
    }
    )
})
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Input from './Input';

describe('Layout', () => {
    it('has input item', () => {
        const { container } = render(<Input />);
        const input = container.querySelector('input');

        expect(input).toBeInTheDocument();
    });

    it('display the label provided in props', () => {
        const { queryByText } = render(<Input label="Test label" />);
        const label = queryByText('Test label');

        expect(label).toBeInTheDocument();

    });

    it('does not display the label when no label provided in props', () => {
        const { container } = render(<Input />);
        const label = container.querySelector('label');

        expect(label).not.toBeInTheDocument();

    });

    it('has text type for input  when type is not provided as a prop', () => {
        const { container } = render(<Input />);
        const input = container.querySelector('input');
        expect("text").toBe(input.type);

    });

    it('has password type for input  when type is  provided as a password prop', () => {
        const { container } = render(<Input type="password" />);
        const input = container.querySelector('input');
        expect("password").toBe(input.type);

    });

    it('display placeholder when it is provided as prop', () => {
        const { container } = render(<Input placeholder="Test place holder" />);
        const input = container.querySelector('input');
        expect("Test place holder").toBe(input.placeholder);
    });

    it('display value when it is provided as prop', () => {
        const { container } = render(<Input value="Test value" />);
        const input = container.querySelector('input');
        expect("Test value").toBe(input.value);
    });

    it('has onChange callback when it is provided as prop', () => {

        const onChange = jest.fn();
        const { container } = render(<Input onChange={onChange} />);
        const input = container.querySelector('input');
        fireEvent.change(input, { target: { value: 'new-input' } });
        expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('has default style when there is no validation error or success', () => {
        const { container } = render(<Input />);
        const input = container.querySelector('input');
        expect('form-control').toBe(input.className);
    });

    it('has success style when has error property is false', () => {
        const { container } = render(<Input hasError={false} />);
        const input = container.querySelector('input');
        expect('form-control is-valid').toBe(input.className);
    });

    it('has error style when has error property is true', () => {
        const { container } = render(<Input hasError={true} />);
        const input = container.querySelector('input');
        expect('form-control is-invalid').toBe(input.className);
    });

    it('display the error text when it is provided', () => {
        const { queryByText } = render(<Input hasError={true} error="Cannot be null" />);
        expect(queryByText('Cannot be null')).toBeInTheDocument();
    });

    it('does not display the error text when has error is not provided', () => {
        const { queryByText } = render(<Input error="Cannot be null" />);
        expect(queryByText('Cannot be null')).not.toBeInTheDocument();
    });
});

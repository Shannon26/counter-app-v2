import { render, fireEvent } from '@testing-library/react';
import Counter from './Counter';

// Mock the custom hooks
jest.mock('@/hooks/custom-hook', () => ({
  useCounter: (initialValue) => [
    initialValue,
    jest.fn().mockName('increment'),
    jest.fn().mockName('decrement'),
  ],
  useDarkMode: () => [false, jest.fn().mockName('toggle')],
}));

describe('Counter', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Counter />);
    
    expect(getByText('Counter 1')).toBeInTheDocument();
    expect(getByText('Counter 2')).toBeInTheDocument();
    expect(getByText('Dark Mode')).toBeInTheDocument();
  });

  it('increments and decrements counter 1', () => {
    const { getByText } = render(<Counter />);
    
    fireEvent.click(getByText('Increment'));
    expect(getByText('1')).toBeInTheDocument();
    
    fireEvent.click(getByText('Decrement'));
    expect(getByText('0')).toBeInTheDocument();
  });

  it('increments and decrements counter 2', () => {
    const { getByText, getByLabelText } = render(<Counter />);
    
    fireEvent.change(getByLabelText(/increment value/i), { target: { value: '2' } });
    
    fireEvent.click(getByText('Increment'));
    expect(getByText('2')).toBeInTheDocument();
    
    fireEvent.click(getByText('Decrement'));
    expect(getByText('0')).toBeInTheDocument();
  });

  it('toggles dark mode', () => {
    const { getByText } = render(<Counter />);
    
    fireEvent.click(getByText(/dark mode/i));
    
    expect(getByText(/light mode/i)).toBeInTheDocument();
  });
});

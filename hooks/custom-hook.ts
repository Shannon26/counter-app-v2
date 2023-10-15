import { useState } from 'react';

// Custom hook for incrementing and decrementing
export const useCounter = (initialValue: number) => {
  const [value, setValue] = useState<number>(initialValue);

  const increment = (incrementValue: number = 1) => setValue(value + incrementValue);
  const decrement = (decrementValue: number = 1) => setValue(value - decrementValue);

  return [ value, increment, decrement ];
};

// Custom hook for toggling dark mode
export const useDarkMode = (initialValue: boolean = false) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(initialValue);

  const toggle = () => setIsDarkMode(!isDarkMode);

  return [isDarkMode, toggle] ;
};

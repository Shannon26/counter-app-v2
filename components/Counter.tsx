import { FC, useState, useCallback } from 'react';
import { useCounter, useDarkMode } from '@/hooks/custom-hook';

const Counter: FC = () => {
  const [value1, increment1, decrement1] = useCounter(0);
  const [value2, increment2, decrement2] = useCounter(0);
  const [incrementValue, setIncrementValue] = useState<number>(1);
  const [isDarkMode, toggle] = useDarkMode();

  const handleDecrement1 = useCallback(() => decrement1(), [decrement1]);
  const handleIncrement1 = useCallback(() => increment1(), [increment1]);
  const handleDecrement2 = useCallback(() => decrement2(incrementValue), [decrement2, incrementValue]);
  const handleIncrement2 = useCallback(() => increment2(incrementValue), [increment2, incrementValue]);

  const modeClasses = isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black';
  const buttonClasses = `px-3 py-2 text-sm font-medium rounded-md shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${modeClasses}`;
  
  return (
    <div className={`flex space-x-8 justify-center min-h-screen ${modeClasses}`}>
      <button
        className={`absolute top-4 right-4 px-3 py-2 text-sm font-medium rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${modeClasses}`}
        onClick={toggle}
      >
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      <CounterDisplay 
        title="Counter 1" 
        value={value1} 
        onDecrement={handleDecrement1} 
        onIncrement={handleIncrement1} 
        modeClasses={modeClasses} 
        buttonClasses={buttonClasses}
      />
      <CounterDisplay 
        title="Counter 2" 
        value={value2} 
        onDecrement={handleDecrement2} 
        onIncrement={handleIncrement2} 
        modeClasses={modeClasses} 
        buttonClasses={buttonClasses}
      >
        <input
          type="number"
          min="1"
          value={incrementValue}
          onChange={(e) => setIncrementValue(parseInt(e.target.value))}
          className={`mb-4 px-3 py-2 rounded-md ${modeClasses}`}
        />
      </CounterDisplay>
    </div>
  );
};

const CounterDisplay: FC<{ title: string; value: number; onDecrement: () => void; onIncrement: () => void; modeClasses: string; buttonClasses: string; }> = ({ title, value, onDecrement, onIncrement, modeClasses, buttonClasses, children }) => (
  <div className={`flex flex-col items-center justify-center p-6 rounded-lg shadow-md ${modeClasses}`}>
    <h2 className="mb-4 text-2xl font-semibold">{title}</h2>
    <p className="mb-4 text-xl font-medium">{value}</p>
    {children}
    <div className="flex space-x-4">
      <button
        className={`${buttonClasses}`}
        onClick={onDecrement}
      >
        Decrement
      </button>
      <button
        className={`${buttonClasses}`}
        onClick={onIncrement}
      >
        Increment
      </button>
    </div>
  </div>
);

export default Counter;

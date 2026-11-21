import { useState, useCallback } from 'react';

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item !== null ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Failed to read localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value) => {
      setStoredValue((prevValue) => {
        const valueToStore =
          value instanceof Function ? value(prevValue) : value;
        try {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
          console.error(`Failed to write localStorage key "${key}":`, error);
        }
        return valueToStore;
      });
    },
    [key]
  );

  return [storedValue, setValue];
}
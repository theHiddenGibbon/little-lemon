import { renderHook, act } from '@testing-library/react-hooks';
import { timesReducer, initialiseTimes } from '../components/Main';

describe('initialiseTimes', () => {
  it('should return the correct times for a given date', () => {
    const date = '2023-10-01';
    const expectedTimes = ['10:00', '11:00', '12:00']; // Example expected times
    const times = { '2023-10-01': expectedTimes };
    
    const result = initialiseTimes(date);
    expect(result).toEqual(expectedTimes);
  });

  it('should return an empty array if no times are available for the given date', () => {
    const date = '2023-10-02';
    const expectedTimes = [];
    
    const result = initialiseTimes(date);
    expect(result).toEqual(expectedTimes);
  });

  it('should handle invalid date formats gracefully', () => {
    const date = 'invalid-date';
    const expectedTimes = [];
    
    const result = initialiseTimes(date);
    expect(result).toEqual(expectedTimes);
  });
});

import { renderHook, act } from '@testing-library/react-hooks';
import { timesReducer, initialiseTimes } from '../components/Main';

describe('updateTimes', () => {
  it('should update the state with the new times for a given date', () => {
    const initialDate = '2023-10-01';
    const newDate = '2023-10-02';
    const expectedTimes = ['13:00', '14:00', '15:00']; // Example expected times
    const times = { '2023-10-02': expectedTimes };

    const { result } = renderHook(() => useReducer(timesReducer, initialiseTimes(initialDate)));

    act(() => {
      result.current[1]({ type: 'update_times', payload: newDate });
    });

    expect(result.current[0]).toEqual(expectedTimes);
  });
});
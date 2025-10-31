// hooks/useCart.test.ts

import { renderHook, act } from '@testing-library/react';
import { useCart } from './useCart';

describe('useCart Hook', () => {
  // Test 1: Checks the initial state
  it('should initialize with an empty cart array', () => {
    // 1. Arrange & Act: Use renderHook to execute the hook
    const { result } = renderHook(() => useCart());

    // 2. Assert: Check the hook's initial state
    // result.current provides access to the hook's return value
    expect(result.current.items).toEqual([]);
  });

  // Test 2: Checks state change after calling a function
  it('should add an item to the cart', () => {
    // 1. Arrange & Act (Initial Render)
    const { result } = renderHook(() => useCart());

    const PRODUCT_ID = 'P101';

    // 2. Act (Simulate interaction that changes state)
    // 💡 Use act() to wrap state updates, mimicking React's environment
    act(() => {
      result.current.addItem(PRODUCT_ID);
    });

    // 3. Assert: Check the new state
    expect(result.current.items).toEqual([PRODUCT_ID]);
  });

  // Test 3: Checks removal logic
  it('should remove an existing item from the cart', () => {
    // 1. Arrange & Act (Setup initial state with an item)
    // By passing an initialProps object to renderHook (or setup logic inside test)
    // we can control the initial state for the test.
    const { result } = renderHook(() => useCart());

    const PRODUCT_A = 'P_A';
    const PRODUCT_B = 'P_B';

    // Add two items first
    act(() => {
      result.current.addItem(PRODUCT_A);
      result.current.addItem(PRODUCT_B);
    });

    // Verify initial setup is correct
    expect(result.current.items).toEqual([PRODUCT_A, PRODUCT_B]);

    // 2. Act (Remove one item)
    act(() => {
      result.current.removeItem(PRODUCT_A);
    });

    // 3. Assert
    expect(result.current.items).toEqual([PRODUCT_B]);
  });
});

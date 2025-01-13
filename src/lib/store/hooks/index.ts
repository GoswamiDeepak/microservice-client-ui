import { useDispatch, useSelector, useStore } from 'react-redux'; // Import hooks from react-redux
import type { RootState, AppDispatch, AppStore } from '../store'; // Import types from the store

// Custom hook for `useDispatch` with type safety for `AppDispatch`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

// Custom hook for `useSelector` with type safety for `RootState`
export const useAppSelector = useSelector.withTypes<RootState>();

// Custom hook for `useStore` with type safety for `AppStore`
export const useAppStore = useStore.withTypes<AppStore>();
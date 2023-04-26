import {configureStore} from '@reduxjs/toolkit';

// Slices
import userSlice from './userSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({immutableCheck: false, serializableCheck: false}),
});

export type RootState = ReturnType<typeof store.getState>;

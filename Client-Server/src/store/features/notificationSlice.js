// src/slices/notificationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notifications: [],
};

// Create the slice
const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    // Action to add a notification
    addNotification: (state, action) => {
      state.notifications.push(action.payload);
    },
    // Action to remove a notification
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
    // Action to clear all notifications
    clearNotifications: (state) => {
      state.notifications = [];
    },
  },
});

// Export actions
export const { addNotification, removeNotification, clearNotifications } =
  notificationSlice.actions;

// Export the reducer to be added to the store
export default notificationSlice.reducer;

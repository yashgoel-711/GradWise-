import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isExpanded: true,
};

export const navbarSlice = createSlice({
  name: 'navbar',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isExpanded = !state.isExpanded;
    },
    setSidebarExpanded: (state, action) => {
      state.isExpanded = action.payload;
    },
  },
});

export const { toggleSidebar, setSidebarExpanded } = navbarSlice.actions;

export default navbarSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  alert: {
    show: false,
    autoHide: false,
    message: '',
    status: '',
    extraClasses: '',
  },
};

const listenerSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setAlert(state, action) {
      state.alert = {
        show: true,
        autoHide: action.payload.autoHide || false,
        message: action.payload.message,
        status: action.payload.status,
        extraClasses: action.payload.extraClasses || '',
      };
    },
    clearAlert(state) {
      state.alert = initialState.alert;
    },
  },
});

export const { setAlert, clearAlert } = listenerSlice.actions;
export const selectAlert = (state) => state.ui.alert;
export default listenerSlice.reducer;

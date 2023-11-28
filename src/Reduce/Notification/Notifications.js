import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    NotificationData:""
};
export const NotificationSilce = createSlice({
    name: 'NotificationData',
    initialState,
    reducers: {
        getNotificationData(state, action) {
            state.NotificationData = ""
            state.NotificationData = action.payload
            return  state;
        },
    }
});

// each case under reducers becomes an action
export const {getNotificationData}= NotificationSilce.actions;

export default NotificationSilce.reducer;

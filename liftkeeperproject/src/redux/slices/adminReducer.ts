import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AdminState {
    balance: number;
}

const initialState: AdminState = {
    balance: 0,
};

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        updateAdminBalance: (state, action: PayloadAction<number>) => {
            state.balance += action.payload;
        },
        resetAdminBalance: (state) => {
            state.balance = initialState.balance;
        }
    },
});

export const { updateAdminBalance, resetAdminBalance } = adminSlice.actions;

export default adminSlice.reducer;
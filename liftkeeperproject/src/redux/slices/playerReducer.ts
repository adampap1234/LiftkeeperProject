import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PlayerState {
    name: string;
    balance: number;
    isAdminMode: boolean;
}

const initialState: PlayerState = {
    name: 'Type your name',
    balance: 10000,
    isAdminMode: false
};


const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        updateBalance: (state, action: PayloadAction<number>) => {
            state.balance += action.payload;
        },

        updateIsAdminMode: (state, action: PayloadAction<boolean>) => {
            state.isAdminMode = action.payload;
        }
    },
});

export const { setName, updateBalance,  updateIsAdminMode} = playerSlice.actions;

export default playerSlice.reducer;
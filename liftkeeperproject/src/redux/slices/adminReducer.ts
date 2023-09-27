import { AnyAction } from "@reduxjs/toolkit";

interface AdminState {
    balance: number;
}

const initialState: AdminState = {
    balance: 0,
};

export const adminReducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case 'UPDATE_OPERATOR_BALANCE':
            return { ...state, balance: action.payload };
        default:
            return state;
    }
};
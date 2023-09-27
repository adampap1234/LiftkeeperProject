import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Ticket = {
    id: string;
    numbers: number[];
    used: boolean;
    matched: number[];
    earnings: number;
    owner: 'player' | 'admin';
};

interface TicketState {
    tickets: Ticket[];
}

const initialState: TicketState = {
    tickets: []
};

const ticketsSlice = createSlice({
    name: 'ticket',
    initialState,
    reducers: {     
        addTickets: (state, action: PayloadAction<Ticket[]>) => {
            state.tickets = [...state.tickets, ...action.payload];
        },
        markTicketAsUsed: (state, action: PayloadAction<string>) => {
            const ticket = state.tickets.find(t => t.id === action.payload);
            if (ticket) {
                ticket.used = true;
            }
        },
        updateTicketMatchedNumbers: (state, action: PayloadAction<{ ticketId: string, matched: number[] }>) => {
            const ticket = state.tickets.find(t => t.id === action.payload.ticketId);
            if (ticket) {
                ticket.matched = action.payload.matched;
            }
        },
        updateTicketEarnings: (state, action: PayloadAction<{ ticketId: string, earnings: number }>) => {
            const ticket = state.tickets.find(t => t.id === action.payload.ticketId);
            if (ticket) {
                ticket.earnings = action.payload.earnings;
            }
        },
        removeUsedTickets: (state) => {
            state.tickets = state.tickets.filter(ticket => !ticket.used);
        },
        resetTickets: () => initialState 
    }
});

export const {
    addTickets,
    markTicketAsUsed,
    updateTicketMatchedNumbers,
    updateTicketEarnings,
    removeUsedTickets,
    resetTickets
} = ticketsSlice.actions;

export default ticketsSlice.reducer;
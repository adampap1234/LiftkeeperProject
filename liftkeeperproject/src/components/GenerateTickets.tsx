import { useState } from 'react';
import { useDispatch, useSelector } from '../redux/store';
import { TextField, Button } from '@mui/material';
import { Ticket, addTickets } from '../redux/slices/ticketReducer';
import { nanoid } from '@reduxjs/toolkit';

function GenerateTickets() {
    const dispatch = useDispatch();
    const [ticketCount, setTicketCount] = useState(0);
    const operatorBalance = useSelector((state) => state.admin.balance);

    // Generate a random number between 1 and 39
    const generateRandomNumber = () => Math.floor(Math.random() * 39) + 1;

    const handleGenerateTickets = () => {
        const tickets: Ticket[] = [];

        for (let i = 0; i < ticketCount; i++) {
            const ticketNumbers = new Set<number>();

            while (ticketNumbers.size < 5) {
                ticketNumbers.add(generateRandomNumber());
            }

            tickets.push({
                id: nanoid(),
                numbers: Array.from(ticketNumbers),
                matched: [],
                earnings: 0,
                used: false,
                owner: 'admin'
            });
        }

        const totalCost = ticketCount * 500;

        dispatch(addTickets([...tickets]));
        dispatch({ type: 'UPDATE_OPERATOR_BALANCE', payload: operatorBalance + totalCost });

        setTicketCount(0);
    };

    return (
        <div>
            <h2>Simulate Additional Players</h2>
            <div>
                <TextField
                    label="Number of Tickets"
                    value={ticketCount}
                    onChange={(e) => setTicketCount(parseInt(e.target.value, 10))}
                    type="number"
                />
                <Button variant="contained" color="primary" onClick={handleGenerateTickets}>
                    Generate Tickets
                </Button>
            </div>
        </div>
    );
}

export default GenerateTickets;
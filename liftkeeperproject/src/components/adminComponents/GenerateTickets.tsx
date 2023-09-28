import { useState } from 'react';
import { useDispatch, useSelector } from '../../redux/store';
import { TextField, Button, Paper, Typography, Grid, Box } from '@mui/material';
import { Ticket, addTickets } from '../../redux/slices/ticketReducer';
import { nanoid } from '@reduxjs/toolkit';
import { MAX_NUMBER, TICKET_COST } from '../../utils/constants';
import { updateAdminBalance } from '../../redux/slices/adminReducer';

function GenerateTickets() {
    const dispatch = useDispatch();
    const [ticketCount, setTicketCount] = useState(0);
    const adminBalance = useSelector((state) => state.admin.balance);

    const generateRandomNumber = () => Math.floor(Math.random() * MAX_NUMBER) + 1;

    const generateTicket = (): Ticket => {
        const ticketNumbers = new Set<number>();

        while (ticketNumbers.size < 5) {
            ticketNumbers.add(generateRandomNumber());
        }

        return {
            id: nanoid(),
            numbers: Array.from(ticketNumbers),
            matched: [],
            earnings: 0,
            used: false,
            owner: 'admin'
        };
    };

    const handleGenerateTickets = () => {
        const tickets: Ticket[] = Array.from({ length: ticketCount }, generateTicket);
        const totalCost = ticketCount * TICKET_COST;

        dispatch(addTickets(tickets));
        dispatch(updateAdminBalance(adminBalance + totalCost));
        setTicketCount(0);
    };

    return (
        <Paper elevation={3} style={{  backgroundColor: '#f5f5f5', padding: '20px', marginTop: '20px',minWidth:'800px', margin: 'auto' }}>
            <Typography variant="h4" gutterBottom>Simulate Additional Players</Typography>
            <Grid container spacing={2} justifyContent="center">
                <Grid item>
                    <TextField
                        label="Number of Tickets"
                        value={ticketCount}
                        onChange={(e) => setTicketCount(parseInt(e.target.value, 10))}
                        type="number"
                    />
                </Grid>
                <Grid item>
                    <Box mt={2}>
                        <Button variant="contained" color="primary" onClick={handleGenerateTickets}>
                            Generate Tickets
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default GenerateTickets;

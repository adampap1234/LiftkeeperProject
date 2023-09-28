import { useState } from 'react';
import { useDispatch, useSelector } from '../../redux/store';
import { nanoid } from '@reduxjs/toolkit';
import { Button, Typography, Box, Paper } from '@mui/material';
import { Ticket, addTickets } from '../../redux/slices/ticketReducer';
import { updateBalance } from '../../redux/slices/playerReducer';
import { MAX_NUMBER, TICKET_COST } from '../../utils/constants';
import { UserRole } from '../../utils/enums';
import LotteryBall from '../commonComponents/LotteryBall';

function LotteryNumberSelector() {
    const maxSelection = 5;
    const numbersPerRow = 7;
    const dispatch = useDispatch();
    const balance = useSelector((state) => state.player.balance);
    const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);

    const toggleNumberSelection = (number: number) => {
        if (selectedNumbers.includes(number)) {
            setSelectedNumbers(selectedNumbers.filter((n) => n !== number));
        } else if (selectedNumbers.length < maxSelection) {
            setSelectedNumbers([...selectedNumbers, number]);
        }
    };

    const purchaseTicket = () => {
        if (balance >= TICKET_COST && selectedNumbers.length === maxSelection) {
            const newTicket: Ticket = {
                id: nanoid(),
                numbers: selectedNumbers,
                used: false,
                matched: [],
                earnings: 0,
                owner: UserRole.PLAYER,
            };

            dispatch(addTickets([newTicket]));
            dispatch(updateBalance(-TICKET_COST));
            setSelectedNumbers([]);
        }
    };

    const renderNumberRow = (startNumber: number) => {
        const rowNumbers = Array.from(
            { length: numbersPerRow },
            (_, index) => startNumber + index
        );

        return (
            <Box key={startNumber} display="flex" marginBottom={2} justifyContent="center">
                {rowNumbers.map((number) => (
                    <Button
                        key={number}
                        onClick={() => toggleNumberSelection(number)}
                        style={{ width: '40px', height: '40px', margin: '0 5px' }}
                        disableRipple
                    >
                        <LotteryBall number={number} isSelected={selectedNumbers.includes(number)} />
                    </Button>
                ))}
            </Box>
        );
    };

    return (
        <Paper elevation={3} style={{ padding: '20px', borderRadius: '15px',  backgroundColor: '#f5f5f5', }}>
            <Typography variant="h6" style={{ marginBottom: '20px', fontWeight: 'bold' }}>
                Select up to 5 lottery numbers:
            </Typography>
            {Array.from(
                { length: Math.ceil(MAX_NUMBER / numbersPerRow) },
                (_, index) => renderNumberRow(index * numbersPerRow + 1)
            )}
            <Box display="flex" justifyContent="center" marginTop={3}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={purchaseTicket}
                    disabled={selectedNumbers.length !== maxSelection}
                >
                    Buy Ticket ({TICKET_COST} akcse)
                </Button>
            </Box>
        </Paper>
    );
}

export default LotteryNumberSelector;

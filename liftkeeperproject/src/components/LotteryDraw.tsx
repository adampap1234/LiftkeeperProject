import { useState } from 'react';
import { Button, LinearProgress, Avatar, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import { dispatch, useSelector } from '../redux/store';
import { Ticket, markTicketAsUsed, removeUsedTickets, updateTicketEarnings, updateTicketMatchedNumbers } from '../redux/slices/ticketReducer';
import { updateBalance } from '../redux/slices/playerReducer';

const MAX_NUMBER = 39;
const DRAW_COUNT = 5;
const DURATION = 5000;

const generateRandomNumbers = (): number[] => {
    let drawnNumbers: number[] = [];
    while (drawnNumbers.length < DRAW_COUNT) {
        const n = Math.floor(Math.random() * MAX_NUMBER) + 1;
        if (drawnNumbers.indexOf(n) === -1) drawnNumbers.push(n);
    }
    return drawnNumbers.sort((a, b) => a - b);
};


const LotteryDraw = () => {
    const [isDrawing, setIsDrawing] = useState(false);
    const [winningNumbers, setWinningNumbers] = useState<number[]>([]);
    const [progress, setProgress] = useState(0);
    const ticketStore = useSelector((state) => state.ticket);

    const startDrawing = () => {
        setIsDrawing(true);
        setProgress(0);
        setWinningNumbers([]);
        dispatch(removeUsedTickets());

        const interval = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) {
                    clearInterval(interval);
                    setIsDrawing(false);
                    const generatedNumbers = generateRandomNumbers();

                    setWinningNumbers(generatedNumbers);
                    checkTickets(generatedNumbers);


                    return 100;
                }
                const diff = 10;
                return Math.min(oldProgress + diff, 100);
            });
        }, DURATION / 10); // Update every half second to reach 100% in 5 seconds
    };

    const checkTickets = (winningNumbers: number[]) => {
        const unusedTickets = ticketStore.tickets.filter((ticket) => !ticket.used);
    
        const totalIncome = unusedTickets.length * 500;
        const totalSpentByPlayer = unusedTickets.filter(t => t.owner === 'player').length * 500;
        const buffer = totalSpentByPlayer * 0.1; // 10% of player's spending reserved for admin's profit
        const maxPayout = totalSpentByPlayer - buffer;
        const payoutPercentages = [0, 0, 0.1, 0.2, 0.3, 0.4]; 
    
        let totalPayout = 0;
    
        unusedTickets.forEach((ticket: Ticket) => {
            dispatch(markTicketAsUsed(ticket.id));
    
            const matches = ticket.numbers.filter(num => winningNumbers.includes(num));
            let potentialWinnings = totalIncome * payoutPercentages[matches.length];
    
            if (matches.length >= 2) {
                if (totalPayout + potentialWinnings > maxPayout) {
                    potentialWinnings = maxPayout - totalPayout; 
                }
                
                totalPayout += potentialWinnings;
    
                if(ticket.owner === 'player'){
                    dispatch(updateBalance(potentialWinnings));
                    dispatch({ type: 'UPDATE_OPERATOR_BALANCE', payload: -potentialWinnings }); 
                }
    
                dispatch(updateTicketMatchedNumbers({ ticketId: ticket.id, matched: matches }));
                dispatch(updateTicketEarnings({ ticketId: ticket.id, earnings: potentialWinnings }));
            }
        });
    };

    const renderWinningNumbers = () => {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginTop: '20px' }}>
                {winningNumbers.map((number) => (
                    <Avatar
                        key={number}
                        sx={{
                            width: '40px',
                            height: '40px',
                            backgroundColor: blue[500],
                            color: 'white',
                            fontSize: '1rem',
                        }}
                    >
                        {number}
                    </Avatar>
                ))}
            </div>
        );
    };

    const displaySummary = () => {
        const matchedCounts = [0, 0, 0, 0, 0, 0];
        const individualPayouts = [0, 0, 0, 0, 0, 0];
        const totalPayouts = [0, 0, 0, 0, 0, 0];

        const tickets = ticketStore.tickets.filter((ticket) => ticket.used);
        tickets.forEach((ticket: Ticket) => {
            const matchesCount = ticket.matched.length;
            matchedCounts[matchesCount]++;
            individualPayouts[matchesCount] = ticket.earnings;
            totalPayouts[matchesCount] += ticket.earnings;
        });

        return (
            <Paper elevation={3} style={{ marginTop: 20, padding: 15 }}>
                <Typography variant="h6" gutterBottom>Summary:</Typography>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Matches</TableCell>
                                <TableCell align="right">Count of Tickets</TableCell>
                                <TableCell align="right">Earnings Per Ticket</TableCell>
                                <TableCell align="right">Total Earnings</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {matchedCounts.map((count, index) => (
                                <TableRow key={index}>
                                    <TableCell component="th" scope="row">{index}</TableCell>
                                    <TableCell align="right">{count}</TableCell>
                                    <TableCell align="right">{individualPayouts[index]}</TableCell>
                                    <TableCell align="right">{totalPayouts[index]}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Typography style={{ marginTop: 10 }}>
                    Total tickets: {tickets.length}
                </Typography>
                <Typography>
                    Total income: {tickets.filter(t=> t.owner=== 'player').length * 500}
                </Typography>
                <Typography>
                    Total payouts: {totalPayouts.reduce((a, b) => a + b, 0)}
                </Typography>
                <Typography>
                    Operator earnings: {(tickets.length * 500) - totalPayouts.reduce((a, b) => a + b, 0)}
                </Typography>
            </Paper>
        );
    };

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <Button variant="contained" color="primary" onClick={startDrawing} disabled={isDrawing}>
                START
            </Button>
            {isDrawing && <LinearProgress variant="determinate" value={progress} style={{ marginTop: '20px' }} />}
            {!isDrawing && winningNumbers.length > 0 && renderWinningNumbers()}
            {!isDrawing && winningNumbers.length > 0 && displaySummary()}
        </div>
    );
};

export default LotteryDraw;
import { useEffect, useState } from 'react';
import { Button, Card, CardActions, CardContent, LinearProgress, Typography } from '@mui/material';
import { dispatch, useSelector } from '../../redux/store';
import { Ticket, markTicketAsUsed, removeUsedTickets, updateTicketEarnings, updateTicketMatchedNumbers } from '../../redux/slices/ticketReducer';
import { updateBalance } from '../../redux/slices/playerReducer';
import { MAX_NUMBER } from '../../utils/constants';
import { updateAdminBalance } from '../../redux/slices/adminReducer';
import { UserRole } from '../../utils/enums';
import LotteryDrawSummary from './LotteryDrawSummary';
import LotteryBall from '../commonComponents/LotteryBall';

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
    const ticketStore = useSelector((state) => state.ticket);
    const [isDrawing, setIsDrawing] = useState(false);
    const [winningNumbers, setWinningNumbers] = useState<number[]>([]);
    const [progress, setProgress] = useState(0);

    const startDrawing = () => {
        setIsDrawing(true);
        setProgress(0);
        setWinningNumbers([]);
        dispatch(removeUsedTickets());
    };

    const checkTickets = (winningNumbers: number[]) => {
        const unusedTickets = ticketStore.tickets.filter((ticket) => !ticket.used);
        const totalIncome = unusedTickets.length * 500;
        const totalSpentByPlayer = unusedTickets.filter(t => t.owner === UserRole.PLAYER).length * 500;
        const buffer = totalSpentByPlayer * 0.1;
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

                if (ticket.owner === UserRole.PLAYER) { 
                    dispatch(updateBalance(potentialWinnings));
                    dispatch(updateAdminBalance(-potentialWinnings));
                }

                dispatch(updateTicketMatchedNumbers({ ticketId: ticket.id, matched: matches }));
                dispatch(updateTicketEarnings({ ticketId: ticket.id, earnings: potentialWinnings }));
            }
        });
    };

    const renderWinningNumbers = () => (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginTop: '20px' }}>
            {winningNumbers.map((number, index) => (
                <LotteryBall key={index} number={number} isSelected={true} />
            ))}
        </div>
    );

    useEffect(() => {
        if (winningNumbers.length === DRAW_COUNT) {
            checkTickets(winningNumbers);
        }
    }, [winningNumbers]);

    useEffect(() => {
        let interval: any;

        if (isDrawing) {
            interval = setInterval(() => {
                setProgress((oldProgress) => {
                    if (oldProgress === 100) {
                        clearInterval(interval);
                        setIsDrawing(false);
                        setWinningNumbers(generateRandomNumbers());
                        return 100;
                    }
                    const diff = 10;
                    return Math.min(oldProgress + diff, 100);
                });
            }, DURATION / 10);
        }

        return () => clearInterval(interval);
    }, [isDrawing]);


    return (
        <Card variant="outlined" style={{ backgroundColor: '#f5f5f5', textAlign: 'center', padding: '20px', minWidth: '800px' }}>
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    Lottery Draw
                </Typography>
                <Typography color="textSecondary">
                    Click start to begin the draw
                </Typography>
                {isDrawing ? (
                    <div style={{ marginTop: '30px' }}>
                        <LinearProgress variant="determinate" value={progress} />
                        <Typography style={{ marginTop: '10px' }}>
                            Drawing in progress...
                        </Typography>
                    </div>
                ) : (
                    <>
                        {winningNumbers.length > 0 && renderWinningNumbers()}
                        {winningNumbers.length > 0 && <LotteryDrawSummary />}
                    </>
                )}
            </CardContent>
            <CardActions>
                <Button variant="contained" color="primary" size="large" onClick={startDrawing} disabled={isDrawing} fullWidth>
                    START
                </Button>
            </CardActions>
        </Card>
    );
};

export default LotteryDraw;
import { Paper, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { UserRole } from "../../utils/enums";
import { useSelector } from "../../redux/store";
import { TICKET_COST } from "../../utils/constants";

const LotteryDrawSummary = () => {
    const tickets = useSelector(state => state.ticket.tickets).filter(ticket => ticket.used);    
    const totalIncome = tickets.filter(t => t.owner === UserRole.PLAYER).length * TICKET_COST;
    const totalPayouts = tickets.map(ticket => ticket.earnings).reduce((a, b) => a + b, 0);
    const adminEarnings = totalIncome - totalPayouts;

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
                        {[...Array(6)].map((_, index) => {
                            const matchingTickets = tickets.filter(ticket => ticket.matched.length === index);
                            const individualEarnings = matchingTickets[0]?.earnings || 0;
                            const totalEarningsForMatch = matchingTickets.reduce((sum, ticket) => sum + ticket.earnings, 0);

                            return (
                                <TableRow key={index}>
                                    <TableCell component="th" scope="row">{index}</TableCell>
                                    <TableCell align="right">{matchingTickets.length}</TableCell>
                                    <TableCell align="right">{individualEarnings}</TableCell>
                                    <TableCell align="right">{totalEarningsForMatch}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Typography style={{ marginTop: 10 }}>
                Total tickets: {tickets.length}
            </Typography>
            <Typography>Total income: {totalIncome}</Typography>
            <Typography>Total payouts: {totalPayouts}</Typography>
            <Typography>Admin earnings: {adminEarnings}</Typography>
        </Paper>
    );
};

export default LotteryDrawSummary;
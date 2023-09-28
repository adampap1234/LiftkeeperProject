import { useSelector } from '../../redux/store';
import { Typography, Button, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { UserRole } from '../../utils/enums';
import LotteryBall from './LotteryBall';

function PurchasedTickets() {
    const isAdminMode = useSelector((state) => state.player.isAdminMode);
    const ticketStore = useSelector((state) => state.ticket);
    const filteredTickets = isAdminMode ? ticketStore.tickets : ticketStore.tickets.filter(ticket => ticket.owner === UserRole.PLAYER);

    const rows = filteredTickets.map((ticket, idx) => ({
        id: idx,
        numbers: ticket.numbers,
        matched: ticket.matched,
        earnings: ticket.earnings,
        used: ticket.used,
        owner: ticket.owner
    }));

    const columns = [
        {
            field: 'numbers',
            headerName: 'Numbers',
            width: 400,
            renderCell: (params: any) => {
                return (
                    <>
                        {params.value.map((number: any) => (
                            <Button
                                key={number}
                                style={{ width: '40px', height: '40px' }}
                            >
                                <LotteryBall number={number} isSelected={params.row.matched.includes(number)} />
                            </Button>
                        ))}
                    </>
                );
            }
        },
        {
            field: 'owner',
            headerName: 'Owner',
            width: 120,
        },
        {
            field: 'matched',
            headerName: 'Matched',
            width: 120,
            renderCell: (params: any) => {
                return params.value.length;
            },

            // @ts-ignore
            sortComparator: (v1: any, v2: any, cellParams1: { value: number[]; }, cellParams2: { value: number[]; }) => {
                const matched1 = cellParams1.value as number[];
                const matched2 = cellParams2.value as number[];
                return matched1.length - matched2.length;
            },
        },
        {
            field: 'earnings',
            headerName: 'Earnings',
            width: 150,
            valueFormatter: (params: any) => `${params.value} akcse`,
        },
        {
            field: 'used',
            headerName: 'Used',
            width: 120,
            renderCell: (params: any) => params.value ? <CheckCircleIcon color="success" /> : null
        },
    ];

    const sortedRows = isAdminMode ? rows.sort((a, b) => (a.owner === UserRole.PLAYER && b.owner === UserRole.ADMIN) ? -1 : 1) : rows;
    const totalEarnings = filteredTickets.reduce((acc, ticket) => acc + ticket.earnings, 0);

    return (
        <Box style={{ height: 'auto', minWidth: '800px', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '10px' }}>
            <Typography variant="h5" gutterBottom style={{ marginBottom: '20px', fontWeight: 'bold', color: '#333' }}>
                Your Purchased Tickets:
            </Typography>
            <DataGrid
                rows={sortedRows}
                columns={columns}
                disableRowSelectionOnClick
                autoHeight
                style={{ marginBottom: '20px', backgroundColor: '#fff', borderRadius: '10px' }}
            />
            <Typography variant="h6" style={{ fontWeight: '500', color: '#333' }}>
                Total Earnings: <span style={{ color: '#ff5722', fontWeight: 'bold' }}>{totalEarnings} akcse</span>
            </Typography>
        </Box>
    );
}

export default PurchasedTickets;
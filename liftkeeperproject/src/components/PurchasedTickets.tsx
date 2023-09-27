import { useSelector } from '../redux/store';
import { Typography, Button, Avatar } from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import { DataGrid } from '@mui/x-data-grid';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function PurchasedTickets() {
    const isAdminMode = useSelector((state) => state.player.isAdminMode);
    const ticketStore = useSelector((state) => state.ticket);
    const filteredTickets = isAdminMode ? ticketStore.tickets : ticketStore.tickets.filter(ticket => ticket.owner === 'player');

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
                                <Avatar
                                    sx={{
                                        width: '40px',
                                        height: '40px',
                                        backgroundColor: params.row.matched.includes(number) ? blue[500] : grey[500],
                                        color: 'white',
                                        fontSize: '1rem',
                                    }}
                                >
                                    {number}
                                </Avatar>
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

    const sortedRows = isAdminMode ? rows.sort((a, b) => (a.owner === 'player' && b.owner === 'admin') ? -1 : 1) : rows;
    const totalEarnings = filteredTickets.reduce((acc, ticket) => acc + ticket.earnings, 0);

    return (
        <div style={{ height: 'auto', width: '100%' }}>
            <Typography variant="h6" gutterBottom>Your Purchased Tickets:</Typography>
            <DataGrid
                rows={sortedRows}
                columns={columns}
                disableRowSelectionOnClick
                autoHeight
            />
            <Typography variant="h6" gutterBottom>Total Earnings: {totalEarnings} akcse</Typography>
        </div>
    );
}

export default PurchasedTickets;
import { Typography } from '@mui/material';
import { useSelector } from '../redux/store';

const BalanceLabel = () => {
    const isAdminMode = useSelector((state) => state.player.isAdminMode);
    const balance = useSelector((state) => isAdminMode ? state.admin.balance : state.player.balance);

    return (
        <>
            <Typography>
                Balance: {balance} akcse
            </Typography>
        </>
    );
};

export default BalanceLabel;
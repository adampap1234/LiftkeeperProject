import { Tooltip, IconButton, Typography } from '@mui/material';
import { useSelector, useDispatch } from '../../redux/store';
import RestoreIcon from '@mui/icons-material/Restore';
import { resetPlayerBalance } from '../../redux/slices/playerReducer';
import { resetAdminBalance } from '../../redux/slices/adminReducer';

const BalanceLabel = () => {
    const dispatch = useDispatch();
    const isAdminMode = useSelector((state) => state.player.isAdminMode);
    const balance = useSelector((state) => isAdminMode ? state.admin.balance : state.player.balance);

    const resetBalance = () => {      
        dispatch(resetPlayerBalance());
        dispatch(resetAdminBalance());
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title="Reset balance">
                <IconButton onClick={resetBalance} color={isAdminMode ? 'primary' : 'secondary'}>
                    <RestoreIcon />
                </IconButton>
            </Tooltip>
            <Typography>
                Balance: {balance} akcse
            </Typography>
        </div>
    );
};

export default BalanceLabel;
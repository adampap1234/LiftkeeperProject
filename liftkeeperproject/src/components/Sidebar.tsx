import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useNavigate } from 'react-router-dom';
import { useSelector } from '../redux/store';

const Sidebar = () => {
    const navigate = useNavigate();
    const isAdminMode = useSelector((state) => state.player.isAdminMode);

    return (
        <div style={{ width: '250px', borderRight: '1px solid gray', minHeight: '100%' }}>
            <List>
                <ListItem onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="My Tickets" />
                </ListItem>

                {isAdminMode ?
                    <ListItem onClick={() => navigate('/generate-tickets')} style={{ cursor: 'pointer' }}>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Generate Tickets" />
                    </ListItem>
                    :
                    <ListItem onClick={() => navigate('/purchase-ticket')} style={{ cursor: 'pointer' }}>
                        <ListItemIcon>
                            <ListAltIcon />
                        </ListItemIcon>
                        <ListItemText primary="Purchase Ticket" />
                    </ListItem>
                }

                {isAdminMode &&
                    <ListItem onClick={() => navigate('/start-draw')} style={{ cursor: 'pointer' }}>
                        <ListItemIcon>
                            <ListAltIcon />
                        </ListItemIcon>
                        <ListItemText primary="Start draw" />
                    </ListItem>

                }
            </List>
        </div>
    );}

export default Sidebar;
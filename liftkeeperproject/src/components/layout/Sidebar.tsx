import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';
import { useSelector } from '../../redux/store';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import PostAddIcon from '@mui/icons-material/PostAdd';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';

const Sidebar = () => {
    const navigate = useNavigate();
    const isAdminMode = useSelector((state) => state.player.isAdminMode);

    const sidebarStyles = {
        width: '220px',
        borderRight: '1px solid gray',
        minHeight: '90vh',
    };

    const listItemStyles = {
        cursor: 'pointer',
    };

    const createListItem = (text: string, icon: React.ReactNode, path: string) => (
        <ListItem onClick={() => navigate(path)} style={listItemStyles}>
            <ListItemIcon>
                {icon}
            </ListItemIcon>
            <ListItemText primary={text} />
        </ListItem>
    );

    return (
        <div style={sidebarStyles}>
            <List>
                {createListItem('My Tickets', <ConfirmationNumberIcon />, '/')}

                {isAdminMode 
                    ? createListItem('Generate Tickets', <PostAddIcon />, '/generate-tickets')
                    : createListItem('Purchase Ticket', <ShoppingBasketIcon />, '/purchase-ticket')
                }

                {isAdminMode && createListItem('Start draw', <PlayCircleFilledIcon />, '/start-draw')}
            </List>
        </div>
    );
}

export default Sidebar;

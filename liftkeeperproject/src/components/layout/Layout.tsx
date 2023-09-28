import { ReactNode } from 'react';
import { styled, Theme } from '@mui/material/styles';
import Sidebar from './Sidebar';

const APP_BAR_TOP = 10;

const RootStyle = styled('div')({
    display: 'flex',
    minHeight: '100%',
});

const MainStyle = styled('div')(({ theme }: { theme: Theme }) => ({
    flexGrow: 1,
  
    paddingTop: APP_BAR_TOP,
    paddingBottom: theme.spacing(10),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100%',
}));

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <RootStyle>
            <Sidebar />
            <MainStyle>
                {children}
            </MainStyle>
        </RootStyle>
    );
};

export default Layout;

import { ReactNode } from 'react';
import { styled } from '@mui/material/styles';
import Sidebar from './Sidebar';

const APP_BAR_TOP = 10;

const RootStyle = styled('div')({
    display: 'flex',
    minHeight: '100%',
    overflow: 'hidden'
});

const MainStyle = styled('div')(({ theme }) => ({
    flexGrow: 1,
    minHeight: '100%',
    overflow: 'auto',
    paddingTop: APP_BAR_TOP,
    paddingBottom: theme.spacing(10),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
}));

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
    <RootStyle>
        <Sidebar />
        <MainStyle>
            {children}
        </MainStyle>
    </RootStyle>
);

export default Layout;
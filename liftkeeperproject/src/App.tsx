import './App.css'
import PurchasedTickets from './components/commonComponents/PurchasedTickets';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { store, persistor } from './redux/store';
import Layout from './components/layout/Layout';
import TopAppBar from './components/layout/TopAppBar';
import LotteryDraw from './components/adminComponents/LotteryDraw';
import GenerateTickets from './components/adminComponents/GenerateTickets';
import LotteryNumberSelector from './components/playerComponents/LotteryNumberSelector';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BottomAppBar from './components/layout/BottomAppBar';

const theme = createTheme({
  palette: {
    primary: {
      main: '#007BFF'
    },
    secondary: {
      main: '#343a40'
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <TopAppBar />
            <Routes>
              <Route path="/" element={
                <Layout>
                  <PurchasedTickets />
                </Layout>
              } />

              <Route path="/purchase-ticket" element={
                <Layout>
                  <LotteryNumberSelector />
                </Layout>
              } />

              <Route path="/generate-tickets" element={
                <Layout>
                  <GenerateTickets />
                </Layout>
              } />

              <Route path="/start-draw" element={
                <Layout>
                  <LotteryDraw />
                </Layout>
              } />

            </Routes>
            <BottomAppBar />
          </Router>
        </PersistGate>
      </ReduxProvider>
    </ThemeProvider>

  );
}

export default App;
import './App.css'
import PurchasedTickets from './components/PurchasedTickets';  // Make sure you have this component
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { store, persistor } from './redux/store';
import LotteryNumberSelector from './components/Lottery';
import Layout from './components/Layout';
import TopAppBar from './components/TopAppBar';
import LotteryDraw from './components/LotteryDraw';
import GenerateTickets from './components/GenerateTickets';

function App() {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <TopAppBar />
        <Router>
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
        </Router>
      </PersistGate>
    </ReduxProvider>
  );
}

export default App;
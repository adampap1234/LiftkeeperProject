import { useState } from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { blue, grey } from '@mui/material/colors';
import { useDispatch, useSelector } from '../redux/store';
import { nanoid } from '@reduxjs/toolkit';
import { Ticket, addTickets } from '../redux/slices/ticketReducer';
import { updateBalance } from '../redux/slices/playerReducer';

function LotteryNumberSelector() {
  const dispatch = useDispatch();
  const TICKET_PRICE = 500;
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const balance = useSelector((state) => state.player.balance);
  const maxSelection = 5;
  const numbersPerRow = 7;

  const toggleNumberSelection = (number: number) => {
    if (selectedNumbers.includes(number)) {
      setSelectedNumbers(selectedNumbers.filter((n) => n !== number));
    } else if (selectedNumbers.length < maxSelection) {
      setSelectedNumbers([...selectedNumbers, number]);
    }
  };

  const purchaseTicket = () => {
    if (balance >= TICKET_PRICE && selectedNumbers.length === maxSelection) {
        const newTicket : Ticket = {
            id: nanoid(), 
            numbers: selectedNumbers,
            used: false,
            matched: [],
            earnings: 0,
            owner: 'player'
        };

        dispatch(addTickets([newTicket]));
        dispatch(updateBalance(-500));
        setSelectedNumbers([]);
    }
};

  const renderNumberRow = (startNumber: number) => {
    const rowNumbers = Array.from({ length: numbersPerRow }, (_, index) => startNumber + index);
    return (
      <div key={startNumber} style={{ display: 'flex', marginBottom: '10px' }}>
        {rowNumbers.map((number) => (
          <Button
            key={number}
            onClick={() => toggleNumberSelection(number)}
            style={{ width: '40px', height: '40px' }}
          >
            <Avatar
              sx={{
                width: '40px',
                height: '40px',
                backgroundColor: selectedNumbers.includes(number)
                  ? blue[500]
                  : grey[500],
                color: 'white',
                fontSize: '1rem',
              }}
            >
              {number}
            </Avatar>
          </Button>
        ))}
      </div>
    );
  };

  return (

    <>
      <Typography style={{ marginBottom: '20px' }} variant="h6">Select up to 5 lottery numbers:</Typography>
      {Array.from({ length: Math.ceil(39 / numbersPerRow) }, (_, index) =>
        renderNumberRow(index * numbersPerRow + 1)
      )}
      <Button variant="contained" color="primary" onClick={purchaseTicket} style={{ marginTop: '15px' }} disabled={selectedNumbers.length !== 5}>
        Buy Ticket ({TICKET_PRICE} akcse)
      </Button>
    </>

  );
}

export default LotteryNumberSelector;
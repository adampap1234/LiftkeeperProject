import { useState } from 'react';
import { TextField, Typography } from '@mui/material';
import { setName } from '../redux/slices/playerReducer';
import { useDispatch, useSelector } from '../redux/store';

const PlayerNameTextField = () => {
    const dispatch = useDispatch();
    const playerName = useSelector(state => state.player.name);
    const [isNameFocused, setIsNamedFocused] = useState(false);

    const handleNameChange = (name: string) => {
        dispatch(setName(name));
    };
    return (
        <div className="App">
            {!isNameFocused ? (
                <Typography
                    onClick={() => {
                        setIsNamedFocused(true);
                    }}
                >
                    {playerName}
                </Typography>
            ) : (
                <TextField
                    autoFocus
                    value={playerName}
                    onChange={event => handleNameChange(event.target.value)}
                    onBlur={() => setIsNamedFocused(false)}
                />
            )}
        </div>
    );
};

export default PlayerNameTextField;
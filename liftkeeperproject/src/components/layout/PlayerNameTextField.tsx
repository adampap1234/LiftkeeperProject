import { useState } from 'react';
import { TextField, Typography } from '@mui/material';
import { setName } from '../../redux/slices/playerReducer';
import { useDispatch, useSelector } from '../../redux/store';

const PlayerNameTextField = () => {
    const dispatch = useDispatch();
    const playerName = useSelector((state) => state.player.name);
    const [isNameFocused, setIsNameFocused] = useState(false);

    return (
        <>
            {isNameFocused ? (
                <TextField
                    autoFocus
                    value={playerName}
                    onChange={(event) => dispatch(setName(event.target.value))}
                    onBlur={() => setIsNameFocused(false)}
                />
            ) : (
                <Typography onClick={() => setIsNameFocused(true)}>
                    {playerName}
                </Typography>
            )}
        </>
    );
};

export default PlayerNameTextField;
import { AppBar, Toolbar, Grid, FormControlLabel, Switch } from '@mui/material';
import PlayerNameTextField from './PlayerNameTextField';
import BalanceLabel from './Balance';
import { useDispatch, useSelector } from '../../redux/store';
import { updateIsAdminMode } from '../../redux/slices/playerReducer';
import { useNavigate } from 'react-router-dom';

const TopAppBar = () => {
  const isAdminMode = useSelector((state) => state.player.isAdminMode);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = () => {
    dispatch(updateIsAdminMode(!isAdminMode));
    navigate({ pathname: '/' });
  };

  return (
    <>
      <AppBar position="fixed" color={isAdminMode ? 'secondary' : 'primary'}>
        <Toolbar>
          <Grid container alignItems={'center'} alignContent={'start'}>
            <Grid item xs={4} textAlign={'start'}>
              <FormControlLabel
                control={
                  <Switch checked={isAdminMode} onChange={handleChange} color='default' />
                }
                label={isAdminMode ? 'Admin' : 'Player'}
              />
            </Grid>

            <Grid item xs={4} textAlign='center'>
              {isAdminMode ? 'Admin mode' : <PlayerNameTextField />}
            </Grid>

            <Grid item xs={4} textAlign={'end'}>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <BalanceLabel />
              </div>

            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default TopAppBar;
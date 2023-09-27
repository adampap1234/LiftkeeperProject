import { FormControlLabel, Grid, Switch } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import PlayerNameTextField from './PlayerNameTextField';
import BalanceLabel from './Balance';
import { dispatch, useSelector } from '../redux/store';
import { updateIsAdminMode } from '../redux/slices/playerReducer';

const TopAppBar = () => {
  const isAdminMode = useSelector((state) => state.player.isAdminMode);

  const handleChange = () => { dispatch(updateIsAdminMode(!isAdminMode)) };

  return (
    <>
      <AppBar position="fixed" color={isAdminMode ? 'secondary' : 'primary'}>
        <Toolbar>
          <Grid container alignItems={'center'} alignContent={'start'}>
            <Grid xs={4} textAlign={'start'}>
              <FormControlLabel
                control={
                  <Switch checked={isAdminMode} onChange={handleChange} color='default' />
                }
                label={isAdminMode ? 'Admin' : 'Player'}
              />
            </Grid>
            <Grid xs={4} textAlign='center'>
              {isAdminMode ?
                'Admin mode'
                :
                <PlayerNameTextField />
              }

            </Grid>
            <Grid xs={4} textAlign={'end'}>
              <BalanceLabel />
            </Grid>
          </Grid>

        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default TopAppBar;
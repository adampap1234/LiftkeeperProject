import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// slices
import playerReducer from './slices/playerReducer';
import ticketReducer from './slices/ticketReducer';
import adminReducer from './slices/adminReducer';
// ----------------------------------------------------------------------

export const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

export const playerPersistConfig = {
  key: 'player',
  storage,
  keyPrefix: 'redux-',
};

export const adminPersistConfig = {
  key: 'admin',
  storage,
  keyPrefix: 'redux-',
};

export const ticketPersistConfig = {
  key: 'ticket',
  storage,
  keyPrefix: 'redux-',
};

const rootReducer = combineReducers({
  player: persistReducer(playerPersistConfig, playerReducer),
  ticket: persistReducer(ticketPersistConfig, ticketReducer),
  admin: persistReducer(adminPersistConfig, adminReducer),
});

export default rootReducer;
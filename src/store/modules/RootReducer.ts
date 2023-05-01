import { combineReducers } from '@reduxjs/toolkit';
import UserSlice from './UserSlice';
import UsersSlice from './UsersSlice';

export default combineReducers({
  user: UserSlice,
  users: UsersSlice,
});

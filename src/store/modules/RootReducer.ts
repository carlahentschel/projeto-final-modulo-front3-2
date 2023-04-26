import { combineReducers } from '@reduxjs/toolkit';
import UserSlice from './UserSlice';
import UsersSlice from './UsersSlice';
import TasksSlice from './TasksSlice';

export default combineReducers({
  user: UserSlice,
  users: UsersSlice,
  tasks: TasksSlice,
});

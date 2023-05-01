import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import UserType from '../../Types/UserType';
import TaskType from '../../Types/TaskType';

interface UserState {
  user: UserType;
}

const initialState: UserState = {
  user: { email: '', password: '', tasks: [] },
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => {
      return { user: action.payload };
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const id = action.payload;

      const index = state.user.tasks.findIndex((item) => item.id === id);
      // eslint-disable-next-line no-param-reassign
      state.user.tasks[index].favorite = !state.user.tasks[index].favorite;
    },
    logout: () => {
      return initialState;
    },
    addNewTask: (state, action: PayloadAction<TaskType>) => {
      state.user.tasks.push(action.payload);
    },
    updateTask: (state, action: PayloadAction<TaskType>) => {
      const task = action.payload;
      const index = state.user.tasks.findIndex((item) => item.id === task.id);

      // eslint-disable-next-line no-param-reassign
      state.user.tasks[index] = task;
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const index = state.user.tasks.findIndex((item) => item.id === id);

      state.user.tasks.splice(index, 1);
    },
  },
});

// eslint-disable-next-line max-len, prettier/prettier
export const {
  setUser, logout, toggleFavorite, addNewTask, updateTask, deleteTask,
} = UserSlice.actions;

export default UserSlice.reducer;

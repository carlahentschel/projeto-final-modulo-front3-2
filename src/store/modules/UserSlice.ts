import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';

import UserType from '../../Types/UserType';
import TaskType from '../../Types/TaskType';
import { RootState } from '..';
/* import type { RootState } from '../index'; */

interface UserState {
  user: UserType;
}

const adapter = createEntityAdapter<TaskType>({ selectId: (task) => task.id });

const initialState = {
  user: { email: '', password: '', tasks: adapter.getInitialState() },
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
      const { user } = state;
      const index = state.user.tasks.findIndex((item) => item.id === id);
      user.tasks[index].favorite = !user.tasks[index].favorite;

      return { user };
    },
    logout: () => {
      return initialState;
    },
  },
});

export const { setUser, toggleFavorite, logout } = UserSlice.actions;

export const { selectById, selectAll } = adapter.getSelectors((state: RootState) => state.user.user.tasks);
export default UserSlice.reducer;

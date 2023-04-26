import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import UserType from '../../Types/UserType';
import { RootState } from '..';

const adapter = createEntityAdapter<UserType>({ selectId: (user) => user.email });

export const UsersSlice = createSlice({
  name: 'users',
  initialState: adapter.getInitialState(),
  reducers: {
    addUser: adapter.addOne,
  },
});

export const { addUser } = UsersSlice.actions;
export const { selectById: selectByEmail, selectAll } = adapter.getSelectors((state: RootState) => state.users);

export default UsersSlice.reducer;

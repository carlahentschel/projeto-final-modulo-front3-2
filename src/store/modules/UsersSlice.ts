import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import UserType from '../../Types/UserType';
import { RootState } from '..';

const adapter = createEntityAdapter<UserType>({ selectId: (user) => user.email });

export const UsersSlice = createSlice({
  name: 'users',
  initialState: adapter.getInitialState(),
  reducers: {
    addUser: adapter.addOne,
    updateUser: adapter.updateOne,
  },
});

export const { addUser, updateUser } = UsersSlice.actions;
export const { selectById: selectByEmail } = adapter.getSelectors((state: RootState) => state.users);

export default UsersSlice.reducer;

import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState, store } from '..';
import TaskType from '../../Types/TaskType';

const adapter = createEntityAdapter<TaskType>({ selectId: (task) => task.id });

export const TasksSlice = createSlice({
  name: 'tasks',
  initialState: adapter.getInitialState(),
  reducers: {
    addTask: adapter.addOne,
    editTask: adapter.updateOne,
    deleteTask: adapter.removeOne,
    /* toggleFavorite: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const { user } = state;
      const index = state.tasks.findIndex((item) => item.userId === userId);
      user.tasks[index].favorite = !user.tasks[index].favorite;

      return { user };
    }, */
  },
});

export const { addTask, editTask, deleteTask } = TasksSlice.actions;
export const { selectById, selectAll } = adapter.getSelectors((state: RootState) => state.tasks);
// export const getTasksUser = (userId: string) => selectAll(store.getState()).filter((item) => item.userId === userId);
export default TasksSlice.reducer;

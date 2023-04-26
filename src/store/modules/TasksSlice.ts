import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import TaskType from '../../Types/TaskType';

const adapter = createEntityAdapter<TaskType>({ selectId: (task) => task.id });

export const TasksSlice = createSlice({
  name: 'tasks',
  initialState: adapter.getInitialState(),
  reducers: {
    addTask: adapter.addOne,
    editTask: adapter.updateOne,
    deleteTask: adapter.removeOne,
  },
});

export const { addTask, editTask, deleteTask } = TasksSlice.actions;
export const { selectById, selectAll } = adapter.getSelectors((state: RootState) => state.tasks);

export default TasksSlice.reducer;

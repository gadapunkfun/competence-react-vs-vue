import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DateTime } from "luxon";
import { getTodos, addTodo as addTodoApi } from "../api/todoApi";
import { TodoItem } from "../models/TodoItem";
import type { AppThunk, RootState } from "./index";

interface TodoState {
  todos: TodoItem[];
  isLoading: boolean;
}

const initialState: TodoState = {
  todos: [],
  isLoading: false,
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    fetchTodosStart: (state) => {
      state.isLoading = true;
    },
    fetchTodosSuccess: (state, action: PayloadAction<TodoItem[]>) => {
      state.todos = action.payload;
      state.isLoading = false;
    },
    addTodo: (state, action: PayloadAction<TodoItem>) => {
      state.todos.push(action.payload);
    },
    removeTodo: (state, action: PayloadAction<TodoItem>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
    },
    finishTodo: (state, action: PayloadAction<TodoItem>) => {
      const todoToFinish = state.todos.find(
        (todo) => todo.id === action.payload.id
      );
      if (todoToFinish) {
        todoToFinish.isDone = true;
        todoToFinish.completed = DateTime.now().toISODate();
      }
    },
  },
});

export const { removeTodo, finishTodo } = todoSlice.actions;

export const fetchTodos = (): AppThunk => async (dispatch) => {
  try {
    dispatch(todoSlice.actions.fetchTodosStart());
    const todos = await getTodos();
    dispatch(todoSlice.actions.fetchTodosSuccess(todos));
  } catch (err) {
    console.log(err);
  }
};

export const addTodo =
  (todo: TodoItem): AppThunk =>
  async (dispatch) => {
    try {
      await addTodoApi(todo);
      dispatch(todoSlice.actions.addTodo(todo));
    } catch (err) {
      console.log(err);
    }
  };

const selectTodoState = (rootState: RootState) => rootState.todo;

export const todosSelector = createSelector(
  selectTodoState,
  (todoState: TodoState) => todoState.todos
);

export const todosIsLoadingSelector = createSelector(
  selectTodoState,
  (todoState: TodoState) => todoState.isLoading
);

export default todoSlice.reducer;

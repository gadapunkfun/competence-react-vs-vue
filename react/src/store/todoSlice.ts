import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DateTime } from "luxon";
import * as todoApi from "../api/todoApi";
import { TodoItem } from "../models/TodoItem";
import type { AppThunk, RootState } from "./index";

interface TodoState {
  todos: TodoItem[];
  isLoading: boolean;
  showExpanded: boolean;
}

const initialState: TodoState = {
  todos: [],
  isLoading: false,
  showExpanded: false,
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
    updateTodo: (state, action: PayloadAction<TodoItem>) => {
      state.todos = state.todos.map((t) =>
        t.id === action.payload.id ? action.payload : t
      );
    },
    showExpanded: (state, action: PayloadAction<boolean>) => {
      state.showExpanded = action.payload;
    },
  },
});

export const { showExpanded } = todoSlice.actions;

export const fetchTodos = (): AppThunk => async (dispatch) => {
  try {
    dispatch(todoSlice.actions.fetchTodosStart());
    const todos = await todoApi.getTodos();
    dispatch(todoSlice.actions.fetchTodosSuccess(todos));
  } catch (err) {
    console.log(err);
  }
};

export const addTodo =
  (todo: TodoItem): AppThunk =>
  async (dispatch) => {
    try {
      await todoApi.addTodo(todo);
      dispatch(todoSlice.actions.addTodo(todo));
    } catch (err) {
      console.log(err);
    }
  };

export const removeTodo =
  (todo: TodoItem): AppThunk =>
  async (dispatch) => {
    try {
      await todoApi.removeTodo(todo);
      dispatch(todoSlice.actions.removeTodo(todo));
    } catch (err) {
      console.log(err);
    }
  };

export const finishTodo =
  (todo: TodoItem): AppThunk =>
  async (dispatch) => {
    try {
      todo.isDone = true;
      todo.completed = DateTime.now().toISODate();
      await todoApi.updateTodo(todo);
      dispatch(todoSlice.actions.updateTodo(todo));
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

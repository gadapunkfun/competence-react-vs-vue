import { TodoItem } from "../models/TodoItem";

export const getTodos = async (): Promise<TodoItem[]> => {
  const todosJson = localStorage.getItem("todos");
  const todos = todosJson ? (JSON.parse(todosJson) as TodoItem[]) : [];
  return fakeDelayedResponse(todos, 500);
};

export const addTodo = async (todo: TodoItem): Promise<TodoItem> => {
  const todosJson = localStorage.getItem("todos");
  const todos = todosJson ? (JSON.parse(todosJson) as TodoItem[]) : [];

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));

  return fakeDelayedResponse(todo, 500);
};

export const updateTodo = async (todo: TodoItem): Promise<TodoItem> => {
  const todosJson = localStorage.getItem("todos");
  let todos = todosJson ? (JSON.parse(todosJson) as TodoItem[]) : [];

  todos = todos.map((t) => (t.id === todo.id ? todo : t));
  localStorage.setItem("todos", JSON.stringify(todos));

  return fakeDelayedResponse(todo, 500);
};

export const removeTodo = async (todo: TodoItem): Promise<boolean> => {
  const todosJson = localStorage.getItem("todos");
  let todos = todosJson ? (JSON.parse(todosJson) as TodoItem[]) : [];

  todos = todos.filter((t) => t.id !== todo.id);
  localStorage.setItem("todos", JSON.stringify(todos));

  return fakeDelayedResponse(true, 500);
};

const fakeDelayedResponse = async <T>(
  response: T,
  delayInMsSeconds: number
): Promise<T> => {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(response);
    }, delayInMsSeconds);
  });
};

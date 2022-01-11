import { DateTime } from "luxon";
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

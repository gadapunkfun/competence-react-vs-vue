import React from "react";
import { TodoItem } from "../models/TodoItem";

interface ITodoList {
  todo: TodoItem;
}

const TodoList = ({ todo }: ITodoList) => {
  return <li>{todo.content}</li>;
};

export default TodoList;

import { DateTime } from "luxon";
import React from "react";
import { useDispatch } from "react-redux";
import { TodoItem } from "../models/TodoItem";
import { finishTodo } from "../store/todoSlice";

interface ITodoList {
  todo: TodoItem;
}

const TodoList = ({ todo }: ITodoList) => {
  const dispatch = useDispatch();
  const formattedDate = DateTime.fromISO(todo.created).toLocaleString(
    DateTime.DATETIME_MED
  );

  const finishTodoItem = () => {
    dispatch(finishTodo(todo));
  };
  return (
    <li className="card">
      <div className="card--content">
        <div className="card--content--text">
          <h5>{todo.content}</h5>
          <small>Created: {formattedDate}</small>
          <small>Done: {todo.isDone ? "Yes" : "No"}</small>
        </div>
        <div className="checkboxClass" onClick={finishTodoItem}>
          check
        </div>
      </div>
    </li>
  );
};

export default TodoList;

import { DateTime } from "luxon";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import {
  addTodo,
  fetchTodos,
  todosIsLoadingSelector,
  todosSelector,
} from "../store/todoSlice";
import TodoListItem from "./TodoListItem";

const TodoList = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(todosIsLoadingSelector);
  const todos = useSelector(todosSelector);
  const [newTodoContent, setNewTodoContent] = useState("");

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const onAddTodo = () => {
    if (newTodoContent) {
      const newTodo = {
        id: uuid(),
        content: newTodoContent,
        isDone: false,
        created: DateTime.now().toISODate(),
      };
      dispatch(addTodo(newTodo));
      setNewTodoContent("");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      <div className="todo--input">
        <input
          name="New todo"
          value={newTodoContent}
          onChange={(e) => setNewTodoContent(e.target.value)}
        />
        <button onClick={onAddTodo}>Add todo</button>
      </div>
      {todos.length ? (
        <ul>
          {todos.map((todo) => (
            <TodoListItem key={todo.id} todo={todo} />
          ))}
        </ul>
      ) : (
        <div>No todos</div>
      )}
    </section>
  );
};

export default TodoList;

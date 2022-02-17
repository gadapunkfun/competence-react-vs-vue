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

export const updateTodoStatus = async (id: number): Promise<TodoItem | undefined> => {
	const todosJson = localStorage.getItem("todos");
	const todos = todosJson ? (JSON.parse(todosJson) as TodoItem[]) : [];

	const currentTodoIndex = todos.findIndex((t) => t.id === id);
	if (currentTodoIndex >= 0) {
		todos[currentTodoIndex].isDone = !todos[currentTodoIndex].isDone;
		if (todos[currentTodoIndex].isDone) {
			todos[currentTodoIndex].completed = new Date().toLocaleDateString("ja-JP", {
				weekday: "long",
				year: "numeric",
				month: "short",
				day: "2-digit"
			});
		} else {
			todos[currentTodoIndex].completed = undefined;
		}
		localStorage.setItem("todos", JSON.stringify(todos));

		return fakeDelayedResponse(todos[currentTodoIndex], 500);
	}
	return fakeDelayedResponse(undefined, 0);
};

export const updateContentForTodo = async (id: number, todoContent: string): Promise<TodoItem | undefined> => {
	const todosJson = localStorage.getItem("todos");
	const todos = todosJson ? (JSON.parse(todosJson) as TodoItem[]) : [];

	const currentTodoIndex = todos.findIndex((t) => t.id === id);
	if (currentTodoIndex >= 0) {
		todos[currentTodoIndex].content = todoContent;
		localStorage.setItem("todos", JSON.stringify(todos));

		return fakeDelayedResponse(todos[currentTodoIndex], 500);
	}
	return fakeDelayedResponse(undefined, 500);
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

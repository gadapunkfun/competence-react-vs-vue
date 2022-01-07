import { createStore } from "vuex";
import { TodoItem } from "@/models/TodoItem";

const ADD_TODO = "addTodos";
const REMOVE_TODO = "removeTodos";

export default createStore({
	state: {
		currentTodos: localStorage.currentTodos ? JSON.parse(localStorage.currentTodos) as TodoItem[] : [] as TodoItem[],
	},
	getters: {
		todos(state) {
			return state.currentTodos
		}
	},
	mutations: {
		[ADD_TODO](state, todoItem: TodoItem) {
			if (todoItem) {
				state.currentTodos.push(todoItem);
			}
		},
		[REMOVE_TODO](state, todoItem: TodoItem) {
			const indexOfTodo = state.currentTodos.findIndex(todo => todo == todoItem);
			if (todoItem && indexOfTodo >= 0) {
				state.currentTodos = state.currentTodos.filter(todo => todo != todoItem)
			}
		}
	}
});
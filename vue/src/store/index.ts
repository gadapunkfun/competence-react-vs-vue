import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import * as todoAPI from "@/api/todoApi";
import { TodoItem } from "@/models/TodoItem";
import { TodoState } from "@/models/store/todo/TodoState";
import { TodoMutationTypes } from "@/models/store/todo/TodoMutationTypes";

export interface State extends TodoState {
	emptyValue: null;
}

export const key: InjectionKey<Store<State>> = Symbol();

export default createStore<State>({
	state: {
		emptyValue: null,
		currentTodos: [],
	},
	getters: {
		todos: (state) => state.currentTodos,
	},
	actions: {
		async fetchTodos({ commit }) {
			const todos = await todoAPI.getTodos();
			commit(TodoMutationTypes.FETCH_TODOS_SUCCESS, todos);
		},
		async addTodo({ commit }, todoItem: TodoItem) {
			await todoAPI.addTodo(todoItem);
			commit(TodoMutationTypes.ADD_TODO, todoItem);
		},
		async removeTodo(store, todoItem: TodoItem) {
			await todoAPI.removeTodo(todoItem);
			store.commit(TodoMutationTypes.REMOVE_TODO, todoItem);
		},
		async finishTodo(store, todoItem: TodoItem) {
			const todo = await todoAPI.updateTodoStatus(todoItem.id);
			store.commit(TodoMutationTypes.UPDATE_TODO, todo);
		},
		updateTodos(store) {
			store.commit(TodoMutationTypes.UPDATE_TODOS);
		},
	},
	mutations: {
		[TodoMutationTypes.FETCH_TODOS_SUCCESS](state, todoItems: TodoItem[]) {
			state.currentTodos = todoItems;
		},
		[TodoMutationTypes.ADD_TODO](state, todoItem: TodoItem) {
			if (todoItem && todoItem.content) {
				state.currentTodos.push(todoItem);
			}
		},
		[TodoMutationTypes.REMOVE_TODO](state, todoItem: TodoItem) {
			const indexOfTodo = state.currentTodos.findIndex(
				(todo) => todo == todoItem
			);
			if (todoItem && indexOfTodo >= 0) {
				state.currentTodos = state.currentTodos.filter(
					(todo) => todo != todoItem
				);
			}
		},
		[TodoMutationTypes.UPDATE_TODO](state, todoItem: TodoItem) {
			const indexOfTodo = state.currentTodos.findIndex(
				(todo) => todo.id == todoItem.id
			);
			if (todoItem != null && indexOfTodo >= 0) {
				state.currentTodos[indexOfTodo] = todoItem;
			}
		},
		[TodoMutationTypes.UPDATE_TODOS](state: State) {
			localStorage.setItem("currentTodos", JSON.stringify(state.currentTodos));
		},
	},
});

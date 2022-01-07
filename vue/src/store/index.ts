import { TodoItem } from "@/models/TodoItem";
import { InjectionKey } from "vue";
import { createStore, Store } from 'vuex'

export interface State {
	currentTodos: TodoItem[];
}

export enum MutationTypes {
	ADD_TODO = "addTodo",
	REMOVE_TODO = "removeTodo",
	FINISH_TODO = "finishTodo",
	UPDATE_TODOS = "updateTodos"
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
	state: {
		currentTodos: localStorage.currentTodos ? JSON.parse(localStorage.currentTodos) : [],
	},
	actions: {
		addTodo(store, todoItem: TodoItem) {
			store.commit(MutationTypes.ADD_TODO, todoItem);
		},
		removeTodo(store, todoItem: TodoItem) {
			store.commit(MutationTypes.REMOVE_TODO, todoItem);
		},
		finishTodo(store, todoItem: TodoItem) {
			store.commit(MutationTypes.FINISH_TODO, todoItem);
		},
		updateTodos(store) {
			store.commit(MutationTypes.UPDATE_TODOS);
		}
	},
	mutations: {
		[MutationTypes.ADD_TODO](state, todoItem: TodoItem) {
			if (todoItem) {
				state.currentTodos.push(todoItem);
			}
		},
		[MutationTypes.REMOVE_TODO](state, todoItem: TodoItem) {
			const indexOfTodo = state.currentTodos.findIndex(todo => todo == todoItem);
			if (todoItem && indexOfTodo >= 0) {
				state.currentTodos = state.currentTodos.filter(todo => todo != todoItem)
			}
		},
		[MutationTypes.FINISH_TODO](state, todoItem: TodoItem) {
			const indexOfTodo = state.currentTodos.findIndex(todo => todo == todoItem);
			if (todoItem && indexOfTodo >= 0) {
				state.currentTodos[indexOfTodo].isDone = !state.currentTodos[indexOfTodo].isDone;
				localStorage.setItem("currentTodos", JSON.stringify(state.currentTodos));
			}
		},
		[MutationTypes.UPDATE_TODOS](state: State) {
			localStorage.setItem("currentTodos", JSON.stringify(state.currentTodos));
		}
	}
})

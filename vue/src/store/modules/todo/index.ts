// import { InjectionKey } from "vue";
import { Store } from 'vuex';
//     import {
//     Store as VuexStore,
//     DispatchOptions,
//     CommitOptions,
//     Module,
// } from 'vuex';
import { State } from '@/store'
import { TodoItem } from "@/models/TodoItem";
import { TodoState } from "@/models/store/todo/TodoState";
import { TodoMutationTypes } from "@/models/store/todo/TodoMutationTypes";

// const key: InjectionKey<Store<TodoState>> = Symbol();

// state: {
//     currentTodos: localStorage.currentTodos ? JSON.parse(localStorage.currentTodos) : [],
// },

const todoStore = {
	actions: {
		addTodo(store: Store<State>, todoItem: TodoItem) {
			store.commit(TodoMutationTypes.ADD_TODO, todoItem);
		},
		removeTodo(store: Store<State>, todoItem: TodoItem) {
			store.commit(TodoMutationTypes.REMOVE_TODO, todoItem);
		},
		finishTodo(store: Store<State>, todoItem: TodoItem) {
			store.commit(TodoMutationTypes.FINISH_TODO, todoItem);
		},
		updateTodos(store: Store<State>) {
			store.commit(TodoMutationTypes.UPDATE_TODOS);
		}
	},
	mutations: {
		[TodoMutationTypes.ADD_TODO](state: Store<State>, todoItem: TodoItem) {
			if (todoItem && todoItem.content) {
				state.state.currentTodos.push(todoItem);
			}
		},
		[TodoMutationTypes.REMOVE_TODO](state: Store<State>, todoItem: TodoItem) {
			const indexOfTodo = state.state.currentTodos.findIndex(todo => todo == todoItem);
			if (todoItem && indexOfTodo >= 0) {
				state.state.currentTodos = state.state.currentTodos.filter(todo => todo != todoItem)
			}
		},
		[TodoMutationTypes.FINISH_TODO](state: Store<State>, todoItem: TodoItem) {
			const indexOfTodo = state.state.currentTodos.findIndex(todo => todo == todoItem);
			if (todoItem && indexOfTodo >= 0) {
            state.state.currentTodos[indexOfTodo].isDone = !state.state.currentTodos[indexOfTodo].isDone;
				localStorage.setItem("currentTodos", JSON.stringify(state.state.currentTodos));
			}
		},
		[TodoMutationTypes.UPDATE_TODOS](state: TodoState) {
			localStorage.setItem("currentTodos", JSON.stringify(state.currentTodos));
		}
	}
};
  
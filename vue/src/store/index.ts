import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import { TodoItem } from "@/models/TodoItem";
import { addTodo as addTodoApi, getTodos } from "@/api/todoApi";
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
    async fetchTodos({ commit }, todoItem: TodoItem) {
      const todos = await getTodos();
      commit(TodoMutationTypes.ADD_TODO, todoItem);
    },
    async addTodo({ commit }, todoItem: TodoItem) {
      await addTodoApi(todoItem);
      commit(TodoMutationTypes.ADD_TODO, todoItem);
    },
    removeTodo(store, todoItem: TodoItem) {
      store.commit(TodoMutationTypes.REMOVE_TODO, todoItem);
    },
    finishTodo(store, todoItem: TodoItem) {
      store.commit(TodoMutationTypes.FINISH_TODO, todoItem);
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
    [TodoMutationTypes.FINISH_TODO](state, todoItem: TodoItem) {
      const indexOfTodo = state.currentTodos.findIndex(
        (todo) => todo == todoItem
      );
      if (todoItem && indexOfTodo >= 0) {
        state.currentTodos[indexOfTodo].isDone =
          !state.currentTodos[indexOfTodo].isDone;
        localStorage.setItem(
          "currentTodos",
          JSON.stringify(state.currentTodos)
        );
      }
    },
    [TodoMutationTypes.UPDATE_TODOS](state: State) {
      localStorage.setItem("currentTodos", JSON.stringify(state.currentTodos));
    },
  },
});

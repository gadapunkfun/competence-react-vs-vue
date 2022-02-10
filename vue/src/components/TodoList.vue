<template>
  <n-grid :x-gap="10" :y-gap="5" :cols="4">
    <n-gi span="24">
      <n-input-group>
        <n-input
          v-model:value="todoContent"
          type="text"
          size="medium"
          clearable
          rese
          @keydown.enter="addTodo"
          @keyup.enter="todoContent = ''"
        ></n-input>
        <n-button type="primary" size="medium" @click="addTodo"
          >Add todo</n-button
        >
      </n-input-group>
    </n-gi>
    <n-gi v-for="(todoItem, index) in todos" :key="index">
      <todo-list-item :todoItem="todoItem" />
    </n-gi>
  </n-grid>
</template>

<script>
import store from "@/store";
import { TodoItem } from "@/models/TodoItem";
import TodoListItem from "@/components/TodoListItem.vue";
import { TodoMutationTypes } from "@/models/store/todo/TodoMutationTypes";

export default {
  components: {
    TodoListItem,
  },
  data() {
    return {
      todos: store.state.currentTodos,
      todoContent: "",
    };
  },
  methods: {
    addTodo() {
      store.dispatch(
        TodoMutationTypes.ADD_TODO,
        new TodoItem(this.todoContent)
      );
      this.todoContent = "";
    },
  },
  mounted() {
    store.dispatch("fetchTodos");
  },
};
</script>

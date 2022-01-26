<template>
	<!-- <div class="container">
		<div class="todo">
			<div class="todo--input">
				<input v-model="todoContent" type="text" name="New todo" />
				<button @click="addTodo">Add todo</button>
			</div>
			<div v-if="todos.length > 0" class="todo--todos">
				<todo-list-item
					v-for="(todoItem, index) in todos"
					:todoItem="todoItem"
					:key="index"
				/>
			</div>
			<div v-else>
				<h3>No todos</h3>
			</div>
		</div>
	</div>-->
	<n-space vertical>
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
			<n-button type="primary" size="medium" @click="addTodo">Add todo</n-button>
		</n-input-group>
	</n-space>
	<n-grid :cols="3">
		<n-gi v-for="(todoItem, index) in todos" :key="index">
			<todo-list-item :todoItem="todoItem" />
		</n-gi>
	</n-grid>
</template>

<script lang="ts">
import { store } from "@/store";
import { defineComponent } from "vue";
import { TodoItem } from "@/models/TodoItem";
import TodoListItem from "@/components/TodoListItem.vue";
import { TodoMutationTypes } from "@/models/Store/MutationTypes/TodoMutationTypes";

export default defineComponent({
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
			store.dispatch(TodoMutationTypes.ADD_TODO, new TodoItem(this.todoContent));
		},
	},
});
</script>
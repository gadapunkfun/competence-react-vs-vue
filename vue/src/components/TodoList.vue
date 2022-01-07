<template>
	<div class="container">
		<div class="todo">
			<div class="todo--input">
				<input v-model="todoContent" type="text" name="New todo" />
				<button @click="addTodoItem">Add todo</button>
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
	</div>
</template>

<script lang="ts">
import { DateTime } from "luxon";
import { defineComponent } from "vue";
import { MutationTypes, store } from "@/store";
import { TodoItem } from "@/models/TodoItem";
import TodoListItem from "@/components/TodoListItem.vue";

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
			store.dispatch(MutationTypes.ADD_TODO, {
				content: this.todoContent,
				isDone: false,
				created: DateTime.now(),
			} as TodoItem);
		},
	},
});
</script>
<style lang="stylus">
.container {
	display: grid;
	place-content: center;
	height: 50vh;
	width: 100vw;
}

.todo {
	&--input {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
}
</style>
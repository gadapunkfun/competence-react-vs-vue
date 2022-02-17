<template>
	<n-card title="Todo item:" size="medium">
		<n-grid :x-gap="10" :y-gap="5" :cols="2">
			<n-gi>{{ todoItem.content }}</n-gi>
			<n-gi>
				<n-space justify="end">
					<div :class="todoItem.isDone ? 'task--success' : 'task-danger'">{{ todoItem.isDone }}</div>
				</n-space>
			</n-gi>
		</n-grid>

		<!-- <n-space @click="finishTodoItem" align="end"></n-space> -->

		<template #footer>
			<small>Created: {{ todoItem.created }}</small>
		</template>
	</n-card>
</template>

<script lang="ts">
import { mapActions } from "vuex";
import { TodoItem } from "@/models/TodoItem";
import { defineComponent, PropType } from "vue";

export default defineComponent({
	props: {
		todoItem: {} as PropType<TodoItem>,
	},
	computed: {
		checkboxClass(): string {
			const baseClass = "card--content--checkbox";
			return this.todoItem?.isDone
				? `${baseClass}--success`
				: `${baseClass}--failed`;
		},
	},
	methods: {
		...mapActions(["finishTodo"])
	},
});
</script>
<style lang="stylus" scoped>
.task {
	height: 100%;

	&--success {
		background: green;
	}

	&--danger {
		background: #990c60;
	}
}
</style>
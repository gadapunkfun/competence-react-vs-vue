<template>
	<div class="card">
		<div class="card--content">
			<div class="card--content--text">
				<h5>{{ todoItem.content }}</h5>
				<small>Created: {{ formattedDate }}</small>
			</div>
			<div :class="checkboxClass" @click="finishTodoItem"></div>
		</div>
	</div>
</template>

<script lang="ts">
import { TodoItem } from "@/models/TodoItem";
import { store } from "@/store";
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
		formattedDate(): string {
			if (this.todoItem) {
				return this.todoItem?.created.toString();
			}
			return "---";
		},
	},
	methods: {
		finishTodoItem() {
			store.commit("finishTodo", this.todoItem);
		},
	},
});
</script>
<style lang="stylus">
.card {
	height: 100%;
	width: 300px;
	background: #705E78;
	color: #fff;
	margin-bottom: 10px;

	&--content {
		display: grid;
		grid-template-columns: 90% 10%;
		grid-template-row: 100%;

		&--text {
			width: 90%;
			text-align: left;
			padding: 5px;
		}

		&--checkbox {
			width: 10%;
			display: block;
			height: 100%;

			&--success {
				background-color: #F3FEB0;
			}

			&--failed {
				background-color: #812F33;
			}
		}
	}
}
</style>
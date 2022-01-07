<template>
	<todo-list />
</template>

<script lang="ts">
import TodoList from "@/components/TodoList.vue";
import { Options, Vue } from "vue-class-component";

@Options({
	components: {
		TodoList,
	},
})
export default class Home extends Vue {}
</script>

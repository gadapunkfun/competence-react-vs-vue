<template>
	<n-config-provider :theme="darkTheme" :theme-overrides="themeOptions">
		<n-layout position="absolute">
			<n-layout-content>
				<router-view />
			</n-layout-content>
		</n-layout>
	</n-config-provider>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { darkTheme, GlobalThemeOverrides } from 'naive-ui'

export default defineComponent({
	setup() {
		const themeOptions: GlobalThemeOverrides = {
			common: {
				bodyColor: "#2c3e50",
			}
		};
		return {
			darkTheme,
			themeOptions
		};
	},
});
</script>

<style lang="stylus">
body {
	background: #dce4eb;
}

#app {
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
	margin-top: 60px;
}
</style>

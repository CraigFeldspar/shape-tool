<template>
	<button class="shape-button" v-on:click="onClick">
		{{ text }}
	</button>
</template>
<script>
	export default {
		props: {
			onClick: {
				default: () => console.log("Behaviour not defined !"),
				type: Function
			},
			text: {
				default: "TODO",
				type: String
			}
		}
	}
</script>
<style>
	.shape-button {
		padding: 5px;
		background-color: teal;
		font-size: 1.4em;
		color: black;
		border: 1px solid black;
	}
</style>
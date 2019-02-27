<template>
	<div id="app">
		<Drawing ref="drawing"/>
		<Canvas ref="canvas"/>
	</div>
</template>
<script>
	import Drawing from '../drawing/src/vues/index.vue'
	import Canvas from '../canvas/src/vues/index.vue'

	export default {
		components: {
			Drawing,
			Canvas
		}
	}
</script>
<style>
</style>
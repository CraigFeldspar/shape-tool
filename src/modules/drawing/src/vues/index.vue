<template>
	<div id="top-bar">
		<ShapeButton v-bind:onClick="drawRectangle" v-bind:text="'Rectangle'"/>
		<ShapeButton v-bind:onClick="drawCircle" v-bind:text="'Circle'" />
		<ShapeButton v-bind:onClick="drawLine" v-bind:text="'Line'" />
		<ShapeButton v-bind:onClick="clear" v-bind:text="'CLEAR'" />
		<ShapeButton v-bind:onClick="save" v-bind:text="'SAVE'" />
	</div>
</template>
<script>
	import ShapeButton from "./shape-button.vue";

	let drawRectangle = function() {
		this.startDrawing(1);
	};

	let drawCircle = function() {
		this.startDrawing(2);
	};

	let drawLine = function() {
		this.startDrawing(3);
	};

	export default {
		data: function() {
			return {
				startDrawing: () => {},
				clear: () => {},
				save: () => {},
			}
		},
		methods: {
			drawRectangle,
			drawCircle,
			drawLine,
		},
		components: {
			ShapeButton
		}
	}
</script>
<style>
	#top-bar {
		position: absolute;
		top: 0px;
		left: 0px;
		width: 100vw;
		height: 50px;
		display: flex;
		justify-content: space-around;
	}
</style>
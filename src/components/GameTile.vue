<template>
	<div
		class="az-tile"
		:style="style"
	>
		<div class="az-tile__wall" />
	</div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{
	tile: number
	x: number
	y: number
}>()

const style = computed(() => ({
	left: props.x * props.tile + 'px',
	top: props.y * props.tile + 'px'
}))
</script>

<style lang="scss" scoped>
.az-tile {
	position: absolute;
	width: 48px;
	height: 48px;

    &:has(.az-tile__wall) {
        border: 0.5px solid $color-milk-300
    }

	&__wall {
		width: 47px;
		height: 47px;
		background: $color-milk-200;
		border: 23.5px solid;
		border-color: $color-milk-100 rgba(0,0,0,0.05) rgba(0,0,0,0.15) rgba(0,0,0,0.05);
	}
}
</style>
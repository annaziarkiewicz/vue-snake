<template>
	<div class="az-board">
		<GameTile
			v-for="(wall, index) in map.walls.value"
			:key="index"
			:x="wall.x"
			:y="wall.y"
			:tile="tile"
		/>

		<GameFood
			:tile="tile"
			:cherries="snakeFood.cherries.value"
			:heart="snakeFood.heart.value"
			:scissors="snakeFood.scissors.value"
		/>

		<GameCharacterSnake
			:snake="snakeMovement.snake.value.segments"
			:tile="tile"
		/>

		<slot />
	</div>
</template>

<script lang="ts" setup>
import { onMounted, watch } from 'vue'

import GameCharacterSnake from '@/components/GameCharacterSnake.vue'
import GameFood from '@/components/GameFood.vue'
import GameTile from '@/components/GameTile.vue'

import { maps } from '@/maps'
import { useSnakeFood } from '@/composables/useSnakeFood'
import { useSnakeLoop } from '@/composables/useSnakeLoop'
import { useSnakeMap } from '@/composables/useSnakeMap'
import { useSnakeMovement } from '@/composables/useSnakeMovement'

import type { MapName } from '@/maps'
import type { Lives } from '@/types/snake'

const props = defineProps<{
	actionDelay: number
	isLifeLost: boolean
	lives: Lives
	mapName: MapName
	paused: boolean
	isFrozen: boolean
	score: { current: number; target: number }
}>()

const emit = defineEmits<{
	(e: 'life-lost'): void
	(e: 'lost'): void
	(e: 'score', v: number): void
	(e: 'life', v: Lives): void
}>()

const tile = 48

const map = useSnakeMap(maps[props.mapName])

const snakeMovement = useSnakeMovement({
	cols: map.cols.value,
	rows: map.rows.value,
	startLength: 3,
	isWall: (x, y) => map.isWall(x, y),
	isPaused: () => props.paused,
	isFrozen: () => props.isFrozen
})

const isOccupied = (x: number, y: number): boolean =>
	map.isWall(x, y) ||
	snakeMovement.snake.value.segments.some(s => s.x === x && s.y === y)

const snakeFood = useSnakeFood({
	cols: map.cols.value,
	rows: map.rows.value,
	occupied: isOccupied,
	lives: () => props.lives,
	paused: () => props.paused
})

const initSnake = () => {
	snakeMovement.init(map.spawn.value)
	snakeFood.init()
}

const shrinkSnake = () => {
	snakeMovement.shrinkToStart()
}

const handleFood = (x: number, y: number) => {
	const result = snakeFood.eatAt(x, y)
	if (!result) return

	if (result.type === 'cherry') {
		emit('score', 10)
		snakeMovement.grow()
		return
	}

	if (result.type === 'heart' && props.lives.current < props.lives.max) {
		emit('life', {
			...props.lives,
			current: props.lives.current + 1
		})
		return
	}

	if (result.type === 'scissors') {
		shrinkSnake()
	}
}

const handleCollision = () => {
	emit('life-lost')
	emit('lost')
}

const updateGame = () => {
	if (props.isLifeLost) return
	if (props.paused) return

	const result = snakeMovement.move()

	if (result.type === 'collision') {
		handleCollision()
		return
	}

	if (result.type === 'move') {
		handleFood(result.head.x, result.head.y)
	}
}

useSnakeLoop(updateGame, () => 400)

onMounted(() => {
	initSnake()
})

watch(
	() => props.mapName,
	name => {
		map.setMap(maps[name])
		snakeMovement.repositionKeepLength(map.spawn.value)
		snakeFood.init()
	}
)
</script>

<style lang="scss" scoped>
.az-board {
	position: relative;
	width: 960px;
	height: 576px;
	background-color: $color-milk-300;
	background-image:
		repeating-linear-gradient(45deg, $color-milk-300 25%, transparent 25%, transparent 75%, $color-milk-300 75%, $color-milk-300),
		repeating-linear-gradient(45deg, $color-milk-300 25%, #B3B3AC 25%, #B3B3AC 75%, $color-milk-300 75%, $color-milk-300);
	background-position: 0 0, 48px 48px;
	background-size: 96px 96px;
	border: 24px solid $color-milk-200;
	outline: none;
}
</style>
<template>
	<div
		v-for="(cherry, index) in cherries"
		:key="`cherry-${index}`"
		class="az-food"
		:style="{ left: cherry.x * tile + 'px', top: cherry.y * tile + 'px' }"
	>
		<GameFoodCherry />
	</div>

	<div
		v-if="scissors"
		class="az-food"
		:class="{ 'az-food--blinking': scissors.blink }"
		:style="{ left: scissors.x * tile + 'px', top: scissors.y * tile + 'px' }"
	>
		<GameFoodScissors />
	</div>

	<div
		v-if="heart"
		class="az-food"
		:class="{ 'az-food--blinking': heart.blink }"
		:style="{ left: heart.x * tile + 'px', top: heart.y * tile + 'px' }"
	>
		<GameFoodHeart />
	</div>
</template>

<script lang="ts" setup>
import GameFoodCherry from '@/components/GameFoodCherry.vue'
import GameFoodHeart from '@/components/GameFoodHeart.vue'
import GameFoodScissors from '@/components/GameFoodScissors.vue'

import type { TilePosition } from '@/types/snake'

defineProps<{
	tile: number
	cherries: TilePosition[]
	heart: { x: number; y: number; blink: boolean } | null
	scissors: { x: number; y: number; blink: boolean } | null
}>()
</script>

<style lang="scss" scoped>
.az-food {
	position: absolute;
	pointer-events: none;
	width: 48px;
	height: 48px;
	display: flex;
	justify-content: center;
	align-items: center;

	&--blinking {
		animation: az-food-blink 1s infinite;
		animation-delay: 1s;
	}
}

@keyframes az-food-blink {
	0%, 50%, 100% { opacity: 1; }
	75% { opacity: 0; }
}
</style>
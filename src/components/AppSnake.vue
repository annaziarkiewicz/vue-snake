<template>
	<section class="az-game">
		<GameDashboard
			:level="level"
			:lives="lives"
			:score="score.current"
		/>

		<GameBoard
			:key="gameBoardKey"
			:action-delay="gameActionDelay"
			:is-life-lost="gameState.overlay === 'lifeLost'"
			:lives="lives"
			:map-name="currentMap"
			:paused="gameState.paused || isGameFrozen"
			:is-frozen="isGameFrozen"
			:score="score"
			@life-lost="onLifeLost"
			@lost="onLost"
			@score="onScoreChanged"
			@life="onLifeChanged"
		>
			<GameOverlayLostLifeAnimation
				v-if="gameState.overlay === 'lifeLost'"
			/>

			<GameOverlayText
				v-if="gameState.overlay === 'levelTransition'"
				:text="`LEVEL ${level}`"
			/>

			<GameOverlayText
				v-if="gameState.paused && gameState.overlay === null"
				text="PAUSED"
			/>

			<GameOverlayInput
				v-if="gameState.overlay === 'input'"
				heading="What's your name?"
				placeholder="Type your name and hit enter"
				@submit="onScoreSubmit"
				@close="onInputClose"
			/>
		</GameBoard>

		<GameScreen
			v-if="gameState.screen !== 'game'"
			:button-back-to-game="hasActiveGame"
			:button-high-scores="true"
			:button-how-to-play="true"
			:button-play-game="!hasActiveGame"
			:game-headline="gameHeadline"
			@back-to-game="backToGame"
			@play-game="playGame"
			@show-high-scores="showHighScores"
			@show-how-to-play="showHowToPlay"
		>
			<slot name="illustrations">
				<div class="az-illustration az-illustration--mint" />
				<div class="az-illustration az-illustration--navy" />
			</slot>

			<GameScreenHighScores
				v-if="gameState.screen === 'highScores'"
				@close="closeHighScores"
			/>

			<GameScreenHowToPlay
				v-if="gameState.screen === 'howToPlay'"
				@close="closeHowToPlay"
			/>
		</GameScreen>
	</section>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'

import GameBoard from '@/components/GameBoard.vue'
import GameDashboard from '@/components/GameDashboard.vue'
import GameOverlayLostLifeAnimation from '@/components/GameOverlayLostLifeAnimation.vue'
import GameOverlayInput from '@/components/GameOverlayInput.vue'
import GameOverlayText from '@/components/GameOverlayText.vue'
import GameScreen from '@/components/GameScreen.vue'
import GameScreenHighScores from '@/components/GameScreenHighScores.vue'
import GameScreenHowToPlay from '@/components/GameScreenHowToPlay.vue'

import { maps as mapsConfig } from '@/maps'
import { useSnakeScores } from '@/composables/useSnakeScores'

import type { MapName } from '@/maps'
import type { Lives, GameScreen as GameScreenType, GameOverlay } from '@/types/snake'

const gameHeadline = 'Snake'
const pointsPerLevel = 100
const gameActionDelay = 1000

const level = ref(1)

const score = ref({
	current: 0,
	target: level.value * pointsPerLevel
})

const lives = ref<Lives>({
	current: 5,
	max: 5
})

const mapKeys = Object.keys(mapsConfig) as MapName[]
const currentMap = ref<MapName>(mapKeys[0])

const gameState = ref<{
	screen: GameScreenType
	overlay: GameOverlay
	paused: boolean
}>({
	screen: 'menu',
	overlay: null,
	paused: true
})
const hasActiveGame = ref(false)
const gameBoardKey = ref(0)
const isGameFrozen = ref(false)

const { isHighScore, addScore } = useSnakeScores()

const runWithDelay = (action: () => void) => {
	isGameFrozen.value = true
	setTimeout(() => {
		action()
		isGameFrozen.value = false
	}, gameActionDelay)
}

const playGame = () => {
	level.value = 1
	score.value.current = 0
	score.value.target = level.value * pointsPerLevel
	lives.value.current = lives.value.max
	currentMap.value = mapKeys[0]

	gameBoardKey.value++

	hasActiveGame.value = true

	gameState.value.screen = 'game'
	gameState.value.overlay = null
	gameState.value.paused = false

	runWithDelay(() => {})
}

const onLevelWon = () => {
	gameState.value.overlay = 'levelTransition'

	level.value++

	currentMap.value = mapKeys[(level.value - 1) % mapKeys.length]
	score.value.target = level.value * pointsPerLevel

	runWithDelay(() => {
		gameState.value.overlay = null
	})
}

const onLifeChanged = (newLives: Lives) => {
	lives.value = newLives
}

const onLifeLost = () => {
	lives.value.current--

	if (lives.value.current <= 0) return

	gameState.value.overlay = 'lifeLost'

	setTimeout(() => {
		gameBoardKey.value++
		gameState.value.overlay = null
	}, gameActionDelay)
}

const onLost = () => {
	if (lives.value.current > 0) return

	runWithDelay(() => {
		const eligible = isHighScore(score.value.current)

		gameState.value.paused = true
		hasActiveGame.value = false

		if (eligible) {
			gameState.value.overlay = 'input'
		} else {
			gameState.value.screen = 'menu'
		}
	})
}

const onScoreChanged = (points: number) => {
	score.value.current += points

	if (score.value.current >= score.value.target) {
		onLevelWon()
	}
}

const onScoreSubmit = (name: string) => {
	addScore({
		name,
		score: score.value.current,
	})

	gameState.value.overlay = null
	gameState.value.screen = 'highScores'
}

const onInputClose = () => {
	gameState.value.overlay = null
	gameState.value.screen = 'menu'
}

const showHighScores = () => {
	gameState.value.screen = 'highScores'
}

const closeHighScores = () => {
	gameState.value.screen = 'menu'
}

const showHowToPlay = () => {
	gameState.value.screen = 'howToPlay'
}

const closeHowToPlay = () => {
	gameState.value.screen = 'menu'
}

const backToGame = () => {
	if (!hasActiveGame.value) return

	gameState.value.screen = 'game'
	gameState.value.paused = false
}

const handleKey = (e: KeyboardEvent) => {
	if (isGameFrozen.value) return
	if (gameState.value.overlay === 'input') return

	if (e.key === 'm' || e.key === 'M') {
		gameState.value.screen = 'menu'
		gameState.value.paused = true
	}

	if (e.key === 'p' || e.key === 'P') gameState.value.paused = !gameState.value.paused
	if (e.key === 'r' || e.key === 'R') playGame()
}

onMounted(() => {
	window.addEventListener('keydown', handleKey)
})

onUnmounted(() => {
	window.removeEventListener('keydown', handleKey)
})
</script>

<style lang="scss" scoped>
.az-game {
	position: relative;
}

.az-illustration {
	position: absolute;
	pointer-events: none;
	background-position: center;
	background-size: contain;
	background-repeat: no-repeat;

	&--mint {
		top: 108px;
		left: 0;
		width: 350px;
		height: 370px;
		background-image: url('@/assets/screen-mint.png');
	}

	&--navy {
		top: 116px;
		right: 0;
		width: 330px;
		height: 356px;
		background-image: url('@/assets/screen-navy.png');
	}
}
</style>
import { ref, watch, onUnmounted } from 'vue'
import type { Lives, TilePosition, FoodEatResult } from '@/types/snake'

type Options = {
	cols: number
	rows: number
	occupied: (x: number, y: number) => boolean
	lives: () => Lives
	paused: () => boolean
}

export const useSnakeFood = (options: Options) => {
	const cherries = ref<TilePosition[]>([])
	const heart = ref<{ x: number; y: number; blink: boolean } | null>(null)
	const scissors = ref<{ x: number; y: number; blink: boolean } | null>(null)

	const isOccupied = (x: number, y: number): boolean =>
		options.occupied(x, y) ||
		cherries.value.some(c => c.x === x && c.y === y) ||
		(heart.value && heart.value.x === x && heart.value.y === y) ||
		(scissors.value && scissors.value.x === x && scissors.value.y === y) || false

	const randomFreePosition = (): TilePosition => {
		let attempts = 0

		while (attempts < 100) {
			const x = Math.floor(Math.random() * options.cols)
			const y = Math.floor(Math.random() * options.rows)

			if (!isOccupied(x, y)) return { x, y }

			attempts++
		}

		return { x: 0, y: 0 }
	}

	const ensureThreeCherries = () => {
		while (cherries.value.length < 3) {
			cherries.value.push(randomFreePosition())
		}
	}

	const eatAt = (x: number, y: number): FoodEatResult => {
		const cherryIndex = cherries.value.findIndex(c => c.x === x && c.y === y)
		if (cherryIndex !== -1) {
			cherries.value.splice(cherryIndex, 1)
			ensureThreeCherries()
			return { type: 'cherry' }
		}

		const currentHeart = heart.value
		if (currentHeart && currentHeart.x === x && currentHeart.y === y) {
			heart.value = null
			return { type: 'heart' }
		}

		const currentScissors = scissors.value
		if (currentScissors && currentScissors.x === x && currentScissors.y === y) {
			scissors.value = null
			return { type: 'scissors' }
		}

		return null
	}

	let heartInterval: number | null = null
	let heartTimeout: number | null = null
	let heartBlinkTimeout: number | null = null

	let scissorsInterval: number | null = null
	let scissorsTimeout: number | null = null
	let scissorsBlinkTimeout: number | null = null

	const spawnHeart = () => {
		if (options.lives().current >= options.lives().max) return
		if (options.paused() || heart.value || scissors.value) return

		heart.value = { ...randomFreePosition(), blink: false }

		const visibleTime = 5000
		const blinkStart = 2000

		heartBlinkTimeout = window.setTimeout(() => {
			if (heart.value) heart.value.blink = true
		}, visibleTime - blinkStart)

		heartTimeout = window.setTimeout(() => {
			heart.value = null
		}, visibleTime)
	}

	const spawnScissors = () => {
		if (options.paused() || scissors.value || heart.value) return

		scissors.value = { ...randomFreePosition(), blink: false }

		const visibleTime = 5000
		const blinkStart = 2000

		scissorsBlinkTimeout = window.setTimeout(() => {
			if (scissors.value) scissors.value.blink = true
		}, visibleTime - blinkStart)

		scissorsTimeout = window.setTimeout(() => {
			scissors.value = null
		}, visibleTime)
	}

	const startTimers = () => {
		if (!heartInterval) {
			heartInterval = window.setInterval(spawnHeart, 8000)
		}

		if (!scissorsInterval) {
			scissorsInterval = window.setInterval(spawnScissors, 10000)
		}
	}

	const stopTimers = () => {
		if (heartInterval) clearInterval(heartInterval)
		if (scissorsInterval) clearInterval(scissorsInterval)

		if (heartTimeout) clearTimeout(heartTimeout)
		if (heartBlinkTimeout) clearTimeout(heartBlinkTimeout)

		if (scissorsTimeout) clearTimeout(scissorsTimeout)
		if (scissorsBlinkTimeout) clearTimeout(scissorsBlinkTimeout)

		heartInterval = null
		scissorsInterval = null
		heartTimeout = null
		heartBlinkTimeout = null
		scissorsTimeout = null
		scissorsBlinkTimeout = null
	}

	const init = () => {
		stopTimers()

		cherries.value = []
		heart.value = null
		scissors.value = null

		ensureThreeCherries()
		startTimers()
	}

	watch(
		() => options.lives().current,
		current => {
			if (current >= options.lives().max) {
				heart.value = null
			}
		}
	)

	watch(
		() => options.paused(),
		paused => {
			if (paused) {
				stopTimers()
			} else {
				startTimers()
			}
		},
		{ immediate: true }
	)

	onUnmounted(() => {
		stopTimers()
	})

	return {
		cherries,
		heart,
		scissors,
		init,
		eatAt
	}
}
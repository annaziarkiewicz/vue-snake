import { ref, onMounted, onUnmounted } from 'vue'

import type {
	Direction,
	MapSpawn,
	TilePosition,
	SnakeState,
	SnakeMoveResult
} from '@/types/snake'

export const useSnakeMovement = (options: {
	cols: number
	isWall: (x: number, y: number) => boolean
	rows: number
	startLength: number
	isPaused: () => boolean
	isFrozen: () => boolean
}) => {
	const snake = ref<SnakeState>({
		segments: [],
		length: options.startLength
	})

	const inputQueue = ref<Direction[]>([])
	const direction = ref<Direction>('right')
	const pendingGrowth = ref(0)

	const initFromSpawn = (spawn: MapSpawn) => {
		inputQueue.value = []

		snake.value.segments = [
			{ x: spawn.x, y: spawn.y },
			{ x: spawn.x - 1, y: spawn.y },
			{ x: spawn.x - 2, y: spawn.y }
		]

		snake.value.length = options.startLength
		pendingGrowth.value = 0

		direction.value = spawn.direction
	}

	const init = (spawn: MapSpawn) => {
		initFromSpawn(spawn)
	}

	const resetAfterLife = (spawn: MapSpawn) => {
		initFromSpawn(spawn)
	}

	const repositionKeepLength = (spawn: MapSpawn) => {
		inputQueue.value = []

		const length = snake.value.length

		snake.value.segments = Array.from({ length }).map((_, i) => ({
			x: spawn.x - i,
			y: spawn.y
		}))

		pendingGrowth.value = 0
		direction.value = spawn.direction
	}

	const isSelfCollision = (x: number, y: number): boolean => {
		const segments = snake.value.segments

		const checkSegments =
			pendingGrowth.value > 0
				? segments
				: segments.slice(0, segments.length - 1)

		return checkSegments.some(s => s.x === x && s.y === y)
	}

	const canMoveTo = (dir: Direction): boolean => {
		const head = snake.value.segments[0]
		let x = head.x
		let y = head.y

		if (dir === 'up') y--
		if (dir === 'down') y++
		if (dir === 'left') x--
		if (dir === 'right') x++

		return !(
			x < 0 ||
			x >= options.cols ||
			y < 0 ||
			y >= options.rows ||
			options.isWall(x, y) ||
			isSelfCollision(x, y)
		)
	}

	const setDirection = (dir: Direction) => {
		const last = inputQueue.value.length
			? inputQueue.value[inputQueue.value.length - 1]
			: direction.value

		if (
			(dir === 'up' && last === 'down') ||
			(dir === 'down' && last === 'up') ||
			(dir === 'left' && last === 'right') ||
			(dir === 'right' && last === 'left')
		) return

		if (!canMoveTo(dir)) return

		if (inputQueue.value.length < 2) {
			inputQueue.value.push(dir)
		}
	}

	const getNextHead = (): TilePosition => {
		const head = snake.value.segments[0]
		const next = { ...head }

		if (direction.value === 'up') next.y--
		if (direction.value === 'down') next.y++
		if (direction.value === 'left') next.x--
		if (direction.value === 'right') next.x++

		return next
	}

	const move = (): SnakeMoveResult => {
		if (inputQueue.value.length) {
			direction.value = inputQueue.value.shift() as Direction
		}

		const nextHead = getNextHead()

		const collision =
			nextHead.x < 0 ||
			nextHead.x >= options.cols ||
			nextHead.y < 0 ||
			nextHead.y >= options.rows ||
			options.isWall(nextHead.x, nextHead.y) ||
			isSelfCollision(nextHead.x, nextHead.y)

		if (collision) {
			return { type: 'collision' }
		}

		snake.value.segments.unshift(nextHead)

		if (pendingGrowth.value > 0) {
			pendingGrowth.value--
		} else {
			while (snake.value.segments.length > snake.value.length) {
				snake.value.segments.pop()
			}
		}

		return { type: 'move', head: nextHead }
	}

	const grow = () => {
		snake.value.length++
		pendingGrowth.value++
	}

	const shrinkToStart = () => {
		snake.value.length = options.startLength
		snake.value.segments = snake.value.segments.slice(0, options.startLength)
		pendingGrowth.value = 0
	}

	const handleKey = (e: KeyboardEvent) => {
		if (options.isFrozen() || options.isPaused()) return

		if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
			e.preventDefault()
		}

		if (e.key === 'ArrowUp') setDirection('up')
		if (e.key === 'ArrowDown') setDirection('down')
		if (e.key === 'ArrowLeft') setDirection('left')
		if (e.key === 'ArrowRight') setDirection('right')
	}

	onMounted(() => {
		window.addEventListener('keydown', handleKey)
	})

	onUnmounted(() => {
		window.removeEventListener('keydown', handleKey)
	})

	return {
		snake,
		direction,
		setDirection,
		init,
		resetAfterLife,
		repositionKeepLength,
		move,
		grow,
		shrinkToStart
	}
}
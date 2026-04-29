import { onMounted, onUnmounted, ref } from 'vue'

export const useSnakeLoop = (tick: () => void, delay: () => number) => {
	const isRunning = ref(false)

	let rafId: number | null = null
	let lastTime = 0

	const loop = (time: number) => {
		if (!isRunning.value) return

		if (!lastTime) lastTime = time

		if (time - lastTime >= delay()) {
			tick()
			lastTime = time
		}

		rafId = requestAnimationFrame(loop)
	}

	const start = () => {
		if (isRunning.value) return

		isRunning.value = true
		lastTime = 0
		rafId = requestAnimationFrame(loop)
	}

	const stop = () => {
		isRunning.value = false

		if (rafId) cancelAnimationFrame(rafId)
		rafId = null
	}

	onMounted(start)
	onUnmounted(stop)

	return {
		isRunning,
		start,
		stop
	}
}
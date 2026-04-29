import { computed, ref } from 'vue'

import type { Direction, TilePosition } from '@/types/snake'

type mapSpawn = {
	x: number
	y: number
	direction: Direction
}

export const useSnakeMap = (initialMap: string[]) => {
	const mapData = ref(initialMap)

	const rows = computed(() => mapData.value.length)
	const cols = computed(() => mapData.value[0]?.length ?? 0)

	const spawn = ref<mapSpawn>({
		x: 0,
		y: 0,
		direction: 'right'
	})

	const walls = ref<TilePosition[]>([])
	const lookup = ref(new Set<string>())

	const isWallRaw = (x: number, y: number): boolean => {
		return mapData.value[y]?.[x] === '#'
	}

	const getDirectionFromEdge = (x: number, y: number): Direction => {
		if (isWallRaw(x - 1, y)) return 'right'
		if (isWallRaw(x + 1, y)) return 'left'
		if (isWallRaw(x, y - 1)) return 'down'
		if (isWallRaw(x, y + 1)) return 'up'

		return 'right'
	}

	const parseMap = () => {
		walls.value = []
		lookup.value = new Set()

		mapData.value.forEach((row, y) => {
			row.split('').forEach((cell, x) => {
				if (cell === '#') {
					walls.value.push({ x, y })
					lookup.value.add(`${x}-${y}`)
				}

				if (cell === 'S') {
					spawn.value = {
						x,
						y,
						direction: getDirectionFromEdge(x, y)
					}
				}
			})
		})
	}

	const setMap = (newMap: string[]) => {
		mapData.value = newMap
		parseMap()
	}

	const isWall = (x: number, y: number): boolean =>
		lookup.value.has(`${x}-${y}`)

	const isInside = (x: number, y: number): boolean =>
		x >= 0 && x < cols.value && y >= 0 && y < rows.value

	parseMap()

	return {
		mapData,
		rows,
		cols,
		walls,
		spawn,
		isWall,
		isInside,
		setMap
	}
}
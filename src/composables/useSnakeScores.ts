type scoreItem = {
	name: string
	score: number
	level: number
	date: number
}

export const useSnakeScores = () => {
	const storageKey = 'vue-snake'
	const maxItems = 8

	const getScores = (): scoreItem[] => {
		try {
			const raw = localStorage.getItem(storageKey)
			const data: scoreItem[] = raw ? JSON.parse(raw) : []

			return data.sort((a, b) => {
				if (b.score !== a.score) return b.score - a.score
				return a.date - b.date
			})
		} catch {
			return []
		}
	}

	const saveScores = (list: scoreItem[]) => {
		localStorage.setItem(storageKey, JSON.stringify(list))
	}

	const isHighScore = (score: number): boolean => {
		const list = getScores()

		if (list.length < maxItems) return true

		const last = list[list.length - 1]
		if (!last) return true

		return score > last.score
	}

	const addScore = (item: { name: string; score: number; level: number }) => {
		const list = getScores()

		const next: scoreItem[] = [
			...list,
			{
				...item,
				date: Date.now()
			}
		]

		const sorted = next
			.sort((a, b) => {
				if (b.score !== a.score) return b.score - a.score
				return a.date - b.date
			})
			.slice(0, maxItems)

		saveScores(sorted)
	}

	return {
		maxItems,
		getScores,
		addScore,
		isHighScore
	}
}
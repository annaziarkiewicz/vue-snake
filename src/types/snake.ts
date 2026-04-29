export type GameScreen = 'game' | 'menu' | 'highScores' | 'howToPlay'

export type GameOverlay =
	| null
	| 'input'
	| 'lifeLost'
	| 'levelTransition'

export type Lives = {
	current: number
	max: number
}

export type MapSpawn = {
	x: number
	y: number
	direction: Direction
}

export type TilePosition = {
	x: number
	y: number
}

export type Direction = 'up' | 'down' | 'left' | 'right'

export type SnakeSegmentType = 'head' | 'body' | 'corner' | 'tail'

export type SnakeState = {
	segments: TilePosition[]
	length: number
}

export type SnakeMoveResult =
	| { type: 'move'; head: TilePosition }
	| { type: 'collision' }

export type FoodType = 'cherry' | 'heart' | 'scissors'

export type FoodEatResult =
	| { type: FoodType }
	| null
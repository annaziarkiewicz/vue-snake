import { oxygen } from '@/maps/oxygen'
import { hydrogen } from '@/maps/hydrogen'
import { nitrogen } from '@/maps/nitrogen'
import { calcium } from '@/maps/calcium'
import { magnesium } from '@/maps/magnesium'
import { sodium } from '@/maps/sodium'
import { copper } from '@/maps/copper'
import { phosphorus } from '@/maps/phosphorus'
import { sulfur } from '@/maps/sulfur'
import { beryllium } from '@/maps/beryllium'

export const maps = {
	oxygen,
	hydrogen,
	nitrogen,
	calcium,
	magnesium,
	sodium,
	copper,
	phosphorus,
	sulfur,
	beryllium
}

export type MapName = keyof typeof maps
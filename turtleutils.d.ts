export module movement {
	export function turnInDirection(dir: vec3.Direction): void
	export function refuelAll(): void
	export function moveInDirection(dir: vec3.DirectionUp): void
	export function inspectInDirection(dir: vec3.DirectionUp): void
	export function scanAround(blocks?: string[]): vec3.Vec3 | null
	export function digInDirection(dir): void
}

export module pathing {
	export function _getDirectionTo(position: vec3.Vec3, preferVisited?: boolean): vec3.DirectionUp
	export function getDirectionTo(position: vec3.Vec3, preferVisited?: boolean, nextTo?: boolean): vec3.DirectionUp
	export function goto(position: vec3.Vec3): void
}

export module state {
	export let currentPosition: vec3.Vec3
	export function savePosition(position: vec3.Vec3)
	export let currentDirection: vec3.Direction
	export function saveDirection(direction: vec3.Direction): void
	export function getPositionForDirection(dir: vec3.DirectionUp): vec3.Vec3
	export let inventoryFull: boolean
	export function updateInventoryFull(): void
	export let headingToSpawn: boolean
	export function setHeadingToSpawn(value: boolean): void
}

export module vec3 {
	export class Vec3 {
		north: number
		up: number
		east: number
		constructor(x: number, y: number, z: number)
		toString(): string
		plus(x: number, y: number, z: number): Vec3
	}
	export function parse(position: string): Vec3
	export const DIRECTIONS_OFFSETS: {
		north: Vec3
		south: Vec3
		east: Vec3
		west: Vec3
		up: Vec3
		down: Vec3
	}
	export const directionsBack: {
		north: string
		south: string
		east: string
		west: string
		up: string
		down: string
	}
	export const directionsRight: {
		north: string
		south: string
		east: string
		west: string
	}
	export const directionsLeft: {
		north: string
		south: string
		east: string
		west: string
	}
	export type Direction = 'north' | 'east' | 'south' | 'west'
	export type DirectionUp = Direction | 'up' | 'down'
	export function spiral(size: number, around: Vec3, until: (Vec3: any) => boolean): Vec3[]
	export function positionBetween(position1: Vec3, position2: Vec3): Vec3
	export function getDistanceTo(position: Vec3, position2: Vec3): number
}

export module world {
	export let world: {
		[key: string]: string
	}
	export function saveWorld(): void
	export const ORES: string[]
	export const UNDERGROUND_MINEABLE: string[]
	export function setBlock(position: vec3.Vec3, block: string): void
	export function getBlock(position: vec3.Vec3): string
	export function isDirectionVisitedAir(dir: vec3.DirectionUp): boolean
	export function findNearestBlockPosition(blocks: string[], height?: number, center?: vec3.Vec3): vec3.Vec3 | null
	export function countUnknownBlocksAround(position: vec3.Vec3, debug?: boolean): number
	export function findNearestUnexplored(): vec3.Vec3 | null
}
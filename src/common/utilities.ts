import type { Position } from '../types'

export function generatePosition(
    width: number,
    height: number,
    left: number,
    top: number,
): Position {
    return {
        x: Math.random() * width - left,
        y: Math.random() * height - top,
    }
}

export function calculateDelta(a: Position, b: Position): number {
    const dX = a.x - b.x
    const dY = a.y - b.y

    return Math.sqrt(dX * dX + dY * dY)
}

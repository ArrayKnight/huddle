import type { Position } from '../types'

export function calculateDelta(a: Position, b: Position): number {
    const dX = a.x - b.x
    const dY = a.y - b.y

    return Math.sqrt(dX * dX + dY * dY)
}

export function generatePosition(width: number, height: number): Position {
    return {
        x: Math.random() * width,
        y: Math.random() * height,
    }
}

export function isRenderable(
    position: Position,
    width: number,
    height: number,
): boolean {
    return (
        position.x >= width * -0.1 &&
        position.y >= height * -0.1 &&
        position.x < width * 1.1 &&
        position.y < height * 1.1
    )
}

import type { Application } from 'pixi.js'
import type { Viewport } from 'pixi-viewport'

export interface PixiContext {
    app: Application
    viewport: Viewport
    destroy(): void
}

export interface Position {
    x: number
    y: number
}

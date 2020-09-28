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

export type Renderable = { shouldRender: boolean } & Position

export type Renderable2DArray = Array<Array<Renderable>>

import { Application } from 'pixi.js'
import { Viewport } from 'pixi-viewport'

import { worldMap } from '../assets'
import { WORLD_TILE_SIZE } from '../common'
import type { UseAction } from '../types'

export const pixiApp = new Application({
    width: document.body.clientWidth,
    height: document.body.clientHeight,
    antialias: true,
})

export const viewport = new Viewport({
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
    worldWidth: (worldMap[0]?.length || 0) * WORLD_TILE_SIZE,
    worldHeight: worldMap.length * WORLD_TILE_SIZE,
    interaction: pixiApp.renderer.plugins.interaction,
})

pixiApp.stage.addChild(viewport)

viewport.drag().pinch().wheel().decelerate()

export function bindPixiApp(node: Node): ReturnType<UseAction> {
    node.appendChild(pixiApp.view)

    return {
        destroy() {
            node.removeChild(pixiApp.view)
        },
    }
}

export function resizePixiApp(): void {
    const width = document.body.clientWidth
    const height = document.body.clientHeight

    pixiApp.renderer.resize(width, height)

    viewport.resize(width, height)
}

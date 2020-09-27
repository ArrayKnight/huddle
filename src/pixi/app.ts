import { Application } from 'pixi.js'
import { Viewport } from 'pixi-viewport'

import { worldMap } from '../assets'
import { WORLD_TILE_SIZE } from '../common'
import type { PixiContext } from '../types'

export function createContext(): PixiContext {
    let width = window.innerWidth
    let height = window.innerHeight
    const app = new Application({
        width,
        height,
        antialias: true,
    })
    const viewport = new Viewport({
        screenWidth: width,
        screenHeight: height,
        worldWidth: (worldMap[0]?.length || 0) * WORLD_TILE_SIZE,
        worldHeight: worldMap.length * WORLD_TILE_SIZE,
        interaction: app.renderer.plugins.interaction,
    })

    app.stage.addChild(viewport)

    viewport.drag().pinch().wheel().decelerate()

    function resize(): void {
        width = window.innerWidth
        height = window.innerHeight

        app.renderer.resize(width, height)

        viewport.resize(width, height)
    }

    window.addEventListener('resize', resize)

    return {
        app,
        viewport,
        destroy() {
            window.removeEventListener('resize', resize)

            app.destroy(true, {
                children: true,
                texture: true,
                baseTexture: true,
            })
        },
    }
}

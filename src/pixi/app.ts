import { Application } from 'pixi.js'
import { Viewport } from 'pixi-viewport'

import { worldMap } from '../assets'
import { WORLD_TILE_SIZE } from '../common'
import type { PixiContext } from '../types'

export function createContext(): PixiContext {
    let width = window.innerWidth
    let height = window.innerHeight
    const worldWidth = (worldMap[0]?.length || 0) * WORLD_TILE_SIZE
    const worldHeight = worldMap.length * WORLD_TILE_SIZE
    const app = new Application({
        width,
        height,
        antialias: true,
    })
    const viewport = new Viewport({
        screenWidth: width,
        screenHeight: height,
        worldWidth,
        worldHeight,
        interaction: app.renderer.plugins.interaction,
    })

    app.stage.addChild(viewport)

    viewport.clamp({ direction: 'all' }).decelerate().drag().pinch().wheel()

    function setZoom(): void {
        const minScale = viewport.findCover(worldWidth, worldHeight)
        const maxScale = minScale * 3

        viewport.setZoom(
            Math.max(Math.min(viewport.scaled, maxScale), minScale),
        )
        viewport.clampZoom({
            minScale,
            maxScale,
        })
    }

    function resize(): void {
        width = window.innerWidth
        height = window.innerHeight

        app.renderer.resize(width, height)

        viewport.resize(width, height)

        setZoom()
    }

    window.addEventListener('resize', resize)

    setZoom()

    return {
        app,
        viewport,
        destroy() {
            window.removeEventListener('resize', resize)

            viewport.destroy({
                children: true,
                texture: true,
                baseTexture: true,
            })

            app.destroy(true, {
                children: true,
                texture: true,
                baseTexture: true,
            })
        },
    }
}

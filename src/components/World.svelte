<script lang="ts">
    import type { ITextureDictionary, Loader, LoaderResource } from 'pixi.js'
    import { getContext, onMount } from 'svelte'

    import { worldMap } from '../assets'
    import { PIXI_CONTEXT, WORLD_TILE_SIZE } from '../common'
    import type { Position, Renderable2DArray } from '../types'
    import WorldTile from './WorldTile.svelte'

    const { app, viewport } = getContext(PIXI_CONTEXT)
    const resource = '/assets/sprite-world.json'
    const renderable: Renderable2DArray = []
    let textures: ITextureDictionary | undefined

    function isRenderable(position: Position): boolean {
        return (
            position.x >= 0 &&
            position.y >= 0 &&
            position.x < viewport.screenWidth &&
            position.y < viewport.screenHeight
        )
    }

    function updateRenderable(): void {
        worldMap.forEach((row, yI) => {
            renderable[yI] = renderable[yI] || []

            row.forEach((_, xI) => {
                const x = renderable[yI][xI]?.x ?? xI * WORLD_TILE_SIZE
                const y = renderable[yI][xI]?.y ?? yI * WORLD_TILE_SIZE

                renderable[yI][xI] = {
                    shouldRender: isRenderable({ x, y }),
                    x,
                    y
                }
            })
        })
    }

    updateRenderable()

    app.loader
        .add(resource)
        .load((
            _: Loader,
            resources: Partial<Record<string, LoaderResource>>
        ) => {
            textures = resources[resource]?.textures
        })

    onMount(() => {
        viewport.on('moved', updateRenderable)
        viewport.on('zoomed', updateRenderable)

        return () => {
            viewport.off('moved', updateRenderable)
            viewport.off('zoomed', updateRenderable)
        }
    })
</script>

{#if textures}
    {#each worldMap as row, yI}
        {#each row as id, xI}
            <WorldTile
                texture="{(textures || {})[id]}"
                {...renderable[yI][xI]}
            />
        {/each}
    {/each}
{/if}

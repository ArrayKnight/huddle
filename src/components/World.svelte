<script lang="ts">
    import { throttle } from 'lodash'
    import type { ITextureDictionary, Loader, LoaderResource } from 'pixi.js'
    import { getContext, onMount } from 'svelte'

    import { worldMap } from '../assets'
    import { isRenderable, PIXI_CONTEXT, WORLD_TILE_SIZE } from '../common'
    import type { Renderable2DArray } from '../types'
    import WorldTile from './WorldTile.svelte'

    const { app, viewport } = getContext(PIXI_CONTEXT)
    const renderable: Renderable2DArray = []
    const updateRenderable = throttle((): void => {
        worldMap.forEach((row, yI) => {
            renderable[yI] = renderable[yI] || []

            row.forEach((_, xI) => {
                const x = renderable[yI][xI]?.x ?? xI * WORLD_TILE_SIZE
                const y = renderable[yI][xI]?.y ?? yI * WORLD_TILE_SIZE

                renderable[yI][xI] = {
                    shouldRender: isRenderable(
                        { x, y },
                        viewport.screenWidth,
                        viewport.screenHeight
                    ),
                    x,
                    y
                }
            })
        })
    }, 200)
    const resource = '/assets/sprite-world.json'
    let textures: ITextureDictionary | undefined

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

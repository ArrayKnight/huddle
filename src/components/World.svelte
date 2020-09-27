<script lang="ts">
    import type { Loader, LoaderResource, ITextureDictionary } from 'pixi.js'
    import { getContext } from 'svelte'

    import { worldMap } from '../assets'
    import { PIXI_CONTEXT, WORLD_TILE_SIZE } from '../common'
    import WorldTile from './WorldTile.svelte'

    const { app } = getContext(PIXI_CONTEXT)
    const resource = '/assets/sprite-world.json'
    let textures: ITextureDictionary | undefined

    app.loader
        .add(resource)
        .load((
            _: Loader,
            resources: Partial<Record<string, LoaderResource>>
        ) => {
            textures = resources[resource]?.textures
        })
</script>

{#if textures}
    {#each worldMap as row, yI}
        {#each row as id, xI}
            <WorldTile
                texture="{(textures || {})[id]}"
                x="{xI * WORLD_TILE_SIZE}"
                y="{yI * WORLD_TILE_SIZE}"
            />
        {/each}
    {/each}
{/if}

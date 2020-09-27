<script lang="ts">
    import type { MovedEventData, ZoomedEventData } from 'pixi-viewport'
    import { getContext, onMount } from 'svelte'

    import { PIXI_CONTEXT } from '../common'
    import Character from './Character.svelte'

    const { viewport } = getContext(PIXI_CONTEXT)
    const count = Math.max(Math.round(Math.random() * 50), 18)
    const positions = new Array(count).fill(null).map(() => ({
        top: Math.random() * viewport.worldHeight,
        left: Math.random() * viewport.worldWidth,
    }))
    let x = viewport.position.x
    let y = viewport.position.y
    let scale = viewport.scale.x

    function update(event: MovedEventData | ZoomedEventData): void {
        x = event.viewport.position.x
        y = event.viewport.position.y
        scale = event.viewport.scale.x
    }

    onMount(() => {
        viewport.on('moved', update)
        viewport.on('zoomed', update)

        return () => {
            viewport.off('moved', update)
            viewport.off('zoomed', update)
        }
    })
</script>

<div class="Characters" style="--width: {viewport.worldWidth}px; --height: {viewport.worldHeight}px; --x: {x}px; --y: {y}px; --scale: {scale}">
    {#each positions as position}
        <Character {...position} />
    {/each}
</div>

<style lang="scss">
    .Characters {
        width: var(--width);
        height: var(--height);
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        transform: translate(var(--x), var(--y)) scale(var(--scale));
        transform-origin: top left;
        pointer-events: none;
        overflow: hidden;
    }
</style>

<script lang="ts">
    import { Sprite, Texture } from 'pixi.js'
    import { getContext, onMount } from 'svelte'

    import { PIXI_CONTEXT } from '../common'

    export let texture: Texture | undefined = undefined
    export let x = 0
    export let y = 0
    export let shouldRender: boolean = true

    const { viewport } = getContext(PIXI_CONTEXT)
    const sprite = new Sprite(texture)
    sprite.x = x
    sprite.y = y
    sprite.visible = sprite.renderable = shouldRender

    onMount(() => {
        viewport.addChild(sprite)

        return () => viewport.removeChild(sprite)
    })
</script>

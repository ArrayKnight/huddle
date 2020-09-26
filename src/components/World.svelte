<script>
    import { Graphics } from 'pixi.js'
    import { onMount } from 'svelte'

    import { pixiApp, viewport } from '../pixi'

    onMount(() => {
        const rect = new Graphics()
            .beginFill(0xff0000)
            .drawRect(-100, -100, 100, 100)

        rect.position.set(pixiApp.screen.width / 2, pixiApp.screen.height / 2)

        viewport.addChild(rect)

        return () => viewport.removeChild(rect)
    })
</script>

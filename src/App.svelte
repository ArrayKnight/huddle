<script lang="ts">
    import { Application } from '@pixi/app'
    import { onMount } from 'svelte'

    const app = new Application({
        antialias: true,
    })

    app.renderer.autoResize = true

    function bindApp(node) {
        node.appendChild(app.view)

        return {
            destroy() {
                node.removeChild(app.view)
            },
        }
    }

    function resize() {
        app.renderer.resize(
            app.view.parentNode.clientWidth,
            app.view.parentNode.clientHeight,
        )
    }

    onMount(() => {
        resize()

        window.addEventListener('resize', resize)

        return () => {
            window.removeEventListener('resize', resize)
        }
    })
</script>

<div class="App" use:bindApp></div>

<style lang="scss">
    :global(html, body) {
        width: 100%;
        height: 100%;
    }

    .App {
        &,
        canvas {
            width: 100%;
            height: 100%;
            display: block;
        }
    }
</style>

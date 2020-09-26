<script lang="ts">
    import { onMount } from 'svelte'

    import { World } from './components'
    import { bindPixiApp, resizePixiApp } from './pixi'

    onMount(() => {
        window.addEventListener('resize', resizePixiApp)

        return () => window.removeEventListener('resize', resizePixiApp)
    })
</script>

<div class="App" use:bindPixiApp>
    <World />
</div>

<style lang="scss">
    :global(html, body) {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .App {
        &,
        canvas {
            width: 100%;
            height: 100%;
            display: block;
            overflow: hidden;
        }
    }
</style>

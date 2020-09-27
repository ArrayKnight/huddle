<script lang="ts">
    import { setContext } from 'svelte'

    import { PIXI_CONTEXT } from './common'
    import { World } from './components'
    import { createContext } from './pixi'
    import type { SvelteAction } from './types'

    const context = createContext()
    const { app, destroy } = context

    setContext(PIXI_CONTEXT, context)

    function bind(node: Node): ReturnType<SvelteAction> {
        node.appendChild(app.view)

        return {
            destroy() {
                node.removeChild(app.view)

                destroy()
            },
        }
    }
</script>

<div class="App" use:bind>
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
        :global(canvas) {
            width: 100%;
            height: 100%;
            display: block;
            overflow: hidden;
        }
    }
</style>

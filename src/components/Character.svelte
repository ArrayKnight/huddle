<script lang="ts">
    import { getContext } from 'svelte'

    import { calculateDelta, generatePosition, PIXI_CONTEXT } from '../common'

    export let top = 0
    export let left = 0

    const { viewport } = getContext(PIXI_CONTEXT)
    const skin = Math.round(Math.random() * 14)
    const speed = 200
    let duration = 0
    let x = 0
    let y = 0

    function updatePosition(): void {
        const position = generatePosition(viewport.worldWidth - 34, viewport.worldHeight - 50, left, top)
        const delta = calculateDelta({ x, y }, position)

        duration = Math.round((delta / speed) * 100) / 100
        x = position.x
        y = position.y
    }

    setTimeout(updatePosition, Math.random() * 5000)
</script>

<div
    class="Character Character--skin-{skin}"
    style="--top: {top}px; --left: {left}px; --x: {x}px; --y: {y}px; --duration: {duration}s;"
    on:transitionend="{updatePosition}"
></div>

<style lang="scss">
    $width: 34;
    $height: 50;

    @keyframes Walk {
        from { margin-top: 0; }
        to { margin-top: 2px; }
    }

    .Character {
        width: $width * 1px;
        height: $height * 1px;
        background: url('/assets/sprite-characters.png') no-repeat;
        position: absolute;
        top: var(--top);
        left: var(--left);
        transform: translate(var(--x), var(--y));
        transition: transform var(--duration) linear;
        animation: Walk infinite 200ms;

        @for $i from 0 through 13 {
            &--skin-#{$i} {
                $col: $i % 6;
                $row: round($i / 6);

                background-position: ($col * $width * -1px)
                    ($row * $height * -1px);
                z-index: 1;
            }
        }

        &--skin-12 { // This doesn't look like a character that should be able to move to me
            transform: none;
            transition: none;
            animation: none;
            z-index: auto;
        }
    }
</style>

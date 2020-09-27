export type SvelteAction = (
    node: Node,
) => {
    update?: () => void
    destroy?: () => void
}

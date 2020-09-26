// TODO: find in Svelte (if it exists)
export type UseAction = (
    node: HTMLElement,
    parameters: unknown,
) => {
    update?: (parameters: unknown) => void
    destroy?: () => void
}

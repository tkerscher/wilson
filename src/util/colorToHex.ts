export function toHex(r: number, g: number, b: number, a: number) {
    const hex = (x: number) => Math.round(x*255).toString(16)
    return hex(r) + hex(g) + hex(b) + hex(a)
}

/**
 * How the board and stones are rendered.
 *
 * - `hexagons`: the default PlayHex look, cells and stones are full hexagons.
 * - `go`: a Go-style board, a contiguous board with a thin hexagonal lattice
 *   and round stones placed on the cells.
 */
export const boardStyles = ['hexagons', 'go'] as const;

export type BoardStyle = typeof boardStyles[number];

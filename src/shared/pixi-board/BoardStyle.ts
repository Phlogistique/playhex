/**
 * How the board is rendered.
 *
 * - `hex`: default PlayHex style, hexagonal cells, stones are full hexagons.
 * - `go`: go-style board, triangular grid with lines,
 *         stones are circles placed at intersections.
 */
export type BoardStyle = 'hex' | 'go';

export const allBoardStyles: BoardStyle[] = ['hex', 'go'];

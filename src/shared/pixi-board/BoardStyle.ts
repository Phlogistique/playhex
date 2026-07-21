/**
 * How the board is rendered.
 *
 * - `hex`: default PlayHex style, hexagonal cells, stones are full hexagons.
 * - `go`: go-style board, triangular grid with lines,
 *         stones are circles placed at intersections.
 */
export type BoardStyle = 'hex' | 'go';

export const allBoardStyles: BoardStyle[] = ['hex', 'go'];

/**
 * Go-style stones are black and white, like real go stones,
 * instead of the red and blue theme colors.
 * Black is first player (red), white is second player (blue).
 */
export const goStoneColors = {
    black: 0x101010,
    blackOutline: 0x999999,
    white: 0xf2f2f2,
    whiteOutline: 0x555555,
};

/**
 * Radius of a go-style stone.
 * Slightly smaller than half the distance between two adjacent intersections,
 * so adjacent stones do not touch.
 */
export const goStoneRadius = (radius: number): number => radius * Math.sqrt(3) / 2 * 0.85;

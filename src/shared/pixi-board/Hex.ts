import { Container, DestroyOptions, Graphics, PointData } from 'pixi.js';
import { Theme } from './BoardTheme.js';

const { PI, cos, sin, sqrt } = Math;
const SQRT3 = sqrt(3);

/**
 * A cell.
 *
 * Default PlayHex theme, only themed by colors, stones are full hexagons.
 *
 * Contains layers:
 * - background, always shown, covers hex board
 * - fading, for shading patterns
 * - stone, may be faded for preview moves
 */
export default class Hex extends Container
{
    /**
     * Base radius of an hex cell
     */
    static readonly RADIUS = 20;

    /**
     * Padding applied to hex color when played
     */
    static readonly PADDING = 0.06;

    /**
     * Radius of cell with padding added to display grid
     */
    static readonly INNER_RADIUS = Hex.RADIUS * (1 - Hex.PADDING);

    /**
     * Radius of cell with border
     */
    static readonly OUTER_RADIUS = Hex.RADIUS * (1 + Hex.PADDING);

    /**
     * Stroke color and empty cell color
     */
    private cellBackgroundGraphics: Graphics;

    /**
     * Layer, variable alpha depending on shading pattern
     */
    private cellShading: Graphics;

    /**
     * Stroke width of the triangular grid lines, in go style.
     */
    static readonly GO_LINE_WIDTH = Hex.RADIUS * 0.06;

    constructor(
        private theme: Theme,

        /**
         * Shading to apply to background, between 0 and 1.
         * 0 = not shaded, 1 = shaded,
         * 0.5 = half-shaded (i.e for tri color shading patterns)...
         */
        private shading: number = 0,

        /**
         * When true, render the cell go-style: a contiguous background covering
         * the whole cell with a thin hexagonal lattice line, instead of the
         * default padded hexagon.
         */
        private goStyle: boolean = false,
    ) {
        super();

        if (shading < 0) {
            shading = 0;
        } else if (shading > 1) {
            shading = 1;
        }

        this.init();

        this.eventMode = 'static';
    }

    private init(): void
    {
        this.addChild(
            this.createCell(),
            this.cellShading = new Graphics(),
        );

        this.redrawCellShading();
        this.redrawHex();
    }

    private createCell(): Container
    {
        const container = new Container();
        this.cellBackgroundGraphics = new Graphics();

        container.addChild(this.cellBackgroundGraphics);

        return container;
    }

    private redrawCellShading(): void
    {
        this.cellShading.clear();

        // Go style cells are contiguous, so shade the whole cell to avoid gaps
        const radius = this.goStyle ? Hex.RADIUS : Hex.INNER_RADIUS;

        this.cellShading.regularPoly(0, 0, radius, 6);
        this.cellShading.fill({ color: this.theme.colorEmptyShade });
        this.cellShading.alpha = this.shading;
    }

    /**
     * Redraw cell, fading and stone when theme changed
     */
    private redrawHex(): void
    {
        // Redraw cell background with theme colors
        this.cellBackgroundGraphics.clear();

        if (this.goStyle) {
            this.redrawGoCell();
        } else {
            this.redrawHexagonCell();
        }

        this.redrawCellShading();
    }

    /**
     * Default PlayHex look: a padded hexagon drawn over a stroke-colored
     * hexagon, so the padding forms the grid line between cells.
     */
    private redrawHexagonCell(): void
    {
        // background, stroke color
        const outperPath: PointData[] = [];

        for (let i = 0; i < 6; ++i) {
            outperPath.push(Hex.cornerCoords(i, Hex.OUTER_RADIUS));
        }

        this.cellBackgroundGraphics.poly(outperPath);
        this.cellBackgroundGraphics.fill({ color: this.theme.strokeColor });

        // cell, empty cell color
        const innerPath: PointData[] = [];

        for (let i = 0; i < 6; ++i) {
            innerPath.push(Hex.cornerCoords(i, Hex.INNER_RADIUS));
        }

        this.cellBackgroundGraphics.poly(innerPath);
        this.cellBackgroundGraphics.fill({ color: this.theme.colorEmpty });
    }

    /**
     * Go-style look: a full hexagon filling the whole cell so the board is a
     * uniform, contiguous surface (adjacent cells share the same color, so no
     * cell outline is visible). The triangular grid of lines that links cell
     * centers, and on whose intersections stones are placed, is drawn at the
     * board level (see GameView), not per cell.
     */
    private redrawGoCell(): void
    {
        const path: PointData[] = [];

        for (let i = 0; i < 6; ++i) {
            path.push(Hex.cornerCoords(i, Hex.RADIUS));
        }

        this.cellBackgroundGraphics.poly(path);
        this.cellBackgroundGraphics.fill({ color: this.theme.colorEmpty });
    }

    getGoStyle(): boolean
    {
        return this.goStyle;
    }

    setGoStyle(goStyle: boolean): void
    {
        if (goStyle === this.goStyle) {
            return;
        }

        this.goStyle = goStyle;
        this.redrawHex();
    }

    getCellShading(): number
    {
        return this.shading;
    }

    setCellShading(shading: number): void
    {
        this.shading = shading;
        this.cellShading.alpha = shading;
    }

    updateTheme(theme: Theme): void
    {
        this.theme = theme;

        this.redrawHex();
    }

    static coords(row: number, col: number): PointData
    {
        return {
            x: col * Hex.RADIUS * SQRT3 + row * Hex.RADIUS * SQRT3 / 2,
            y: row * Hex.RADIUS * 1.5,
        };
    }

    /**
     * Get coords of hex corner
     *
     * @param i From 0 to 5:
     * ```
     * ..0
     * 5   1
     * 4   2
     * ..3
     * ```
     *
     * @param dist Distance to hex center, defaults to hex radius
     */
    static cornerCoords(i: number, dist: number = Hex.RADIUS): PointData
    {
        return {
            x: dist * sin(2 * PI * i / 6),
            y: -dist * cos(2 * PI * i / 6),
        };
    }

    override destroy(options?: DestroyOptions): void
    {
        super.destroy(options);
    }
}

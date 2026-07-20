import { Container, Graphics } from 'pixi.js';
import { BoardEntity } from '../BoardEntity.js';
import Hex from '../Hex.js';

/**
 * Show a little white hexagon on a stone to show last move.
 * Should not be used on an empty cell because won't be visible on light theme.
 *
 * On go board style, shows a gray ring instead,
 * visible on both black and white stones.
 */
export default class LastMoveMark extends BoardEntity
{
    constructor()
    {
        super();

        this.alwaysFlatTop = true;
        this.listenBoardStyleChange = true;
    }

    protected override draw(): Container
    {
        const g = new Graphics();

        if (this.boardStyle === 'go') {
            g.circle(0, 0, Hex.RADIUS * 0.35);
            g.stroke({ color: 0x808080, width: 2, alpha: 0.9 });

            return g;
        }

        g.regularPoly(0, 0, Hex.RADIUS * 0.3, 6);
        g.fill({ color: 0xffffff, alpha: 0.4 });

        g.rotation = Math.PI / 6;

        return g;
    }
}

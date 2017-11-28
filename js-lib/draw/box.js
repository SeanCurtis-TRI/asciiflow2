import State from '../state';
import Vector from '../vector';
import DrawFunction from './function';
import { drawLine } from './utils';

/**
 * @implements {DrawFunction}
 */
export default class DrawBox {
  /**
   * @param {State} state
   */
  constructor(state) {
    this.state = state;
    /** @type {Vector} */ this.startPosition = null;
    /** @type {Vector} */ this.endPosition = null;
  }

  /** @inheritDoc */
  start(position) {
    this.startPosition = position;
  }

  /**
   * @param {Vector} p1
   * @param {Vector} p2 
   */
  drawCorners(p1, p2) {
    var x = Math.min(p1.x, p2.x);
    var X = Math.max(p1.x, p2.x);
    var y = Math.min(p1.y, p2.y);
    var Y = Math.max(p1.y, p2.y);
    this.state.drawValue(new Vector(x, y), '┌');
    this.state.drawValue(new Vector(X, y), '┐');
    this.state.drawValue(new Vector(X, Y), '┘');
    this.state.drawValue(new Vector(x, Y), '└');
  };

    /** @inheritDoc */
  move(position) {
    this.endPosition = position;
    this.state.clearDraw();
    drawLine(this.state, this.startPosition, position, true);
    drawLine(this.state, this.startPosition, position, false);
    this.drawCorners(this.startPosition, position);
  }

  /** @inheritDoc */
  end() {
    this.state.commitDraw();
  }

  /** @inheritDoc */
  getCursor(position) {
    return 'crosshair';
  }

  /** @inheritDoc */
  handleKey(value) {};
}

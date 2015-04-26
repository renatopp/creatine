/** 
 * @module creatine
 */

(function() {
  "use strict";

  /**
   * A touch object stores the touch state for a single finger on the screen.
   * Touch objects are created be the touch manager and can be accessed using
   * `game.touch.get(n)`, where the `n` is the index of touch.
   *
   * You can access the touch state using the following methods:
   *
   * - **isDown()**: returns `true` if the touch is down.
   * - **isUp()**: returns `true` if the touch is up.
   *
   * 
   * @class Touch
   * @constructor
   * @param {Object} manager The touch manager instance.
   * @param {Object} game The game instance.
   */
  var Touch = function(manager, game) {
    /**
     * The game instance.
     * @property {creatine.Game} game
     */
    this.game = game;

    /**
     * The gamepad manager instance.
     * @property {creatine.GamepadManager} manager
     */
    this.manager = manager;

    /**
     * Says if the touch is currently beign pressed.
     * @property {Boolean} down
     */
    this.down = false;

    /**
     * The touch id (defined by the browser).
     * @property {Integer} identifier
     */
    this.identifier = -1;

    /**
     * Touch x position in the canvas.
     * @property {Integer} x
     */
    this.x = 0;

    /**
     * Touch y position in the canvas.
     * @property {Integer} y
     */
    this.y = 0;

    /**
     * Touch force in the canvas.
     * @property {Number} force
     */
    this.force = 0;

    /**
     * Finger radius in horizontal axis.
     * @property {Number} radiusX
     */
    this.radiusX = 0;

    /**
     * Finger radius in vertical axis.
     * @property {Number} radiusY
     */
    this.radiusY = 0;

    /**
     * Finger rotation.
     * @property {Number} rotation
     */
    this.rotation = 0;

  }
  var p = createjs.extend(Touch, createjs.EventDispatcher);

  /**
   * Helper function to create touch events.
   * @method _makeEvent
   * @param {String} name The name of the event.
   * @param {Event} e The original touch event
   * @returns {Event} The new event.
   * @private
   */
  p._makeEvent = function(name, e) {
    var event = new createjs.Event(name);
    event.target = this;
    return event;
  }

  /**
   * Update the touch data.
   * @method _update
   * @private
   */
  p._update = function(touch) {
    if (!touch) return;
    var rect = this.game.stage._getElementRect(this.game.canvas);
    var rect = this.game.stage._getElementRect(this.game.canvas);
    var x = touch.pageX - rect.left;
    var y = touch.pageY - rect.top;
    var w = this.game.canvas.width;
    var h = this.game.canvas.height;
    x /= (rect.right-rect.left)/w;
    y /= (rect.bottom-rect.top)/h;

    this.x = x;
    this.y = y;
    this.force = touch.force || touch.webkitForce || 0;
    this.radiusX = touch.radiusX || touch.webkitRadiusX || 0;
    this.radiusY = touch.radiusY || touch.webkitRadiusY || 0;
    this.rotation = touch.rotationAngle || touch.webkitRotationAngle || 0;
  }

  /**
   * Update the touch data with the touchstart event.
   * @method _startTouch
   * @param {Event} touch The event.
   * @protected
   */
  p._startTouch = function(touch) {
    this.down = true;
    this.identifier = touch.identifier;
    this._update(touch);
    this.dispatchEvent(this._makeEvent('start'));
  }

  /**
   * Update the touch data with the touchmove event.
   * @method _updateTouch
   * @param {Event} touch The event.
   * @protected
   */
  p._updateTouch = function(touch) {
    this._update(touch);
    this.dispatchEvent(this._makeEvent('move'));
  }

  /**
   * Update the touch data with the touchend, touchcancel or blur event.
   * @method _endTouch
   * @param {Event} touch The event.
   * @protected
   */
  p._endTouch = function(touch) {
    this.identifier = -1;
    this.down = false;
    this._update(touch);
    this.dispatchEvent(this._makeEvent('end'));
  }

  //---------------------------------------------------------------------------
  // PUBLIC ACCESS
  //---------------------------------------------------------------------------
  /**
   * Verifies if this touch is down.
   * @method isDown
   * @returns {Boolean} The touch status.
   */
  p.isDown = function() { return this.down; }

  /**
   * Verifies if this touch is up.
   * @method isUp
   * @returns {Boolean} The touch status.
   */
  p.isUp = function() { return !this.down; }

  creatine.Touch = createjs.promote(Touch, 'EventDispatcher');

})();
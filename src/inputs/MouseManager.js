/** 
 * @module creatine
 */

(function() {
  "use strict";

  /**
   * This manager handle the mouse state. It is created by the game and can be
   * accessed using `game.mouse`.
   *
   * Each tick, this manager update the mouse state. The mouse state is the set
   * of status of each individual button in a given time step. You can access 
   * the mouse state using the following methods:
   *
   * - **isDown(button)**: returns `true` if the player is pressing the 
   * `button` down.
   * - **isUp(button)**: returns `true` if the player is not pressing the 
   * `button`.
   * - **isAnyDown()**: returns `true` if the player is pressing any button.
   * - **isPressed(button)**: returns `true` if the player just pressed the 
   * `button`. This is different from `isDown` because it is only true the 
   * first tick that a button changes from "up" to "down" status.
   * - **isReleased(button)**: similar to `isPressed`, this function returns 
   * `true` if the button just turned it status from "down" to "up".
   * - **isAnyPressed()**: returns `true` is any button has been pressed.
   * - **isAnyReleaed()**: returns `true` is any button has been released.
   *
   * For the button, you can use its code (e.g., 0 for "LEFT") or the constants
   * in `creatine.buttons`.
   *
   * 
   * ## Usage examples
   *
   *     var game = new tine.Game(null, {
   *       update: function() {
   *         if (game.mouse.isPressed(tine.buttons.MIDDLE)) {
   *           console.log('Middle button pressed!');
   *         }
   *
   *         if (game.mouse.isDown(tine.buttons.LEFT)) {
   *           console.log('LEFT DOWN!');
   *         }
   *
   *         if (game.mouse.isAnyReleased()) {
   *           console.log('Just released a button');
   *         }
   *       }
   *     })
   *
   * 
   * @class MouseManager
   * @constructor
   * @param {Object} game The game instance.
   */
  var MouseManager = function(game) {
    this.EventDispatcher_constructor();

    /**
     * The game instance.
     * @property {creatine.Game} game
     */
    this.game = game;

    /**
     * The last tick mouse state.
     * @property {Array} _lastState
     * @private
     */
    this._lastState = [];

    /**
     * The current mouse state.
     * @property {Array} _state
     * @private
     */
    this._state = [];

    /**
     * The current x mouse position in the canvas.
     * @property {Integer} x
     */
    this.x = 0;

    /**
     * The current y mouse position in the canvas.
     * @property {Integer} y
     */
    this.y = 0;

    var self = this;
    this.game.canvas.addEventListener('blur', function(e) {self._onBlur(e)}, false);
    this.game.canvas.addEventListener('click', function(e) {self._onClick(e)}, false)
    this.game.canvas.addEventListener('dblclick', function(e) {self._onDblClick(e)}, false)
    this.game.canvas.addEventListener('mousedown', function(e) {self._onMouseDown(e)}, false)
    this.game.canvas.addEventListener('mouseup', function(e) {self._onMouseUp(e)}, false)
    this.game.canvas.addEventListener('mousemove', function(e) {self._onMouseMove(e)}, false)
    this.game.canvas.addEventListener('mouseout', function(e) {self._onMouseOut(e)}, false)
    this.game.canvas.addEventListener('mouseover', function(e) {self._onMouseOver(e)}, false)
    this.game.canvas.addEventListener('wheel', function(e) {self._onWheel(e)}, false)
  }
  var p = createjs.extend(MouseManager, createjs.EventDispatcher);

  /**
   * Helper function to create mouse events.
   * @method _makeEvent
   * @param {String} name The name of the event.
   * @param {Event} e The original mouse event
   * @returns {Event} The new event.
   * @private
   */
  p._makeEvent = function(name, e) {
    var event = new createjs.Event(name);
    event.button = e.button;
    event.x = this.x;
    event.y = this.y;
    event.nativeEvent = e;
    return event;
  }

  /**
   * When the canvas lost focus, resets the mouse state.
   * @method _onBlur
   * @private
   */
  p._onBlur = function(e) {
    this._state = [];
    // this._lastState = [];
  }

  /**
   * Handle the mouse click event.
   * @method _onClick
   * @param {Event} e The original mouse event
   * @private
   */
  p._onClick = function(e) {
    var event = this._makeEvent('click', e);
    this.dispatchEvent(event);
    e.preventDefault();
    return false;
  }

  /**
   * Handle the mouse double click event.
   * @method _onDblClick
   * @param {Event} e The original mouse event
   * @private
   */
  p._onDblClick = function(e) {
    var event = this._makeEvent('dblclick', e);
    this.dispatchEvent(event);
    e.preventDefault();
    return false;
  }

  /**
   * Handle the mouse down event.
   * @method _onMouseDown
   * @param {Event} e The original mouse event
   * @private
   */
  p._onMouseDown = function(e) {
    var event = this._makeEvent('mousedown', e);
    this.dispatchEvent(event);
    this._state.push(e.button);
    e.preventDefault();
    return false;
  }

  /**
   * Handle the mouse up event.
   * @method _onMouseUp
   * @param {Event} e The original mouse event
   * @private
   */
  p._onMouseUp = function(e) {
    var event = this._makeEvent('mouseup', e);
    this.dispatchEvent(event);
    this._state.splice(this._state.indexOf(e.button), 1);
    e.preventDefault();
    return false;
  }

  /**
   * Handle the mouse move event.
   * @method _onMouseMove
   * @param {Event} e The original mouse event
   * @private
   */
  p._onMouseMove = function(e) {
    var event = this._makeEvent('mousemove', e);
    this.dispatchEvent(event);
    e.preventDefault();
    return false;
  }

  /**
   * Handle the mouse out event.
   * @method _onMouseOut
   * @param {Event} e The original mouse event
   * @private
   */
  p._onMouseOut = function(e) {
    var event = this._makeEvent('mouseout', e);
    this.dispatchEvent(event);
    e.preventDefault();
    return false;
  }

  /**
   * Handle the mouse over event.
   * @method _onMouseOver
   * @param {Event} e The original mouse event
   * @private
   */
  p._onMouseOver = function(e) {
    var event = this._makeEvent('mouseover', e);
    this.dispatchEvent(event);
    e.preventDefault();
    return false;
  }

  /**
   * Handle the mouse wheel event.
   * @method _onWheel
   * @param {Event} e The original mouse event
   * @private
   */
  p._onWheel = function(e) {
    var event = new createjs.Event('wheel');
    event.deltaMode = e.deltaMode;
    event.deltaX = e.deltaX || e.wheelDeltaX;
    event.deltaY = e.deltaY || e.wheelDeltaY;
    event.deltaZ = e.deltaZ || e.wheelDeltaZ;
    event.x = e.x;
    event.y = e.y;
    this.dispatchEvent(event);
    e.preventDefault();

    return false;
  }

  /**
   * Returns the status of a button in the given state.
   * @method _get
   * @param {Integer} button The button code.
   * @param {Array} state The mouse state.
   * @private
   */
  p._get = function(button, state) {
    return state.indexOf(button) >= 0;
  }

  /**
   * Grab the x, y positions. Called by the game.
   * @method preUpdate
   * @protected
   */
  p.preUpdate = function() {
    this.x = this.game.stage.mouseX;
    this.y = this.game.stage.mouseY;
  }

  /**
   * Copy the current state to the last state. Called by the game.
   * @method postUpdate
   * @protected
   */
  p.postUpdate = function() {
    this._lastState = this._state.slice();
  }

  //---------------------------------------------------------------------------
  // PUBLIC ACCESS
  //---------------------------------------------------------------------------
  /**
   * Verifies if a given button is down.
   * @method isDown
   * @param {Integer} button The button code.
   * @returns {Boolean} The button status.
   */
  p.isDown = function(button) {
    return this._get(button, this._state);
  }

  /**
   * Verifies if a given button is up.
   * @method isUp
   * @param {Integer} button The button code.
   * @returns {Boolean} The button status.
   */
  p.isUp = function(button) {
    return !this._get(button, this._state);
  }

  /**
   * Verifies if a given button just passed from "up" to "down".
   * @method isPressed
   * @param {Integer} button The button code.
   * @returns {Boolean} The button status.
   */
  p.isPressed = function(button) {
    return this._get(button, this._state) && !this._get(button, this._lastState);
  }

  /**
   * Verifies if a given button just passed from "down" to "up".
   * @method isReleased
   * @param {Integer} button The button code.
   * @returns {Boolean} The button status.
   */
  p.isReleased = function(button) {
    return !this._get(button, this._state) && this._get(button, this._lastState);
  } 

  /**
   * Verifies if a any button is down.
   * @method isAnyDown
   * @returns {Boolean} The state status.
   */
  p.isAnyDown = function() {
    return this._state.length > 0;
  }

  /**
   * Verifies if a any button is pressed.
   * @method isAnyPressed
   * @returns {Boolean} The state status.
   */
  p.isAnyPressed = function() {
    for (var i=0; i<this._state.length; i++) {
      var button = this._state[i];
      if (!this._get(button, this._lastState)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Verifies if a any button is released.
   * @method isAnyReleased
   * @returns {Boolean} The state status.
   */
  p.isAnyReleased = function() {
    for (var i=0; i<this._lastState.length; i++) {
      var button = this._lastState[i];
      if (!this._get(button, this._state)) {
        return true;
      }
    }
    return false; 
  }

  creatine.MouseManager = createjs.promote(MouseManager, 'EventDispatcher');

})();
/** 
 * @module creatine
 */

(function() {
  "use strict";

  /**
   * This manager handle the keyboard state. It is created by the game and can
   * be accessed via `game.keyboard`.
   *
   * Each tick, this manager update the keyboard state. The keyboard state is 
   * the set of status of each individual keys in a given time step. You can 
   * access the keyboard state using the following methods:
   *
   * - **isDown(key)**: returns `true` if the player is pressing the `key` 
   * down.
   * - **isUp(key)**: returns `true` if the player is not pressing the `key`.
   * - **isAnyDown()**: returns `true` if the player is pressing any key.
   * - **isPressed(key)**: returns `true` if the player just pressed the `key`.
   * This is different from `isDown` because it is only true the first tick 
   * that a key changes from "up" to "down" status.
   * - **isReleased(key)**: similar to `isPressed`, this function returns 
   * `true` if the key just turned it status from "down" to "up".
   * - **isAnyPressed()**: returns `true` is any key has been pressed.
   * - **isAnyReleaed()**: returns `true` is any key has been released.
   *
   * For the key, you can use its keycode (e.g., 65 for "a") or the constants
   * in `creatine.keys`.
   *
   * 
   * ## Usage examples
   *
   *     var game = new tine.Game(null, {
   *       update: function() {
   *         if (game.keyboard.isPressed(tine.keys.A)) {
   *           console.log('Key A pressed!');
   *         }
   *
   *         if (game.keyboard.isDown(tine.keys.LEFT)) {
   *           console.log('LEFT DOWN!');
   *         }
   *
   *         if (game.keyboard.isAnyReleased()) {
   *           console.log('Just released a key');
   *         }
   *       }
   *     })
   *
   * 
   * @class KeyboardManager
   * @constructor
   * @param {Object} game The game instance.
   */
  var KeyboardManager = function(game) {
    this.EventDispatcher_constructor();

    /**
     * The game instance.
     * @property {creatine.Game} game
     */
    this.game = game;

    /**
     * The last tick keyboard state.
     * @property {Array} _lastState
     * @private
     */
    this._lastState = [];

    /**
     * The current keyboard state.
     * @property {Array} _state
     * @private
     */
    this._state = [];

    var self = this;
    this.game.canvas.addEventListener('blur', function(e) {self._onBlur(e)}, false);
    this.game.canvas.addEventListener('keydown', function(e) {self._onKeyDown(e)}, false);
    this.game.canvas.addEventListener('keypress', function(e) {self._onKeyPress(e)}, false);
    this.game.canvas.addEventListener('keyup', function(e) {self._onKeyUp(e)}, false);
  }
  var p = createjs.extend(KeyboardManager, createjs.EventDispatcher);

  /**
   * Helper function to create keyboard events.
   * @method _makeEvent
   * @param {String} name The name of the event.
   * @param {Event} e The original keyboard event
   * @returns {Event} The new event.
   * @private
   */
  p._makeEvent = function(name, e) {
    var event = new createjs.Event(name);
    event.code = e.keyCode;
    event.shift = e.shiftKey;
    event.ctrl = e.ctrlKey;
    event.meta = e.metaKey;
    event.alt = e.altKey;
    event.nativeEvent = e;
    return event;
  }

  /**
   * When the canvas lost focus, resets the keyboard state.
   * @method _onBlur
   * @private
   */
  p._onBlur = function() {
    this._state = [];
    // this._lastState = [];
  }

  /**
   * Handle the canvas keydown event.
   * @method _onKeyDown
   * @param {Event} e The original keyboard event
   * @private
   */
  p._onKeyDown = function(e) {
    if (!e.repeat) {
      this._state.push(e.keyCode);
      var event = this._makeEvent('keydown', e);
    } else {
      var event = this._makeEvent('keyhold', e);
    }

    this.dispatchEvent(event);
    e.preventDefault();
    return false;
  }

  /**
   * Handle the canvas keypress event.
   * @method _onKeyPress
   * @param {Event} e The original keyboard event
   * @private
   */
  p._onKeyPress = function(e) {
    e.preventDefault();
    return false;
  }

  /**
   * Handle the canvas keyup event.
   * @method _onKeyUp
   * @param {Event} e The original keyboard event
   * @private
   */
  p._onKeyUp = function(e) {
    this._state.splice(this._state.indexOf(e.keyCode), 1);

    var event = this._makeEvent('keyup', e);
    this.dispatchEvent(event);

    e.preventDefault();
    return false;
  }

  /**
   * Returns the status of a key in the given state.
   * @method _get
   * @param {Integer} key The key code.
   * @param {Array} state The keyboard state.
   * @private
   */
  p._get = function(key, state) {
    return state.indexOf(key) >= 0;
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
   * Verifies if a given key is down.
   * @method isDown
   * @param {Integer} key The key code.
   * @returns {Boolean} The key status.
   */
  p.isDown = function(key) {
    return this._get(key, this._state);
  }

  /**
   * Verifies if a given key is up.
   * @method isUp
   * @param {Integer} key The key code.
   * @returns {Boolean} The key status.
   */
  p.isUp = function(key) {
    return !this._get(key, this._state);
  }

  /**
   * Verifies if a given key just passed from "up" to "down".
   * @method isPressed
   * @param {Integer} key The key code.
   * @returns {Boolean} The key status.
   */
  p.isPressed = function(key) {
    return this._get(key, this._state) && !this._get(key, this._lastState);
  }

  /**
   * Verifies if a given key just passed from "down" to "up".
   * @method isReleased
   * @param {Integer} key The key code.
   * @returns {Boolean} The key status.
   */
  p.isReleased = function(key) {
    return !this._get(key, this._state) && this._get(key, this._lastState);
  }

  /**
   * Verifies if a any key is down.
   * @method isAnyDown
   * @returns {Boolean} The state status.
   */
  p.isAnyDown = function() {
    return this._state.length > 0;
  }

  /**
   * Verifies if a any key is pressed.
   * @method isAnyPressed
   * @returns {Boolean} The state status.
   */
  p.isAnyPressed = function() {
    for (var i=0; i<this._state.length; i++) {
      var key = this._state[i];
      if (!this._get(key, this._lastState)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Verifies if a any key is released.
   * @method isAnyReleased
   * @returns {Boolean} The state status.
   */
  p.isAnyReleased = function() {
    for (var i=0; i<this._lastState.length; i++) {
      var key = this._lastState[i];
      if (!this._get(key, this._state)) {
        return true;
      }
    }
    return false; 
  }

  creatine.KeyboardManager = createjs.promote(KeyboardManager, 'EventDispatcher');

})();
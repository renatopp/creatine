/** 
 * @module creatine
 */

(function() {
  "use strict";

  /**
   * A gamepad object stores the controller state for one of the 4 supported 
   * gamepads. These objects are created by the gamepad manager and can be 
   * accessed using `game.gamepad.get(n)`, where `n` is the index of the 
   * gamepad.
   *
   * This class handle the stick dead zone automatically by the scaled circular
   * dead zone method. Thus, when you ask for the `leftStickX` or `rightStickY`
   * values, you will receive the processed values for the sticks. If you want
   * the raw values, please use `rawLeftStickX`, etc.
   *
   * A gamepad object also provides a "stick force" value, which is a scalar 
   * value describing how much the player is moving the stick alway from the 
   * center, being 0 when the stick is resting and 1 when it is in the maximum.
   * This value is already in conformity with the dead zone elimination 
   * process.
   * 
   * You can access the gamepad state using the following methods:
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
   * For the button, you can use its code or the constants in `creatine.pad`.
   *
   * 
   * ## Usage examples
   *
   *     var game = new tine.Game(null, {
   *       create: function() { ... },
   *       update: function() {
   *         var gamepad = game.gamepad.get(0);
   *
   *         // Using the left stick
   *         character.x += speed * gamepad.leftStickX/gamepad.leftStickForce;
   *         character.y += speed * gamepad.leftStickY/gamepad.leftStickForce;
   *
   *         if (game.mouse.isPressed(tine.pad.A)) {
   *           character.dash();
   *         }
   *
   *         if (game.mouse.isReleased(tine.pad.START)) {
   *           console.log('PAUSE GAME!');
   *         }
   *       }
   *     })
   *     
   * @class Gamepad
   * @constructor
   * @param {Object} manager The gamepad manager instance.
   * @param {Object} game The game instance.
   */
  var Gamepad = function(manager, game) {
    this.EventDispatcher_constructor();
    
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
     * Says if the gamepad is connected or not.
     * @property {Boolean} connected
     */
    this.connected = false;

    /**
     * The raw left stick x position (before deadzone elimination).
     * @property {Number} rawLeftStickX
     */
    this.rawLeftStickX = 0;

    /**
     * The raw left stick y position (before deadzone elimination).
     * @property {Number} rawLeftStickY
     */
    this.rawLeftStickY = 0;

    /**
     * The left stick x position (after deadzone elimination).
     * @property {Number} leftStickX
     */
    this.leftStickX = 0;

    /**
     * The left stick y position (after deadzone elimination).
     * @property {Number} leftStickY
     */
    this.leftStickY = 0;

    /**
     * The left stick force. It is the norm of (leftStickX, leftStickY).
     * @property {Number} leftStickForce
     */
    this.leftStickForce = 0;
    
    /**
     * The raw right stick x position (before deadzone elimination).
     * @property {Number} rawRightStickX
     */
    this.rawRightStickX = 0;

    /**
     * The raw right stick y position (before deadzone elimination).
     * @property {Number} rawRightStickY
     */
    this.rawRightStickY = 0;

    /**
     * The right stick x position (after deadzone elimination).
     * @property {Number} rightStickX
     */
    this.rightStickX = 0;

    /**
     * The right stick y position (after deadzone elimination).
     * @property {Number} rightStickY
     */
    this.rightStickY = 0;

    /**
     * The right stick force. It is the norm of (rightStickX, rightStickY).
     * @property {Number} rightStickForce
     */
    this.rightStickForce = 0;

    /**
     * The pressure on the left trigger (no elimination of deadzone).
     * @property {Number} leftTrigger
     */
    this.leftTrigger = 0;

    /**
     * The pressure on the right trigger (no elimination of deadzone).
     * @property {Number} rightTrigger
     */
    this.rightTrigger = 0;

    /**
     * The precision used for the dead zone elimination on the left stick.
     * @property {Number} deadZoneLeft
     * @default 0.25
     */
    this.deadZoneLeft = 0.25;

    /**
     * The precision used for the dead zone elimination on the right stick.
     * @property {Number} deadZoneRight
     * @default 0.25
     */
    this.deadZoneRight = 0.25;

    /**
     * The last tick gamepad state.
     * @property {Array} _lastState
     * @private
     */
    this._lastState = [];

    /**
     * The current gamepad state.
     * @property {Array} _state
     * @private
     */
    this._state = [];

    /**
     * Flag to tell if gamepad is listening for events (disabled when the 
     * canvas is out of focus).
     * 
     * @property {Boolean} _listening
     * @private
     */
    this._listening = true;

    var self = this;
    this.game.canvas.addEventListener('blur', function(e) {self._onBlur(e)}, false);
    this.game.canvas.addEventListener('focus', function(e) {self._onFocus(e)}, false);
  }
  var p = createjs.extend(Gamepad, createjs.EventDispatcher);


  /**
   * Helper function to create gamepad events.
   * @method _makeEvent
   * @param {String} name The name of the event.
   * @param {Event} e The original gamepad event
   * @returns {Event} The new event.
   * @private
   */
  p._makeEvent = function(name, e) {
    var event = new createjs.Event(name);
    event.target = this;
    return event;
  }

  /**
   * When the canvas lost focus, resets the game state and disables listening.
   * @method _onBlur
   * @private
   */
  p._onBlur = function(e) {
    this._state = [];
    // this._lastState = [];
    this._listening = false;
  }

  /**
   * When the canvas regain focus, enable listening.
   * @method _onBlur
   * @private
   */
  p._onFocus = function(e) {
    this._listening = true;
  }

  /**
   * Returns the status of a button in the given state.
   * @method _get
   * @param {Integer} button The button code.
   * @param {Array} state The gamepad state.
   * @private
   */
  p._get = function(button, state) {
    return state.indexOf(button) >= 0;
  }

  /**
   * Process the dead zone of each stick and update the state. Called by the
   * manager.
   * 
   * @method preUpdate
   * @protected
   */
  p.preUpdate = function() {
    if (this._gamepad && this._listening) {

      // get raw values for axes
      var lx = this.rawLeftStickX = this._gamepad.axes[0];
      var ly = this.rawLeftStickY = this._gamepad.axes[1];
      var rx = this.rawRightStickX = this._gamepad.axes[2];
      var ry = this.rawRightStickY = this._gamepad.axes[3];

      // compute the scaled radial dead zone
      // left stick
      var leftzone = this.deadZoneLeft;
      var leftnorm = Math.sqrt(lx*lx + ly*ly);
      if (leftnorm > leftzone) {
        var scale = ((leftnorm-leftzone)/(1-leftzone));
        this.leftStickX = lx = (lx/leftnorm)*scale;
        this.leftStickY = ly = (ly/leftnorm)*scale;
        this.leftStickForce = Math.sqrt(lx*lx + ly*ly);

        // normalize again if necessary (avoid box range)
        if (this.leftStickForce >= 1) {
          this.leftStickX /= this.leftStickForce;
          this.leftStickY /= this.leftStickForce;
          this.leftStickForce = 1;
        }
      } else {
        this.leftStickX = this.leftStickY = this.leftStickForce = 0;
      }

      // right stick
      var rightzone = this.deadZoneLeft;
      var rightnorm = Math.sqrt(rx*rx + ry*ry);
      if (rightnorm > rightzone) {
        var scale = ((rightnorm-rightzone)/(1-rightzone));
        this.rightStickX = rx = (rx/rightnorm)*scale;
        this.rightStickY = ry = (ry/rightnorm)*scale;
        this.rightStickForce = Math.sqrt(rx*rx + ry*ry);

        // normalize again if necessary (avoid box range)
        if (this.rightStickForce >= 1) {
          this.rightStickX /= this.rightStickForce;
          this.rightStickY /= this.rightStickForce;
          this.rightStickForce = 1;
        }
      } else {
        this.rightStickX = this.rightStickY = this.rightStickForce = 0;
      }

      // get button values
      this.leftTrigger = this._gamepad.buttons[6].value;
      this.rightTrigger = this._gamepad.buttons[7].value;
      this._state = [];
      for (var i=0; i<this._gamepad.buttons.length; i++) {
        if (this._gamepad.buttons[i].pressed) {
          this._state.push(i)
        }
      }
    }
  }

  /**
   * Copy the current state to the last state. Called by the manager.
   * @method postUpdate
   * @protected
   */
  p.postUpdate = function() {
    this._lastState = this._state.slice();
  }

  /**
   * Binds a browser gamepad object to this object.
   * @method bind
   * @param {GAMEPAD} gamepad The browser gamepad object.
   * @protected
   */
  p.bind = function(gamepad) {
    this.dispatchEvent(this._makeEvent('connected'))

    this._gamepad = gamepad;
    this.connected = true;
  }

  /**
   * Unbinds the browser gamepad object of this object.
   * @method unbind
   * @protected
   */
  p.unbind = function() {
    this.dispatchEvent(this._makeEvent('disconnected'))
    this._gamepad = null;
    this.connected = false;
    this.rawLeftStickX = 0;
    this.rawLeftStickY = 0;
    this.rawRightStickX = 0;
    this.rawRightStickY = 0;
    this.leftStickX = 0;
    this.leftStickY = 0;
    this.rightStickX = 0;
    this.rightStickY = 0;
    this.leftTrigger = 0;
    this.rightTrigger = 0;
    this._state = [];
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

  creatine.Gamepad = createjs.promote(Gamepad, 'EventDispatcher');

})();
/** 
 * @module creatine
 */

(function() {
  "use strict";

  /**
   * The gamepad manager is used to handle gamepad controllers. It is created
   * by the game and accessed using `game.gamepad`.
   *
   * Notice that, gamepad can only be used if the browser has support to it. 
   * Right now only Firefox and Chrome have it. Moreover, some bugs can occur,
   * especially in Chrome, where the gamepad may no be recognize after you 
   * change the browser tab.
   * 
   * This manager can handle up to 4 gamepads in the x-input format (such as
   * the XBOX controller). Each gamepad has its own state and can't be accessed
   * directly from here.
   *
   *
   * ## Usage examples
   *
   * You can retrieve a gamepad by using the method `get` with the controller 
   * index (0, 1, 2 or 3). Notice that, you should use this method every tick
   * in order to force Chrome to update the gamepad state:
   *
   *     var game = new tine.Game(null, {
   *       update: function() {
   *         var player1controller = game.gamepad.get(0);
   *         var player2controller = game.gamepad.get(1);
   *
   *         if (player1controller.isDown(tine.pad.A)) {
   *           console.log('player 1 jumped!');
   *         }
   *       }
   *     })
   *
   * 
   * @class GamepadManager
   * @constructor
   * @param {Object} game The game instance.
   */
  var GamepadManager = function(game) {
    this.EventDispatcher_constructor();

    /**
     * The game instance.
     * @property {creatine.Game} game
     */
    this.game = game;

    /**
     * The browser gamepad objects.
     * @property {Array} _gamepads
     * @private
     */
    this._gamepads = [null, null, null, null];

    /**
     * The `creatine.Gamepad` objects.
     * @property {Array} gamepads
     */
    this.gamepads = [
      new creatine.Gamepad(this, game),
      new creatine.Gamepad(this, game),
      new creatine.Gamepad(this, game),
      new creatine.Gamepad(this, game),
    ]

    var self = this;
    window.addEventListener('gamepadconnected', function(e) {self._onGamepadConnected(e)}, false);
    window.addEventListener('gamepaddisconnected', function(e) {self._onGamepadDisconnected(e)}, false);

    var gamepads = this._getGamepads();
    for (var i=0; i<gamepads.length; i++) {
      if (gamepads[i]) {
        this._onGamepadConnected({gamepad:gamepads[i]});
      }
    }
  }
  var p = createjs.extend(GamepadManager, createjs.EventDispatcher);

  /**
   * Get the browser gamepad objects. It return only the connected gamepads.
   * @return {Array} The gamepad array.
   * @private
   */
  p._getGamepads = function() {
    if (navigator.getGamepads)
      var gamepads = navigator.getGamepads();
    else if(navigator.webkitGetGamepads){
      var gamepads = navigator.webkitGetGamepads();
    } else if(navigator.msGetGamepads) {
      var gamepads = navigator.msGetGamepads();
    } else if(navigator.webkitGamepads) {
      var gamepads = navigator.webkitGamepads();
    } else {
      var gamepads = [];
    }

    return gamepads;
  }

  /**
   * Helper function to create gamepad events.
   * @method _makeEvent
   * @param {String} name The name of the event.
   * @param {Event} e The original gamepad event
   * @param {creatine.Gamepad} gamepad The gamepad object.
   * @returns {Event} The new event.
   * @private
   */
  p._makeEvent = function(name, e, gamepad) {
    var event = new createjs.Event(name);
    event.gamepad = gamepad;
    event.nativeEvent = e;
    return event;
  }

  /**
   * Handle the gamepad connected event.
   * @method _onGamepadConnected
   * @param {Event} e The original gamepad event
   * @private
   */
  p._onGamepadConnected = function(e) {
    for (var i=0; i<this.gamepads.length; i++) {
      if (!this.gamepads[i].connected) {
        this.gamepads[i].bind(e.gamepad);
        this.dispatchEvent(this._makeEvent('gamepadconnected', e, this.gamepads[i]));
        break;
      }
    }
  }

  /**
   * Handle the gamepad disconnected event.
   * @method _onGamepadDisconnected
   * @param {Event} e The original gamepad event
   * @private
   */
  p._onGamepadDisconnected = function(e) {
    for (var i=0; i<this.gamepads.length; i++) {
      if (this.gamepads[i]._gamepad === e.gamepad) {
        this.gamepads[i].unbind();
        this.dispatchEvent(this._makeEvent('gamepaddisconnected', e, this.gamepads[i]));
        break;
      }
    }
  }

  /**
   * Pre update the individual gamepads. Called by the game.
   * @method preUpdate
   * @protected
   */
  p.preUpdate = function() {
    // must call this to update gamepad properties on chrome
    this._gamepads = this._getGamepads();

    for (var i=0; i<this.gamepads.length; i++) {
      this.gamepads[i].preUpdate();
    }
  }

  /**
   * Post update the individual gamepads. Called by the game.
   * @method postUpdate
   * @protected
   */
  p.postUpdate = function() {
    for (var i=0; i<this.gamepads.length; i++) {
      this.gamepads[i].postUpdate();
    }
  }

  //---------------------------------------------------------------------------
  // PUBLIC ACCESS
  //---------------------------------------------------------------------------
  /**
   * Returns the `creatine.Gamepad` object for the given index. Notice that 
   * the gamepad can be disconnected.
   * 
   * @method get
   * @param {Integer} i The gamepad id.
   * @returns {creatine.Gamepad} The gamepad object.
   */
  p.get = function(i) {
    return this.gamepads[i];
  }

  /**
   * Returns the number of connected gamepads.
   * 
   * @method getNumGamepads
   * @returns {Integer} The number of connected gamepads.
   */
  p.getNumGamepads = function() {
    var n=0;
    for (var i=0; i<this.gamepads.length; i++) {
      if (this.gamepads[i].connected) { n++ }
    }
    return n;
  }

  /**
   * Returns a list of connected gamepads.
   * 
   * @method getConnectedGamepads
   * @returns {Array} A list of connected `creatine.Gamepad` objects.
   */
  p.getConnectedGamepads = function() {
    var r=[];
    for (var i=0; i<this.gamepads.length; i++) {
      if (this.gamepads[i].connected) { r.push(this.gamepads[i]); }
    }
    return r;
  }

  creatine.GamepadManager = createjs.promote(GamepadManager, 'EventDispatcher');

})();
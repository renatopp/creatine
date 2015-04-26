/** 
 * @module creatine
 */

(function() {
  "use strict";

  /**
   * The time manager is a helper to handle the createjs global Ticker. It is 
   * created by the game and can be accessed with `game.time`. 
   *
   * The main function of this class is to store the delta time since last 
   * tick. For example:
   *
   *     var game = new tine.Game(null, {
   *       update: function() {
   *         console.log(game.time.delta); // in milliseconds
   *         console.log(game.time.fdelta); // in seconds
   *       }
   *     })
   * 
   * @class TimeManager
   * @constructor
   * @param {Object} game The game instance.
   */ 
  var TimeManager = function(game) {
    this.EventDispatcher_constructor();

    /**
     * The game instance.
     * @property {creatine.Game} game
     */
    this.game = game;

    /**
     * The delta time in milliseconds.
     * @property {Integer} delta
     */
    this.delta = 0;

    /**
     * The delta time in seconds.
     * @property {Number} fdelta
     */
    this.fdelta = 0;

    createjs.Ticker.on('tick', this._onTick, this);
  }
  var p = createjs.extend(TimeManager, createjs.EventDispatcher);

  /**
   * Handle the tick event.
   * @method _onTick
   * @param {Event} e The tick event.
   * @private
   */
  p._onTick = function(e) {
    this.delta = e.delta;
    this.fdelta = e.delta/1000.;

    this.dispatchEvent(e);
  }

  creatine.TimeManager = createjs.promote(TimeManager, 'EventDispatcher');

})();
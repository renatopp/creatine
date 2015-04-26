/** 
 * @module creatine
 */

(function() {
  "use strict";

  /**
   * This manager is used to handle browser touch actions. It is created by the
   * game and accessed using `game.touch`.
   *
   * It acts similarly to the gamepad manager. It store 10 touch objects and
   * update them using the browser events. Notice that this manager doesn't 
   * support touch gestures yet.
   *
   *
   * ## Usage examples
   *
   * You can retrieve a touch object by using the method `get` with the touch
   * index (0...9):
   *
   *     var game = new tine.Game(null, {
   *       update: function() {
   *         var finger1 = game.touch.get(0);
   *         var finger2 = game.touch.get(1);
   *
   *         if (finger1.isDown()) {
   *           console.log('finger1 down!');
   *         }
   *         if (finger2.isUp()) {
   *           console.log('finger 2 up!');
   *         }
   *       }
   *     })
   *
   * 
   * @class TouchManager
   * @constructor
   * @param {Object} game The game instance.
   */
  var TouchManager = function(game) {
    /**
     * The game instance.
     * @property {creatine.Game} game
     */
    this.game = game;

    /**
     * The `creatine.Touch` objects.
     * @property {Array} touches
     */
    this.touches = [];
    for (var i=0; i<10; i++) {
      this.touches.push(new creatine.Touch(this, game));
    }

    var self = this;
    this.game.canvas.addEventListener('blur', function(e) {self._onBlur(e)}, false);
    this.game.canvas.addEventListener('touchstart', function(e) {self._onTouchStart(e)}, false);
    this.game.canvas.addEventListener('touchmove', function(e) {self._onTouchMove(e)}, false);
    this.game.canvas.addEventListener('touchend', function(e) {self._onTouchEnd(e)}, false);
    this.game.canvas.addEventListener('touchcancel', function(e) {self._onBlur(e)}, false);
  }
  var p = createjs.extend(TouchManager, createjs.EventDispatcher);

  //---------------------------------------------------------------------------
  // INTERNAL
  //---------------------------------------------------------------------------
  // p._createEventData = function(e) {
  //   return {
  //     lastData: null,
  //     length: null,

  //     // time base
  //     time: null,
  //     delta: null,

  //     // center based
  //     centerX: null,
  //     centerY: null,
  //     deltaX: null,
  //     deltaY: null,
      
  //     // points based
  //     distance: null,
  //     scale: null,
  //     rotation: null,
  //   };
  // }
  // p._updateGestures = function(e) {
  //   var data = this._createEventData(e);

  //   for (var key in this._gestures) {
  //     var gesture = this._gestures[key];
  //     gesture._updateTouch(data);
  //   }
  // }

  //---------------------------------------------------------------------------
  // EVENTS
  //---------------------------------------------------------------------------
  /**
   * When the canvas lost focus, resets the touch state.
   * @method _onBlur
   * @private
   */
  p._onBlur = function(e) {
    for (var i=0; i<this.touches.length; i++) {
      this.touches[i]._endTouch();
    }
  }

  /**
   * Handle the touch start event.
   * @method _onTouchStart
   * @param {Event} e The original touch event
   * @private
   */
  p._onTouchStart = function(e) {
    for (var i=0; i<e.changedTouches.length; i++) {
      var id = e.changedTouches[i].identifier;

      for (var j=0; j<this.touches.length; j++) {
        if (!this.touches[j].down || this.touches[j].identifier === id) {
          this.touches[j]._startTouch(e.changedTouches[i]);
          break
        }
      }
    }

    e.preventDefault();
    return false;
  }

  /**
   * Handle the touch move event.
   * @method _onTouchMove
   * @param {Event} e The original touch event
   * @private
   */
  p._onTouchMove = function(e) {
    for (var i=0; i<e.changedTouches.length; i++) {
      var id = e.changedTouches[i].identifier;

      for (var j=0; j<this.touches.length; j++) {
        if (this.touches[j].identifier === id) {
          this.touches[j]._updateTouch(e.changedTouches[i]);
          break
        }
      }
    }

    e.preventDefault();
    return false;
  }

  /**
   * Handle the touch end event.
   * @method _onTouchEnd
   * @param {Event} e The original touch event
   * @private
   */
  p._onTouchEnd = function(e) {
    for (var i=0; i<e.changedTouches.length; i++) {
      var id = e.changedTouches[i].identifier;

      for (var j=0; j<this.touches.length; j++) {
        if (this.touches[j].identifier === id) {
          this.touches[j]._endTouch(e.changedTouches[i]);
          break
        }
      }
    }

    e.preventDefault();
    return false;
  }
  //---------------------------------------------------------------------------
  // GESTURES
  //---------------------------------------------------------------------------
  // p.addGesture = function(id, gesture) {
  //   this._gestures[id] = gesture;
  // }
  // p.getGesture = function(id) {
  //   return this._gestures[id];
  // }
  // p.removeGesture = function(id) {
  //   delete this._gestures[id];
  // }

  //---------------------------------------------------------------------------
  // PUBLIC ACCESS
  //---------------------------------------------------------------------------
  /**
   * Returns the `creatine.Touch` object for the given index. Notice that the
   * touch may not be touching the canvas.
   * 
   * @method get
   * @param {Integer} i The touch id.
   * @returns {creatine.Touch} The touch object.
   */
  p.get = function(i) {
    return this.touches[i];
  }

  /**
   * Returns the number of down touches.
   * 
   * @method getNumTouches
   * @returns {Integer} The number of down touches.
   */
  p.getNumTouches = function() {
    var n=0;
    for (var i=0; i<this.touches.length; i++) {
      if (this.touches[i].down) { n++ }
    }
    return n;
  }

  /**
   * Returns a list of down touches.
   * 
   * @method getDownTouches
   * @returns {Array} A list of down `creatine.Touch` objects.
   */
  p.getDownTouches = function() {
    var r=[];
    for (var i=0; i<this.touches.length; i++) {
      if (this.touches[i].down) { r.push(this.touches[i]); }
    }
    return r;
  }

  creatine.TouchManager = createjs.promote(TouchManager, 'EventDispatcher');

})();
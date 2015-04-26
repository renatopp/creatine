/**
 * @module creatine.transitions
 **/

(function() {
  "use strict";
  
  /**
   * A transition effect to move-in the new scene.
   *
   * ## Usage example
   *
   *     var game = new tine.Game(null, {
   *       create: function() {
   *         var transition = new tine.transitions.MoveIn(tine.TOP, null, 1000);
   *         game.replace(new MyScene(), transition);
   *       }
   *     });
   *
   * @class MoveIn
   * @constructor
   * @param {Constant} [direction=creatine.LEFT] The direction.
   * @param {Function} [ease=createjs.Ease.linear] An easing function from 
   *                   `createjs.Ease` (provided by TweenJS).
   * @param {Number} [time=400] The transition time in milliseconds.
  **/
  var MoveIn = function(direction, ease, time) {
    /**
     * Direction of the effect.
     * @property direction
     * @type {Constant}
    **/
    this.direction = direction || creatine.LEFT;

    /**
     * An Easing function from createjs.Ease.
     * @property ease
     * @type {Function}
    **/
    this.ease = ease || createjs.Ease.linear;

    /**
     * The transition time in milliseconds.
     * @property time
     * @type {Number}
    **/ 
    this.time = time || 400;
  }
  var p = MoveIn.prototype;

  /**
   * Initialize the transition (called by the director).
   * @method start
   * @param {Director} director The Director instance.
   * @param {Scene} outScene The active scene.
   * @param {Scene} inScene The incoming scene.
   * @param {Function} callback The callback function called when the 
   *                   transition is done.
   * @protected
  **/
  p.start = function(director, outScene, inScene, callback) {
    this.director = director;
    this.outScene = outScene;
    this.inScene = inScene;
    this.callback = callback;

    var w = director.stage.canvas.width;
    var h = director.stage.canvas.height;
    var dir = this.direction;

    if (dir.endsWith('left')) {
      inScene.x = -w;
    } else if (dir.endsWith('right')) {
      inScene.x = w;
    }
    if (dir.startsWith('top')) {
      inScene.y = -h;
    } else if (dir.startsWith('bottom')) {
      inScene.y = h;
    }

    director._makeTop(inScene, outScene);

    var self = this;
    createjs.Tween.get(inScene, {override:true})
                  .to({x:0, y:0}, this.time, this.ease)
                  .call(function() { self.complete(); })
  }

  /**
   * Finalize the transition (called by the director).
   * @method complete
   * @protected
  **/
  p.complete = function() {
    createjs.Tween.removeTweens(this.inScene);
    this.inScene.x = 0;
    this.inScene.y = 0;
    this.director._makeTop(this.inScene, this.outScene)
    this.callback();
  }
  
  creatine.transitions.MoveIn = MoveIn;

}());

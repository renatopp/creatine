/**
 * @module creatine.transitions
 **/

(function() {
  "use strict";

  /**
   * A transition effect to scroll the new scene.
   *
   * ## Usage example
   *
   *     var game = new tine.Game(null, {
   *       create: function() {
   *         var transition = new tine.transitions.Scroll(tine.TOP, null, 1000);
   *         game.replace(new MyScene(), transition);
   *       }
   *     });
   *
   * @class Scroll
   * @constructor
   * @param {Constant} [direction=creatine.LEFT] The direction.
   * @param {Function} [ease=createjs.Ease.linear] An easing function from 
   *                   `createjs.Ease` (provided by TweenJS).
   * @param {Number} [time=400] The transition time in milliseconds.
  **/
  var Scroll = function(direction, ease, time) {
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
  var p = Scroll.prototype;

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


    this.targetX = 0;
    this.targetY = 0;
    inScene.x = 0;
    inScene.y = 0;

    switch (this.direction) {
      case creatine.LEFT:
        inScene.x = w;
        this.targetX = -w;
        break;
      case creatine.RIGHT:
        inScene.x = -w;
        this.targetX = w;
        break;
      case creatine.TOP:
        inScene.y = h;
        this.targetY = -h;
        break;
      case creatine.BOTTOM:
        inScene.y = -h;
        this.targetY = h;
        break;
    }

    var self = this;
    createjs.Tween.get(inScene, {override:true})
                  .to({x:0, y:0}, this.time, this.ease)
                  .call(function() { self.complete(); })

    createjs.Tween.get(outScene, {override:true})
                  .to({x:this.targetX, y:this.targetY}, this.time, this.ease)
  }

  /**
   * Finalize the transition (called by the director).
   * @method complete
   * @protected
  **/
  p.complete = function() {
    createjs.Tween.removeTweens(this.inScene);
    createjs.Tween.removeTweens(this.outScene);
    this.inScene.x = 0;
    this.inScene.x = 0;
    this.outScene.x = 0;
    this.outScene.y = 0;
    this.callback();
  }

  creatine.transitions.Scroll = Scroll;
}());

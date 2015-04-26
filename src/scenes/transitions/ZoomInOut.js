/**
 * @module creatine.transitions
 **/

(function() {
  "use strict";
  
  /**
   * A transition effect to zoom-out the old scene and zoom-in the new scene.
   *
   * ## Usage example
   *
   *     var game = new tine.Game(null, {
   *       create: function() {
   *         var transition = new tine.transitions.ZoomInOut(null, 1000);
   *         game.replace(new MyScene(), transition);
   *       }
   *     });
   *
   * @class ZoomInOut
   * @constructor
   * @param {Function} [ease=createjs.Ease.linear] An easing function from 
   *                   `createjs.Ease` (provided by TweenJS).
   * @param {Number} [time=400] The transition time in milliseconds.
  **/
  var ZoomInOut = function(ease, time) {
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
    this.time = time || 1000;
  }
  var p = ZoomInOut.prototype;

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

    inScene.x = w/2;
    inScene.y = h/2;
    inScene.scaleX = 0;
    inScene.scaleY = 0;

    var htime = this.time/2;
    var self = this;
    createjs.Tween.get(inScene, {override:true})
                  .wait(htime)
                  .to({x:0, y:0, scaleX:1, scaleY:1}, htime, this.ease)
                  .call(function() { self.complete(); })

    createjs.Tween.get(outScene, {override:true})
                  .to({x:w/2, y:h/2, scaleX:0, scaleY:0}, htime, this.ease)
  }

  /**
   * Finalize the transition (called by the director).
   * @method complete
   * @protected
  **/
  p.complete = function() {
    createjs.Tween.removeTweens(this.outScene);
    this.outScene.x = this.inScene.x = 0;
    this.outScene.y = this.inScene.y = 0;
    this.outScene.scaleX = this.inScene.scaleX = 1;
    this.outScene.scaleY = this.inScene.scaleY = 1;
    this.director._makeTop(this.inScene, this.outScene)
    this.callback();
  }

  creatine.transitions.ZoomInOut = ZoomInOut;
}());

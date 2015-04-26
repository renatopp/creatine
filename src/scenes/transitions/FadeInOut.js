/**
 * @module creatine.transitions
 **/

(function() {
  "use strict";
   
  /**
   * A transition effect to fade-out the old scene and fade-in the new scene.
   *
   * ## Usage example
   *
   *     var game = new tine.Game(null, {
   *       create: function() {
   *         var transition = new tine.transitions.FadeInOut(null, 1000);
   *         game.replace(new MyScene(), transition);
   *       }
   *     });
   *
   * @class FadeInOut
   * @constructor
   * @param {Function} [ease=createjs.Ease.linear] An easing function from 
   *                   `createjs.Ease` (provided by TweenJS).
   * @param {Number} [time=400] The transition time in milliseconds.
  **/
  var FadeInOut = function(ease, time) {
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
    this.time = time || 800;
  }
  var p = FadeInOut.prototype;

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

    outScene.alpha = 1;
    inScene.alpha = 0;

    var htime = this.time/2;
    var self = this;
    createjs.Tween.get(inScene, {override:true})
                  .wait(htime)
                  .to({alpha:1}, htime, this.ease)
                  .call(function() { self.complete(); })

    createjs.Tween.get(outScene, {override:true})
                  .to({alpha:0}, htime, this.ease)
  }

  /**
   * Finalize the transition (called by the director).
   * @method complete
   * @protected
  **/
  p.complete = function() {
    createjs.Tween.removeTweens(this.inScene);
    createjs.Tween.removeTweens(this.outScene);
    this.director._makeTop(this.inScene, this.outScene);
    this.outScene.alpha = 1;
    this.inScene.alpha = 1;
    this.callback();
  }

  creatine.transitions.FadeInOut = FadeInOut;
}());

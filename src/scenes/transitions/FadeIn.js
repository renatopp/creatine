/**
 * @module creatine.transitions
 **/

(function() {
  "use strict";
  
  /**
   * A transition effect to fade-in the new scene.
   *
   * ## Usage example
   *
   *     var game = new tine.Game(null, {
   *       create: function() {
   *         var transition = new tine.transitions.FadeIn(null, 1000);
   *         game.replace(new MyScene(), transition);
   *       }
   *     });
   *
   * @class FadeIn
   * @constructor
   * @param {Function} [ease=createjs.Ease.linear] An easing function from 
   *                   `createjs.Ease` (provided by TweenJS).
   * @param {Number} [time=400] The transition time in milliseconds.
  **/
  var FadeIn = function(ease, time) {
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
  var p = FadeIn.prototype;

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

    director._makeTop(inScene, outScene);
    inScene.alpha = 0;

    var self = this;
    createjs.Tween.get(inScene, {override:true})
                  .to({alpha:1}, this.time, this.ease)
                  .call(function() { self.complete(); })
  }

  /**
   * Finalize the transition (called by the director).
   * @method complete
   * @protected
  **/
  p.complete = function() {
    createjs.Tween.removeTweens(this.inScene);
    this.director._makeTop(this.inScene, this.outScene)
    this.inScene.alpha = 1;
    this.callback();
  }
  

  creatine.transitions.FadeIn = FadeIn;
}());

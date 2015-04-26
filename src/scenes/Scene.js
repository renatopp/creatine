/** 
 * @module creatine
 */

(function() {
  "use strict";

  /**
   * A scene is a general container for display objects. It inherit from 
   * `createjs.Container` and adds some methods for director events.
   *
   * ## Usage example
   * 
   * Creatine provides an shortcut to extend Scene:
   *
   *     var MyScene = tine._scene({
   *       initialize: function() { ... },
   *       update: function() { ... },
   *       ...
   *     })
   *
   *     game.director.replace(new MyScene());
   * 
   * @class Scene
   * @constructor
   */
  var Scene = function() {
    this.Container_constructor();

    /**
     * Tells if the scene has been started (after enter).
     * @property {Boolean} started
     */
    this.started = false;

    /**
     * Tells if the scene has been paused (after pause).
     * @property {Boolean} paused
     */
    this.paused = false;

    this._initialize();
  }
  var p = createjs.extend(Scene, createjs.Container);

  //---------------------------------------------------------------------------
  // INTERNAL METHODS
  //---------------------------------------------------------------------------
  /**
   * Initialize the scene, called in the scene constructor.
   * @method _initialize
   */
  p._initialize = function() {
    this.initialize();
  }

  /**
   * Called before replacing or pushing a scene when this is the incoming 
   * scene.
   * 
   * @method _preEnter
   */
  p._preEnter = function() {
    this.preEnter();
  }

  /**
   * Called after replacing or pushing a scene when this is the incoming scene.
   * @method _enter
   */
  p._enter = function() {
    this.started = true;
    this.paused = false;
    this.enter();
  }

  /**
   * Called before popping a scene when this is the incoming scene.
   * @method _preResume
   */
  p._preResume = function() {
    this.preResume();
  }

  /**
   * Called after popping a scene when this is the incoming scene.
   * @method _resume
   */
  p._resume = function() {
    this.paused = false;
    this.resume();
  }

  /**
   * Called before pushing a scene when this is the outing scene.
   * @method _prePause
   */
  p._prePause = function() {
    this.paused = true;
    this.prePause;
  }

  /**
   * Called after pushing a scene when this is the outing scene.
   * @method _pause
   */
  p._pause = function() {
    this.pause();
  }

  /**
   * Called before replacing or pop a scene when this is the outing scene.
   * @method _preExit
   */
  p._preExit = function() {
    this.preExit();
  }

  /**
   * Called after replacing or pop a scene when this is the outing scene.
   * @method _exit
   * @private
   */
  p._exit = function() {
    this.started = false;
    this.paused = true;
    this.exit();
  }

  /**
   * Update the scene.
   * @method _update
   * @private
   */
  p._update = function() {
    this.update();
  }

  //---------------------------------------------------------------------------
  // CALLBACK METHODS (TO OVERRIDE)
  //---------------------------------------------------------------------------
  /**
   * Initialize the scene, called in the scene constructor. Override this to 
   * use.
   * 
   * @method initialize
   */
  p.initialize = function() {}

  /**
   * Called before replacing or pushing a scene when this is the incoming 
   * scene. override this to use.
   * 
   * @method preEnter
   */
  p.preEnter = function() {}

  /**
   * Called before popping a scene when this is the incoming scene. Override
   * this to use.
   * 
   * @method preResume
   */
  p.preResume = function() {}

  /**
   * Called before pushing a scene when this is the outing scene. Override this
   * to use.
   * 
   * @method prePause
   */
  p.prePause = function() {}

  /**
   * Called before replacing or pop a scene when this is the outing scene. 
   * Override this to use.
   * 
   * @method preExit
   */
  p.preExit = function() {}

  /**
   * Called after replacing or pushing a scene when this is the incoming scene.
   * Override this to use.
   * 
   * @method enter
   */
  p.enter = function() {}

  /**
   * Called after popping a scene when this is the incoming scene. Override 
   * this to use.
   * 
   * @method resume
   */
  p.resume = function() {}

  /**
   * Called after pushing a scene when this is the outing scene. Override this
   * to use.
   * 
   * @method pause
   */
  p.pause = function() {}

  /**
   * Called after replacing or pop a scene when this is the outing scene. 
   * Override this to use.
   * 
   * @method exit
   */
  p.exit = function() {}

  /**
   * Update the scene. Override this to use.
   * @method update
   */
  p.update = function() {}

  creatine.Scene = createjs.promote(Scene, 'Container');

  // @SHORTCUT
  creatine._scene = function(properties) {
    var S = function() { this.Scene_constructor(); }
    var p = createjs.extend(S, creatine.Scene);
    for (var k in properties) { p[k] = properties[k]; }
    return createjs.promote(S, 'Scene');
  }
}());

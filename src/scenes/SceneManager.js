/** 
 * @module creatine
 */

(function() {
  "use strict";

  /**
   * The scene manager is the class that controls all the game scenes. It is 
   * created by the game and is accessed using `game.director`.
   *
   * The scene manager sotres the current scene that is running, receives the
   * next scene which will replace the current one, and apply transition 
   * effects between the old and the new scenes. When the current scene is 
   * replace by a new one, the manager will automatically remove the old scene 
   * from stage and add the new scene to it.
   *
   * Only a single scene can be active at a time, however, the manager can 
   * handle a scene stack, allowing the addition of a new scene and keeping the
   * old one in the stage. This feature is especially useful to overlap scenes
   * and creating, for example, a semi-transparent pause screen.
   *
   * It is possible to specify a transition effect in any action of adding or
   * removing scenes, making possible to slide a new scne to the screen or to
   * make the old scene fade away. To know more about transitions, consult the
   * `creatine.transitions` module.
   *
   * The manager also provides a scene map, which you can register a scene and
   * give an id to it. You can store a scene in the manager to used after that.
   *
   * 
   * ## Usage examples
   *
   * A simple use of the director:
   *
   *     var game = new tine.Game(null, {
   *       create:function() {
   *         game.director.replace(new MyScene());
   *       }
   *     })
   *
   * Using the scene map:
   * 
   *     var game = new tine.Game(null, {create:create})
   *
   *     function create() {
   *       game.director.add('menu', new MenuScene());
   *       game.director.add('level', new LevelScene());
   *       game.director.add('pause', new PauseScene());
   *       game.director.push('menu');
   *     }
   *
   * 
   * @class SceneManager
   * @constructor
   * @param {Object} game The game instance.
   */ 
  var SceneManager = function(game) {
    /**
     * The game instance.
     * @property {creatine.Game} game
     */
    this.game = game;

    /**
     * The stage instance.
     * @property {createjs.Stage} stage
     */
    this.stage = game.stage;

    /**
     * The index of the current scene in the stack.
     * @property {Integer} _currentIndex
     * @private
     */
    this._currentIndex = -1;

    /**
     * The scene stack.
     * @property {Array} _sceneStack
     * @private
     */
    this._sceneStack = [];

    /**
     * The scene map.
     * @property {Object} _sceneMap
     * @private
     */
    this._sceneMap = {};

    /**
     * The current transition, is any.
     * @property {Object} _transition 
     * @private
     */
    this._transition = null;
  }
  var p = SceneManager.prototype;

  //---------------------------------------------------------------------------
  // INTERNAL METHODS
  //---------------------------------------------------------------------------
  /**
   * Remove a scene from the stack.
   * @method _removeFromStack
   * @param {creatine.Scene} scene A scene object.
   * @private
   */
  p._removeFromStack = function(scene) {
    var index = this._sceneStack.indexOf(scene);
    if (index >= 0) {
      this._currentIndex--;
      this.stage.removeChild(scene);
      this._sceneStack.splice(index, 1);
    }
  }
  
  /**
   * Add a scene to the stack
   * @method _addScene
   * @param {creatine.Scene} scene A scene object.
   * @private
   */
  p._addScene = function(scene) {
    var curScene = this.getCurrentScene();
    if (curScene) {
      var i = this.stage.getChildIndex(curScene);
      this.stage.addChildAt(scene, i+1);
    } else {
      this.stage.addChild(scene);
    }

    this._sceneStack.push(scene);
    scene._preEnter();
  }

  /**
   * Exit the current scene, removing it from the stack.
   * @method _exitCurrentScene
   * @private
   */
  p._exitCurrentScene = function() {
    var curScene = this.getCurrentScene();
    if (!curScene) return;

    curScene._exit();
    this._sceneStack.splice(this._currentIndex, 1);
    this.stage.removeChild(curScene);
    this._currentIndex--;
  }

  /**
   * Pause the current scene.
   * @method _pauseCurrentScene
   * @private
   */
  p._pauseCurrentScene = function() {
    var curScene = this.getCurrentScene();
    if (!curScene) return;

    curScene._pause();
  }

  /**
   * Resume the current scene.
   * @method _resumeCurrentScene
   * @private
   */
  p._resumeCurrentScene = function() {
    var curScene = this.getCurrentScene();
    if (!curScene) return;

    curScene._resume();
  }

  /**
   * Enter the next scene.
   * @method _enterNextScene
   * @private
   */
  p._enterNextScene = function() {
    var nextScene = this.getNextScene();
    if (!nextScene) return;

    nextScene._enter();
    this._currentIndex++;
  }

  /**
   * Start a transition.
   * @method _startTransition
   * @param {creatine.Scene} [outScene] The outcoming scene object.
   * @param {creatine.Scene} [inScene] The incoming scene object.
   * @param {Object} [transition] A transition object.
   * @param {Function} callback A callback function.
   * @private
   */
  p._startTransition = function(outScene, inScene, transition, callback) {
    if (transition) {
      this._transition = transition;
      transition.start(this, outScene||{}, inScene||{}, callback);
    } else {
      callback();
    }
  }

  /**
   * Finishes a transition.
   * @method _completeTransition
   * @private
   */
  p._completeTransition = function() {
    if (!this._transition) return;
    this._transition.complete();
  }

  /**
   * Bring a given scene to the top.
   * @method _makeTop
   * @param {creatine.Scene} scene The target scene.
   * @param {creatine.Scene} s2 A second scene.
   * @private
   */
  p._makeTop = function(scene, s2) {
    var i = this.stage.getChildIndex(s2);
    var j = this.stage.getChildIndex(scene);

    if (i===-1 || j===-1 || j>=i) return;
    this.stage.removeChild(scene);
    this.stage.addChildAt(scene, i);
  }

  //---------------------------------------------------------------------------
  // CALLBACK (CALLED BY GAME)
  //---------------------------------------------------------------------------
  /**
   * Update the scenes. Called by the game.
   * @method update
   * @private
   */
  p.update = function() {
    for (var i=0; i<this._sceneStack; i++) {
      var scene = this._sceneStack[i];
      if (!scene.paused) scene._update();
    }
  }

  //---------------------------------------------------------------------------
  // REGISTER AND UNREGISTER SCENES (LIKE A STATE MACHINE)
  //---------------------------------------------------------------------------
  /**
   * Register a scene to the manager.
   * @method add
   * @param {String} id The unique identifier for the scene.
   * @param {creatine.Scene} scene The target scene.
   */
  p.add = function(id, scene) {
    this._sceneMap[id] = scene;
  }

  /**
   * Unregister a scene of the manager.
   * @method remove
   * @param {String} id The unique identifier for the scene.
   */
  p.remove = function(id) {
    delete this._sceneMap[id];
  }

  /**
   * Get a scene registered in the manager.
   * @method get
   * @param {String} idOrScene The unique identifier for the scene.
   */
  p.get = function(idOrScene) {
    if (typeof idOrScene === 'string') {
      return this._sceneMap[idOrScene];
    } 
    return idOrScene;
  }

  //---------------------------------------------------------------------------
  // REPLACE, PUSH AND POP
  //---------------------------------------------------------------------------
  /**
   * Replaces the current scene by a new one.
   * 
   * If transition is provided, the transition effect will be applied before
   * replacing scenes.
   * 
   * @method replace
   * @param {String or creatine.Scene} idOrScene The new scene.
   * @param {Object} [transition] A transition effect.
  **/
  p.replace = function(idOrScene, transition) {
    this._completeTransition();
    var nextScene = this.get(idOrScene);
    var curScene = this.getCurrentScene();
    if (!nextScene || curScene===nextScene) return false;

    if (curScene) { curScene._preExit(); }
    this._removeFromStack(nextScene);
    this._addScene(nextScene);

    // pos-transition
    var self = this;
    function callback() {
      self._transition = null;
      self._exitCurrentScene();
      self._enterNextScene();
    }

    // transition
    this._startTransition(curScene, nextScene, transition, callback);

    return true;
  }

  /**
   * Pauses the current scene and send it to the stack. The new scene will 
   * replace the current one.
   * 
   * If transition is provided, the transition effect will be applied before
   * replacing scenes.
   * 
   * @method push
   * @param {String or creatine.Scene} idOrScene The new scene.
   * @param {Object} [transition] A transition effect.
  **/
  p.push = function(idOrScene, transition) {
    this._completeTransition();
    var nextScene = this.get(idOrScene);
    var curScene = this.getCurrentScene();
    if (!nextScene || curScene===nextScene) return false;

    // add the next scene
    if (curScene) { curScene._prePause(); }
    this._addScene(nextScene);

    // pos-transition
    var self = this;
    function callback() {
      self._transition = null;
      self._pauseCurrentScene();
      self._enterNextScene();
    }

    // transition
    this._startTransition(curScene, nextScene, transition, callback);

    return true;
  }

  /**
   * Removes the current scene and reactivate the scene at the top of the 
   * stack.
   * 
   * If transition is provided, the transition effect will be applied before
   * replacing scenes.
   * 
   * @method pop
   * @param {Object} [transition] A transition effect.
  **/
  p.pop = function(transition) {
    this._completeTransition();

    var prevScene = this.getPreviousScene();
    var curScene = this.getCurrentScene();

    // pre-transition
    if (curScene) { curScene._preExit(); }
    if (prevScene) { prevScene._preResume(); }

    // pos-transition
    var self = this;
    function callback() {
      self._transition = null;
      self._exitCurrentScene();
      self._resumeCurrentScene();
    }

    // transition
    this._startTransition(curScene, prevScene, transition, callback);

    return true;
  }

  //---------------------------------------------------------------------------
  // UTILITIES (ESPECIALLY USEFUL FOR TRANSITIONS)
  //---------------------------------------------------------------------------
  /**
   * Get the previous scene from the stack.
   * @method getPreviousScene
   * @return {creatine.Scene} The previous scene.
   */
  p.getPreviousScene = function() {
    if (this._currentIndex >= 1) {
      return this._sceneStack[this._currentIndex-1];
    }
    return null;
  }

  /**
   * Get the current scene.
   * @method getCurrentScene
   * @return {creatine.Scene} The current scene.
  **/
  p.getCurrentScene = function() {
    if (this._currentIndex >= 0) {
      return this._sceneStack[this._currentIndex];
    }
    return null;
  }

  /**
   * Get the next scene.
   * @method getNextScene
   * @return {creatine.Scene} The next scene.
  **/
  p.getNextScene = function() {
    if (this._currentIndex !== this._sceneStack.length-1) {
      return this._sceneStack[this._currentIndex+1];
    }
    return null
  }

  /**
   * Removes all scenes from the stack. No transition can be provided.
   * @method popAll
  **/
  p.popAll = function() {
    this._completeTransition();

    for (var i=0; i<this._sceneStack.length; i++) {
      this._sceneStack[i]._preExit();
      this._sceneStack[i]._exit();
      this.stage.removeChild(this._sceneStack[i]);
    }
    this._currentIndex = -1;
    this._sceneStack = [];
  }

  /**
   * Removes all scene except the current one. No transition can be provided.
   * @method popAllButOne
  **/
  p.popAllButOne = function() {
    this._completeTransition();

    for (var i=0; i<this._sceneStack.length-1; i++) {
      this._sceneStack[i]._preExit();
      this._sceneStack[i]._exit();
      this.stage.removeChild(this._sceneStack[i]);
    }
    this._currentIndex = 0;
    this._sceneStack = [this._sceneStack[this._sceneStack.length-1]];
  }

  /**
   * Verifies is the manager is performing a transition.
   * @method inTransition
   * @return {Boolean} in transition.
  **/
  p.inTransition = function() {
    return this._transition !== null;
  }

  creatine.SceneManager = SceneManager;
}());

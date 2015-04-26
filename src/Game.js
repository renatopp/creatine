/** 
 * @module creatine
 */

(function() {
  "use strict";

  /**
   * Game is the main class of creatine, it contains and initializes all 
   * systems for your games. It receives two parameters, a configuration 
   * object or an url for a JSON file, and an object containing state 
   * functions.
   *
   * Please consult {{#crossLinkModule "creatine"}}this page
   * {{/crossLinkModule}} for an overview of these parameters and the usage
   * examples.
   *
   * @class Game
   * @constructor
   * @param {Object} [config] Configuration data or path for JSON.
   * @param {Object} [state]  State functions.
   */
  var Game = function(config, state) {
    /**
     * The configuration object (may be modified by the game or the game 
     * systems).
     * 
     * @property {Object} config
     */
    this.config = null;

    /**
     * An object containing functions.
     * @property {Object} state
     */
    this.state = null;
    
    /**
     * The canvas element.
     * @property {HTMLCanvasElement} canvas
     */
    this.canvas    = null;

    /**
     * The `createjs.Stage` object.
     * @property {createjs.Stage} stage
     */
    this.stage = null;

    /**
     * The instance for `creatine.FactoryManager`.
     * @property {creatine.FactoryManager} create
     */
    this.create = null;

    /**
     * The instance for `creatine.ResourceManager`.
     * @property {creatine.ResourceManager} load
     */
    this.load = null;

    /**
     * The instance for `creatine.KeyboardManager`.
     * @property {creatine.KeyboardManager} keyboard
     */
    this.keyboard = null;

    /**
     * The instance for `creatine.MouseManager`.
     * @property {creatine.MouseManager} mouse
     */
    this.mouse = null;

    /**
     * The instance for `creatine.TouchManager`.
     * @property {creatine.TouchManager} touch
     */
    this.touch = null;

    /**
     * The instance for `creatine.GamepadManager`.
     * @property {creatine.GamepadManager} gamepad
     */
    this.gamepad = null;

    /**
     * The instance for `creatine.StorageManager`.
     * @property {creatine.StorageManager} storage
     */
    this.storage = null;

    /**
     * The instance for `creatine.SoundManager`.
     * @property {creatine.SoundManager} sound
     */
    this.sound = null;

    /**
     * The instance for `creatine.PluginManager`.
     * @property {creatine.PluginManager} plugins
     */
    this.plugins = null;

    /**
     * The instance for `creatine.SceneManager`.
     * @property {creatine.SceneManager} director
     */
    this.director = null;

    /**
     * The instance for `creatine.TimeManager`.
     * @property {creatine.TimeManager} time
     */
    this.time = null;

    /**
     * The instance for `creatine.DisplayManager`.
     * @property {creatine.DisplayManager} display
     */
    this.display = null;

    /**
     * The instance for `creatine.DeviceManager`.
     * @property {creatine.DeviceManager} device
     */
    this.device  = null;

    // if config is a string, consider as a path for a JSON file.
    if (typeof config === 'string') {
      var self = this;
      creatine.getJSON(config, function(data) {
        self._initialize(data, state);
      })

    // otherwise it considers as an object.
    } else {
      this._initialize(config, state);
    }
  }
  var p = Game.prototype;

  //---------------------------------------------------------------------------
  // INITIALIZATION METHODS (CALLED WHEN CREATING GAME)
  //---------------------------------------------------------------------------
  /**
   * Validate the configuration object provided by the user. It merges the 
   * argument with the default options if necessary.
   * 
   * @method _initializeConfig
   * @param {Object} [config] The configuration object.
   * @return {Object}         The configuration object.
   * @private
   */
  p._initializeConfig = function(config) {
    if (!config) {
      config = creatine.DEFAULT_CONFIG;
    } else {
      config = creatine.merge({}, creatine.DEFAULT_CONFIG, config);
      
      // project
      if (typeof config.project !== 'string') {
        throw Error('Invalid project name. Please use a string.');
      } else if (!/^\w+$/i.test(config.project)) {
        throw Error('Invalid project name. Please only use letters, numbers and underscore');
      }

      // width
      if (config.width !== parseInt(config.width, 10) || config.width === 0) {
        config.width = creatine.DEFAULT_CONFIG['width'];
      }

      // height
      if (config.height !== parseInt(config.height, 10) || config.height === 0) {
        config.height = creatine.DEFAULT_CONFIG['height'];
      }

      // framerate
      if (config.framerate !== parseInt(config.framerate, 10) || config.framerate === 0) {
        config.framerate = creatine.DEFAULT_CONFIG['framerate'];
      }

      // debug
      config.debug = Boolean(config.debug);

      // showfps
      config.showfps = Boolean(config.showfps);
    }

    this.config = config;
    return config;
  }
  
  /**
   * Validate and store the state functions
   * 
   * @method _initializeState
   * @param {Object} [state] The object containing functions.
   * @private
   */
  p._initializeState = function(state) {
    function isFunction(value) {
      return typeof value === 'function';
    }

    if (!state) state = {};
    if (!isFunction(state.boot)) delete state.boot;
    if (!isFunction(state.preload)) delete state.preload;
    if (!isFunction(state.create)) delete state.create;
    if (!isFunction(state.update)) delete state.update;
    if (!isFunction(state.draw)) delete state.draw;

    this.state = state;
  }

  /**
   * Initiliazes the game core objects.
   * 
   * @method _initialize
   * @param {Object} [config] The configuration objects.
   * @param {Object} [state]  The state object.
   * @private
   */
  p._initialize = function(config, state) {
    // Configuration
    var config = this._initializeConfig(config);
    this._initializeState(state);

    // Canvas
    this.canvas = document.createElement('canvas');
    this.canvas.width = config.width;
    this.canvas.height = config.height;
    this.canvas.style.backgroundColor = config.background_color;
    this.canvas.style.outline = 'none';
    this.canvas.setAttribute('tabindex','0');
    this.canvas.addEventListener("mousedown", this.canvas.focus, false);

    var container = document.getElementById(config.container) || document.body;
    container.appendChild(this.canvas);
    this.canvas.focus();

    // CreateJS core
    this.stage = new createjs.Stage(this.canvas);
    this.stage.snapToPixelEnabled = true;
    createjs.Ticker.framerate = config.framerate;
    createjs.Touch.enable(this.stage);
    createjs.Sound.initializeDefaultPlugins();

    // Managers
    this.time = new creatine.TimeManager(this);
    this.device = new creatine.DeviceManager(this);
    this.display = new creatine.DisplayManager(this);
    this.load = new creatine.ResourceManager(this);
    this.create = new creatine.FactoryManager(this);
    this.director = new creatine.SceneManager(this);
    this.storage = new creatine.StorageManager(this);
    this.sound = new creatine.SoundManager(this);
    this.keyboard = new creatine.KeyboardManager(this);
    this.mouse = new creatine.MouseManager(this);
    this.gamepad = new creatine.GamepadManager(this);
    this.touch = new creatine.TouchManager(this);
    this.plugins = new creatine.PluginManager(this);

    
    // VARS
    this._started = false;

    // Start the game
    var self = this;
    setTimeout(function() {self._boot()}, 0);
  }


  //---------------------------------------------------------------------------
  // MAIN LOOP METHODS
  //---------------------------------------------------------------------------
  /**
   * The boot state of the game, called right after the engine initialization.
   * It calls the state function if provided by the user.
   * 
   * @method _boot
   * @private
   */
  p._boot = function() {
    if (this.state.boot) this.state.boot(this);
    
    this.time.on('tick', this._mainLoop, this);
    this._preload();
  }

  /**
   * The preload state of the game, called right after the booting and right 
   * before the preloading process. It calls the state function if provided by 
   * the user.
   * 
   * @method _preload
   * @private
   */
  p._preload = function() {
    if (this.state.preload) this.state.preload(this);

    // If all items loaded/no item to load and no manifest
    if (this.load.isFinished() && !this.config.resources.manifest) {
      this._create();

    // Loading item or have manifest
    } else {
      this.load.on('complete', this._create, this);
      if (this.config.resources.manifest) {
        this.load.manifest(this.config.resources.manifest);
      }
      this.load.load();
    }
  }

  /**
   * The create state of the game, called when the preloading process in 
   * finished. It calls the state function if provided by the user.
   * 
   * @method _create
   * @private
   */
  p._create = function() {
    if (this.state.create) this.state.create(this);
    this._started = true;
  }

  /**
   * The update state of the game, called periodically once the engine finishes
   * the create state. It calls the state function if provided by the user.
   * 
   * @method _update
   * @private
   */
  p._update = function() {
    // pre update
    this.mouse.preUpdate();
    this.gamepad.preUpdate();
    this.plugins.preUpdate();
    
    if (this._started && this.state.update)
      this.state.update(this);
    // update
    this.director.update();
    this.plugins.update();

    // pos update
    this.keyboard.postUpdate();
    this.mouse.postUpdate();
    this.gamepad.postUpdate();
    this.plugins.postUpdate();
  }

  /**
   * The draw state of the game, called periodically once the engine finishes
   * the create state. It calls the state function if provided by the user.
   * 
   * @method _draw
   * @private
   */
  p._draw = function() {
    // pre draw
    this.plugins.preDraw();

    // draw
    this.plugins.draw();
    this.stage.update();
    if (this.state.draw) this.state.draw(this);

    // post draw
    this.plugins.postDraw();
  }

  /**
   * The main loop of the game, called every tick.
   * 
   * @method _mainLoop
   * @private
   */
  p._mainLoop = function() {
    this._update();
    this._draw();
  }

  creatine.Game = Game;

})();
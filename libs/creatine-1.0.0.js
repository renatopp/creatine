if (!String.prototype.startsWith) {
  String.prototype.startsWith = function(searchString, position) {
    position = position || 0;
    return this.lastIndexOf(searchString, position) === position;
  };
}

if (!String.prototype.endsWith) {
  String.prototype.endsWith = function(searchString, position) {
      var subjectString = this.toString();
      if (position === undefined || position > subjectString.length) {
        position = subjectString.length;
      }
      position -= searchString.length;
      var lastIndex = subjectString.indexOf(searchString, position);
      return lastIndex !== -1 && lastIndex === position;
  };
}this.creatine = this.creatine || {};
this.creatine.transitions = this.creatine.transitions || {};
this.creatine.tmx = this.creatine.tmx || {};

// Register the shortcut `tine`
if (typeof this.tine === 'undefined') {
  this.tine = this.creatine;
}

// Anchor constants
creatine.TOP_LEFT     = 'topleft';
creatine.TOP_RIGHT    = 'topright';
creatine.BOTTOM_LEFT  = 'bottomleft';
creatine.BOTTOM_RIGHT = 'bottomright';
creatine.TOP          = 'top';
creatine.BOTTOM       = 'bottom';
creatine.LEFT         = 'left';
creatine.RIGHT        = 'right';
creatine.CENTER       = 'center';

// Axis constants
creatine.HORIZONTAL = 'horizontal';
creatine.VERTICAL = 'vertical';

// Direction constants
creatine.LEFT_TO_RIGHT = 12;
creatine.RIGHT_TO_LEFT = 13;
creatine.TOP_TO_BOTTOM = 14;
creatine.BOTTOM_TO_TOP = 15;

// Resizing constants
creatine.STRETCH = 16;
creatine.FIT = 17;
creatine.FILL = 18;
creatine.NOSCALE = 19;

// Math constants
creatine.DEGREES = 57.2957795;
creatine.RADIANS = 0.0174532925;
creatine.PI2 = 6.2831853071;

// Creatine constants
creatine.VERSION       = '1.0.0';
creatine.DEFAULT_CONFIG = {
  project          : 'creatine_game',
  width            : 800,
  height           : 600,
  container        : null,
  framerate        : 60,
  showfps          : false,
  background_color : '#000',
  resources        : {
    base_path : './',
    manifest  : []
  }
}
/**
 * @module core functions
 */


/**
 * Shuffle a given array.
 * 
 * @class shuffle
 * @constructor
 * @param {Object} array The target array.
 * @returns {Object} The same target array.
 */
creatine.shuffle = function(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {
    
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}


/**
 * Returns a uniformly random float between -1 and 1.
 * 
 * @class randomPolar
 * @constructor
 * @returns {Number} A random float.
 */
creatine.randomPolar = function() {
  return Math.random()*2-1;
}


/**
 * Returns a uniformly random integer between `min` and `max`, inclusive.
 * 
 * @class randomInt
 * @constructor
 * @param {Integer}  min The minimum value.
 * @param {Integer}  max The maximum value.
 * @returns {Integer} A random integer.
 */
creatine.randomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


/**
 * Keeps a value `v` between `min` and `max`.
 * 
 * @class clip
 * @constructor
 * @param {Number}  v The value to be bounded.
 * @param {Number}  min The minimum bound for the value.
 * @param {Number}  max The maximum bound for value.
 * @returns {Number} The bounded value.
 */
creatine.clip = function(v, min, max) {
  return Math.max(Math.min(v, max), min);
}


/**
 * Keeps a angle (in degrees) between 0 and 359.
 * 
 * @class wrapAngle
 * @constructor
 * @param {Number}  angle The angle in degrees.
 * @returns {Number} The wrapped value.
 */
creatine.wrapAngle = function(angle) {
  return (angle<0)? 360+angle%360 : angle%360;
}


/**
 * Returns the minimum distance from angle `a1` to `a2` (both in degrees). The
 * result is kept between 0 and 359.
 * 
 * @class angleDistance
 * @constructor
 * @param {Number}  a1 The initial angle in degrees.
 * @param {Number}  a2 The final angle in degrees.
 * @returns {Number} The angle distance value.
 */
creatine.angleDistance = function(a1, a2) {
  a1 = (a1<0)? 360+a1%360 : a1%360;
  a2 = (a2<0)? 360+a2%360 : a2%360;

  var d = a2-a1;
  if (d<0) d+=360;
  if (d>180) d = 360-d;

  return d;
}


/**
 * Returns the direction that represents the minimum distance from angle `a1` 
 * to `a2` (in degrees). The result is `-1`, `1`, or `0` if equal.
 * 
 * @class angleDirection
 * @constructor
 * @param {Number}   a1 The initial angle in degrees.
 * @param {Number}   a2 The final angle in degrees.
 * @returns {Integer} A direction -1, 1 or 0.
 */
creatine.angleDirection = function(a1, a2) {
  a1 = (a1<0)? 360+a1%360 : a1%360;
  a2 = (a2<0)? 360+a2%360 : a2%360;

  if (a1 === a2) return 0;

  var d = a2-a1;
  if (d<0) d+=360;
  if (d>180) return -1;

  return 1;
}


/**
 * When two or more object arguments are supplied to `merge`, properties from 
 * all of the objects are added to the target object.
 * 
 * Notice that this function does not do deep copy.
 *
 * Reference: http://stackoverflow.com/questions/11197247/javascript-equivalent-of-jquerys-extend-method
 * 
 * @class merge
 * @constructor
 * @param {Object}   target  An object that will receive the new properties.
 * @param {Object}   object1 An object containing additional properties to 
 *                           merge in.
 * @param {Object}   objectN Additional objects containing properties to merge 
 *                           in.
 * @returns {Object} The `target` object with properties merged.
 */
creatine.merge = function() {
  for(var i=1; i<arguments.length; i++) {
    for(var key in arguments[i]) {
      if(arguments[i].hasOwnProperty(key)) {
        if(typeof key === 'object') {
          arguments[0][key] = creatine.merge.call(null, arguments[0][key]||{}, arguments[i][key]);
        } else {
          arguments[0][key] = arguments[i][key];
        }
      }
    }
  }

  return arguments[0];
}


/**
 * Loads a JSON-encoded data from the server using a GET HTTP request.
 *
 * Reference: http://ondrek.me/post/84819614785/how-to-get-json-xml-in-jquery-and-in-vanilla
 * 
 * @class getJSON
 * @constructor
 * @param {String}   url     The URL to which the request is sent.
 * @param {Function} success The callback function that is executed if the 
 *                           request succeeds.
 */
creatine.getJSON = function(url, success) {
  function callback(data) {
    if (data && typeof success === 'function') {
      success(JSON.parse(data));
    }
  }

  var xmlhttp = new XMLHttpRequest();                 
  xmlhttp.overrideMimeType('application/json');  
  xmlhttp.onreadystatechange = function() {
      ready = (xmlhttp.readyState === 4 && xmlhttp.status === 200);
      callback(ready?xmlhttp.responseText:false);
  };
  xmlhttp.open('GET', url, true);
  xmlhttp.send();
}


/**
 * Generates a new sequential identifier, starting from `1`.
 *
 * @class newId
 * @constructor
 * @returns A sequential integer.
 */
creatine.__lastID=0;
creatine.newId = function() {
  return ++creatine.__lastID;
};/** 
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

})();/**
 * @module creatine
  */

(function() {
    "use strict";

  /**
   * Manager used to detect the device support and specification. It is created
   * by the game and can be accessed using `game.device`.
   * 
   * This class is based on phaser Device and System classes.
   * 
   * @class DeviceManager
   * @param {creatine.Game} game The game instance.
   * @constructor
   */
  var DeviceManager = function(game) {
    /**
     * The game instance.
     * @property {creatine.Game} game
     */
    this.game = game;

    /**
     * The canvas object.
     * @property {HTMLCanvasElement} canvas
     * @private
     */
    this._canvas = game.canvas;

    // ========================================================================
    //                                 PLATFORM
    // ========================================================================
    /**
     * Is running in desktop?
     * @property {Boolean} desktop
     * @readonly
     */
    this.desktop = false;

    // ========================================================================
    //                                    OS
    // ========================================================================
    /**
     * iOS Is running on iOS?
     * @property {Boolean} iOS
     * @readonly
     */
    this.iOS = false;

    /**
     * Is running on android?
     * @property {Boolean} android
     * @readonly
     */
    this.android = false;

    /**
     * Is running on chromeOS?
     * @property {Boolean} chromeOS
     * @readonly
     */
    this.chromeOS = false;

    /**
     * Is running on linux?
     * @property {Boolean} linux
     * @readonly
     */
    this.linux = false;

    /**
     * Is running on macOS?
     * @property {Boolean} macOS
     * @readonly
     */
    this.macOS = false;

    /**
     * Is running on windows?
     * @property {Boolean} windows
     * @readonly
     */
    this.windows = false;

    /**
     * Is running on a Windows Phone?
     * @property {Boolean} windowsPhone
     * @readonly
     */
    this.windowsPhone   = false;
    
    // ========================================================================
    //                                 FEATURES
    // ========================================================================
    /**
     * Is canvas available?
     * @property {Boolean} canvas
     * @readonly
     */
    this.canvas = false;

    /**
     * Is file available?
     * @property {Boolean} file
     * @readonly
     */
    this.file = false;

    /**
     * Is fileSystem available?
     * @property {Boolean} fileSystem
     * @readonly
     */
    this.fileSystem = false;

    /**
     * Is localStorage available?
     * @property {Boolean} localStorage
     * @readonly
     */
    this.localStorage = false;

    /**
     * Is webGL available?
     * @property {Boolean} webGL
     * @readonly
     */
    this.webGL = false;

    /**
     * Is worker available?
     * @property {Boolean} worker
     * @readonly
     */
    this.worker = false;

    /**
     * Is touch available?
     * @property {Boolean} touch
     * @readonly
     */
    this.touch = false;

    /**
     * Is mspointer available?
     * @property {Boolean} mspointer
     * @readonly
     */
    this.mspointer = false;

    /**
     * Is css3D available?
     * @property {Boolean} css3D
     * @readonly
     */
    this.css3D = false;

    /**
     * Is pointerLock available?
     * @property {Boolean} pointerLock
     * @readonly
     */
    this.pointerLock = false;

    /**
     * Is typedArray available?
     * @property {Boolean} typedArray
     * @readonly
     */
    this.typedArray = false;

    /**
     * Is vibration available?
     * @property {Boolean} vibration
     * @readonly
     */
    this.vibration = false;

    /**
     * Is getUserMedia available?
     * @property {Boolean} getUserMedia
     * @readonly
     */
    this.getUserMedia = false;

    /**
     * Is quirksMode available?
     * @property {Boolean} quirksMode
     * @readonly
     */
    this.quirksMode = false;
    

    // ========================================================================
    //                                  BROWSER
    // ========================================================================
    /**
     * Is the game running under Ejecta?
     * @property {Boolean} ejecta
     * @readonly
     */
    this.ejecta = false;

    /**
     * Is the game running under CocoonJS?
     * @property {Boolean} cocoonJS
     * @readonly
     */
    this.cocoonJS = false;

    /**
     * Set to true if running as a WebApp, i.e. within a WebView.
     * @property {Boolean} webApp
     * @readonly
     */
    this.webApp = false;

    /**
     * Set to true if running in Arora.
     * @property {Boolean} arora
     * @readonly
     */
    this.arora = false;

    /**
     * Set to true if running in Chrome.
     * @property {Boolean} chrome
     * @readonly
     */
    this.chrome = false;

    /**
     * Set to true if running in Epiphany.
     * @property {Boolean} epiphany
     * @readonly
     */
    this.epiphany = false;

    /**
     * Set to true if running in Firefox.
     * @property {Boolean} firefox
     * @readonly
     */
    this.firefox = false;

    /**
     * Set to true if running in Internet Explorer.
     * @property {Boolean} ie
     * @readonly
     */
    this.ie = false;

    /**
     * If running in Internet Explorer this will contain the major version 
     * number. Beyond IE10 you should use Device.trident and 
     * Device.tridentVersion.
     * 
     * @property {Integer} ieVersion
     * @readonly
     */
    this.ieVersion = 0;

    /**
     * Set to true if running a Trident version of Internet Explorer (IE11+).
     * @property {Boolean} trident
     * @readonly
     */
    this.trident = false;

    /**
     * If running in Internet Explorer 11 this will contain the major version
     * number.
     * 
     * @property {Integre} tridentVersion
     * @readonly
     */
    this.tridentVersion = 0;

    /**
     * Set to true if running in Mobile Safari.
     * @property {Boolean} mobileSafari
     * @readonly
     */
    this.mobileSafari = false;

    /**
     * Set to true if running in Midori.
     * @property {Boolean} midori
     * @readonly
     */
    this.midori = false;

    /**
     * Set to true if running in Opera.
     * @property {Boolean} opera
     * @readonly
     */
    this.opera = false;

    /**
     * Set to true if running in Safari.
     * @property {Boolean} safari
     * @readonly
     */
    this.safari = false;

    /**
     * Set to true if running in the Silk browser (as used on the Amazon 
     * Kindle).
     * 
     * @property {Boolean} silk
     * @readonly
     */
    this.silk = false;
    
 
    // ========================================================================
    //                                   AUDIO
    // ========================================================================
    /**
     * Are Audio tags available?
     * @property {Boolean} audioData
     * @readonly
     */
    this.audioData = false;

    /**
     * Is the WebAudio API available?
     * @property {Boolean} webAudio
     * @readonly
     */
    this.webAudio = false;

    /**
     * Can this device play ogg files?
     * @property {Boolean} ogg
     * @readonly
     */
    this.ogg = false;

    /**
     * Can this device play opus files?
     * @property {Boolean} opus
     * @readonly
     */
    this.opus = false;

    /**
     * Can this device play mp3 files?
     * @property {Boolean} mp3
     * @readonly
     */
    this.mp3 = false;

    /**
     * Can this device play wav files?
     * @property {Boolean} wav
     * @readonly
     */
    this.wav = false;

    /**
     * Can this device play m4a files?
     * @property {Boolean} m4a
     * @readonly
     */
    this.m4a = false;

    /**
     * Can this device play webm files?
     * @property {Boolean} webm
     * @readonly
     */
    this.webm = false;
    
    // ========================================================================
    //                                   DEVICE
    // ========================================================================
    /**
     * Is running on iPhone?
     * @property {Boolean} iPhone
     * @readonly
     */
    this.iPhone = false;

    /**
     * Is running on iPhone 4?
     * @property {Boolean} iPhone4
     * @readonly
     */
    this.iPhone4 = false;

    /**
     * Is running on iPad?
     * @property {Boolean} iPhone4
     * @readonly
     */
    this.iPad = false;

    /**
     * PixelRatio of the host device?
     * @property {Number} pixelRatio
     * @readonly
     */
    this.pixelRatio = 0;

    /**
     * Is the device big or little endian? (only detected if the browser 
     * supports TypedArrays).
     * @property {Boolean} littleEndian
     * @readonly
     */
    this.littleEndian = false;

    /**
     * Does the browser support the Full Screen API?
     * @property {Boolean} fullscreen
     * @readonly
     */
    this.fullscreen = false;


    this._checkAudio();
    this._checkBrowser();
    this._checkCSS3D();
    this._checkDevice();
    this._checkFeatures();
    this._checkOS();
    this._checkFullscreen();
  }
  var p = DeviceManager.prototype;
  
  /**
   * Check which OS is game running on.
   * @method _checkOS
   * @private
   */
  p._checkOS = function () {
    var ua = navigator.userAgent;

    if (/Android/.test(ua)){
      this.android = true;

    } else if (/CrOS/.test(ua)) {
      this.chromeOS = true;

    } else if (/iP[ao]d|iPhone/i.test(ua)) {
      this.iOS = true;

    } else if (/Linux/.test(ua)) {
      this.linux = true;

    } else if (/Mac OS/.test(ua)) {
      this.macOS = true;

    } else if (/Windows/.test(ua)) {
      this.windows = true;

      if (/Windows Phone/i.test(ua)) {
        this.windowsPhone = true;
      }
    }

    if (this.windows || this.macOS || (this.linux && this.silk === false)) {
      this.desktop = true;
    }

    //  Windows Phone / Table reset
    if (this.windowsPhone || ((/Windows NT/i.test(ua)) && (/Touch/i.test(ua)))) {
      this.desktop = false;
    }
  }

  /**
   * Check HTML5 features of the host environment.
   * @method _checkFeatures
   * @private
   */
  p._checkFeatures = function () {
    try {
      this.localStorage = !!localStorage.getItem;
    } catch (error) {
      this.localStorage = false;
    }

    this.file = !!window['File'] && !!window['FileReader'] && !!window['FileList'] && !!window['Blob'];
    this.fileSystem = !!window['requestFileSystem'];
    this.webGL = ( function () { try { var canvas = document.createElement( 'canvas' ); return !! window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ); } catch( e ) { return false; } } )();

    if (this.webGL === null || this.webGL === false) {
      this.webGL = false;
    } else {
      this.webGL = true;
    }

    this.worker = !!window['Worker'];

    if ('ontouchstart' in document.documentElement || (window.navigator.maxTouchPoints && window.navigator.maxTouchPoints > 1)) {
      this.touch = true;
    }

    if (window.navigator.msPointerEnabled || window.navigator.pointerEnabled) {
      this.mspointer = true;
    }

    this.pointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;
    this.quirksMode = (document.compatMode === 'CSS1Compat') ? false : true;
    this.getUserMedia = !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
  }

  /**
   * Check what browser is game running in.
   * @method _checkFeatures
   * @private
   */
  p._checkBrowser = function () {
    var ua = navigator.userAgent;

    if (/Arora/.test(ua)) {
      this.arora = true;

    } else if (/Chrome/.test(ua)) {
      this.chrome = true;

    } else if (/Epiphany/.test(ua)) {
      this.epiphany = true;

    } else if (/Firefox/.test(ua)) {
      this.firefox = true;

    } else if (/Mobile Safari/.test(ua)) {
      this.mobileSafari = true;

    } else if (/MSIE (\d+\.\d+);/.test(ua)) {
      this.ie = true;
      this.ieVersion = parseInt(RegExp.$1, 10);

    } else if (/Midori/.test(ua)) {
      this.midori = true;

    } else if (/Opera/.test(ua)) {
      this.opera = true;

    } else if (/Safari/.test(ua)) {
      this.safari = true;

    } else if (/Silk/.test(ua)) {
      this.silk = true;

    } else if (/Trident\/(\d+\.\d+)(.*)rv:(\d+\.\d+)/.test(ua)) {
      this.ie = true;
      this.trident = true;
      this.tridentVersion = parseInt(RegExp.$1, 10);
      this.ieVersion = parseInt(RegExp.$3, 10);
    }

    // WebApp mode in iOS
    if (navigator['standalone']) {
      this.webApp = true;
    }

    if (navigator['isCocoonJS']) {
      this.cocoonJS = true;
    }

    if (typeof window.ejecta !== "undefined") {
      this.ejecta = true;
    }
  }

  /**
   * Check audio support.
   * @method _checkAudio
   * @private
   */
  p._checkAudio = function () {
      this.audioData = !!(window['Audio']);
      this.webAudio = !!(window['webkitAudioContext'] || window['AudioContext']);
      var audioElement = document.createElement('audio');
      var result = false;

      try {
        if (result = !!audioElement.canPlayType) {
          if (audioElement.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, '')) {
            this.ogg = true;
          }

          if (audioElement.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, '')) {
            this.opus = true;
          }

          if (audioElement.canPlayType('audio/mpeg;').replace(/^no$/, '')) {
            this.mp3 = true;
          }

          // Mimetypes accepted:
          //   developer.mozilla.org/En/Media_formats_supported_by_the_audio_and_video_elements
          //   bit.ly/iphoneoscodecs
          if (audioElement.canPlayType('audio/wav; codecs="1"').replace(/^no$/, '')) {
            this.wav = true;
          }

          if (audioElement.canPlayType('audio/x-m4a;') || audioElement.canPlayType('audio/aac;').replace(/^no$/, '')) {
            this.m4a = true;
          }

          if (audioElement.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, '')) {
            this.webm = true;
          }
        }
      } catch (e) {
      }
  }

  /**
   * Check PixelRatio, iOS device, Vibration API, ArrayBuffers and endianess.
   * @method _checkDevice
   * @private
   */
  p._checkDevice = function () {
    this.pixelRatio = window['devicePixelRatio'] || 1;
    this.iPhone = navigator.userAgent.toLowerCase().indexOf('iphone') != -1;
    this.iPhone4 = (this.pixelRatio == 2 && this.iPhone);
    this.iPad = navigator.userAgent.toLowerCase().indexOf('ipad') != -1;

    if (typeof Int8Array !== 'undefined') {
      this.littleEndian = new Int8Array(new Int16Array([1]).buffer)[0] > 0;
      this.typedArray = true;
    }
    else {
      this.littleEndian = false;
      this.typedArray = false;
    }

    navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;

    if (navigator.vibrate) {
      this.vibration = true;
    }
  }

  /**
   * Check whether the host environment support 3D CSS.
   * @method _checkCSS3D
   * @private
   */
  p._checkCSS3D = function () {
      var el = document.createElement('p');
      var has3d;
      var transforms = {
        'webkitTransform': '-webkit-transform',
        'OTransform': '-o-transform',
        'msTransform': '-ms-transform',
        'MozTransform': '-moz-transform',
        'transform': 'transform'
      };

      // Add it to the body to get the computed style.
      document.body.insertBefore(el, null);

      for (var t in transforms) {
        if (el.style[t] !== undefined) {
          el.style[t] = "translate3d(1px,1px,1px)";
          has3d = window.getComputedStyle(el).getPropertyValue(transforms[t]);
        }
      }

      document.body.removeChild(el);
      this.css3D = (has3d !== undefined && has3d.length > 0 && has3d !== "none");
  }

  /**
   * Checks for support of the Full Screen API.
   * @method _checkFullscreen
   * @private
   */
  p._checkFullscreen = function () {
      var fs = [
        'requestFullscreen',
        'webkitRequestFullscreen',
        'msRequestFullscreen',
        'mozRequestFullScreen',
      ];

      for (var i = 0; i < fs.length; i++) {
        if (this._canvas[fs[i]]) {
          this.fullscreen = true;
          break;
        }
      }

      if (window['Element'] && Element['ALLOW_KEYBOARD_INPUT']) {
        this.fullscreenKeyboard = true;
      }
  }

  /**
   * Check whether the host environment can play audio. Return True if the
   * given file type is supported by the browser, otherwise false.
   *
   * @method canPlayAudio
   * @param {String} type - One of 'mp3, 'ogg', 'm4a', 'wav', 'webm'.
   * @return Boolean
   */
  p.canPlayAudio = function (type) {
    if (type == 'mp3' && this.mp3) {
      return true;
    } else if (type === 'ogg' && (this.ogg || this.opus)) {
      return true;
    } else if (type === 'm4a' && this.m4a) {
      return true;
    } else if (type === 'wav' && this.wav) {
      return true;
    } else if (type === 'webm' && this.webm) {
      return true;
    }

    return false;
  }

  creatine.DeviceManager = DeviceManager;
}());
/**
 * @module creatine
 */

(function() {
  "use strict";

  /**
   * The display manager fullscreen and orientation changes, and canvas 
   * properties. It is created by the game and can be accessed using 
   * `game.display`.
   *
   * This code is based on phaser Display and ScaleManager classes.
   *
   * @class DisplayManager
   * @param {creatine.Game} game A game instance.
   * @constructor
  **/
  var DisplayManager = function(game) {
    /**
     * The game instance.
     * @property {creatine.Game} game
    **/
    this.game = game;

    /**
     * The canvas element.
     * @property {HTMLCanvasElement} canvas
    **/
    this.canvas = game.canvas;

    /**
     * The current canvas width.
     * @property {Integer} width
     * @readonly
    **/
    this.width = null;

    /**
     * The current canvas height.
     * @property {Integer} height
     * @readonly
    **/
    this.height = null;

    /**
     * The original canvas width.
     * @property {Integer} sourceWidth
     * @readonly
    **/
    this.sourceWidth = null;

    /**
     * The original canvas height.
     * @property {Integer} sourceHeight
     * @readonly
    **/
    this.sourceHeight = null;

    /**
     * The minimum width of the canvas, used when canvas is resized.
     * @property {Number} minWidth
     * @readonly
    **/
    this.minWidth = null;

    /**
     * The minimum height of the canvas, used when canvas is resized.
     * @property {Number} minHeight
     * @readonly
    **/
    this.minHeight = null;

    /**
     * The maximum width of the canvas, used when canvas is resized.
     * @property {Number} maxWidth
     * @readonly
    **/
    this.maxWidth = null;

    /**
     * The maximum height of the canvas, used when canvas is resized.
     * @property {Number} maxHeight
     * @readonly
    **/
    this.maxHeight = null;

    /**
     * The orientation of the window.
     * @property {Number} orientation
     * @readonly
    **/
    this.orientation = null;

    /**
     * If `true`, the canvas will be resized using the CSS style.
     * @property {Boolean} scaleUsingCSS
    **/
    this.scaleUsingCSS = false;

    /**
     * The command to call the fullscreen.
     * @property {String} _fullscreenRequest
     * @private
    **/
    this._fullscreenRequest = null;

    /**
     * The last width before entering on fullscreen mode.
     * @property {Number} _width
     * @private
    **/
    this._width = null;

    /**
     * The last height before entering on fullscreen mode.
     * @property {Number} _height
     * @private
    **/
    this._height = null;
    
    this._initialize(); 
  }
  var p = createjs.extend(DisplayManager, createjs.EventDispatcher);

  /**
   * Initialization method.
   * @method initialize
   * @private
  **/
  p._initialize = function() {
    this.EventDispatcher_constructor();
    
    this.width = this.sourceWidth = this.canvas.width;
    this.height = this.sourceHeight = this.canvas.height;
    this.orientation = 0;
    this.scaleUsingCSS = false;

    // CHECK ORIENTATION
    if (window['orientation']) {
      this.orientation = window['orientation'];

    } else if (window.outerWidth > window.outerHeight) {
      this.orientation = 90;
    }

    // CHECK FULLSCREEN
    var fs = [
      'requestFullscreen',
      'webkitRequestFullscreen',
      'msRequestFullscreen',
      'mozRequestFullScreen',
    ];

    for (var i=0; i<fs.length; i++) {
      if (this.canvas[fs[i]]) {
        this._fullscreenRequest = fs[i];
        break
      }
    }

    // REGISTER EVENTS
    var _this = this;

    window.addEventListener('resize', function(event) {
      return _this._onResize(event);
    }, false);

    window.addEventListener('orientationchange', function(event) {
      return _this._onOrientation(event);
    }, false);

    document.addEventListener('webkitfullscreenchange', function(event) {
      return _this._onFullscreen(event);
    }, false);

    document.addEventListener('mozfullscreenchange', function(event) {
      return _this._onFullscreen(event);
    }, false);

    document.addEventListener('fullscreenchange', function(event) {
      return _this._onFullscreen(event);
    }, false);
  }

  /**
   * Sets the Image Smoothing property on the given context. Set to false to 
   * disable image smoothing. By default browsers have image smoothing 
   * enabled, which isn't always what you visually want, especially when 
   * using pixel art in a game. Note that this sets the property on the 
   * context itself, so that any image drawn to the context will be affected.
   * This sets the property across all current browsers but support is patchy
   * on earlier browsers, especially on mobile.
   *
   * @method setSmoothingEnabled
   * @param {boolean} value - If set to true it will enable image smoothing, 
   *        false will disable it.
  **/
  p.setSmoothingEnabled = function(value) {
      var context = this.canvas.getContext("2d");

      context['imageSmoothingEnabled'] = value;
      context['mozImageSmoothingEnabled'] = value;
      context['oImageSmoothingEnabled'] = value;
      context['webkitImageSmoothingEnabled'] = value;
      context['msImageSmoothingEnabled'] = value;
  }

  /**
   * Sets the CSS image-rendering property on the given canvas to be 'crisp' 
   * (aka 'optimize contrast on webkit'). Note that if this doesn't given the
   * desired result then see the setSmoothingEnabled.
   *
   * @method setImageRenderingCrisp
   * @param {HTMLCanvasElement} canvas The canvas to set image-rendering 
   *        crisp on.
  **/
  p.setImageRenderingCrisp = function() {
    var canvas = this.canvas;

    canvas.style['image-rendering'] = 'optimizeSpeed';
    canvas.style['image-rendering'] = 'crisp-edges';
    canvas.style['image-rendering'] = '-moz-crisp-edges';
    canvas.style['image-rendering'] = '-webkit-optimize-contrast';
    canvas.style['image-rendering'] = 'optimize-contrast';
    canvas.style.msInterpolationMode = 'nearest-neighbor';
  }

  /**
   * Sets the CSS image-rendering property on the given canvas to be 
   * 'bicubic' (aka 'auto'). Note that if this doesn't given the desired 
   * result then see the setSmoothingEnabled method.
   *
   * @method setImageRenderingBicubic
  **/
  p.setImageRenderingBicubic = function() {
    var canvas = this.canvas;
    canvas.style['image-rendering'] = 'auto';
    canvas.style.msInterpolationMode = 'bicubic';
  }

  /**
   * Sets the user-select property on the canvas style. Can be used to 
   * disable default browser selection actions.
   *
   * @method setUserSelect
   * @param {String} value The touch action to set. Defaults to 'none'.
  **/
  p.setUserSelect = function(value) {
      var canvas = this.canvas;

      value = value || 'none';
      canvas.style['-webkit-touch-callout'] = value;
      canvas.style['-webkit-user-select'] = value;
      canvas.style['-khtml-user-select'] = value;
      canvas.style['-moz-user-select'] = value;
      canvas.style['-ms-user-select'] = value;
      canvas.style['user-select'] = value;
      canvas.style['-webkit-tap-highlight-color'] = 'rgba(0, 0, 0, 0)';
  }

  /**
   * Sets the touch-action property on the canvas style. Can be used to 
   * disable default browser touch actions.
   *
   * @method setTouchAction
   * @param {String} value The touch action to set. Defaults to 'none'.
  **/
  p.setTouchAction = function(value) {
    var canvas = this.canvas;

    value = value || 'none';
    canvas.style.msTouchAction = value;
    canvas.style['ms-touch-action'] = value;
    canvas.style['touch-action'] = value;
  }

  /**
   * Sets the background color behind the canvas. This changes the canvas 
   * style property.
   *
   * @method setBackgroundColor
   * @param {String} color The color to set. Can be in the format 
   *        'rgb(r,g,b)', or '#RRGGBB' or any valid CSS color.
  **/
  p.setBackgroundColor = function(color) {
    color = color || 'rgb(0,0,0)';
    canvas.style.backgroundColor = color;
  }

  /**
   * Sets the background image behind the canvas. This changes the canvas 
   * style property.
   *
   * @method setBackgroundImage
   * @param {String} image The image path.
  **/
  p.setBackgroundImage = function(image) {
    image = image || 'none';
    canvas.style.backgroundImage =  image;
  }
  
  // ========================================================================
  //                             ORIENTATION
  // ========================================================================
  /**
   * Returns true if the browser dimensions match a portrait display.
   * @method isPortrait
   * @returns {Boolean}
  **/
  p.isPortrait = function() {
    return this.orientation === 0 || this.orientation == 180;
  }

  /**
   * Returns true if the browser dimensions match a landscape display.
   * @method isLandscape
   * @returns {Boolean}
  **/
  p.isLandscape = function() {
    return this.orientation === 90 || this.orientation === -90;
  }

  // ========================================================================
  //                              FULLSCREEN
  // ========================================================================
  /**
   * Returns true if the browser is in full screen mode, otherwise false.
   * @method isFullScreen
   * @returns {Boolean}
  **/
  p.isFullscreen = function() {
    return (document['fullscreenElement'] || 
            document['mozFullScreenElement'] || 
            document['webkitFullscreenElement']);
  }

  /**
   * Tries to enter the browser into full screen mode.
   * Please note that this needs to be supported by the web browser and 
   * isn't the same thing as setting your game to fill the browser.
   * 
   * @method startFullscreen
  **/
  p.startFullscreen = function () {
    if (!this._fullscreenRequest || this.isFullscreen()) {
      return;
    }

    this._width = this.width;
    this._height = this.height;

    if (window['Element'] && Element['ALLOW_KEYBOARD_INPUT']) {
      this.canvas[this._fullscreenRequest](Element.ALLOW_KEYBOARD_INPUT);
    } else {
      this.canvas[this._fullscreenRequest]();
    }
  }
  
  /**
   * Stops full screen mode if the browser is in it.
   * @method stopFullScreen
  **/
  p.stopFullscreen = function () {
    if (!this.isFullscreen()) {
      return;
    }

    if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msCancelFullScreen) {
      document.msCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.mozExitFullscreen) {
      document.mozExitFullscreen();
    } 
  }

  // ========================================================================
  //                                EVENTS
  // ========================================================================
  /**
   * The resize change callback.
   *
   * @method _onResize
   * @private
  **/
  p._onResize = function(event) {
    this.dispatchEvent('resize');
  }

  /**
   * The orientation change callback.
   *
   * @method _onOrientation
   * @private
  **/
  p._onOrientation = function(event) {
    this.orientation = window['orientation'];
    this.dispatchEvent('orientation');

    if (this.isPortrait()) {
      this.dispatchEvent('enterportrait');
    }
    else {
      this.dispatchEvent('enterlandscape');
    }
  }

  /**
   * The fullscreen change callback.
   * @method _onFullscreen
   * @private
  **/
  p._onFullscreen = function(event) {
    if (this.isFullscreen()) {
      this.dispatchEvent('enterfullscreen');

    } else {
      this.width = this._width;
      this.height = this._height;
      this.canvas.width = this._width;
      this.canvas.height = this._height;
      this.dispatchEvent('exitfullscreen');
    }
  }

  creatine.DisplayManager = createjs.promote(DisplayManager, "EventDispatcher");
}());
/** 
 * @module creatine
 */

(function() {
  "use strict";

  /**
   * The factory manager facilitates the creation of some objects. It is 
   * instantiated by the game and can be accessed via `game.create`. 
   *
   * The functions here receives some obligatory or essential parameters plus 
   * a parameter name `properties`, whose values will be write into the new 
   * object. Additionally, you can use constants to set the object registration
   * points (only if the object implements the `getBounds` function correctly).
   * Take a look at the example below to see this work.
   * 
   * Notice that this factory does not add the objects to the stage, you must 
   * do that manually. It is **highly recommended** that you create all your 
   * objects during the initialization of the game (the create state).
   * 
   * ## Usage example
   *
   *     var game = new tine.Game(null, {
   *       preload: function() {
   *         game.load.image('daisy', 'path/to/daisy.png');
   *       },
   *       create: function() {
   *        var image = game.create.bitmap('daisy', 
   *          {x:400, y:300, regX:'center', regY:'center'} // or
   *        //{x:400, y:300, regX:tine.CENTER, regY:tine.CENTER}
   *        )
   *        game.stage.addChild(image);
   *       }
   *     })
   * 
   * @class FactoryManager
   * @constructor
   * @param {Object} game The game instance.
   */ 
  var FactoryManager = function(game) {
    /**
     * The game instance.
     * @property {creatine.Game} game
     */
    this.game = game;
  }
  var p = FactoryManager.prototype;
  
  //---------------------------------------------------------------------------
  // INTERNAL METHODS
  //---------------------------------------------------------------------------
  /**
   * Set the registration points for a given object. The anchors are given 
   * independently and can be the constants `'left', 'center', 'right'` for 
   * `regX` and `'top', 'center', 'bottom'` for `regY`. Notice that, this will
   * only set the anchor using constants if the object implements the method
   * `getBounds`.
   * 
   * @method _setAnchor
   * @param {Object} object The target object.
   * @param {Integer or String} regX The registration point at X.
   * @param {Integer or String} regY The registration point at Y.
   * @private
   */
  p._setAnchor = function(object, regX, regY) {
    var bounds = object.getBounds() || {};
    var w = bounds.width || 0;
    var h = bounds.height || 0;

    if (regX===creatine.LEFT) {
      object.regX = 0;
    } else if (regX===creatine.CENTER) {
      object.regX = w/2;
    } else if (regX===creatine.RIGHT) {
      object.regX = w;
    } else {
      object.regX = regX
    }

    if (regY===creatine.TOP) {
      object.regY = 0;
    } else if (regY===creatine.CENTER) {
      object.regY = h/2;
    } else if (regY===creatine.BOTTOM) {
      object.regY = h;
    } else {
      object.regY = regY
    }
  }

  /**
   * Given a set of properties, this method insert these properties into a 
   * given object.
   * 
   * @method _setProperties
   * @param {Object} object The target object.
   * @param {Object} [properties] The object with properties.
   * @private
   */
  p._setProperties = function(object, properties) {
    for (var key in properties) {
      if (key === 'regX' || key === 'regY') continue;
      object[key] = properties[key];
    }
    this._setAnchor(object, properties['regX'], properties['regY'])
  }

  /**
   * If string, retrieve the resource from the resource manager. Otherwise it
   * just return the same object. It will throw an error if the provided ID 
   * isn't recorded at the resource manager.
   * 
   * @method _getResource
   * @param {Object} idOrData An ID string or an object.
   * @returns {Object} The resource.
   * @private
   */
  p._getResource = function(idOrData) {
    var resource = idOrData;
    if (typeof idOrData === 'string') {
      resource = this.game.load.get(idOrData);
      if (!resource && !idOrData.startsWith('data:')) {
        throw Error('Resource "'+idOrData+'" couldn\'t be found.');
      }
    }

    return resource;
  }

  //---------------------------------------------------------------------------
  // PUBLIC FACTORY METHODS
  //---------------------------------------------------------------------------
  /**
   * Creates a new `createjs.Bitmap` object.
   * 
   * @method bitmap
   * @param {Object} idOrData An ID string or an image object.
   * @param {Object} [properties] A list of initial properties.
   * @returns {Object} The Bitmap.
   */
  p.bitmap = function(idOrData, properties) {
    var image = this._getResource(idOrData);
    var bitmap = new createjs.Bitmap(image);
    if (properties) this._setProperties(bitmap, properties);
    return bitmap;
  }

  /**
   * Creates a new `createjs.SpriteSheet` object from a given data.
   * 
   * @method spritesheet
   * @param {Object} idOrData An ID string for a loaded data or a data object.
   * @param {Object} [properties] A list of initial properties.
   * @returns {Object} The SpriteSheet.
   */
  p.spritesheet = function(idOrData, properties) {
    var data = this._getResource(idOrData);
    var ss = new createjs.SpriteSheet(data);
    if (properties) this._setProperties(ss, properties);
    return data;
  }

  /**
   * Creates a new `createjs.Sprite` given the sprite sheet and the animation.
   * 
   * @method sprite
   * @param {Object} idOrData An ID string or a spritesheet object.
   * @param {Object} animation The animation of the sprite.
   * @param {Object} [properties] A list of initial properties.
   * @returns {Object} The Sprite.
   */
  p.sprite = function(idOrData, animation, properties) {
    var image = this._getResource(idOrData);
    var sprite = new createjs.Sprite(image, animation);
    if (properties) this._setProperties(sprite, properties);
    return sprite;
  }

  /**
   * Creates a new `creatine.tmx.Map` from a Tiled data.
   * 
   * @method tilemap
   * @param {Object} idOrData An ID string or a data object.
   * @param {Object} [properties] A list of initial properties.
   * @returns {Object} The tile Map.
   */
  p.tilemap = function(idOrData, properties) {
    var data = this._getResource(idOrData);
    var map = new creatine.tmx.Map(data);
    if (properties) this._setProperties(map, properties);
    return map;
  }

  /**
   * Creates a new `creatine.BitmapText` from a spritesheet.
   * 
   * @method bitmaptext
   * @param {Object} idOrData An ID string or a sprite sheet object.
   * @param {Object} text The initial text.
   * @param {Object} [properties] A list of initial properties.
   * @returns {Object} The bitmap text.
   */
  p.bitmaptext = function(idOrData, text, properties) {
    var image = this._getResource(idOrData);
    var bitmap = new createjs.BitmapText(text, image);
    if (properties) this._setProperties(bitmap, properties);
    return bitmap;
  }

  /**
   * Creates a new `creatine.Text`.
   * 
   * @method text
   * @param {Object} text The initial text.
   * @param {Object} [properties] A list of initial properties.
   * @returns {Object} The text.
   */
  p.text = function(text, properties) {
    var obj = new createjs.Text(text);
    if (properties) this._setProperties(obj, properties);
    return obj;
  }

  /**
   * Creates a new `creatine.Shape`.
   * 
   * @method shape
   * @param {Object} [properties] A list of initial properties.
   * @returns {Object} The shape.
   */
  p.shape = function(properties) {
    var shape = new createjs.Shape();
    if (properties) this._setProperties(shape, properties);
    return shape;
  }

  /**
   * Shortcut for:
   *
   *     var shape = game.create.shape(properties);
   *     shape.graphics.f(color).dc(0, 0, r);
   * 
   * @method circle
   * @param {Number} r The circle radius.
   * @param {Object} [color='white'] The circle color.
   * @param {Object} [properties] A list of initial properties.
   * @returns {Object} The shape.
   */
  p.circle = function(r, color, properties) {
    var shape = new createjs.Shape();
    shape.graphics.f(color||'white').dc(0, 0, r);
    if (properties) this._setProperties(shape, properties);
    return shape;
  }

  /**
   * Shortcut for:
   *
   *     var shape = game.create.shape(properties);
   *     shape.graphics.f(color).r(-w/2, -h/2, w, h);
   * 
   * @method box
   * @param {Number} w The box width.
   * @param {Number} h The box height.
   * @param {Object} [color='white'] The box color.
   * @param {Object} [properties] A list of initial properties.
   * @returns {Object} The shape.
   */
  p.box = function(w, h, color, properties) {
    var shape = new createjs.Shape();
    shape.graphics.f(color||'white').r(-w/2, -h/2, w, h);
    if (properties) this._setProperties(shape, properties);
    return shape;
  }

  creatine.FactoryManager = FactoryManager;
})();
/** 
 * @module creatine
 */

(function() {
  "use strict";

  /**
   * The role of a resource manager is to load and handle different file types.
   * It instantiated by the game and can be accessed via `game.load`.
   * 
   * The `ResourceManager` is a bridge to the `createjs.LoadQueue`, which can 
   * be accessed using `game.load._loader`. It adds some features to the 
   * default load queue of CreateJS, such as the capability to define groups 
   * (of sound manager) directly in the manifest or convert all images directly
   * into `createjs.SpriteSheet` objects.
   *
   * Events to the queue can be added or removed via `on` and `off`. To 
   * retrieve some result you can simply use the `get` method. The resource 
   * manager can handle directly the following types:
   *
   * - **image**: a simple image as PNG, JPG or GIF.
   * - **spritesheet**: an image atlas that will be converted to the 
   * spritesheet object.
   * - **audio**: an audio file. It can be added directly to the sound groups.
   * - **audiosprite**: an audio atlas that will be converted to individual
   * sounds, each sound can be individually added to the sound groups.
   * - **json**: a JSON object that will be converted to a data object.
   * - **script**: a JavaScript file that will be added automatically to the 
   * page.
   * - **css**: a stylesheet file that will be added automatically to the page.
   * - **manifest**: a manifest list. Notice that this can be slightly 
   * different from the manifest used by CreateJS.
   * - **raw**: any other requisition that will be send directly to the 
   * `LoadQueue`.
   *
   * ## Usage examples
   *
   *     var game = new tine.Game({resources:{
   *       manifest: [
   *         {id:'img_daisy', src:'path/image/daisy.png'},
   *         {
   *           id:'img_grant', 
   *           src:'path/spritesheet/grant.png',
   *           type:'spritesheet',
   *           data: {
   *             frames: {width:50, height:50},
   *             animations: {stand: 0, run: [1, 5]}
   *           }  
   *         }
   *       ]
   *     }})
   *
   * Alternatively:
   *
   *     var game = new tine.Game(null, {
   *       preload: function() {
   *         game.load.image('img_daisy', 'path/image/daisy.png');
   *         game.load.spritesheet('img_grant', 'path/spritesheet/grant.png', {
   *           frames: {width:50, height:50},
   *           animations: {stand: 0, run: [1, 5]}
   *         });
   *       }
   *     })
   * 
   * 
   * 
   * @class ResourceManager
   * @constructor
   * @param {Object} game The game instance.
   */
  var ResourceManager = function(game) {
    /**
     * The game instance.
     * @property {creatine.Game} game
     */
    this.game = game;

    /**
     * Cache for post processed objects. Other objects are store in `_loader`.
     * @property {Object} _cache
     */
    this._cache = {};

    /**
     * The queued objects to post process.
     * @property {Array} _processQueue
     */
    this._processQueue = [];
  
    /**
     * The base path for assets, this will be used as prefix the resource 
     * pathes.
     * 
     * @property {String} basePath
     */
    this.basePath = '';

    // config
    this._initializeConfig(game.config['resources']||{})

    // loadqueue
    this._loader = new createjs.LoadQueue(false);
    this._loader.installPlugin(createjs.Sound);
    this._loader.on('complete', this._postProcess, this);
  }
  var p = ResourceManager.prototype;


  // --------------------------------------------------------------------------
  // INTERNAL METHODS
  // --------------------------------------------------------------------------
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
    if (config.base_path && typeof config.base_path === 'string') {
      this.basePath = config.base_path;
      if (!this.basePath.endsWith('/')) { this.basePath += '/'; }
    }
  }

  /**
   * Handle some types after the preloading process, like spritesheets, 
   * audio and audiosprites. The processed files may be included into the 
   * `_cache`.
   * 
   * @method _postProcess
   * @private
   */
  p._postProcess = function() {
    for (var i=0; i<this._processQueue.length; i++) {
      var toProcess = this._processQueue[i];
      var tempObject = this._loader.getResult(toProcess.id);

      switch (toProcess.type) {
        case 'spritesheet':
          toProcess.data['images'] = [tempObject];
          var finalObject = new createjs.SpriteSheet(toProcess.data);
          break;
        case 'audio':
          if (toProcess.data && toProcess.data.group) {
            this.game.sound.add(toProcess.id, toProcess.data.group);
          }
          break;
        case 'audiosprite':
          if (toProcess.data) {
            var data = toProcess.data;
            for (var j=0; j<data.length; j++) {
              var d = data[j];
              if (d.group) {
                this.game.sound.add(d.id, d.group);
              }
            }
          }
          break;
      }

      if (finalObject) {
        this._cache[toProcess.id] = finalObject;
      }
    }
  }


  // --------------------------------------------------------------------------
  // PUBLIC COMMON METHODS
  // --------------------------------------------------------------------------
  /**
   * Register an event to the CreateJS `LoadQueue`. This is a shortcut for 
   * `_loader.on`.
   *
   * @method on
   * @param {String} event The event name.
   * @param {Function} callback The callback function.
   * @param {Object} context The context object.
   */
  p.on = function(event, callback, context) {
    this._loader.on(event, callback, context);
  }

  /**
   * Unregister an event to the CreateJS `LoadQueue`. This is a shortcut for 
   * `_loader.off`.
   *
   * @method on
   * @param {String} event The event name.
   * @param {Function} callback The callback function.
   */
  p.off = function(event, callback) {
    this._loader.off(event, callback);
  }

  /**
   * Initialize the preloading process. This is called automatically by the 
   * game, right after the preload state.
   *
   * @method load
   */
  p.load = function() {
    this._loader.load();
  }

  /**
   * Retrieve a loaded item by ID. Look first in the internal cache then in the
   * `LoadQueue`.
   *
   * @method get
   * @param {String} id The identifier for the resource.
   * @returns {Object} The loaded resource.
   */
  p.get = function(id) {
    if (typeof this._cache[id] !== 'undefined') {
      return this._cache[id];
    }

    return this._loader.getResult(id);
  }

  /**
   * Verify if the loading process is finished. Notice that this return `true` 
   * if the loading queue is empty, even if it has never been used.
   *
   * @method isFinished
   * @param {String} id The identifier for the resource.
   * @returns {Boolean} The loading status. 
   */
  p.isFinished = function() {
    return this._loader._numItems === this._loader._numItemsLoaded;
  }


  // --------------------------------------------------------------------------
  // PUBLIC TYPE METHODS (USE THIS TO REGISTER ITENS TO BE LOADED)
  // --------------------------------------------------------------------------
  /**
   * Loads an image.
   * @method image
   * @param {String} id  The unique identifier for this image.
   * @param {String} src The url for this image.
   */
  p.image = function(id, src) {
    this._loader.loadFile({id:id, src:this.basePath+src, type:'image'}, false);
  }

  /**
   * Loads a sprite sheet. A data object must be provided. 
   *
   * Please consult the SpriteSheet API to see how data is formatted:
   * http://createjs.com/Docs/EaselJS/classes/SpriteSheet.html
   *
   * @method spritesheet
   * @param {String} id   The unique identifier for this spritesheet.
   * @param {String} src  The url for this image.
   * @param {Object} data The data describing the sprite sheet
   */
  p.spritesheet = function(id, src, data) {
    if (typeof src === 'string' && src.endsWith('.json')) {
      this._loader.loadFile({id:id, src:this.basePath+src, type:'spritesheet'}, false);
    } else {
      this._loader.loadFile({id:id, src:this.basePath+src, data:data}, false);
      this._processQueue.push({id:id, data:data, type:'spritesheet'});
    }
  }

  /**
   * Loads an audio. A data object may be provided with the sound group. For 
   * example:
   *
   *     game.load.audio('my_audio', 'audio.mp3', {group: 'effect1'});
   *
   * @method audio
   * @param {String} id     The unique identifier for this audio.
   * @param {String} src    The url for this audio.
   * @param {Object} [data] An object with the audio group.
   */
  p.audio = function(id, src, data) {
    this._loader.loadFile({id:id, src:this.basePath+src}, false)
    this._processQueue.push({id:id, data:data, type:'audio'});
  }

  /**
   * Loads an audio sprite. A data object must be provided with the individual 
   * sound data, a group may be provided. For example:
   *
   *     game.load.audiosprite('_', 'audio.mp3', [
   *       {id:'as1', start:1000, duration:1000, group:'hit'},
   *       {id:'as2', start:8000, duration:500, group:'hit'},
   *       {id:'as3', start:17000, duration:1000, group:'bounce'}
   *     ]);
   *
   * @method audiosheet
   * @param {String} id     The unique identifier for this audio.
   * @param {String} src    The url for this audio.
   * @param {Object} [data] An object with the audio group.
   */
  p.audiosprite = function(id, src, data) {
    this._loader.loadFile({id:id, src:this.basePath+src}, false);
    var _data = [];
    for (var i=0; i<data.length; i++) {
      var d = data[i];
      _data.push({id:d.id, startTime:d.start, duration:d.duration})
    }
    this._processQueue.push({id:id, data:data, type:'audiosprite'});

    createjs.Sound.registerSounds([{src:this.basePath+src, data:{audioSprite:_data}}], '');
  }

  /**
   * Loads a JSON file. The file will be converted automatically.
   * @method json
   * @param {String} id  The unique identifier for this file.
   * @param {String} src The url for this JSON.
   */
  p.json = function(id, src) {
    this._loader.loadFile({id:id, src:this.basePath+src}, false);
  }

  /**
   * Loads a JavaScript file. The file will be added to the page.
   * @method script
   * @param {String} id  The unique identifier for this script.
   * @param {String} src The url for this script.
   */
  p.script = function(id, src) {
    this._loader.loadFile({id:id, src:this.basePath+src}, false);
  }

    /**
   * Loads a stylesheet file. The file will be added to the page.
   * @method css
   * @param {String} id  The unique identifier for this file.
   * @param {String} src The url for this file.
   */
  p.css = function(id, src) {
    this._loader.loadFile({id:id, src:this.basePath+src}, false);
  }

  /**
   * Loads a manifest. See the individual types to see their formats.
   * @method manifest
   * @param {Object} data A list of objects.
   */
  p.manifest = function(data) {
    for (var i=0; i<data.length; i++) {
      var d = data[i];
      if (d.type === 'audio') {
        this.audio(d.id, d.src, d.data);
      } else if (d.type === 'audiosprite') {
        this.audiosprite(d.id, d.src, d.data);
      } else if (d.type === 'spritesheet') {
        this.spritesheet(d.id, d.src, d.data);
      } else {
        this.raw(d);
      }
    }
    this._loader.loadManifest(data, false);
  }

  /**
   * Loads a file using directly the `LoadQueue`.
   * @method raw
   * @param {Object} itemData The properties of the target object.
   */
  p.raw = function(itemData) {
    this._loader.loadFile(itemData, false);
  }

  creatine.ResourceManager = ResourceManager;
})();/** 
 * @module creatine
 */

(function() {
  "use strict";

  /**
   * The sound manager facilitates the use of SoundJS by adding sound groups 
   * and persistent options. This manager is created by the game and can be 
   * accessed using `game.sound`.
   *
   * This manager provides two features to improve SoundJS. The first feature
   * is the capability for you to create sound groups. After creating and 
   * adding sounds to a group, you can play a random registered sound in that
   * group by playing the group itself.
   *
   * The second feature is the capability to remember the sound configuration 
   * by using the storage manager. So when the user set the volume or mute of 
   * the game, these information are stored. Notice that, persistence uses the
   * project name defined in the configuration to store the audio settings, so
   * if you are using the default parameters, you may start with non-default 
   * values (even muted).
   *
   * ## Usage examples
   *
   * Using sound groups:
   *
   *     var game = new tine.Game(null, {
   *       preload: function() {
   *         game.load.audio('my-audio', 'blob.mp3');
   *         game.load.audio('my-audio2', 'blob2.mp3');
   *       },
   *       create: function() {
   *         game.sound.add('my-audio', 'blob effect');
   *         game.sound.add('my-audio2', 'blob effect');
   *         game.sound.play('blob effect');
   *       }
   *     })
   * 
   * @class SoundManager
   * @constructor
   * @param {Object} game The game instance.
   */ 
  var SoundManager = function(game) {
    /**
     * The game instance.
     * @property {creatine.Game} game
     */
    this.game = game;

    /**
     * Indicates if persistence is on or off.
     * @property {Boolean} _persistent
     * @private
     */
    this._persistent = true;

    /**
     * The reference to the storage manager.
     * @property {creatine.StorageManager} _storage
     * @private
     */
    this._storage = game.storage;

    /**
     * The sound groups.
     * @property {Object} groups
     * @private
     */
    this._groups = {};

    if (this._persistent) {
      var volume = this._storage.iget('sound', 'volume');
      var mute = this._storage.iget('sound', 'mute');

      if (volume === parseFloat(volume)) this.volume = volume;
      createjs.Sound.setMute(!!mute);
    }
  }
  var p = SoundManager.prototype;

  //---------------------------------------------------------------------------
  // PROPERTIES
  //---------------------------------------------------------------------------
  
  /**
   * Returns the current master volume. Same as `createjs.Sound.getVolume()`.
   *
   * @method getVolume
   * @return {Number} The master volume (between 0 and 1).
  **/
  p.getVolume = function() {
    return createjs.Sound.getVolume();
  }

  /**
   * Set the current master volume. Save it to the local storage if needed.
   *
   * @method setVolume
   * @param {Number} value The master volume (between 0 and 1).
  **/
  p.setVolume = function(value) {
    var value = creatine.clip(value, 0, 1);
    createjs.Sound.setVolume(value);
    if (this._persistent) {
      this._storage.iset('sound', 'volume', value);
    };
  }

  /**
   * Return is the manager is using the persistence or not.
   *
   * @method getPersistent
   * @return {Boolean} The persistence status.
  **/
  p.getPersistent = function() {
    return this._persistent;
  }

  /**
   * Set persistence the persistence status.
   *
   * @method setPersistent
   * @return {Boolean} value The persistence status.
  **/
  p.setPersistent = function(value) {
    this._persistent = value;
    if (this._persistent) {
      this._storage.iset('sound', 'volume', this.getVolume);
    }
  }


  //---------------------------------------------------------------------------
  // GROUP ACCESS (FOR RANDOM PLAY)
  //---------------------------------------------------------------------------
  /**
   * Adds a sound to a sound group.
   *
   * @method add
   * @param {String} sound The sound name (as registered in resource manager).
   * @param {String} group The group name.
  **/
  p.add = function(sound, group) {
    if (!sound) throw new Error('Sound name is mandatory.');
    if (!group) throw new Error('Group name is mandatory.');

    if (!this._groups[group]) {
      this._groups[group] = [];
    }

    this._groups[group].push(sound);
  }

  /**
   * Removes a sound from a sound group.
   *
   * @method remove
   * @param {String} sound The sound name (as registered in resource manager).
   * @param {String} group The group name.
  **/
  p.remove = function(sound, group) {
    if (!sound) throw new Error('Sound name is mandatory.');
    if (!group) throw new Error('Group name is mandatory.');

    var sounds = this._groups[group]
    if (!sounds) return;
    
    for (var i=0; i<sounds.length; i++) {
      if (sounds[i] == sound) {
        sounds.splice(i, 1);
        return;
      }
   }
  }


  //---------------------------------------------------------------------------
  // CORE METHODS
  //---------------------------------------------------------------------------
  /**
   * Play a sound. If the name is a group in sound groups, play a random
   * sound in that group.
   *
   * @method play
   * @param {String} name The audio ID or group name.
   * @param {String | Object} [interrupt="none"|options] How to interrupt any 
   * currently playing instances of audio with the same source, see the API for
   * SoundJS to know more.
   * @param {Number} [delay=0] The amount of time to delay the start of audio 
   * playback, in milliseconds.
   * @param {Number} [offset=0] The offset from the start of the audio to begin
   * playback, in milliseconds.
   * @param {Number} [loop=0] How many times the audio loops when it reaches 
   * the end of playback. The default is 0 (no loops), and -1 can be used for 
   * infinite playback.
   * @param {Number} [volume=1] The sound volume. 
   * @param {Number} [pan=0] The left-right pan of the sound (if supported), 
   * between -1 (left) and 1 (right).
   * @return {SoundInstance} A "SoundInstance" that can be controlled after it
   * is created.
  **/
  p.play = function(name, interrupt, delay, offset, loop, volume, pan) {
    var group = this._groups[name];

    if (group) {
      var idx = creatine.randomInt(0, group.length-1);
      name = group[idx];
    }

    return createjs.Sound.play(name, interrupt, delay, offset, loop, volume, pan);
  }

  /**
   * Mute/Unmute all audio. Same as setting mute on SoundJS but with 
   * persistence if enabled.
   *
   * @method toogleMute
  **/
  p.toogleMute = function() {
    if (createjs.Sound.getMute()) {
      var value = false;
    } else {
      var value = true;
    }
    createjs.Sound.setMute(value);
    this._storage.iset('sound', 'mute', value);
  }

  /**
   * It is muted or note?
   *
   * @method isMute
   * @returns {Boolean} `true` if game is muted or `false` if it is not.
  **/
  p.isMute = function() {
    return createjs.Sound.getMute();
  }


  //---------------------------------------------------------------------------
  // PROPERTIES CONFIGURATION
  //---------------------------------------------------------------------------
  
  /**
   * @property {Number} volume
  **/
  /**
   * @property {Boolean} persistent
  **/
  try {
    Object.defineProperties(p, {
      volume     : {get:p.getVolume, set:p.setVolume},
      persistent : {get:p.getPersistent, set:p.setPersistent},
    });
  } catch (e) {}

  creatine.SoundManager = SoundManager;

})();/** 
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

})();/** 
 * @module creatine
 */

(function() {
  "use strict";

  /**
   * This manager is a helper to use the browser localStorage feature. It is 
   * created by the game and accessed using `game.storage`.
   *
   * The localStorage is a HTML5 feature which allows persistent local 
   * storage (JS can save information in the browser). But, it is limited to
   * string values only. This class helps you to store and retrieve any kind
   * of data inside a local storage (by converting these values from/to 
   * JSON).
   *
   * Notice that this class uses the `game.config.project` as prefix for all 
   * stored keys.
   *
   * ## Usage example
   *
   *     var game = new tine.Game();
   *     
   *     game.storage.set('boolean-value', true);
   *     game.storage.set('string-value', 'lalala');
   *     game.storage.set('integer-value', 23);
   *     game.storage.set('object-value', {a:3});
   *
   *     console.log(game.storage.get('boolean-value')); // true
   *     console.log(game.storage.get('string-value'));  // 'lalala'
   *     console.log(game.storage.get('integer-value')); // 23
   *     console.log(game.storage.get('object-value'));  // {a:3}
   *
   * @class StorageManager
   * @constructor
   * @param {Object} game The game instance.
   */ 
  var StorageManager = function(game) {
    /**
     * The game instance.
     * @property {creatine.Game} game
     */
    this.game = game;

    /**
     * The reference to the local storage, if this isn't provided by the 
     * browser then it is a simple object.
     * 
     * @property {Object} _memory
     * @private
     */
    this._memory = localStorage;

    /**
     * The name (same as `game.config.project`).
     * @property {String} _namespace
     * @private
     */
    this._namespace = game.config.project;

    try {
      !!localStorage.getItem;
    } catch (e) {
      this._memory = {};
    }
  }
  var p = StorageManager.prototype;

  //---------------------------------------------------------------------------
  // CORE ACCESS (INTERNAL)
  //---------------------------------------------------------------------------
  /**
   * Same as `set` but used by internal modules.
   * @method iset
   * @param {String} module The name of the module using it.
   * @param {String} key The key identifier.
   * @param {Object} value The value to be stored.
   * @protected
   */
  p.iset = function(module, key, value) { this.set('['+module+']'+key, value); }

  /**
   * Same as `get` but used by internal modules.
   * @method iget
   * @param {String} module The name of the module using it.
   * @param {String} key The key identifier.
   * @returns {Object} The retrieved value.
   * @protected
   */
  p.iget = function(module, key) { return this.get('['+module+']'+key); }

  /**
   * Same as `remove` but used by internal modules.
   * @method iremove
   * @param {String} module The name of the module using it.
   * @param {String} key The key identifier.
   * @protected
   */
  p.iremove = function(module, key) { this.remove('['+module+']'+key); }


  //---------------------------------------------------------------------------
  // PUBLIC ACCESS
  //---------------------------------------------------------------------------
  /**
   * Set a value for a given key in storage.
   * @method set
   * @param {String} key The key identifier.
   * @param {String} value The value.
  **/
  p.set = function(key, value) {
    try {
      value = JSON.stringify(value);
    } catch (e) {}

    this._memory[this._namespace+key] = value;
  }

  /**
   * Get a value for a given key in storage.
   * @method get
   * @param {String} key The key.
   * @return {Object} the stored value.
   */
  p.get = function(key) {
    var value = this._memory[this._namespace+key];
    try {
      value = JSON.parse(value);
    } catch (e) {}

    return value;
  }

  /**
   * Remove a key from storage.
   * @method remove
   * @param {String} key The key.
   */
  p.remove = function(key) {
    delete this._memory[this._namespace+key];
  }

  creatine.StorageManager = StorageManager;

})();/** 
 * @module creatine
 */

(function() {
  "use strict";

  /**
   * The plugin manager is used to register and unregister plugins into the 
   * game. This manager is created by the game and can be accessed by using 
   * `game.plugins`.
   *
   * Plugins work together within the engine, being update automatically by the
   * engine during the execution of the game. Plugins are identified by ids, so
   * you must provide an unique identifier when adding a plugin.
   *
   * ## Usage example
   *
   *     var plugin = tine._plugin({
   *       update: function() { ... }, 
   *       ...
   *     })
   *     game.plugins.add('my plugin', plugin);
   * 
   * 
   * @class PluginManager
   * @constructor
   * @param {Object} game The game instance.
   */ 
  var PluginManager = function(game) {
    /**
     * The game instance.
     * @property {creatine.Game} game
     */
    this.game = game;

    /**
     * The plugin map
     * @property {Object} _plugins
     */
    this._plugins = {};
  }
  var p = PluginManager.prototype;


  /**
   * Called before the engine update, it propagates the function to the 
   * registered plugins.
   * 
   * @method preUpdate
   * @protected
   */
  p.preUpdate = function() {
    for (var id in this._plugins) {
      if (this._plugins[id].active && this._plugins[id].hasPreUpdate) {
        this._plugins[id].preUpdate();
      }
    }
  }

  /**
   * Called during the engine update, it propagates the function to the 
   * registered plugins.
   * 
   * @method update
   * @protected
   */
  p.update = function() {
    for (var id in this._plugins) {
      if (this._plugins[id].active && this._plugins[id].hasUpdate) {
        this._plugins[id].update();
      }
    }
  }

  /**
   * Called after the engine update, it propagates the function to the 
   * registered plugins.
   * 
   * @method postUpdate
   * @protected
   */
  p.postUpdate = function() {
    for (var id in this._plugins) {
      if (this._plugins[id].active && this._plugins[id].hasPostUpdate) {
        this._plugins[id].postUpdate();
      }
    }
  }

  /**
   * Called before the engine draw, it propagates the function to the 
   * registered plugins.
   * 
   * @method preUpdate
   * @protected
   */
  p.preDraw = function() {
    for (var id in this._plugins) {
      if (this._plugins[id].active && this._plugins[id].hasPreDraw) {
        this._plugins[id].preDraw();
      }
    }
  }

  /**
   * Called during the engine draw, it propagates the function to the 
   * registered plugins.
   * 
   * @method draw
   * @protected
   */
  p.draw = function() {
    for (var id in this._plugins) {
      if (this._plugins[id].active && this._plugins[id].hasDraw) {
        this._plugins[id].draw();
      }
    }
  }

  /**
   * Called after the engine draw, it propagates the function to the 
   * registered plugins.
   * 
   * @method postDraw
   * @protected
   */
  p.postDraw = function() {
    for (var id in this._plugins) {
      if (this._plugins[id].active && this._plugins[id].hasPostDraw) {
        this._plugins[id].postDraw();
      }
    }
  }


  //---------------------------------------------------------------------------
  // PUBLIC ACCESS
  //---------------------------------------------------------------------------
  
  /**
   * Adds a new plugin to the engine.
   * @method add
   * @param {String} id     The unique identifier of the plugin.
   * @param {Object} plugin The plugin instance or class.
   */
  p.add = function(id, plugin) {
    if (!id) throw Error('No id provided');
    if (!plugin) throw Error('No plugin provided');

    if (typeof plugin === 'function') {
      plugin = new plugin();
    }

    plugin.game = this.game;
    plugin.manager = this;

    if (plugin.preUpdate)   plugin.hasPreUpdate = true;
    if (plugin.update)      plugin.hasUpdate = true;
    if (plugin.postUpdate)  plugin.hasPostUpdate = true;
    if (plugin.preDraw)     plugin.hasPreDraw = true;
    if (plugin.draw)        plugin.hasDraw = true;
    if (plugin.postDraw)    plugin.hasPostDraw = true;

    if (this._plugins[id]) this.remove(id);
    this._plugins[id] = plugin;

    plugin.enter();
  }

  /**
   * Retrieves a plugin given its ID.
   * @method get
   * @param {String} id The unique identifier of the plugin.
   * @returns {Object} The plugin
   */
  p.get = function(id) {
    return this._plugins[id];
  }

  /**
   * Removes a plugin from this manager by its ID.
   * @method remove
   * @param {String} id The unique identifier of the plugin.
   */
  p.remove = function(id) {
    var plugin = this._plugins[id];
    if (!plugin) return;

    plugin.exit();
    delete this._plugins[id];
  }

  /**
   * Removes all plugin from this manager.
   * @method removeAll
   */
  p.removeAll = function() {
    for (var id in this._plugins) {
      this._plugins[id].exit();
    }

    this._plugins = {};
  }

  creatine.PluginManager = PluginManager;

})();/** 
 * @module creatine
 */

(function() {
  "use strict";

  /**
   * A plugin is a custom manager that works together with the engine. The 
   * plugin must be registered in the game plugin manager to work.
   * 
   * To create a plugin you must inherit this class, which provides some base
   * methods used by the engine. You can override or create the following 
   * methods:
   *
   * - **initialize**: called in the creation of the plugin.
   * - **enter**: called when the plugin is registered into the plugin manager.
   * - **preUpdate**: called before the engine update.
   * - **update**: called during the engine update.
   * - **postUpdate**: called after the engine update.
   * - **preDraw**: called before the engine draw.
   * - **draw**: called during the engine draw.
   * - **postDraw**: called after the engine draw.
   * - **exit**: called when the plugin is unregistered of the plugin manager.
   *
   * ## Usage example
   * 
   * Creatine provides an shortcut to extend Plugin:
   *
   *     var MyPlugin = tine._plugin({
   *       initialize: function() { ... },
   *       update: function() { ... },
   *       ...
   *     })
   *
   *     game.plugins.add('my plugin', MyPlugin);
   * 
   * @class Plugin
   * @constructor
   * @param {Object} game The game instance.
   */ 
  var Plugin = function() {
    /**
     * The game instance.
     * @property {creatine.Game} game
     */
    this.game;

    /**
     * The plugin manager instance.
     * @property {creatine.PluginManager} manager
     */
    this.manager;

    /**
     * Is this plugin active?
     * @property {Boolean} active
     */
    this.active = true;

    /**
     * Has this plugin a pre update function? Set by the manager.
     * @property {Boolean} hasPreUpdate
     * @protected
     */
    this.hasPreUpdate = false;

    /**
     * Has this plugin a update function? Set by the manager.
     * @property {Boolean} hasUpdate
     * @protected
     */
    this.hasUpdate = false;

    /**
     * Has this plugin a post update function? Set by the manager.
     * @property {Boolean} hasPpostUpdate
     * @protected
     */
    this.hasPostUpdate = false;

    /**
     * Has this plugin pre a draw function? Set by the manager.
     * @property {Boolean} hasPreDraw
     * @protected
     */
    this.hasPreDraw = false;

    /**
     * Has this plugin a draw function? Set by the manager.
     * @property {Boolean} hasDraw
     * @protected
     */
    this.hasDraw = false;

    /**
     * Has this plugin a post draw function? Set by the manager.
     * @property {Boolean} postDraw
     * @protected
     */
    this.hasPostDraw = false;

    this.initialize();
  }
  var p = Plugin.prototype;

  /**
   * Called in the plugin initialization.
   * @method initialize
   */
  p.initialize = function() {}

  /**
   * Called when the plugin is registered into the plugin manager.
   * @method enter
   */
  p.enter = function() {}

  /**
   * Called when the plugin in unregistered of the plugin manager.
   * @method exit
   */
  p.exit = function() {}


  creatine.Plugin = Plugin;

  // @SHORTCUT
  creatine._plugin = function(properties) {
    var S = function() { this.Plugin_constructor(); }
    var p = createjs.extend(S, creatine.Plugin);
    for (var k in properties) { p[k] = properties[k]; }
    return createjs.promote(S, 'Plugin');
  }
})();// Mouse buttons constants
this.creatine.buttons = {
  LEFT       : 0,
  MIDDLE     : 1,
  RIGHT      : 2,
};this.creatine.keys = {
  // KEYBOARD
  BACKSPACE      : 8,
  TAB            : 9,
  RETURN         : 13,
  SHIFT          : 16,
  CTRL           : 17,
  ALT            : 18,
  PAUSE          : 19,
  CAPSLOCK       : 20,
  ESC            : 27,
  SPACE          : 32,
  PAGEUP         : 33,
  PAGEDOWN       : 34,
  END            : 35,
  HOME           : 36,
  LEFT           : 37,
  UP             : 38,
  RIGHT          : 39,
  DOWN           : 40,
  INSERT         : 45,
  DELETE         : 46,
  NUM0           : 48,
  NUM1           : 49,
  NUM2           : 50,
  NUM3           : 51,
  NUM4           : 52,
  NUM5           : 53,
  NUM6           : 54,
  NUM7           : 55,
  NUM8           : 56,
  NUM9           : 57,
  A              : 65,
  B              : 66,
  C              : 67,
  D              : 68,
  E              : 69,
  F              : 70,
  G              : 71,
  H              : 72,
  I              : 73,
  J              : 74,
  K              : 75,
  L              : 76,
  M              : 77,
  N              : 78,
  O              : 79,
  P              : 80,
  Q              : 81,
  R              : 82,
  S              : 83,
  T              : 84,
  U              : 85,
  V              : 86,
  W              : 87,
  X              : 88,
  Y              : 89,
  Z              : 90,
  LEFTWINDOWKEY  : 91,
  RIGHTWINDOWKEY : 92,
  CONTEXTMENU    : 93,
  NUMPAD0        : 96,
  NUMPAD1        : 97,
  NUMPAD2        : 98,
  NUMPAD3        : 99,
  NUMPAD4        : 100,
  NUMPAD5        : 101,
  NUMPAD6        : 102,
  NUMPAD7        : 103,
  NUMPAD8        : 104,
  NUMPAD9        : 105,
  MULTIPLY       : 106,
  ADD            : 107,
  SEPARATOR      : 108,
  SUBTRACT       : 109,
  DECIMAL        : 110,
  DIVIDE         : 111,
  F1             : 112,
  F2             : 113,
  F3             : 114,
  F4             : 115,
  F5             : 116,
  F6             : 117,
  F7             : 118,
  F8             : 119,
  F9             : 120,
  F10            : 121,
  F11            : 122,
  F12            : 123,
  F13            : 124,
  F14            : 125,
  F15            : 126,
  F16            : 127,
  F17            : 128,
  F18            : 129,
  F19            : 130,
  F20            : 131,
  F21            : 132,
  F22            : 133,
  F23            : 134,
  F24            : 135,
  NUMLOCK        : 144,
  SCROLLLOCK     : 145,
  SEMICOLON      : 186,
  EQUAL          : 187,
  COMMA          : 188,
  DASH           : 189,
  PERIOD         : 190,
  SLASH          : 191,
  GRAVEACCENT    : 192,
  OPENBRACKET    : 219,
  BACKSLASH      : 220,
  CLOSEBRAKET    : 221,
  QUOTE          : 222,
};// Gamepad buttons constants
this.creatine.pad = {
  A          : 0,
  B          : 1,
  X          : 2,
  Y          : 3,
  LB         : 4,
  RB         : 5,
  LT         : 6,
  RT         : 7,
  SELECT     : 8,
  START      : 9,
  LEFTSTICK  : 10,
  RIGHTSTICK : 11,
  UP         : 12,
  DOWN       : 13,
  LEFT       : 14,
  RIGHT      : 15,
  META       : 16,
};/** 
 * @module creatine
 */

(function() {
  "use strict";

  /**
   * The gamepad manager is used to handle gamepad controllers. It is created
   * by the game and accessed using `game.gamepad`.
   *
   * Notice that, gamepad can only be used if the browser has support to it. 
   * Right now only Firefox and Chrome have it. Moreover, some bugs can occur,
   * especially in Chrome, where the gamepad may no be recognize after you 
   * change the browser tab.
   * 
   * This manager can handle up to 4 gamepads in the x-input format (such as
   * the XBOX controller). Each gamepad has its own state and can't be accessed
   * directly from here.
   *
   *
   * ## Usage examples
   *
   * You can retrieve a gamepad by using the method `get` with the controller 
   * index (0, 1, 2 or 3). Notice that, you should use this method every tick
   * in order to force Chrome to update the gamepad state:
   *
   *     var game = new tine.Game(null, {
   *       update: function() {
   *         var player1controller = game.gamepad.get(0);
   *         var player2controller = game.gamepad.get(1);
   *
   *         if (player1controller.isDown(tine.pad.A)) {
   *           console.log('player 1 jumped!');
   *         }
   *       }
   *     })
   *
   * 
   * @class GamepadManager
   * @constructor
   * @param {Object} game The game instance.
   */
  var GamepadManager = function(game) {
    this.EventDispatcher_constructor();

    /**
     * The game instance.
     * @property {creatine.Game} game
     */
    this.game = game;

    /**
     * The browser gamepad objects.
     * @property {Array} _gamepads
     * @private
     */
    this._gamepads = [null, null, null, null];

    /**
     * The `creatine.Gamepad` objects.
     * @property {Array} gamepads
     */
    this.gamepads = [
      new creatine.Gamepad(this, game),
      new creatine.Gamepad(this, game),
      new creatine.Gamepad(this, game),
      new creatine.Gamepad(this, game),
    ]

    var self = this;
    window.addEventListener('gamepadconnected', function(e) {self._onGamepadConnected(e)}, false);
    window.addEventListener('gamepaddisconnected', function(e) {self._onGamepadDisconnected(e)}, false);

    var gamepads = this._getGamepads();
    for (var i=0; i<gamepads.length; i++) {
      if (gamepads[i]) {
        this._onGamepadConnected({gamepad:gamepads[i]});
      }
    }
  }
  var p = createjs.extend(GamepadManager, createjs.EventDispatcher);

  /**
   * Get the browser gamepad objects. It return only the connected gamepads.
   * @return {Array} The gamepad array.
   * @private
   */
  p._getGamepads = function() {
    if (navigator.getGamepads)
      var gamepads = navigator.getGamepads();
    else if(navigator.webkitGetGamepads){
      var gamepads = navigator.webkitGetGamepads();
    } else if(navigator.msGetGamepads) {
      var gamepads = navigator.msGetGamepads();
    } else if(navigator.webkitGamepads) {
      var gamepads = navigator.webkitGamepads();
    } else {
      var gamepads = [];
    }

    return gamepads;
  }

  /**
   * Helper function to create gamepad events.
   * @method _makeEvent
   * @param {String} name The name of the event.
   * @param {Event} e The original gamepad event
   * @param {creatine.Gamepad} gamepad The gamepad object.
   * @returns {Event} The new event.
   * @private
   */
  p._makeEvent = function(name, e, gamepad) {
    var event = new createjs.Event(name);
    event.gamepad = gamepad;
    event.nativeEvent = e;
    return event;
  }

  /**
   * Handle the gamepad connected event.
   * @method _onGamepadConnected
   * @param {Event} e The original gamepad event
   * @private
   */
  p._onGamepadConnected = function(e) {
    for (var i=0; i<this.gamepads.length; i++) {
      if (!this.gamepads[i].connected) {
        this.gamepads[i].bind(e.gamepad);
        this.dispatchEvent(this._makeEvent('gamepadconnected', e, this.gamepads[i]));
        break;
      }
    }
  }

  /**
   * Handle the gamepad disconnected event.
   * @method _onGamepadDisconnected
   * @param {Event} e The original gamepad event
   * @private
   */
  p._onGamepadDisconnected = function(e) {
    for (var i=0; i<this.gamepads.length; i++) {
      if (this.gamepads[i]._gamepad === e.gamepad) {
        this.gamepads[i].unbind();
        this.dispatchEvent(this._makeEvent('gamepaddisconnected', e, this.gamepads[i]));
        break;
      }
    }
  }

  /**
   * Pre update the individual gamepads. Called by the game.
   * @method preUpdate
   * @protected
   */
  p.preUpdate = function() {
    // must call this to update gamepad properties on chrome
    this._gamepads = this._getGamepads();

    for (var i=0; i<this.gamepads.length; i++) {
      this.gamepads[i].preUpdate();
    }
  }

  /**
   * Post update the individual gamepads. Called by the game.
   * @method postUpdate
   * @protected
   */
  p.postUpdate = function() {
    for (var i=0; i<this.gamepads.length; i++) {
      this.gamepads[i].postUpdate();
    }
  }

  //---------------------------------------------------------------------------
  // PUBLIC ACCESS
  //---------------------------------------------------------------------------
  /**
   * Returns the `creatine.Gamepad` object for the given index. Notice that 
   * the gamepad can be disconnected.
   * 
   * @method get
   * @param {Integer} i The gamepad id.
   * @returns {creatine.Gamepad} The gamepad object.
   */
  p.get = function(i) {
    return this.gamepads[i];
  }

  /**
   * Returns the number of connected gamepads.
   * 
   * @method getNumGamepads
   * @returns {Integer} The number of connected gamepads.
   */
  p.getNumGamepads = function() {
    var n=0;
    for (var i=0; i<this.gamepads.length; i++) {
      if (this.gamepads[i].connected) { n++ }
    }
    return n;
  }

  /**
   * Returns a list of connected gamepads.
   * 
   * @method getConnectedGamepads
   * @returns {Array} A list of connected `creatine.Gamepad` objects.
   */
  p.getConnectedGamepads = function() {
    var r=[];
    for (var i=0; i<this.gamepads.length; i++) {
      if (this.gamepads[i].connected) { r.push(this.gamepads[i]); }
    }
    return r;
  }

  creatine.GamepadManager = createjs.promote(GamepadManager, 'EventDispatcher');

})();/** 
 * @module creatine
 */

(function() {
  "use strict";

  /**
   * This manager handle the keyboard state. It is created by the game and can
   * be accessed via `game.keyboard`.
   *
   * Each tick, this manager update the keyboard state. The keyboard state is 
   * the set of status of each individual keys in a given time step. You can 
   * access the keyboard state using the following methods:
   *
   * - **isDown(key)**: returns `true` if the player is pressing the `key` 
   * down.
   * - **isUp(key)**: returns `true` if the player is not pressing the `key`.
   * - **isAnyDown()**: returns `true` if the player is pressing any key.
   * - **isPressed(key)**: returns `true` if the player just pressed the `key`.
   * This is different from `isDown` because it is only true the first tick 
   * that a key changes from "up" to "down" status.
   * - **isReleased(key)**: similar to `isPressed`, this function returns 
   * `true` if the key just turned it status from "down" to "up".
   * - **isAnyPressed()**: returns `true` is any key has been pressed.
   * - **isAnyReleaed()**: returns `true` is any key has been released.
   *
   * For the key, you can use its keycode (e.g., 65 for "a") or the constants
   * in `creatine.keys`.
   *
   * 
   * ## Usage examples
   *
   *     var game = new tine.Game(null, {
   *       update: function() {
   *         if (game.keyboard.isPressed(tine.keys.A)) {
   *           console.log('Key A pressed!');
   *         }
   *
   *         if (game.keyboard.isDown(tine.keys.LEFT)) {
   *           console.log('LEFT DOWN!');
   *         }
   *
   *         if (game.keyboard.isAnyReleased()) {
   *           console.log('Just released a key');
   *         }
   *       }
   *     })
   *
   * 
   * @class KeyboardManager
   * @constructor
   * @param {Object} game The game instance.
   */
  var KeyboardManager = function(game) {
    this.EventDispatcher_constructor();

    /**
     * The game instance.
     * @property {creatine.Game} game
     */
    this.game = game;

    /**
     * The last tick keyboard state.
     * @property {Array} _lastState
     * @private
     */
    this._lastState = [];

    /**
     * The current keyboard state.
     * @property {Array} _state
     * @private
     */
    this._state = [];

    var self = this;
    this.game.canvas.addEventListener('blur', function(e) {self._onBlur(e)}, false);
    this.game.canvas.addEventListener('keydown', function(e) {self._onKeyDown(e)}, false);
    this.game.canvas.addEventListener('keypress', function(e) {self._onKeyPress(e)}, false);
    this.game.canvas.addEventListener('keyup', function(e) {self._onKeyUp(e)}, false);
  }
  var p = createjs.extend(KeyboardManager, createjs.EventDispatcher);

  /**
   * Helper function to create keyboard events.
   * @method _makeEvent
   * @param {String} name The name of the event.
   * @param {Event} e The original keyboard event
   * @returns {Event} The new event.
   * @private
   */
  p._makeEvent = function(name, e) {
    var event = new createjs.Event(name);
    event.code = e.keyCode;
    event.shift = e.shiftKey;
    event.ctrl = e.ctrlKey;
    event.meta = e.metaKey;
    event.alt = e.altKey;
    event.nativeEvent = e;
    return event;
  }

  /**
   * When the canvas lost focus, resets the keyboard state.
   * @method _onBlur
   * @private
   */
  p._onBlur = function() {
    this._state = [];
    // this._lastState = [];
  }

  /**
   * Handle the canvas keydown event.
   * @method _onKeyDown
   * @param {Event} e The original keyboard event
   * @private
   */
  p._onKeyDown = function(e) {
    if (!e.repeat) {
      this._state.push(e.keyCode);
      var event = this._makeEvent('keydown', e);
    } else {
      var event = this._makeEvent('keyhold', e);
    }

    this.dispatchEvent(event);
    e.preventDefault();
    return false;
  }

  /**
   * Handle the canvas keypress event.
   * @method _onKeyPress
   * @param {Event} e The original keyboard event
   * @private
   */
  p._onKeyPress = function(e) {
    e.preventDefault();
    return false;
  }

  /**
   * Handle the canvas keyup event.
   * @method _onKeyUp
   * @param {Event} e The original keyboard event
   * @private
   */
  p._onKeyUp = function(e) {
    this._state.splice(this._state.indexOf(e.keyCode), 1);

    var event = this._makeEvent('keyup', e);
    this.dispatchEvent(event);

    e.preventDefault();
    return false;
  }

  /**
   * Returns the status of a key in the given state.
   * @method _get
   * @param {Integer} key The key code.
   * @param {Array} state The keyboard state.
   * @private
   */
  p._get = function(key, state) {
    return state.indexOf(key) >= 0;
  }

  /**
   * Copy the current state to the last state. Called by the game.
   * @method postUpdate
   * @protected
   */
  p.postUpdate = function() {
    this._lastState = this._state.slice();
  }

  //---------------------------------------------------------------------------
  // PUBLIC ACCESS
  //---------------------------------------------------------------------------
  /**
   * Verifies if a given key is down.
   * @method isDown
   * @param {Integer} key The key code.
   * @returns {Boolean} The key status.
   */
  p.isDown = function(key) {
    return this._get(key, this._state);
  }

  /**
   * Verifies if a given key is up.
   * @method isUp
   * @param {Integer} key The key code.
   * @returns {Boolean} The key status.
   */
  p.isUp = function(key) {
    return !this._get(key, this._state);
  }

  /**
   * Verifies if a given key just passed from "up" to "down".
   * @method isPressed
   * @param {Integer} key The key code.
   * @returns {Boolean} The key status.
   */
  p.isPressed = function(key) {
    return this._get(key, this._state) && !this._get(key, this._lastState);
  }

  /**
   * Verifies if a given key just passed from "down" to "up".
   * @method isReleased
   * @param {Integer} key The key code.
   * @returns {Boolean} The key status.
   */
  p.isReleased = function(key) {
    return !this._get(key, this._state) && this._get(key, this._lastState);
  }

  /**
   * Verifies if a any key is down.
   * @method isAnyDown
   * @returns {Boolean} The state status.
   */
  p.isAnyDown = function() {
    return this._state.length > 0;
  }

  /**
   * Verifies if a any key is pressed.
   * @method isAnyPressed
   * @returns {Boolean} The state status.
   */
  p.isAnyPressed = function() {
    for (var i=0; i<this._state.length; i++) {
      var key = this._state[i];
      if (!this._get(key, this._lastState)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Verifies if a any key is released.
   * @method isAnyReleased
   * @returns {Boolean} The state status.
   */
  p.isAnyReleased = function() {
    for (var i=0; i<this._lastState.length; i++) {
      var key = this._lastState[i];
      if (!this._get(key, this._state)) {
        return true;
      }
    }
    return false; 
  }

  creatine.KeyboardManager = createjs.promote(KeyboardManager, 'EventDispatcher');

})();/** 
 * @module creatine
 */

(function() {
  "use strict";

  /**
   * This manager handle the mouse state. It is created by the game and can be
   * accessed using `game.mouse`.
   *
   * Each tick, this manager update the mouse state. The mouse state is the set
   * of status of each individual button in a given time step. You can access 
   * the mouse state using the following methods:
   *
   * - **isDown(button)**: returns `true` if the player is pressing the 
   * `button` down.
   * - **isUp(button)**: returns `true` if the player is not pressing the 
   * `button`.
   * - **isAnyDown()**: returns `true` if the player is pressing any button.
   * - **isPressed(button)**: returns `true` if the player just pressed the 
   * `button`. This is different from `isDown` because it is only true the 
   * first tick that a button changes from "up" to "down" status.
   * - **isReleased(button)**: similar to `isPressed`, this function returns 
   * `true` if the button just turned it status from "down" to "up".
   * - **isAnyPressed()**: returns `true` is any button has been pressed.
   * - **isAnyReleaed()**: returns `true` is any button has been released.
   *
   * For the button, you can use its code (e.g., 0 for "LEFT") or the constants
   * in `creatine.buttons`.
   *
   * 
   * ## Usage examples
   *
   *     var game = new tine.Game(null, {
   *       update: function() {
   *         if (game.mouse.isPressed(tine.buttons.MIDDLE)) {
   *           console.log('Middle button pressed!');
   *         }
   *
   *         if (game.mouse.isDown(tine.buttons.LEFT)) {
   *           console.log('LEFT DOWN!');
   *         }
   *
   *         if (game.mouse.isAnyReleased()) {
   *           console.log('Just released a button');
   *         }
   *       }
   *     })
   *
   * 
   * @class MouseManager
   * @constructor
   * @param {Object} game The game instance.
   */
  var MouseManager = function(game) {
    this.EventDispatcher_constructor();

    /**
     * The game instance.
     * @property {creatine.Game} game
     */
    this.game = game;

    /**
     * The last tick mouse state.
     * @property {Array} _lastState
     * @private
     */
    this._lastState = [];

    /**
     * The current mouse state.
     * @property {Array} _state
     * @private
     */
    this._state = [];

    /**
     * The current x mouse position in the canvas.
     * @property {Integer} x
     */
    this.x = 0;

    /**
     * The current y mouse position in the canvas.
     * @property {Integer} y
     */
    this.y = 0;

    var self = this;
    this.game.canvas.addEventListener('blur', function(e) {self._onBlur(e)}, false);
    this.game.canvas.addEventListener('click', function(e) {self._onClick(e)}, false)
    this.game.canvas.addEventListener('dblclick', function(e) {self._onDblClick(e)}, false)
    this.game.canvas.addEventListener('mousedown', function(e) {self._onMouseDown(e)}, false)
    this.game.canvas.addEventListener('mouseup', function(e) {self._onMouseUp(e)}, false)
    this.game.canvas.addEventListener('mousemove', function(e) {self._onMouseMove(e)}, false)
    this.game.canvas.addEventListener('mouseout', function(e) {self._onMouseOut(e)}, false)
    this.game.canvas.addEventListener('mouseover', function(e) {self._onMouseOver(e)}, false)
    this.game.canvas.addEventListener('wheel', function(e) {self._onWheel(e)}, false)
  }
  var p = createjs.extend(MouseManager, createjs.EventDispatcher);

  /**
   * Helper function to create mouse events.
   * @method _makeEvent
   * @param {String} name The name of the event.
   * @param {Event} e The original mouse event
   * @returns {Event} The new event.
   * @private
   */
  p._makeEvent = function(name, e) {
    var event = new createjs.Event(name);
    event.button = e.button;
    event.x = this.x;
    event.y = this.y;
    event.nativeEvent = e;
    return event;
  }

  /**
   * When the canvas lost focus, resets the mouse state.
   * @method _onBlur
   * @private
   */
  p._onBlur = function(e) {
    this._state = [];
    // this._lastState = [];
  }

  /**
   * Handle the mouse click event.
   * @method _onClick
   * @param {Event} e The original mouse event
   * @private
   */
  p._onClick = function(e) {
    var event = this._makeEvent('click', e);
    this.dispatchEvent(event);
    e.preventDefault();
    return false;
  }

  /**
   * Handle the mouse double click event.
   * @method _onDblClick
   * @param {Event} e The original mouse event
   * @private
   */
  p._onDblClick = function(e) {
    var event = this._makeEvent('dblclick', e);
    this.dispatchEvent(event);
    e.preventDefault();
    return false;
  }

  /**
   * Handle the mouse down event.
   * @method _onMouseDown
   * @param {Event} e The original mouse event
   * @private
   */
  p._onMouseDown = function(e) {
    var event = this._makeEvent('mousedown', e);
    this.dispatchEvent(event);
    this._state.push(e.button);
    e.preventDefault();
    return false;
  }

  /**
   * Handle the mouse up event.
   * @method _onMouseUp
   * @param {Event} e The original mouse event
   * @private
   */
  p._onMouseUp = function(e) {
    var event = this._makeEvent('mouseup', e);
    this.dispatchEvent(event);
    this._state.splice(this._state.indexOf(e.button), 1);
    e.preventDefault();
    return false;
  }

  /**
   * Handle the mouse move event.
   * @method _onMouseMove
   * @param {Event} e The original mouse event
   * @private
   */
  p._onMouseMove = function(e) {
    var event = this._makeEvent('mousemove', e);
    this.dispatchEvent(event);
    e.preventDefault();
    return false;
  }

  /**
   * Handle the mouse out event.
   * @method _onMouseOut
   * @param {Event} e The original mouse event
   * @private
   */
  p._onMouseOut = function(e) {
    var event = this._makeEvent('mouseout', e);
    this.dispatchEvent(event);
    e.preventDefault();
    return false;
  }

  /**
   * Handle the mouse over event.
   * @method _onMouseOver
   * @param {Event} e The original mouse event
   * @private
   */
  p._onMouseOver = function(e) {
    var event = this._makeEvent('mouseover', e);
    this.dispatchEvent(event);
    e.preventDefault();
    return false;
  }

  /**
   * Handle the mouse wheel event.
   * @method _onWheel
   * @param {Event} e The original mouse event
   * @private
   */
  p._onWheel = function(e) {
    var event = new createjs.Event('wheel');
    event.deltaMode = e.deltaMode;
    event.deltaX = e.deltaX || e.wheelDeltaX;
    event.deltaY = e.deltaY || e.wheelDeltaY;
    event.deltaZ = e.deltaZ || e.wheelDeltaZ;
    event.x = e.x;
    event.y = e.y;
    this.dispatchEvent(event);
    e.preventDefault();

    return false;
  }

  /**
   * Returns the status of a button in the given state.
   * @method _get
   * @param {Integer} button The button code.
   * @param {Array} state The mouse state.
   * @private
   */
  p._get = function(button, state) {
    return state.indexOf(button) >= 0;
  }

  /**
   * Grab the x, y positions. Called by the game.
   * @method preUpdate
   * @protected
   */
  p.preUpdate = function() {
    this.x = this.game.stage.mouseX;
    this.y = this.game.stage.mouseY;
  }

  /**
   * Copy the current state to the last state. Called by the game.
   * @method postUpdate
   * @protected
   */
  p.postUpdate = function() {
    this._lastState = this._state.slice();
  }

  //---------------------------------------------------------------------------
  // PUBLIC ACCESS
  //---------------------------------------------------------------------------
  /**
   * Verifies if a given button is down.
   * @method isDown
   * @param {Integer} button The button code.
   * @returns {Boolean} The button status.
   */
  p.isDown = function(button) {
    return this._get(button, this._state);
  }

  /**
   * Verifies if a given button is up.
   * @method isUp
   * @param {Integer} button The button code.
   * @returns {Boolean} The button status.
   */
  p.isUp = function(button) {
    return !this._get(button, this._state);
  }

  /**
   * Verifies if a given button just passed from "up" to "down".
   * @method isPressed
   * @param {Integer} button The button code.
   * @returns {Boolean} The button status.
   */
  p.isPressed = function(button) {
    return this._get(button, this._state) && !this._get(button, this._lastState);
  }

  /**
   * Verifies if a given button just passed from "down" to "up".
   * @method isReleased
   * @param {Integer} button The button code.
   * @returns {Boolean} The button status.
   */
  p.isReleased = function(button) {
    return !this._get(button, this._state) && this._get(button, this._lastState);
  } 

  /**
   * Verifies if a any button is down.
   * @method isAnyDown
   * @returns {Boolean} The state status.
   */
  p.isAnyDown = function() {
    return this._state.length > 0;
  }

  /**
   * Verifies if a any button is pressed.
   * @method isAnyPressed
   * @returns {Boolean} The state status.
   */
  p.isAnyPressed = function() {
    for (var i=0; i<this._state.length; i++) {
      var button = this._state[i];
      if (!this._get(button, this._lastState)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Verifies if a any button is released.
   * @method isAnyReleased
   * @returns {Boolean} The state status.
   */
  p.isAnyReleased = function() {
    for (var i=0; i<this._lastState.length; i++) {
      var button = this._lastState[i];
      if (!this._get(button, this._state)) {
        return true;
      }
    }
    return false; 
  }

  creatine.MouseManager = createjs.promote(MouseManager, 'EventDispatcher');

})();/** 
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

})();/** 
 * @module creatine
 */

(function() {
  "use strict";

  /**
   * A touch object stores the touch state for a single finger on the screen.
   * Touch objects are created be the touch manager and can be accessed using
   * `game.touch.get(n)`, where the `n` is the index of touch.
   *
   * You can access the touch state using the following methods:
   *
   * - **isDown()**: returns `true` if the touch is down.
   * - **isUp()**: returns `true` if the touch is up.
   *
   * 
   * @class Touch
   * @constructor
   * @param {Object} manager The touch manager instance.
   * @param {Object} game The game instance.
   */
  var Touch = function(manager, game) {
    /**
     * The game instance.
     * @property {creatine.Game} game
     */
    this.game = game;

    /**
     * The gamepad manager instance.
     * @property {creatine.GamepadManager} manager
     */
    this.manager = manager;

    /**
     * Says if the touch is currently beign pressed.
     * @property {Boolean} down
     */
    this.down = false;

    /**
     * The touch id (defined by the browser).
     * @property {Integer} identifier
     */
    this.identifier = -1;

    /**
     * Touch x position in the canvas.
     * @property {Integer} x
     */
    this.x = 0;

    /**
     * Touch y position in the canvas.
     * @property {Integer} y
     */
    this.y = 0;

    /**
     * Touch force in the canvas.
     * @property {Number} force
     */
    this.force = 0;

    /**
     * Finger radius in horizontal axis.
     * @property {Number} radiusX
     */
    this.radiusX = 0;

    /**
     * Finger radius in vertical axis.
     * @property {Number} radiusY
     */
    this.radiusY = 0;

    /**
     * Finger rotation.
     * @property {Number} rotation
     */
    this.rotation = 0;

  }
  var p = createjs.extend(Touch, createjs.EventDispatcher);

  /**
   * Helper function to create touch events.
   * @method _makeEvent
   * @param {String} name The name of the event.
   * @param {Event} e The original touch event
   * @returns {Event} The new event.
   * @private
   */
  p._makeEvent = function(name, e) {
    var event = new createjs.Event(name);
    event.target = this;
    return event;
  }

  /**
   * Update the touch data.
   * @method _update
   * @private
   */
  p._update = function(touch) {
    if (!touch) return;
    var rect = this.game.stage._getElementRect(this.game.canvas);
    var rect = this.game.stage._getElementRect(this.game.canvas);
    var x = touch.pageX - rect.left;
    var y = touch.pageY - rect.top;
    var w = this.game.canvas.width;
    var h = this.game.canvas.height;
    x /= (rect.right-rect.left)/w;
    y /= (rect.bottom-rect.top)/h;

    this.x = x;
    this.y = y;
    this.force = touch.force || touch.webkitForce || 0;
    this.radiusX = touch.radiusX || touch.webkitRadiusX || 0;
    this.radiusY = touch.radiusY || touch.webkitRadiusY || 0;
    this.rotation = touch.rotationAngle || touch.webkitRotationAngle || 0;
  }

  /**
   * Update the touch data with the touchstart event.
   * @method _startTouch
   * @param {Event} touch The event.
   * @protected
   */
  p._startTouch = function(touch) {
    this.down = true;
    this.identifier = touch.identifier;
    this._update(touch);
    this.dispatchEvent(this._makeEvent('start'));
  }

  /**
   * Update the touch data with the touchmove event.
   * @method _updateTouch
   * @param {Event} touch The event.
   * @protected
   */
  p._updateTouch = function(touch) {
    this._update(touch);
    this.dispatchEvent(this._makeEvent('move'));
  }

  /**
   * Update the touch data with the touchend, touchcancel or blur event.
   * @method _endTouch
   * @param {Event} touch The event.
   * @protected
   */
  p._endTouch = function(touch) {
    this.identifier = -1;
    this.down = false;
    this._update(touch);
    this.dispatchEvent(this._makeEvent('end'));
  }

  //---------------------------------------------------------------------------
  // PUBLIC ACCESS
  //---------------------------------------------------------------------------
  /**
   * Verifies if this touch is down.
   * @method isDown
   * @returns {Boolean} The touch status.
   */
  p.isDown = function() { return this.down; }

  /**
   * Verifies if this touch is up.
   * @method isUp
   * @returns {Boolean} The touch status.
   */
  p.isUp = function() { return !this.down; }

  creatine.Touch = createjs.promote(Touch, 'EventDispatcher');

})();/** 
 * @module creatine
 */

(function() {
  "use strict";

  /**
   * A gamepad object stores the controller state for one of the 4 supported 
   * gamepads. These objects are created by the gamepad manager and can be 
   * accessed using `game.gamepad.get(n)`, where `n` is the index of the 
   * gamepad.
   *
   * This class handle the stick dead zone automatically by the scaled circular
   * dead zone method. Thus, when you ask for the `leftStickX` or `rightStickY`
   * values, you will receive the processed values for the sticks. If you want
   * the raw values, please use `rawLeftStickX`, etc.
   *
   * A gamepad object also provides a "stick force" value, which is a scalar 
   * value describing how much the player is moving the stick alway from the 
   * center, being 0 when the stick is resting and 1 when it is in the maximum.
   * This value is already in conformity with the dead zone elimination 
   * process.
   * 
   * You can access the gamepad state using the following methods:
   *
   * - **isDown(button)**: returns `true` if the player is pressing the 
   * `button` down.
   * - **isUp(button)**: returns `true` if the player is not pressing the 
   * `button`.
   * - **isAnyDown()**: returns `true` if the player is pressing any button.
   * - **isPressed(button)**: returns `true` if the player just pressed the 
   * `button`. This is different from `isDown` because it is only true the 
   * first tick that a button changes from "up" to "down" status.
   * - **isReleased(button)**: similar to `isPressed`, this function returns 
   * `true` if the button just turned it status from "down" to "up".
   * - **isAnyPressed()**: returns `true` is any button has been pressed.
   * - **isAnyReleaed()**: returns `true` is any button has been released.
   *
   * For the button, you can use its code or the constants in `creatine.pad`.
   *
   * 
   * ## Usage examples
   *
   *     var game = new tine.Game(null, {
   *       create: function() { ... },
   *       update: function() {
   *         var gamepad = game.gamepad.get(0);
   *
   *         // Using the left stick
   *         character.x += speed * gamepad.leftStickX/gamepad.leftStickForce;
   *         character.y += speed * gamepad.leftStickY/gamepad.leftStickForce;
   *
   *         if (game.mouse.isPressed(tine.pad.A)) {
   *           character.dash();
   *         }
   *
   *         if (game.mouse.isReleased(tine.pad.START)) {
   *           console.log('PAUSE GAME!');
   *         }
   *       }
   *     })
   *     
   * @class Gamepad
   * @constructor
   * @param {Object} manager The gamepad manager instance.
   * @param {Object} game The game instance.
   */
  var Gamepad = function(manager, game) {
    this.EventDispatcher_constructor();
    
    /**
     * The game instance.
     * @property {creatine.Game} game
     */
    this.game = game;

    /**
     * The gamepad manager instance.
     * @property {creatine.GamepadManager} manager
     */
    this.manager = manager;

    /**
     * Says if the gamepad is connected or not.
     * @property {Boolean} connected
     */
    this.connected = false;

    /**
     * The raw left stick x position (before deadzone elimination).
     * @property {Number} rawLeftStickX
     */
    this.rawLeftStickX = 0;

    /**
     * The raw left stick y position (before deadzone elimination).
     * @property {Number} rawLeftStickY
     */
    this.rawLeftStickY = 0;

    /**
     * The left stick x position (after deadzone elimination).
     * @property {Number} leftStickX
     */
    this.leftStickX = 0;

    /**
     * The left stick y position (after deadzone elimination).
     * @property {Number} leftStickY
     */
    this.leftStickY = 0;

    /**
     * The left stick force. It is the norm of (leftStickX, leftStickY).
     * @property {Number} leftStickForce
     */
    this.leftStickForce = 0;
    
    /**
     * The raw right stick x position (before deadzone elimination).
     * @property {Number} rawRightStickX
     */
    this.rawRightStickX = 0;

    /**
     * The raw right stick y position (before deadzone elimination).
     * @property {Number} rawRightStickY
     */
    this.rawRightStickY = 0;

    /**
     * The right stick x position (after deadzone elimination).
     * @property {Number} rightStickX
     */
    this.rightStickX = 0;

    /**
     * The right stick y position (after deadzone elimination).
     * @property {Number} rightStickY
     */
    this.rightStickY = 0;

    /**
     * The right stick force. It is the norm of (rightStickX, rightStickY).
     * @property {Number} rightStickForce
     */
    this.rightStickForce = 0;

    /**
     * The pressure on the left trigger (no elimination of deadzone).
     * @property {Number} leftTrigger
     */
    this.leftTrigger = 0;

    /**
     * The pressure on the right trigger (no elimination of deadzone).
     * @property {Number} rightTrigger
     */
    this.rightTrigger = 0;

    /**
     * The precision used for the dead zone elimination on the left stick.
     * @property {Number} deadZoneLeft
     * @default 0.25
     */
    this.deadZoneLeft = 0.25;

    /**
     * The precision used for the dead zone elimination on the right stick.
     * @property {Number} deadZoneRight
     * @default 0.25
     */
    this.deadZoneRight = 0.25;

    /**
     * The last tick gamepad state.
     * @property {Array} _lastState
     * @private
     */
    this._lastState = [];

    /**
     * The current gamepad state.
     * @property {Array} _state
     * @private
     */
    this._state = [];

    /**
     * Flag to tell if gamepad is listening for events (disabled when the 
     * canvas is out of focus).
     * 
     * @property {Boolean} _listening
     * @private
     */
    this._listening = true;

    var self = this;
    this.game.canvas.addEventListener('blur', function(e) {self._onBlur(e)}, false);
    this.game.canvas.addEventListener('focus', function(e) {self._onFocus(e)}, false);
  }
  var p = createjs.extend(Gamepad, createjs.EventDispatcher);


  /**
   * Helper function to create gamepad events.
   * @method _makeEvent
   * @param {String} name The name of the event.
   * @param {Event} e The original gamepad event
   * @returns {Event} The new event.
   * @private
   */
  p._makeEvent = function(name, e) {
    var event = new createjs.Event(name);
    event.target = this;
    return event;
  }

  /**
   * When the canvas lost focus, resets the game state and disables listening.
   * @method _onBlur
   * @private
   */
  p._onBlur = function(e) {
    this._state = [];
    // this._lastState = [];
    this._listening = false;
  }

  /**
   * When the canvas regain focus, enable listening.
   * @method _onBlur
   * @private
   */
  p._onFocus = function(e) {
    this._listening = true;
  }

  /**
   * Returns the status of a button in the given state.
   * @method _get
   * @param {Integer} button The button code.
   * @param {Array} state The gamepad state.
   * @private
   */
  p._get = function(button, state) {
    return state.indexOf(button) >= 0;
  }

  /**
   * Process the dead zone of each stick and update the state. Called by the
   * manager.
   * 
   * @method preUpdate
   * @protected
   */
  p.preUpdate = function() {
    if (this._gamepad && this._listening) {

      // get raw values for axes
      var lx = this.rawLeftStickX = this._gamepad.axes[0];
      var ly = this.rawLeftStickY = this._gamepad.axes[1];
      var rx = this.rawRightStickX = this._gamepad.axes[2];
      var ry = this.rawRightStickY = this._gamepad.axes[3];

      // compute the scaled radial dead zone
      // left stick
      var leftzone = this.deadZoneLeft;
      var leftnorm = Math.sqrt(lx*lx + ly*ly);
      if (leftnorm > leftzone) {
        var scale = ((leftnorm-leftzone)/(1-leftzone));
        this.leftStickX = lx = (lx/leftnorm)*scale;
        this.leftStickY = ly = (ly/leftnorm)*scale;
        this.leftStickForce = Math.sqrt(lx*lx + ly*ly);

        // normalize again if necessary (avoid box range)
        if (this.leftStickForce >= 1) {
          this.leftStickX /= this.leftStickForce;
          this.leftStickY /= this.leftStickForce;
          this.leftStickForce = 1;
        }
      } else {
        this.leftStickX = this.leftStickY = this.leftStickForce = 0;
      }

      // right stick
      var rightzone = this.deadZoneLeft;
      var rightnorm = Math.sqrt(rx*rx + ry*ry);
      if (rightnorm > rightzone) {
        var scale = ((rightnorm-rightzone)/(1-rightzone));
        this.rightStickX = rx = (rx/rightnorm)*scale;
        this.rightStickY = ry = (ry/rightnorm)*scale;
        this.rightStickForce = Math.sqrt(rx*rx + ry*ry);

        // normalize again if necessary (avoid box range)
        if (this.rightStickForce >= 1) {
          this.rightStickX /= this.rightStickForce;
          this.rightStickY /= this.rightStickForce;
          this.rightStickForce = 1;
        }
      } else {
        this.rightStickX = this.rightStickY = this.rightStickForce = 0;
      }

      // get button values
      this.leftTrigger = this._gamepad.buttons[6].value;
      this.rightTrigger = this._gamepad.buttons[7].value;
      this._state = [];
      for (var i=0; i<this._gamepad.buttons.length; i++) {
        if (this._gamepad.buttons[i].pressed) {
          this._state.push(i)
        }
      }
    }
  }

  /**
   * Copy the current state to the last state. Called by the manager.
   * @method postUpdate
   * @protected
   */
  p.postUpdate = function() {
    this._lastState = this._state.slice();
  }

  /**
   * Binds a browser gamepad object to this object.
   * @method bind
   * @param {GAMEPAD} gamepad The browser gamepad object.
   * @protected
   */
  p.bind = function(gamepad) {
    this.dispatchEvent(this._makeEvent('connected'))

    this._gamepad = gamepad;
    this.connected = true;
  }

  /**
   * Unbinds the browser gamepad object of this object.
   * @method unbind
   * @protected
   */
  p.unbind = function() {
    this.dispatchEvent(this._makeEvent('disconnected'))
    this._gamepad = null;
    this.connected = false;
    this.rawLeftStickX = 0;
    this.rawLeftStickY = 0;
    this.rawRightStickX = 0;
    this.rawRightStickY = 0;
    this.leftStickX = 0;
    this.leftStickY = 0;
    this.rightStickX = 0;
    this.rightStickY = 0;
    this.leftTrigger = 0;
    this.rightTrigger = 0;
    this._state = [];
  }

  //---------------------------------------------------------------------------
  // PUBLIC ACCESS
  //---------------------------------------------------------------------------
  /**
   * Verifies if a given button is down.
   * @method isDown
   * @param {Integer} button The button code.
   * @returns {Boolean} The button status.
   */
  p.isDown = function(button) {
    return this._get(button, this._state);
  }

  /**
   * Verifies if a given button is up.
   * @method isUp
   * @param {Integer} button The button code.
   * @returns {Boolean} The button status.
   */
  p.isUp = function(button) {
    return !this._get(button, this._state);
  }

  /**
   * Verifies if a given button just passed from "up" to "down".
   * @method isPressed
   * @param {Integer} button The button code.
   * @returns {Boolean} The button status.
   */
  p.isPressed = function(button) {
    return this._get(button, this._state) && !this._get(button, this._lastState);
  }

  /**
   * Verifies if a given button just passed from "down" to "up".
   * @method isReleased
   * @param {Integer} button The button code.
   * @returns {Boolean} The button status.
   */
  p.isReleased = function(button) {
    return !this._get(button, this._state) && this._get(button, this._lastState);
  } 

  /**
   * Verifies if a any button is down.
   * @method isAnyDown
   * @returns {Boolean} The state status.
   */
  p.isAnyDown = function() {
    return this._state.length > 0;
  }

  /**
   * Verifies if a any button is pressed.
   * @method isAnyPressed
   * @returns {Boolean} The state status.
   */
  p.isAnyPressed = function() {
    for (var i=0; i<this._state.length; i++) {
      var button = this._state[i];
      if (!this._get(button, this._lastState)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Verifies if a any button is released.
   * @method isAnyReleased
   * @returns {Boolean} The state status.
   */
  p.isAnyReleased = function() {
    for (var i=0; i<this._lastState.length; i++) {
      var button = this._lastState[i];
      if (!this._get(button, this._state)) {
        return true;
      }
    }
    return false; 
  }

  creatine.Gamepad = createjs.promote(Gamepad, 'EventDispatcher');

})();/** 
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
/** 
 * @module creatine
 */

(function() {
  "use strict";

  /**
   * System class, no function yet.
   * 
   * @class System
   * @constructor
   */
  var System = function() {
    this.initialize();
  }
  var p = System.prototype;
  
  p.initialize = function() {}
  p.enter = function() {}
  p.pause = function() {}
  p.resume = function() {}
  p.update = function() {}
  p.exit = function() {}

  creatine.System = System;

  // @SHORTCUT
  creatine._system = function(properties) {
    var S = function() { this.System_constructor(); }
    var p = createjs.extend(S, creatine.System);
    for (k in properties) { p[k] = properties[k]; }
    return createjs.promote(S, 'System');
  }
}());
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
/**
 * @module creatine.transitions
 **/

(function() {
  "use strict";
    
  /**
   * A transition effect to fade-out the old scene.
   *
   * ## Usage example
   *
   *     var game = new tine.Game(null, {
   *       create: function() {
   *         var transition = new tine.transitions.FadeOut(null, 1000);
   *         game.replace(new MyScene(), transition);
   *       }
   *     });
   *
   * @class FadeOut
   * @constructor
   * @param {Function} [ease=createjs.Ease.linear] An easing function from 
   *                   `createjs.Ease` (provided by TweenJS).
   * @param {Number} [time=400] The transition time in milliseconds.
  **/
  var FadeOut = function(ease, time) {
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
  var p = FadeOut.prototype;

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

    director._makeTop(outScene, inScene);
    var self = this;
    createjs.Tween.get(outScene, {override:true})
                  .to({alpha:0}, this.time, this.ease)
                  .call(function() { self.complete(); })
  }

  /**
   * Finalize the transition (called by the director).
   * @method complete
   * @protected
  **/
  p.complete = function() {
    createjs.Tween.removeTweens(this.outScene);
    this.outScene.alpha = 1;

    this.director._makeTop(this.inScene, this.outScene)
    this.callback();
  }

  creatine.transitions.FadeOut = FadeOut;
}());
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
/**
 * @module creatine.transitions
 **/

(function() {
  "use strict";

  /**
   * A transition effect to move-out the old scene.
   *
   * ## Usage example
   *
   *     var game = new tine.Game(null, {
   *       create: function() {
   *         var transition = new tine.transitions.MoveOut(tine.TOP, null, 1000);
   *         game.replace(new MyScene(), transition);
   *       }
   *     });
   *
   * @class MoveOut
   * @constructor
   * @param {Constant} [direction=creatine.LEFT] The direction.
   * @param {Function} [ease=createjs.Ease.linear] An easing function from 
   *                   `createjs.Ease` (provided by TweenJS).
   * @param {Number} [time=400] The transition time in milliseconds.
  **/
  var MoveOut = function(direction, ease, time) {
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
  var p = MoveOut.prototype;

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

    if (dir.endsWith('left')) {
      this.targetX = -w;
    } else if (dir.endsWith('right')) {
      this.targetX = w;
    }
    if (dir.startsWith('top')) {
      this.targetY = -h;
    } else if (dir.startsWith('bottom')) {
      this.targetY = h;
    }

    director._makeTop(outScene, inScene);

    var self = this;
    createjs.Tween.get(outScene, {override:true})
                  .to({x:this.targetX, y:this.targetY}, this.time, this.ease)
                  .call(function() { self.complete(); })
  }

  /**
   * Finalize the transition (called by the director).
   * @method complete
   * @protected
  **/
  p.complete = function() {
    createjs.Tween.removeTweens(this.outScene);
    this.outScene.x = 0;
    this.outScene.y = 0;
    this.director._makeTop(this.inScene, this.outScene)
    this.callback();
  }

  creatine.transitions.MoveOut = MoveOut;
}());
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
/**
 * @module creatine.transitions
 **/

(function() {
  "use strict";
  
  /**
   * A transition effect to zoom-in the new scene.
   *
   * ## Usage example
   *
   *     var game = new tine.Game(null, {
   *       create: function() {
   *         var transition = new tine.transitions.ZoomIn(null, 1000);
   *         game.replace(new MyScene(), transition);
   *       }
   *     });
   *
   * @class ZoomIn
   * @constructor
   * @param {Function} [ease=createjs.Ease.linear] An easing function from 
   *                   `createjs.Ease` (provided by TweenJS).
   * @param {Number} [time=400] The transition time in milliseconds.
  **/
  var ZoomIn = function(ease, time) {
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
  var p = ZoomIn.prototype;

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
    inScene.scaleX = 0;
    inScene.scaleY = 0;
    inScene.x = w/2;
    inScene.y = h/2;

    director._makeTop(inScene, outScene);

    var self = this;
    createjs.Tween.get(inScene, {override:true})
                  .to({x:0, y:0, scaleX:1, scaleY:1}, this.time, this.ease)
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
    this.inScene.scaleY = 1;
    this.inScene.scaleX = 1;
    this.director._makeTop(this.inScene, this.outScene)
    this.callback();
  }
  
  creatine.transitions.ZoomIn = ZoomIn;
}());
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
/**
 * @module creatine.transitions
 **/

(function() {
  "use strict";

  /**
   * A transition effect to zoom-out the old scene.
   *
   * ## Usage example
   *
   *     var game = new tine.Game(null, {
   *       create: function() {
   *         var transition = new tine.transitions.ZoomOut(null, 1000);
   *         game.replace(new MyScene(), transition);
   *       }
   *     });
   *
   * @class ZoomOut
   * @constructor
   * @param {Function} [ease=createjs.Ease.linear] An easing function from 
   *                   `createjs.Ease` (provided by TweenJS).
   * @param {Number} [time=400] The transition time in milliseconds.
  **/
  var ZoomOut = function(ease, time) {
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
  var p = ZoomOut.prototype;

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
    director._makeTop(outScene, inScene);

    var self = this;
    createjs.Tween.get(outScene, {override:true})
                  .to({x:w/2, y:h/2, scaleX:0, scaleY:0}, this.time, this.ease)
                  .call(function() { self.complete(); })
  }

  /**
   * Finalize the transition (called by the director).
   * @method complete
   * @protected
  **/
  p.complete = function() {
    createjs.Tween.removeTweens(this.outScene);
    this.outScene.x = 0;
    this.outScene.y = 0;
    this.outScene.scaleY = 1;
    this.outScene.scaleX = 1;
    this.director._makeTop(this.inScene, this.outScene)
    this.callback();
  };
  

  creatine.transitions.ZoomOut = ZoomOut;
}());
/** 
 * @module creatine
 */

(function() {
  "use strict";

  /**
   * The emitter is a simple particle system based on Cocos2D systems.
   *
   * The emitter receives one or more display objects as parameter to be used
   * as base images (the emitter uses the `copy` method, so if you're using a
   * custom display object, it must support copying), and the maximum number
   * of particles. These parameters are used to initialize the emitter and 
   * can't be changed after that. It is highly recommended to initialize the
   * emitter during the create state of the game.
   *
   * The emitter also has some limitations due the the performance. It cannot 
   * change the color of the particles during its execution because canvas 
   * does not have a builtin tinting function and implementing one would impact
   * on the emitter performance. To overcome this, you must provide a colored 
   * particle. 
   *
   * For better control purpose, the emitter must be updated manually. 
   * 
   * Notice that, all time variables, such as life or duration, must be in 
   * milliseconds.
   *
   * ## Usage examples:
   *
   *     var emitter = null;
   *     var game = new tine.Game(null, {
   *       create: function() {
   *         var particle = game.create.circle(10, 'red');
   *         
   *         emitter = new tine.Emitter(particle, 1000);
   *       },
   *       update: function() {
   *         emitter.update(game.time.delta);
   *
   *         if (game.mouse.isPressed(tine.buttons.LEFT)) {
   *           emitter.start(200, game.mouse.x, game.mouse.y);
   *         }
   *       }
   *     })
   *
   * 
   * @class Emitter
   * @constructor
   * @param {Object} image A display object or a list of display objects.
   * @param {Integer} maxParticles The maximum number of particles.
   */
  var Emitter = function(images, maxParticles) {
    this.Container_constructor();

    /**
     * Tell if the emitter is active or not.
     * @property {Boolean} _active
     * @private
     */
    this._active = false;

    /**
     * A time counter to create new particles
     * @property {Integer} _emissionTime.
     * @private
     */
    this._emissionTime = 0;

    /**
     * The elapsed time during the execution of the emitter. Reset on each 
     * start.
     * 
     * @property {Integer} _elapsed
     * @private
     */
    this._elapsed = 0;

    /**
    * The target time duration of the emitter emission.
    * @property {Integer} _duration
    * @private
    */
    this._duration = 0;

    /**
    * The current number of alive particles.
    * @property {Integer} _counter
    * @private
    */
    this._counter = 0;

   /**
    * The list of display objects.
    * @property {Array} _images
    * @private
    */
    this._images = [];

   /**
    * The maximum number of particles.
    * @property {Integer} _maxParticles
    * @private
    */
    this._maxParticles = 0;

   /**
    * The list of all particles in this emitter.
    * @property {Integer} _particles
    * @private
    */
    this._particles = [];


   /**
    * The emission rate. Emitter create 1 particle per emissionRate 
    * milliseconds.
    * 
    * @property {Integer} emissionRate
    * @default 100
    */
    this.emissionRate = 100;

   /**
    * The base angle of emission (in degress), Zero is the right.
    * @property {Integer} angle
    * @default 0
    */
    this.angle = 0;

   /**
    * Variance of the emission angle (in degrees).
    * @property {Integer} angleVar
    * @default 45
    */
    this.angleVar = 45;


   /**
    * The initial x position of the particles.
    * @property {Integer} emitX
    * @default 0
    */
    this.emitX = 0;

   /**
    * Variance of the initial x position.
    * @property {Integer} emitXVar
    * @default 0
    */
    this.emitXVar = 0;

   /**
    * The initial y position of the particles.
    * @property {Integer} emitY
    * @default 0
    */
    this.emitY = 0;

   /**
    * Variance of the initial y position.
    * @property {Integer} emitYVar
    * @default 0
    */
    this.emitYVar = 0;

   /**
    * The base particle life.
    * @property {Integer} life
    * @default 1000
    */
    this.life = 1000;

   /**
    * Variance of the particle life.
    * @property {Integer} lifeVar
    * @default 0
    */
    this.lifeVar = 0;

   /**
    * Initial particle alpha.
    * @property {Number} startAlpha
    * @default 1
    */
    this.startAlpha = 1;

   /**
    * Variance of the initial particle alpha.
    * @property {Number} startAlphaVar
    * @default 0
    */
    this.startAlphaVar = 0;

   /**
    * Final particle alpha.
    * @property {Number} endAlpha
    * @default 0
    */
    this.endAlpha = 0;

   /**
    * Variance of the end particle alpha.
    * @property {Number} endAlphaVar
    * @default 0
    */
    this.endAlphaVar = 0;

   /**
    * Initial particle rotation (in degrees).
    * @property {Integer} startRotation
    * @default 0
    */
    this.startRotation = 0;

   /**
    * Variance of the initial particle rotation.
    * @property {Integer} startRotationVar
    * @default 0
    */
    this.startRotationVar = 0;

   /**
    * Final particle rotation.
    * @property {Integer} endRotation
    * @default 0
    */
    this.endRotation = 0;

   /**
    * Variance of the final particle rotation.
    * @property {Integer} endRotationVar
    * @default 0
    */
    this.endRotationVar = 0;

   /**
    * Initial particle scale.
    * @property {Number} startScale
    * @default 1
    */
    this.startScale = 1;

   /**
    * Variance of the initial scale.
    * @property {Number} startScaleVar 
    * @default 0
    */
    this.startScaleVar = 0;

   /**
    * Final particle scale.
    * @property {Number} endScale
    * @default 0
    */
    this.endScale = 0;

   /**
    * Variance of the final particle scale.
    * @property {Number} endScaleVAr
    * @default 0
    */
    this.endScaleVar = 0;


   /**
    * Base particle speed.
    * @property {Integer} speed
    * @default 100
    */
    this.speed = 100;

   /**
    * Variance of the base particle speed.
    * @property {Integer} speedVar
    * @default 0
    */
    this.speedVar = 0;

   /**
    * Gravity force in X.
    * @property {Integer} gravityX
    * @default 0
    */
    this.gravityX = 0;

   /**
    * Gravity force in X.
    * @property {Integer} gravityY
    * @default 0
    */
    this.gravityY = 0;

   /**
    * Radial particle acceleration
    * @property {Integer} radAccel
    * @default 0
    */
    this.radAccel = 0;

   /**
    * Variance of the radial particle acceleration
    * @property {Integer} radAccelVar
    * @default 0
    */
    this.radAccelVar = 0;

   /**
    * Tangential particle rotation.
    * @property {Integer} tacAccel
    * @default 0
    */
    this.tanAccel = 0;

   /**
    * Variance of the tangential rotation.
    * @property {Integer} tanAccelVar
    * @default 0
    */
    this.tanAccelVar = 0;

    this._initialize(images, maxParticles);
  }
  var p = createjs.extend(Emitter, createjs.Container);

  /**
   * Initialize the emitter.
   * @method _initialize
   * @param {Object} image A display object or a list of display objects.
   * @param {Integer} maxParticles The maximum number of particles.
   * @private
   */
  p._initialize = function(images, maxParticles) {
    this._maxParticles = maxParticles;
    
    if (!images.length) {
      images = [images];
    }

    // create images
    this._particles = [];
    var i = 0;
    while (i < maxParticles) {
      for (var j=0; j<images.length&&i<maxParticles; j++) {
        var p = images[j].clone();

        p.visible = false;
        p.angle = 0;
        p.startLife = 0;
        p.life = 0;
        p.dirX = 0;
        p.dirY = 0;
        p.deltaAlpha = 0;
        p.startRotation = 0;
        p.deltaRotation = 0;
        p.startScale = 0;
        p.deltaScale = 0;
        p.speed = 0;
        p.gravityX = 0;
        p.gravityY = 0;
        p.radAccel = 0;
        p.tanAccel = 0;

        this.addChild(p);
        this._particles.push(p);
        i++;
      }
    }
    tine.shuffle(this._particles);
  } 

  /**
   * Add a new particle.
   * @method _addParticle
   * @private
   */
  p._addParticle = function() {
    var p = this._particles[this._counter++];
    var cos=Math.cos;
    var sin=Math.sin;
    var abs=Math.abs;
    var rand=tine.randomPolar; 
    var clip=tine.clip;
    var rot, size;
    
    var endAlpha = clip(this.endAlpha + this.endAlphaVar*rand(), 0, 1);
    var endRotation = this.endRotation + this.endRotationVar*rand();
    var endScale = this.endScale + this.endScaleVar*rand();

    p.visible     = true;
    p.startLife   = p.life = abs(this.life + this.lifeVar*rand());
    p.alpha       = clip(this.startAlpha + this.startAlphaVar*rand(), 0, 1);
    p.x           = this.emitX + this.emitXVar*rand();
    p.y           = this.emitY + this.emitYVar*rand();
    rot           = (this.angle + this.angleVar*rand())*0.0174532925;
    p.dirX        = cos(rot);
    p.dirY        = sin(rot);
    p.speed       = this.speed + this.speedVar*rand();
    p.rotation    = this.startRotation + this.startRotationVar*rand();
    p.scaleX = p.scaleY = this.startScale + this.startScaleVar*rand();

    p.deltaAlpha    = (endAlpha-p.alpha)/p.life;
    p.deltaRotation = (endRotation-p.rotation)/p.life;
    p.deltaScale    = (endScale-p.scaleX)/p.life;

    p.gravityX    = this.gravityX;
    p.gravityY    = this.gravityY;
    p.radAccel    = this.radAccel + this.radAccelVar*rand();
    p.tanAccel    = this.tanAccel + this.tanAccelVar*rand();
    // console.log(p, p.x, p.y);
  }

  /**
   * Update the emitter.
   * @method update
   * @param {Number} delta The delta time (in milliseconds).
   */
  p.update = function(delta) {
    if (!delta) return;
    var fdelta = delta/1000;

    // Add particles if needed
    if (this._active) {
      var rate = 1000/this.emissionRate;
      this._emissionTime += delta;

      while (this._counter < this._maxParticles && this._emissionTime > rate) {
        this._addParticle();
        this._emissionTime -= rate;
      }

      this._elapsed += delta;
      if (this._duration != -1 && this._duration < this._elapsed) {
        this._active = false;
      }
    }

    // Update particles
    var i=0; 
    var N=this._counter;
    var particles=this._particles;
    var sqrt = Math.sqrt;
    var p, step, norm, px, py;
    var radX, tanX, radY, tanY;

    while (i<N) {
      p = particles[i];

      // Remove particles if needed
      p.life -= delta;
      if (p.life <= 0) {
        p.visible = false;
        N--;
        particles[i] = particles[N];
        particles[N] = p;
        continue;
      }

      // Update values
      step = p.life/p.startLife;
      if (p.x || p.y) {
        norm = sqrt(p.x*p.x + p.y*p.y);
        px = p.x/norm;
        py = p.y/norm
      } else {
        px = 0;
        py = 0;
      }
      radX = px*p.radAccel;
      radY = py*p.radAccel;
      tanX = -py*p.tanAccel;
      tanY = px*p.tanAccel;

      p.dirX += (radX + tanX + p.gravityX)*fdelta;
      p.dirY += (radY + tanY + p.gravityY)*fdelta;

      p.alpha += p.deltaAlpha*delta;
      p.scaleX += p.deltaScale*delta;
      p.scaleY = p.scaleX;
      p.rotation += p.deltaRotation*delta;
      p.x += p.dirX*p.speed*fdelta;
      p.y += p.dirY*p.speed*fdelta;

      i++;
    }

    this._counter = N;
  }

  /**
   * Start the emission of particles.
   * @method start
   * @param {Integer} duration Duration of emission (in milliseconds), use -1 
   * for infinity.
   * @param {Integer} [x] override the emitX variable.
   * @param {Integer} [y] override the emitY variable.
   */
  p.start = function(duration, x, y) {
    duration = duration || -1;
    this.emitX = (typeof x==='undefined')?this.emitX:x;
    this.emitY = (typeof y==='undefined')?this.emitY:y;
    this._duration = duration;
    this._elapsed = 0;
    this._active = true;
  }

  creatine.Emitter = createjs.promote(Emitter, 'Container');

})();/**
 * @module creatine.tmx
 **/

(function() {
  "use strict";

  /**
   * Tileset represents a Tileset in the TMX map.
   *
   * ## Data format
   *
   * In relation to the tilesets properties, the data must be in the 
   * following format:
   * 
   *     var data = {
   *       'firstgid'    : [Integer], // mandatory
   *       'name'        : [String],  // mandatory
   *       'image'       : [String],  // mandatory
   *       'imagewidth'  : [Integer], // default to image.width
   *       'imageheight' : [Integer], // default to image.height
   *       'tilewidth'   : [Integer], // default to 32
   *       'tileheight'  : [Integer], // default to 32
   *       'spacing'     : [Integer], // default to 0
   *       'margin'      : [Integer], // default to 0
   *       'tileoffset'  : [Object],  // default to {x:0, y:0}
   *       'properties'  : [Object],
   *     }
   * 
   * Consult the official TMX description to known more:
   * https://github.com/bjorn/tiled/wiki/TMX-Map-Format
   *
   * @class Tileset
   * @param {Object} data The data object describing the tileset.
   * @constructor
  **/
  var Tileset = function(data) {
    /**
     * The first global tile ID of this tileset.
     * @property firstgid
     * @type {Integer}
     * @readonly
    **/
    this.firstgid = null;

    /**
     * The name of this tileset.
     * @property name
     * @type {String}
     * @readonly
    **/
    this.name = null;

    /**
     * The image width in pixels.
     * @property width
     * @type {Integer}
     * @readonly
    **/
    this.width = null;

    /**
     * The image height in pixels.
     * @property height
     * @type {Integer}
     * @readonly
    **/
    this.height = null;

    /**
     * The width of the tiles in this tileset.
     * @property width
     * @type {Integer}
     * @readonly
    **/
    this.tileWidth = null;

    /**
     * The height of the tiles in this tileset.
     * @property height
     * @type {Integer}
     * @readonly
    **/
    this.tileHeight = null;

    /**
     * The path to the image associated to this tilset.
     * @property imagePath
     * @type {String}
     * @readonly
    **/
    this.imagePath = null;

    /**
     * The offsetX to the tile origin. Notice that, tiled assumes (0, 0) as
     * the left-bottom.
     *
     * @property tileOffsetX
     * @type {Integer}
     * @readonly
    **/
    this.tileOffsetX = null;

    /**
     * The offsetY to the tile origin. Notice that, tiled assumes (0, 0) as
     * the left-bottom.
     *
     * @property tileOffsetY
     * @type {Integer}
     * @readonly
    **/
    this.tileOffsetY = null;
    /**
     * The spacing between tiles on the image.
     * @property spacing
     * @type {Integer}
     * @readonly
    **/
    this.spacing = null;

    /**
     * The margin of the image.
     * @property spacing
     * @type {Integer}
     * @readonly
    **/
    this.margin = null;

    /**
     * An object with properties defined by user.
     * @property properties
     * @type {Object}
     * @readonly
    **/
    this.properties = null;

    /**
     * An object with tile properties defined by user.
     * @property properties
     * @type {Object}
     * @readonly
    **/
    this.tileProperties = null;

    /**
     * The spritesheet object loaded by this tileset.
     * @property spritesheet
     * @type {createjs.SpriteSheet}
     * @readonly
    **/
    this.spritesheet = null;

    /**
     * Animation dict contained in the tileset.
     * @property animations
     * @type {Object}
     * @readonly
    **/
    this.animations = null;

    this._initialize(data);
  }
  var p = Tileset.prototype;

  /**
   * Initialization method.
   * @method _initialize
   * @param {Object} data The data object describing the tileset.
   * @protected
  **/
  p._initialize = function(data) {
    this.firstgid       = data['firstgid'];
    this.name           = data['name'];
    this.imagePath      = data['image'];
    this.width          = data['imagewidth'];
    this.height         = data['imageheight'];
    this.tileWidth      = data['tilewidth'] || 32;
    this.tileHeight     = data['tileheight'] || 32;
    this.spacing        = data['spacing'] || 0;
    this.margin         = data['margin'] || 0;
    this.properties     = data['properties'];
    this.tileProperties = data['tileproperties'];
    this.tileOffsetX    = 0;
    this.tileOffsetY    = 0;
    this.animations     = {};
    
    if (data['tileoffset']) {
      this.tileOffsetX = data['tileoffset']['x'];
      this.tileOffsetY = data['tileoffset']['y'];
    }

    if (data['tiles']) {
      for (var key in data['tiles']) {
        var info = data['tiles'][key];

        if (info['animation']) {
          var frames = [];
          var speeds = [];

          for (var i=0; i<info['animation'].length; i++) {
            frames.push(info['animation'][i]['tileid']);
            speeds.push(info['animation'][i]['duration']);
          }
          this.animations['anim-'+key] = {
            'frames': frames,
            'speed': speeds[0]/1000
          }
        }
      }
    }

    this._loadSpriteSheet();
  }

  /**
   * Loads the spritesheet.
   * @method _loadSpriteSheet
   * @protected
  **/
  p._loadSpriteSheet = function() {
    if (!this.imagePath) return;

    var data = {
      'images': [this.imagePath],
      'frames': {
        'width'   : this.tileWidth,
        'height'  : this.tileHeight,
        'regX'    :-this.tileOffsetX,
        'regY'    : this.tileHeight - this.tileOffsetY, // at bottom
        'spacing' : this.spacing,
        'margin'  : this.margin
      },
      'animations': this.animations
    }
    this.spritesheet = new createjs.SpriteSheet(data);
  }

  creatine.tmx.Tileset = Tileset;
}());/**
 * @module creatine.tmx
 **/

(function() {
  "use strict";

  /**
   * TileLayer represents an abstract TileLayer in the TMX map. Creatine 
   * actually use this as base class to `OrthogonalTileLayer`,
   * `IsometricTileLayer` and `StaggeredTileLayer`. The difference among 
   * projections is performed at layer-level, making new projections and 
   * extensions of the current ones a lot simpler to be created. This also 
   * allows you to use multiple projections to the same map (unfortunately, 
   * this isn't supported by Tiled yet). 
   *
   * @class TileLayer
   * @param {creatine.tmx.Map} map The map object.
   * @param {Object} data The data object (from tmx format).
   * @extends createjs.Container
   * @constructor
  **/
  var TileLayer = function(map, data) {
    /**
     * Reference to the TMX map.
     * @property map
     * @type {creatine.tmx.Map}
     * @readonly
    **/
    this.map = null;

    /**
     * The name of the layer.
     * @property name
     * @type {String}
     * @readonly
    **/
    this.name = null;

    /**
     * The list of tile ids in the layer.
     * @property data
     * @type {Array}
     * @readonly
    **/
    this.data = null;

    /**
     * The amount of tiles in x axis.
     * @property width
     * @type {Integer}
     * @readonly
    **/
    this.width = null;

    /**
     * The amount of tiles in y axis.
     * @property y
     * @type {Integer}
     * @readonly
    **/
    this.height = null;

    this._initialize(map, data);
  }
  var p = createjs.extend(TileLayer, createjs.Container);

  /**
   * Initialization method.
   * @method _initialize
   * @param {creatine.tmx.Map} map The map object.
   * @param {Object} data The data object (from tmx format).
   * @protected
  **/
  p._initialize = function(map, data) {
    this.Container_constructor();

    if (!map) return;

    this.map     = map;
    this.name    = data['name'];
    this.data    = data['data'];
    this.x       = data['x'];
    this.y       = data['y'];
    this.width   = data['width'];
    this.height  = data['height'];
    this.visible = data['visible'];
    this.alpha   = data['opacity'];

    this._createTiles();
  }

  /**
   * Create the tiles.
   * 
   * Override this method on the child class.
   * 
   * @method _createTiles
   * @protected
  **/
  p._createTiles = function() {
    throw new Error('TileLayer._createTiles not implemented.');
  }

  /**
   * Return the tile value, given a coord of a tile.
   * @method getTile
   * @param {Integer} x The column of a tile.
   * @param {Integer} y The row of a tile.
   * @return {Integer} The tile id.
  **/
  p.getTile = function(x, y) {
    return this.data[(this.width*y + x)]
  }

  /**
   * Set the tile value, given a coord of a tile.
   * @method getTile
   * @param {Integer} x The column of a tile.
   * @param {Integer} y The row of a tile.
   * @param {Integer} gid The global ID.
  **/
  p.setTile = function(x, y, gid) {
    var idx = (this.width*y + x);

    var tileset = this.map.getTilesetByGid(gid);
    var tileId = gid-tileset.firstgid;
    var tile = this.getChildAt(idx)

    this.data[idx] = tileId;
    if (tileset.animations['anim-'+(tileId)]) {
      tile.gotoAndPlay('anim-'+(tileId));
    } else {
      tile.gotoAndStop(tileId);
    }
  }

  /**
   * Return the coord of a tile given the local position. 
   * 
   * Override this method on the child class.
   *
   * @method getTile
   * @param {Integer} x The position x.
   * @param {Integer} y The position y.
   * @return {createjs.Point} The tile coord.
  **/
  p.getCoords = function(x, y) {
    throw new Error('TileLayer.getCoords not implemented.');
  }

  /**
   * Return the top-left local position of a tile, considering its coords
   * (column and row).
   * 
   * Override this method on the child class.
   *
   * @method getTile
   * @param {Integer} x The column of the tile.
   * @param {Integer} y The row of the tile.
   * @return {createjs.Point} The top-left tile local position.
  **/
  p.getPosition = function(x, y) {
    throw new Error('TileLayer.getPosition not implemented.');
  }

  creatine.tmx.TileLayer = createjs.promote(TileLayer, "Container");
}());/**
 * @module creatine.tmx
 **/

(function() {
  "use strict";

  /**
   * OrthogonalTileLayer represents a TileLayer in the TMX map.
   * 
   * @class OrthogonalTileLayer
   * @param {creatine.tmx.Map} map The map object.
   * @param {Object} data The data object (from tmx format).
   * @extends creatine.tmx.TileLayer
   * @constructor
  **/
  var OrthogonalTileLayer = function(map, data) {
    this.TileLayer_constructor(map, data);
  }
  var p = createjs.extend(OrthogonalTileLayer, creatine.tmx.TileLayer);

  /**
   * Create the tiles. Override this method on the child class.
   * @method _createTiles
   * @protected
  **/
  p._createTiles = function() {
    var order = this.map.renderOrder;
    var startX = 0;
    var startY = 0;
    var endX = this.width;
    var endY = this.height;
    var dirX = 1;
    var dirY = 1;
    var tW = this.map.tileWidth;
    var tH = this.map.tileHeight;

    if (order == 'left-down' || order=='left-up') {
      startX = this.width-1; endX = 0; dirX = -1;
    }
    
    if (order == 'right-up' || order=='left-up') {
      startY = this.height-1; endY = 0; dirY = -1
    }

    for (var y=startY; y!=endY; y+=dirY) {
      for (var x=startX; x!=endX; x+=dirX) {
        var i = (this.width*y + x)

        var gid = this.data[i];

        if (gid <= 0) continue;

        var tileset = this.map.getTilesetByGid(gid);
        var tile = new createjs.Sprite(tileset.spritesheet)
        var tileId = gid-tileset.firstgid;
        
        if (tileset.animations['anim-'+(tileId)]) {
          tile.gotoAndPlay('anim-'+(tileId));
        } else {
          tile.gotoAndStop(tileId);
        }

        tile.x = x*tW;
        tile.y = y*tW + tH;
        this.addChild(tile);
      }
    }
  }

  /**
   * Return the coord of a tile given the local position. 
   * @method getTile
   * @param {Integer} x The position x.
   * @param {Integer} y The position y.
   * @return {createjs.Point} The tile coord.
  **/
  p.getCoords = function(x, y) {
    return new createjs.Point(
      Math.floor(x/this.map.tileWidth),
      Math.floor(y/this.map.tileHeight)
    );
  }

  /**
   * Return the top-left local position of a tile, considering its coords
   * (column and row).
   * 
   * @method getTile
   * @param {Integer} x The column of the tile.
   * @param {Integer} y The row of the tile.
   * @return {createjs.Point} The top-left tile local position.
  **/
  p.getPosition = function(x, y) {
    return new createjs.Point(
      Math.floor(x*this.map.tileWidth),
      Math.floor(y*this.map.tileHeight)
    );
  }

  creatine.tmx.OrthogonalTileLayer = createjs.promote(OrthogonalTileLayer, "TileLayer");
}());/**
 * @module creatine.tmx
 **/

(function() {
  "use strict";

  /**
   * IsometricTileLayer represents a TileLayer in the TMX map.
   *
   * @class IsometricTileLayer
   * @param {creatine.tmx.Map} map The map object.
   * @param {Object} data The data object (from tmx format).
   * @extends creatine.tmx.TileLayer
   * @constructor
  **/
  var IsometricTileLayer = function(map, data) {
    this.TileLayer_constructor(map, data);
  }
  var p = createjs.extend(IsometricTileLayer, creatine.tmx.TileLayer);

  /**
   * Create the tiles. Override this method on the child class.
   * @method _createTiles
   * @protected
  **/
  p._createTiles = function() {
    var order = this.map.renderOrder;
    var startX = 0;
    var startY = 0;
    var endX = this.width;
    var endY = this.height;
    var dirX = 1;
    var dirY = 1;
    var tW = this.map.tileWidth;
    var tH = this.map.tileHeight;

    if (order == 'left-down' || order=='left-up') {
      startX = this.width-1; endX = 0; dirX = -1;
    }
    
    if (order == 'right-up' || order=='left-up') {
      startY = this.height-1; endY = 0; dirY = -1
    }

    for (var y=startY; y!=endY; y+=dirY) {
      for (var x=startX; x!=endX; x+=dirX) {
        var i = (this.width*y + x)

        var gid = this.data[i];

        if (gid <= 0) continue;

        var tileset = this.map.getTilesetByGid(gid);
        var tile = new createjs.Sprite(tileset.spritesheet)
        var tileId = gid-tileset.firstgid;
        
        if (tileset.animations['anim-'+(tileId)]) {
          tile.gotoAndPlay('anim-'+(tileId));
        } else {
            tile.gotoAndStop(tileId);
        }

        tile.x = (x-y-1)*(this.map.tileWidth/2);
        tile.y = (x+y+2)*(this.map.tileHeight/2);

        this.addChild(tile);
      }
    }
  }

  /**
   * Return the coord of a tile given the local position. 
   * 
   * Override this method on the child class.
   *
   * @method getTile
   * @param {Integer} x The position x.
   * @param {Integer} y The position y.
   * @return {createjs.Point} The tile coord.
  **/
  p.getCoords = function(x, y) {
    return new createjs.Point(
      Math.floor(x/this.map.tileWidth + y/this.map.tileHeight),
      Math.floor(-x/this.map.tileWidth + y/this.map.tileHeight)
    );
  }

  /**
   * Return the top-left local position of a tile, considering its coords
   * (column and row).
   * 
   * Override this method on the child class.
   *
   * @method getTile
   * @param {Integer} x The column of the tile.
   * @param {Integer} y The row of the tile.
   * @return {createjs.Point} The top-left tile local position.
  **/
  p.getPosition = function(x, y) {
    return new createjs.Point(
      (x-y-1)*(this.map.tileWidth/2),
      (x+y+2)*(this.map.tileHeight/2)
    )
  }
  creatine.tmx.IsometricTileLayer = createjs.promote(IsometricTileLayer, "TileLayer");
}());/**
 * @module creatine.tmx
 **/

(function() {
  "use strict";

  /**
   * StaggeredTileLayer represents a TileLayer in the TMX map.
   *
   * @class StaggeredTileLayer
   * @param {creatine.tmx.Map} map The map object.
   * @param {Object} data The data object (from tmx format).
   * @extends creatine.tmx.TileLayer
   * @constructor
  **/
  var StaggeredTileLayer = function(map, data) {
    this.TileLayer_constructor(map, data);
  }
  var p = createjs.extend(StaggeredTileLayer, creatine.tmx.TileLayer);

  /**
   * Create the tiles. Override this method on the child class.
   * @method _createTiles
   * @protected
  **/
  p._createTiles = function() {
    var order = this.map.renderOrder;
    var startX = 0;
    var startY = 0;
    var endX = this.width;
    var endY = this.height;
    var dirX = 1;
    var dirY = 1;
    var tW = this.map.tileWidth;
    var tH = this.map.tileHeight;

    if (order == 'left-down' || order=='left-up') {
        startX = this.width-1; endX = 0; dirX = -1;
    }
    
    if (order == 'right-up' || order=='left-up') {
        startY = this.height-1; endY = 0; dirY = -1
    }

    for (var y=startY; y!=endY; y+=dirY) {
      for (var x=startX; x!=endX; x+=dirX) {
        var i = (this.width*y + x)

        var gid = this.data[i];

        if (gid <= 0) continue;

        var tileset = this.map.getTilesetByGid(gid);
        var tile = new createjs.Sprite(tileset.spritesheet)
        var tileId = gid-tileset.firstgid;
        
        if (tileset.animations['anim-'+(tileId)]) {
          tile.gotoAndPlay('anim-'+(tileId));
        } else {
          tile.gotoAndStop(tileId);
        }

        tile.x = tW*(x + (y%2)/2 - 0.5);
        tile.y = tH*(y/2 + 1);


        // tile.x = tW*(x+(y%2)/2);
        // tile.y = tH + tH*y/2;


        this.addChild(tile);
      }
    }
  }

  /**
   * Return the coord of a tile given the local position. 
   * 
   * Override this method on the child class.
   *
   * @method getTile
   * @param {Integer} x The position x.
   * @param {Integer} y The position y.
   * @return {createjs.Point} The tile coord.
  **/
  p.getCoords = function(x, y) {
    // convert to iso first
    var x_ = Math.floor(x/this.map.tileWidth + y/this.map.tileHeight);
    var y_ = Math.floor(-x/this.map.tileWidth + y/this.map.tileHeight);

    // then from iso to stag
    x = Math.floor((x_-y_)/2);
    y = x_ + y_;
    return new createjs.Point(x, y);
  }

  /**
   * Return the top-left local position of a tile, considering its coords
   * (column and row).
   * 
   * Override this method on the child class.
   *
   * @method getTile
   * @param {Integer} x The column of the tile.
   * @param {Integer} y The row of the tile.
   * @return {createjs.Point} The top-left tile local position.
  **/
  p.getPosition = function(x, y) {
    return new createjs.Point(
      this.map.tileWidth*(x + (Math.abs(y)%2)/2 - 0.5),
      this.map.tileHeight*(y/2 + 1)
    )
  }
  creatine.tmx.StaggeredTileLayer = createjs.promote(StaggeredTileLayer, "TileLayer");
}());/**
 * @module creatine.tmx
 **/

(function() {
  "use strict";

  /**
   * ImageLayer represents an image layer on TMX map.
   *
   * @class ImageLayer
   * @param {creatine.tmx.Map} map The map object.
   * @param {Object} data The data object (from tmx format).
   * @extends createjs.Bitmap
   * @constructor
  **/
  var ImageLayer = function(map, data) {
    /**
     * Reference to the TMX map.
     * @property map
     * @type {creatine.tmx.Map}
     * @readonly
    **/
    this.map = null;

    /**
     * The path for the image.
     * @property imagePath
     * @type {String}
     * @readonly
    **/
    this.imagePath = null;

    /**
     * The name of the layer.
     * @property name
     * @type {String}
     * @readonly
    **/
    this.name = null;

    /**
     * The amount of tiles in x axis. Not really useful here.
     * @property width
     * @type {Integer}
     * @readonly
    **/
    this.width = null;

    /**
     * The amount of tiles in y axis. Not really useful here.
     * @property y
     * @type {Integer}
     * @readonly
    **/
    this.height = null;

    this._initialize(map, data);
  }
  var p = createjs.extend(ImageLayer, createjs.Bitmap);

  /**
   * Initialization method.
   * @method _initialize
   * @param {creatine.tmx.Map} map The map object.
   * @param {Object} data The data object (from tmx format).
   * @private
  **/
  p._initialize = function(map, data) {
    if (!map) return;

    this.Bitmap_constructor(data['image']||null);

    this.map       = map;
    this.name      = data['name'];
    this.imagePath = data['image'];
    this.x         = data['x'];
    this.y         = data['y'];
    this.width     = data['width'];
    this.height    = data['height'];
    this.visible   = data['visible'];
    this.alpha     = data['opacity'];
  }

  creatine.tmx.ImageLayer = createjs.promote(ImageLayer, "Bitmap");
}());/**
 * @module creatine.tmx
 **/

(function() {
  "use strict";

  /**
   * ObjectLayer represents an Object Group in TMX maps.
   *
   * @class ObjectLayer
   * @param {creatine.tmx.Map} map The map object.
   * @param {Object} data The data object (from tmx format).
   * @constructor
  **/
  var ObjectLayer = function(map, data) {
    /**
     * Reference to the TMX map.
     * @property map
     * @type {creatine.tmx.Map}
     * @readonly
    **/
    this.map = null;

    /**
     * The name of the layer.
     * @property name
     * @type {String}
     * @readonly
    **/
    this.name = null;

    /**
     * List of objects in the layer.
     * @property objects
     * @type {Array}
     * @readonly
    **/
    this.objects = null;

    /**
     * Is the layer visible?
     * @property visible
     * @type {Boolean}
     * @readonly
    **/
    this.visible = null;

    /**
     * Opacity the layer.
     * @property alpha
     * @type {Float}
     * @readonly
    **/
    this.alpha = null;

    this._initialize(map, data);
  }
  var p = ObjectLayer.prototype;

  /**
   * Initialization method.
   * @method _initialize
   * @param {creatine.tmx.Map} map The map object.
   * @param {Object} data The data object (from tmx format).
   * @private
  **/
  p._initialize = function(map, data) {
    if (!map) return;

    this.map     = map;
    this.name    = data['name'];
    this.objects = data['objects'];
    this.visible = data['visible'];
    this.alpha   = data['opacity'];
  }

  creatine.tmx.ObjectLayer = ObjectLayer;
}());/**
 * @module creatine.tmx
 **/

(function() {
  "use strict";

  /**
   * Map is the class that handle tile maps in the TMX format, specified by the
   * tile software Tiled. A TMX map is composed of one or more layers (tile 
   * layers, object layers or image layers) and one or more tilesets (image 
   * atlases). Creatine supports all types of layers and projections described
   * by the TMX specification: orthogonal, isometric and staggered.
   *
   * The Map receives a data object following the TMX specification. This is
   * usually loaded from a json map. 
   *
   * 
   * ## Usage example
   *
   * Notice that, Map is a display object, inherited from `createjs.Container`,
   * it means that, after loading the map you can simply add it to the stage:
   * 
   *     var map = new creatine.tmx.Map(dataObject);
   *     stage.addChild(map);
   *
   * 
   * ## Data format
   *
   * In relation to the map properties, the data must be in the following 
   * format:
   * 
   *     var data = {
   *         'version'     : [Integer], // default to 1
   *         'orientation' : [String],  // default to 'orthogonal'
   *         'renderorder' : [String],  // default to 'right-down'
   *         'height'      : [Integer], // default to 0
   *         'width'       : [Integer], // default to 0
   *         'tileheight'  : [Integer], // default to 0
   *         'tilewidth'   : [Integer], // default to 0
   *         'tilesets'    : [Array],   // mandatory
   *         'layers'      : [Array],   // mandatory
   *         'properties'  : [Object],
   *     }
   * 
   * Consult the specific classes for layer and tileset to known more about 
   * the data format for these structures or consult the official TMX 
   * description: https://github.com/bjorn/tiled/wiki/TMX-Map-Format
   *
   * @class Map
   * @extends createjs.Container
   * @param {Object} data A data object describing the map.
   * @constructor
  **/
  var Map = function(data) {
    /**
     * Map version
     * @property version
     * @type {Integer}
     * @readonly
    **/
    this.version = null;

    /**
     * Orientation of the map, it supports "orthogonal", "isometric" and 
     * "staggered".
     *
     * @property orientation
     * @type {String}
     * @readonly
    **/
    this.orientation = null;

    /**
     * Order of rendering, supports "right-down", "right-up", "left-down" and
     * "left-up".
     *
     * @property renderOrder
     * @type {String}
     * @readonly
    **/
    this.renderOrder = null;

    /**
     * Describes how many tiles the map have in the y axis.
     * @property height
     * @type {Integer}
     * @readonly
    **/
    this.height = null;

    /**
     * Describes how many tiles the map have in the x axis.
     * @property width
     * @type {Integer}
     * @readonly
    **/
    this.width = null;

    /**
     * Height of tiles.
     * @property tileHeight
     * @type {Integer}
     * @readonly
    **/
    this.tileHeight = null;

    /**
     * Width of tiles.
     * @property tileWidth
     * @type {Integer}
     * @readonly
    **/
    this.tileWidth = null;

    /**
     * The list of tilesets in the map.
     * @property tilesets
     * @type {Array}
     * @readonly
    **/
    this.tilesets = null;

    /**
     * The list of layers in the map.
     * @property layers
     * @type {Array}
     * @readonly
    **/
    this.layers = null;

    /**
     * User defined properties object.
     * @property properties
     * @type {Object}
     * @readonly
    **/
    this.properties = null;


    this._initialize(data);
  }
  var p = createjs.extend(Map, createjs.Container);

  /**
   * Initialization method.
   * @method _initialize
   * @param {Object} data A data object describing the map.
   * @private
  **/
  p._initialize = function(data) {
    this.Container_constructor();
    this.version     = data['version'] || 1;
    this.orientation = data['orientation'] || 'orthogonal';
    this.renderOrder = data['renderorder'] || 'right-down';
    this.height      = data['height'] || 0;
    this.width       = data['width'] || 0;
    this.tileHeight  = data['tileheight'] || 0;
    this.tileWidth   = data['tilewidth'] || 0;
    this.properties  = data['properties'];
    this.tilesets    = [];
    this.layers      = [];

    this._createTilesets(data);
    this._createLayers(data);
  }
  /**
   * Create the tileset objects.
   * @method _createTilesets
   * @param {Object} data An object following the TMX specification.
   * @protected
  **/
  p._createTilesets = function(data) {
    for (var i=0; i<data['tilesets'].length; i++) {
      this.tilesets.push(
        new creatine.tmx.Tileset(data['tilesets'][i])
      )
    }
  }

  /**
   * Create the layer objects.
   * @method _createLayers
   * @param {Object} data An object following the TMX specification.
   * @protected
  **/
  p._createLayers = function(data) {
    for (var i=0; i<data['layers'].length; i++) {
      var layerType = data['layers'][i].type;

      if (layerType == 'tilelayer') {
        if (this.orientation == 'orthogonal')
          var Layer = creatine.tmx.OrthogonalTileLayer

        else if (this.orientation == 'isometric')
          var Layer = creatine.tmx.IsometricTileLayer

        else if (this.orientation == 'staggered')
          var Layer = creatine.tmx.StaggeredTileLayer

        else
          throw new Error('Unknown layer type: "'+layerType+'"');

        var layer = new Layer(this, data['layers'][i]);
        this.layers.push(layer);
        this.addChild(layer);

      } else if (layerType == 'objectgroup') {
        this.layers.push(
          new creatine.tmx.ObjectLayer(this, data['layers'][i])
        );
          
      } else if (layerType == 'imagelayer') {
        var layer = new creatine.tmx.ImageLayer(this, data['layers'][i])

        this.addChild(layer);
        this.layers.push(layer);
      }
    }
  }

  /**
   * Returns the tileset which holds the provided global ID.
   * @method getTilesetByGid
   * @param {Integer} gid A global ID.
  **/
  p.getTilesetByGid = function(gid) {
    for (var i=this.tilesets.length-1; i>=0; i--) {
      if (this.tilesets[i].firstgid <= gid) {
        return this.tilesets[i];
      }
    }
  }

  /**
   * Returns a layer by name.
   * @method getLayerByName
   * @param {String} name Layer name.
  **/
  p.getLayerByName = function(name) {
    for (var i=0; i<this.layers.length; i++) {
      if (this.layers[i].name == name) {
        return this.layers[i];
      }
    }
  }

  creatine.tmx.Map = createjs.promote(Map, "Container");
}());/*
* BoxSizer
*
* Copyright (c) 2014 Renato de Pontes Pereira.
*
* Permission is hereby granted, free of charge, to any person obtaining a copy 
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell 
* copies of the Software, and to permit persons to whom the Software is 
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/

/**
 * @module legacy
 **/

// namespace:
this.creatine = this.creatine || {};

(function() {
    "use strict";

    /**
     * The BoxSizer is a simple layout manager that organizes its components 
     * horizontally or vertically, depending on the <code>orientationat</code> 
     * parameter.
     * 
     * BoxSizer was create to organize the game interface using a basic 
     * geometry, e.g., in a single row or column. But several BoxSizers can be 
     * nested to create a more complex layout. Notice that, for regular grids, 
     * the best option is the GridSizer.
     * 
     * A BoxSizer requires an orientation parameter, which can be the constants
     * <code>HORIZONTAL</code> or <code>HORIZONTAL</code>. It also requires a
     * rectangle containing the information of how much space the sizer can use
     * to expand and organize its elements.
     * 
     * By specifying the proportion parameter when adding a child, the BoxSizer
     * will expand to occupy all the available area. By doing this, the sizer 
     * also can align the component using the anchor position. The anchor 
     * parameter can be specified using the following constants: <code>LEFT, 
     * RIGHT, TOP, BOTTOM, TOP_LEFT, TOP_RIGHT, BOTTOM_LEFT, BOTTOM_RIGHT, 
     * CENTER</code>.
     * 
     * Each component can also have an individual border, by setting the border
     * parameter when adding it to the sizer.
     * 
     * 
     * <h4>Example</h4>
     * 
     * A BoxSizer which grows horizontally and occupying all space of a canvas 
     * can be created as:
     * 
     *     var area = new createjs.Rectangle(0, 0, canvas.width, canvas.height);
     *     var hbox = new creatine.BoxSizer(creatine.HORIZONTAL, area);
     * 
     * And components can be added as:
     * 
     *     hbox.add(my_text, 1, 0, creatine.CENTER);
     *     hbox.add(my_sprite);
     *     hbox.layout()
     * 
     * In the example above, the <code>my_sprite</code> component will be put 
     * at the right while <code>my_text</code> will be moved the the center of 
     * the remaining area.
     * 
     * @class BoxSizer
     * @constructor
     * @param {Constant} orientation The orientation of the sizer (horizontal 
     *                   or vertical).
     * @param {createjs.Rectangle} area A rectangle containing the usable area 
     *                             of the sizer.
    **/
    var BoxSizer = function(orientation, area) {
        /**
         * The orientation of the sizer (use the HORIZONTAL or VERTICAL constants)
         *
         * @property orientation
         * @type {Constant}
        **/
        this.orientation = orientation;

        /**
         * The list within all items in this sizer together with their proportions,
         * border, and anchor.
         * 
         * @property children
         * @type {Array}
         * @private
        **/
        this.children = [];

        /**
         * A rectangle representing the area of which the sizer can use.
         *
         * @property area
         * @type {createjs.Rectangle}
        **/
        this.area = area;
    }
    var p = BoxSizer.prototype;
    
    /**
     * Adds a new object to the sizer.
     *
     * @method add
     * @param {Object} object The DisplayObject to be organized by this sizer.
     * @param {Number} proportion The expansion weight of this item, use 0 
     *                 (zero) to not expand. Default to 0.
     * @param {Number} border The spacing around this item. Default to 0.
     * @param {Constant} anchor The anchor of the object, only useful if 
     *                   proportion is greater than 0. Default to 
     *                   <code>creatine.TOP_LEFT</code>
    **/
    p.add = function(object, proportion, border, anchor) {
        anchor     = anchor     || creatine.TOP_LEFT;
        proportion = proportion || 0;
        border     = border     || 0;

        this.children.push([object, proportion, anchor, border]);
    }

    /**
     * Resize this sizer and its children.
     * 
     * For the root sizer, the parameter <code>area</code> does not to be 
     * specified, but it is automatically set in nested sizers.
     *
     * @method layout 
     * @param {createjs.Rectangle} area A rectangle containing the usable area
     *                             of the sizer. 
    **/
    p.layout = function(area) {
        if (area)
            this.area = area;

        var borders = 0;
        var proportions = 0;
        var fixed_widths = 0;
        var fixed_heights = 0;

        // Compute the available area
        for (var i=0; i<this.children.length; i++) {
            var item        = this.children[i][0];
            var proportion  = this.children[i][1];
            var anchor      = this.children[i][2];
            var border      = this.children[i][3];

            borders += border*2;
            if (proportion > 0) {
                proportions += proportion;
            } else {
                var bounds = item.getBounds();
                fixed_widths += bounds.width;
                fixed_heights += bounds.height;
            }
        }

        var avaliable_w = (this.area.width-borders-fixed_widths);
        var avaliable_h = (this.area.height-borders-fixed_heights);

        // Resize
        var step_x = this.area.x;
        var step_y = this.area.y;
        var x, y, w, h, weight = 0;
        for (var i=0; i<this.children.length; i++) {
            var item        = this.children[i][0];
            var proportion  = this.children[i][1];
            var anchor      = this.children[i][2];
            var border      = this.children[i][3];

            x = step_x + border;
            y = step_y + border;

            if (this.orientation == creatine.VERTICAL) {
                if (proportion == 0) {
                    var bounds = item.getBounds();
                    w = bounds.width;
                    h = bounds.height;
                } else {
                    weight = proportion/proportions;
                    w = this.area.width - border*2;
                    h = weight*avaliable_h;
                }

                step_y += h + border*2;
            }
            else if (this.orientation == creatine.HORIZONTAL) {
                if (proportion == 0) {
                    var bounds = item.getBounds();
                    w = bounds.width;
                    h = bounds.height;
                } else {
                    weight = proportion/proportions;
                    w = weight*avaliable_w;
                    h = this.area.height - border*2;
                }

                step_x += w + border*2;
            }

            this._resize_child(item, {x:x, y:y, width:w, height:h}, anchor);
        }
    }

    /**
     * Propagate the layout to a child and move it accordingly to its anchor.
     *
     * @method _resize_child 
     * @param {Object} item The DisplayObject to be organized by this sizer.
     * @param {createjs.Rectangle} area A rectangle containing the usable area
     *                             of the object. 
     * @param {Constant} anchor The anchor of the object, only useful if 
     *                   proportion is greater than 0. Default to 
     *                   <code>creatine.TOP_LEFT</code>
     * @private
    **/
    p._resize_child = function(item, area, anchor) {
        if (item.layout) {
            item.layout(area);
        }

        if (item.getBounds) {
            var bounds = item.getBounds();
        }

        if (bounds) {
            var w = bounds.width*item.scaleX;
            var h = bounds.height*item.scaleY;
        }
        else {
            var w = 0;
            var h = 0;
        }

        // Set y
        switch (anchor) {
            case creatine.TOP:
            case creatine.TOP_LEFT:
            case creatine.TOP_RIGHT:
                item.y = area.y;
                break;

            case creatine.LEFT:
            case creatine.CENTER:
            case creatine.RIGHT:
                item.y = (area.y+area.height/2)-h/2;
                break;
            
            case creatine.BOTTOM:
            case creatine.BOTTOM_LEFT:
            case creatine.BOTTOM_RIGHT:
                item.y = area.y+area.height-h;
                break;                
        }

        // Set x
        switch (anchor) {
            case creatine.LEFT:
            case creatine.TOP_LEFT:
            case creatine.BOTTOM_LEFT:
                item.x = area.x;
                break;

            case creatine.TOP:
            case creatine.CENTER:
            case creatine.BOTTOM:
                item.x = (area.x+area.width/2)-w/2;
                break;
            
            case creatine.RIGHT:
            case creatine.TOP_RIGHT:
            case creatine.BOTTOM_RIGHT:
                item.x = area.x+area.width-w;
                break;                
        }
        
        item.x += item.regX;
        item.y += item.regY;
    }

    creatine.BoxSizer = BoxSizer;
}());
/*
* GridSizer
*
* Copyright (c) 2014 Renato de Pontes Pereira.
*
* Permission is hereby granted, free of charge, to any person obtaining a copy 
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell 
* copies of the Software, and to permit persons to whom the Software is 
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/

/**
 * @module legacy
 **/

// namespace:
this.creatine = this.creatine || {};

(function() {
    "use strict";

    /**
     * GridSizer is a layout manager that organizes its components in a regular
     * grid. 
     * 
     * Parameters <code>rows</code> and <code>cols</code> specify how many rows
     * and columns the grid will have, respectively. All cells in the grid have
     * the same size. However, each cell can have an individual border, by 
     * setting the border parameter when adding an object to the sizer.

     * The anchor parameter can be specified using the following constants: 
     * <code>LEFT, RIGHT, TOP, BOTTOM, TOP_LEFT, TOP_RIGHT, BOTTOM_LEFT, 
     * BOTTOM_RIGHT, CENTER</code>.
     * 
     * <h4>Example</h4>
     * 
     * A GridSizer which with 3 rows and 5 columns, and occupying all space of 
     * a canvas can be created as:
     * 
     *     var area = new createjs.Rectangle(0, 0, canvas.width, canvas.height);
     *     var hbox = new creatine.GridSizer(3, 5, area);
     * 
     * @class GridSizer
     * @constructor
     * @param {Number} rows The number of rows in the grid.
     * @param {Number} cols The number of columns in the grid.
     * @param {createjs.Rectangle} area A rectangle containing the usable area 
     *                             of the sizer.
    **/
    var GridSizer = function(rows, cols, area) {
        /**
         * The number of rows in the grid.
         * 
         * @property rows
         * @type {Number}
        **/
        this.rows = rows;

        /**
         * The number of columns in the grid.
         * 
         * @property cols
         * @type {Number}
        **/
        this.cols = cols;

        /**
         * The list within all items in this sizer together with their proportions,
         * border, and anchor.
         * 
         * @property children
         * @type {Array}
         * @private
        **/
        this.children = [];

        /**
         * A rectangle representing the area of which the sizer can use.
         *
         * @property area
         * @type {createjs.Rectangle}
        **/
        this.area = area;
    }
    var p = GridSizer.prototype;

    /**
     * Adds a new object to the sizer.
     *
     * @method add
     * @param {Object} object The DisplayObject to be organized by this sizer.
     * @param {Number} border The spacing around this item. Default to 0.
     * @param {Constant} anchor The anchor of the object. Default to 
     *                   <code>creatine.TOP_LEFT</code>
    **/
    p.add = function(object, border, anchor) {
        anchor = anchor || creatine.TOP_LEFT;
        border = border || 0;

        this.children.push([object, anchor, border]);
    }

    /**
     * Resize this sizer and its children.
     * 
     * For the root sizer, the parameter <code>area</code> does not to be 
     * specified, but it is automatically set in nested sizers.
     *
     * @method layout 
     * @param {createjs.Rectangle} area A rectangle containing the usable area
     *                             of the sizer. 
    **/
    p.layout = function(area) {
        if (area)
            this.area = area;

        var base_w = this.area.width/this.cols;
        var base_h = this.area.height/this.rows;

        for (var i=0; i<this.children.length; i++) {
            var item   = this.children[i][0];
            var anchor = this.children[i][1];
            var border = this.children[i][2];

            var x = this.area.x + base_w*Math.floor(i%this.cols) + border;
            var y = this.area.y + base_h*Math.floor(i/this.cols) + border;
            var w = base_w - border*2;
            var h = base_h - border*2;

            this._resize_child(item, {x:x, y:y, width:w, height:h}, anchor);
        }
    }

    /**
     * Propagate the layout to a child and move it accordingly to its anchor.
     *
     * @method _resize_child 
     * @param {Object} item The DisplayObject to be organized by this sizer.
     * @param {createjs.Rectangle} area A rectangle containing the usable area
     *                             of the object. 
     * @param {Constant} anchor The anchor of the object, only useful if 
     *                   proportion is greater than 0. Default to 
     *                   <code>creatine.TOP_LEFT</code>
     * @private
    **/
    p._resize_child = function(item, area, anchor) {
        if (item.layout)
            item.layout(area);

        if (item.getBounds)
            var bounds = item.getBounds();

        if (bounds) {
            var w = bounds.width*item.scaleX;
            var h = bounds.height*item.scaleY;
        }
        else {
            var w = 0;
            var h = 0;
        }

        // Set y
        switch (anchor) {
            case creatine.TOP:
            case creatine.TOP_LEFT:
            case creatine.TOP_RIGHT:
                item.y = area.y;
                break;

            case creatine.LEFT:
            case creatine.CENTER:
            case creatine.RIGHT:
                item.y = (area.y+area.height/2)-h/2;
                break;
            
            case creatine.BOTTOM:
            case creatine.BOTTOM_LEFT:
            case creatine.BOTTOM_RIGHT:
                item.y = area.y+area.height-h;
                break;                
        }

        // Set x
        switch (anchor) {
            case creatine.LEFT:
            case creatine.TOP_LEFT:
            case creatine.BOTTOM_LEFT:
                item.x = area.x;
                break;

            case creatine.TOP:
            case creatine.CENTER:
            case creatine.BOTTOM:
                item.x = (area.x+area.width/2)-w/2;
                break;
            
            case creatine.RIGHT:
            case creatine.TOP_RIGHT:
            case creatine.BOTTOM_RIGHT:
                item.x = area.x+area.width-w;
                break;                
        }

        item.x += item.regX;
        item.y += item.regY;
    }

    creatine.GridSizer = GridSizer;
}());
/*
* DiscreteBar
*
* Copyright (c) 2014 Renato de Pontes Pereira.
*
* Permission is hereby granted, free of charge, to any person obtaining a copy 
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell 
* copies of the Software, and to permit persons to whom the Software is 
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/

/**
 * @module legacy
 **/

// namespace:
this.creatine = this.creatine || {};

(function() {
    "use strict";

    /**
     * DiscreteBar is a progress bar that only handle discrete values. This is  
     * a simple and specific implementation of a progress bar, for a more 
     * general version, consult the ProgressBar.
     * 
     * It can filled in 4 different directions, by using the parameter 
     * `direction`: <code>LEFT_TO_RIGHT, RIGHT_TO_LEFT, TOP_TO_BOTTOM, 
     * BOTTOM_TO_TOP</code>. 
     *
     * <h4>Example</h4>
     * 
     *     // Create the Director
     *     var progress = new creatine.DiscreteBar(
     *         image,                   // The image used to fill.
     *         5,                       // The space between one image and other.
     *         creatine.LEFT_TO_RIGHT   // The director.
     *     )
     * 
     * @class DiscreteBar
     * @constructor
     * @param {Bitmap|Image} image A bitmap or image that will be used to fill 
     *                       the progress bar.
     * @param {Number} spacing The space between one image and other. Default 
     *                 to 0.
     * @param {Constant} direction The filling direction. Default to 
     *                   `creatine.LEFT_TO_RIGHT`.
    **/
    var DiscreteBar = function(image, spacing, direction) {
        this.Container_constructor();

        /**
         * The bar filling direction (`LEFT_TO_RIGHT`, `RIGHT_TO_LEFT`, 
         * `TOP_TO_BOTTOM` or `BOTTOM_TO_TOP`).
         *
         * @property direction
         * @type {Constant}
        **/
        this.direction = direction || creatine.LEFT_TO_RIGHT;

        /**
         * The image which will be used to fill the bar.
         *
         * @property image
         * @type {Image}
        **/
        if (image.image) {
            this.image = image.image;
        } else {
            this.image = image;
        }

        /**
         * The space between one image and other.
         *
         * @property spacing
         * @type {Image}
        **/
        this.spacing = spacing || 0;

        /**
         * The current value of the progress bar.
         *
         * @property value
         * @type {Number}
        **/
        this.value = 0;

    }
    var p = createjs.extend(DiscreteBar, createjs.Container);

    /**
    * Returns true or false indicating whether the bar would be visible if 
    * drawn to a canvas. This does not account for whether it would be visible 
    * within the boundaries of the stage.
    * 
    * @method isVisible
    * @protected
    **/
    p.isVisible = function() {
        var hasContent = this.value > 0 || this.cacheCanvas;
        return !!(this.visible && this.alpha > 0 && this.scaleX != 0 && this.scaleY != 0 && hasContent);
    };

    /**
    * Draws the DiscreteBar into the specified context ignoring its visible, 
    * alpha, shadow, and transform. Returns true if the draw was handled 
    * (useful for overriding functionality).
    *
    * @method draw
    * @param {CanvasRenderingContext2D} ctx The canvas 2D context object to 
    *                                   draw into.
    * @param {Boolean} [ignoreCache=false] Indicates whether the draw operation
    *                                      should ignore any current cache. For
    *                                      example, used for drawing the cache
    *                                      (to prevent it from simply drawing 
    *                                      an existing cache back into itself).
    * @protected
    **/
    p.draw = function(ctx, ignoreCache) {
        if (this.DisplayObject_draw(ctx, ignoreCache)) { return true; }

        var dir_x = 0;
        var dir_y = 0;
        var step_x = 0;
        var step_y = 0;
        var w = this.image.width;
        var h = this.image.height;


        if (this.direction === creatine.LEFT_TO_RIGHT) {dir_x = 1;}
        else if (this.direction === creatine.RIGHT_TO_LEFT) {dir_x = -1; step_x = -w;}
        else if (this.direction === creatine.TOP_TO_BOTTOM) {dir_y = 1;}
        else if (this.direction === creatine.BOTTOM_TO_TOP) {dir_y = -1; step_y = -h;}

        this.removeAllChildren();

        for (var i=0; i<this.value; i++) {
            var bitmap = new createjs.Bitmap(this.image);
            bitmap.x = step_x;
            bitmap.y = step_y;
            this.addChild(bitmap);

            step_x += this.spacing*dir_x + w*dir_x;
            step_y += this.spacing*dir_y + h*dir_y;
        }

        return this.Container_draw(ctx, ignoreCache);
    }

    creatine.DiscreteBar = createjs.promote(DiscreteBar, "Container");
}());
/*
* ProgressBar
*
* Copyright (c) 2014 Renato de Pontes Pereira.
*
* Permission is hereby granted, free of charge, to any person obtaining a copy 
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell 
* copies of the Software, and to permit persons to whom the Software is 
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/

/**
 * @module legacy
 **/

// namespace:
this.creatine = this.creatine || {};

(function() {
    "use strict";
        
    /**
     * ProgressBar is a progress bar that handle continuous values. It is 
     * divided into three main types, which can be specified by `colorsOrImg` 
     * parameter:
     * 
     * - ColorBar: by passing a string representing a color (e.g., '#0f3' or 
     *   'red'), the progress bar will be filled using this color.
     * 
     * - GradientBar: by passing a list of colors (e.g., ['red', 'blue']), the 
     *   progress bar will be filled using a gradient passing through all 
     *   provided colors.
     *
     * - ImageBar: by passing a Bitmap or Image object, the progress bar will 
     *   be filled with using the provided image.
     *
     * A ProgressBar can filled in 4 different directions, by using the 
     * parameter `direction`: <code>LEFT_TO_RIGHT, RIGHT_TO_LEFT, 
     * TOP_TO_BOTTOM, BOTTOM_TO_TOP</code>. 
     *
     * <h4>Example</h4>
     * 
     *     // Create the Director
     *     var progress = new creatine.ProgressBar(
     *         'green',                     // The fill color
     *         'black',                     // The background color
     *         creatine.LEFT_TO_RIGHT       // The director
     *         100,                         // The bar width
     *         20,                          // The bar height
     *         0,                           // The minimum value
     *         100                          // The maximum value
     *     )
     * 
     * @class ProgressBar
     * @constructor
     * @param {String|Array|Bitmap|Image} colorsOrImg A color, list of colors 
     *                                    or bitmap that will be used to fill 
     *                                    the progress bar.
     * @param {String} backgroundColor A string with the color of the bar 
     *                 background. If `null`, the background will be 
     *                 transparent. Default to `null`.
     * @param {Constant} direction The filling direction. Default to 
     *                   `creatine.LEFT_TO_RIGHT`.
     * @param {Number} width The width of the bar. Default to 100.
     * @param {Number} height The height of the bar. Default to 10.
     * @param {Number} min The minimum value of the bar. Default to 0.
     * @param {Number} max The maximum value of the bar. Default to 100.
    **/
    var ProgressBar = function(colorsOrImg, backgroundColor, direction, width, 
                                 height, min, max) {
        /**
         * The bar type ('color', 'gradient' or 'image').
         *
         * @property type
         * @type {Sting}
        **/
        p.type = null;

        /**
         * The bar filling direction (`LEFT_TO_RIGHT`, `RIGHT_TO_LEFT`, 
         * `TOP_TO_BOTTOM` or `BOTTOM_TO_TOP`).
         *
         * @property direction
         * @type {Constant}
        **/
        p.direction = null;

        /**
         * The image which will be used to fill the bar (if type = 'image').
         *
         * @property image
         * @type {Image}
        **/
        p.image = null;

        /**
         * The array with colors of the gradient to fill the bar (if type = 
         * 'gradient').
         *
         * @property gradientColors
         * @type {Array}
        **/
        p.gradientColors = null;

        /**
         * The color to fill the bar (if type = 'color').
         *
         * @property fillColor
         * @type {String}
        **/
        p.fillColor = null;

        /**
         * The background color.
         *
         * @property backgroundColor
         * @type {String}
        **/
        p.backgroundColor = null;

        /**
         * The current value of the progress bar.
         *
         * @property value
         * @type {Number}
        **/
        p.value = null;

        /**
         * The minimum value of the progress bar.
         *
         * @property min
         * @type {Number}
        **/
        p.min = null;

        /**
         * The maximum value of the progress bar.
         *
         * @property max
         * @type {Number}
        **/
        p.max = null;

        /**
         * The width of the progress bar.
         *
         * @property width
         * @type {Number}
        **/
        p.width = null;

        /**
         * The height of the progress bar.
         *
         * @property height
         * @type {Number}
        **/
        p.height = null;

        if (colorsOrImg) {
            this._initialize(
                colorsOrImg,
                backgroundColor,
                direction,
                width,
                height,
                min,
                max
            );
        }
    }
    var p = createjs.extend(ProgressBar, createjs.Shape);

    /**
     * Initialization method.
     * 
     * @method initialize
     * @param {String|Array|Bitmap|Image} colorsOrImg A color, list of colors 
     *                                    or bitmap that will be used to fill 
     *                                    the progress bar.
     * @param {String} backgroundColor A string with the color of the bar 
     *                 background. If `null`, the background will be 
     *                 transparent. Default to `null`.
     * @param {Constant} direction The filling direction. Default to 
     *                   `creatine.LEFT_TO_RIGHT`.
     * @param {Number} width The width of the bar. Default to 100.
     * @param {Number} height The height of the bar. Default to 10.
     * @param {Number} min The minimum value of the bar. Default to 0.
     * @param {Number} max The maximum value of the bar. Default to 100.
     * @private
    **/
    p._initialize = function(colorsOrImg, backgroundColor, direction, width, 
                            height, min, max) {
        this.Shape_constructor();

        if (colorsOrImg instanceof Array) {
            this.type = 'gradient';
            this.gradientColors = colorsOrImg;
        } else if (typeof colorsOrImg === 'string') {
            this.type = 'color';
            this.fillColor = colorsOrImg;
        } else {
            this.type = 'image';
            this.image = colorsOrImg;
            if (this.image.image) {
                this.image = this.image.image;
            }
        }

        if (backgroundColor == null) backgroundColor = null;
        if (direction == null) direction = creatine.LEFT_TO_RIGHT;
        if (width == null) width = 100;
        if (height == null) height = 10;
        if (min == null) min = 0;
        if (max == null) max = 100;

        this.backgroundColor = backgroundColor;
        this.direction = direction;
        this.width = width;
        this.height = height;
        this.min = min;
        this.max = max;
        this.value = 0;
    }

    /**
    * Returns true or false indicating whether the bar would be visible if 
    * drawn to a canvas. This does not account for whether it would be visible 
    * within the boundaries of the stage.
    * 
    * @method isVisible
    * @protected
    **/
    p.isVisible = function() {
        return !!(this.visible && this.alpha > 0 && this.scaleX != 0 && this.scaleY != 0);
    };

    p.layout = function(area) {
        this.width = area.width;
        this.height = area.height;
    }

    /**
    * Draws the ProgressBar into the specified context ignoring its visible, 
    * alpha, shadow, and transform. Returns true if the draw was handled 
    * (useful for overriding functionality).
    *
    * @method draw
    * @param {CanvasRenderingContext2D} ctx The canvas 2D context object to 
    *                                   draw into.
    * @param {Boolean} [ignoreCache=false] Indicates whether the draw operation
    *                                      should ignore any current cache. For
    *                                      example, used for drawing the cache
    *                                      (to prevent it from simply drawing 
    *                                      an existing cache back into itself).
    * @protected
    **/
    p.draw = function(ctx, ignoreCache) {
        if (this.DisplayObject_draw(ctx, ignoreCache)) { return true; }

        var x = 0;
        var y = 0;
        var w = this.width;
        var h = this.height;
        var value_w = creatine.clip(w*(this.value-this.min)/(this.max-this.min), 0, w);
        var value_h = h;
        var gline = [w, 0];

        if (this.direction === creatine.TOP_TO_BOTTOM) {
            var gline = [0, w];

            var w_ = w;
            w = h;
            h = w_;

            w_ = value_w;
            value_w = value_h;
            value_h = w_;
        } 
        else if (this.direction === creatine.BOTTOM_TO_TOP) {
            var gline = [0, -w];

            var w_ = w;
            w = h;
            h = -w_;

            w_ = value_w;
            value_w = value_h;
            value_h = -w_;
        }
        else if (this.direction === creatine.RIGHT_TO_LEFT) {
            var gline = [-w, 0];
            w = -w;
            value_w = -value_w;
        }

        this.graphics.clear();
        if (this.backgroundColor) {
            this.graphics.beginFill(this.backgroundColor);
            this.graphics.drawRect(x, y, w, h);
        }

        if (this.type === 'color') {
            this.graphics.beginFill(this.fillColor);
            this.graphics.drawRect(x, y, value_w, value_h);
        }
        else if (this.type === 'gradient') {
            var ratios = [];
            for (var i=0; i<this.gradientColors.length; i++) {
                ratios.push(i/(this.gradientColors.length-1));
            }

            this.graphics.beginLinearGradientFill(
                this.gradientColors,
                ratios,
                0, 0, gline[0], gline[1]
            );
            this.graphics.drawRect(x, y, value_w, value_h);
        }
        else if (this.type === 'image') {
            this.graphics.beginBitmapFill(this.image);
            this.graphics.drawRect(x, y, value_w, value_h);
        }


        this.graphics.draw(ctx);
        return true;
    }

    creatine.ProgressBar = createjs.promote(ProgressBar, "Shape");
}());
/*
* FlexBitmap
*
* Copyright (c) 2014 Renato de Pontes Pereira.
*
* Permission is hereby granted, free of charge, to any person obtaining a copy 
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell 
* copies of the Software, and to permit persons to whom the Software is 
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/

/**
 * @module legacy
 **/

// namespace:
this.creatine = this.creatine || {};

(function() {
    "use strict";

    /**
     * FlexBitmap extends the createjs.Bitmap and adds the layout function to 
     * it, thus, FlexBitmap can resize itself to best fit its position and area
     * in a layout manager, such as the BoxSizer and the GridSizer.
     *
     * @class FlexBitmap
     * @extends createjs.Bitmap
     * @constructor
     * @param {Image|HTMLCanvasElement|HTMLVideoElement|String} imageOrUri The 
     *        source object or URI to an image to display. This can be either 
     *        an Image, Canvas, or Video object, or a string URI to an image 
     *        file to load and use. If it is a URI, a new Image object will be 
     *        constructed and assigned to the .image property.
     * @param {boolean} scaleMode creatine.NOSCALE The scale mode.
    **/
    var FlexBitmap = function(imageOrUri, scaleMode) {
        this.Bitmap_constructor(imageOrUri);

        /**
         * Indicates the scaling mode of the image:
         * 
         * <ul>
         *     <li><code>creatine.STRETCH</code>: to fill the available area 
         *         ignoring the aspect ratio.</li>
         *     <li><code>creatine.FIT</code>: to fill the available area without 
         *         overflow and keeping the aspect ratio.</li>
         *     <li><code>creatine.FILL</code>: to fill the available area with 
         *         overflow and keeping the aspect ratio.</li>
         *     <li><code>creatine.NOSCALE</code>: to keep the original size.
         *     </li>
         * </ul>
         *
         * @property scaleMode
         * @type {constant}
        **/
        this.scaleMode = scaleMode || creatine.NOSCALE;
    }
    var p = createjs.extend(FlexBitmap, createjs.Bitmap);

    /**
     * Resize this this image to fit the area.
     * 
     * @method layout 
     * @param {createjs.Rectangle} area A rectangle containing the usable area
     *                             of the bitmap. 
    **/
    p.layout = function(area) {
        var width = this.image.width;
        var height = this.image.height;

        var scale_x = 1;
        var scale_y = 1;

        if (this.scaleMode === creatine.FIT) {
            scale_x = scale_y = Math.min(
                (area.height/height), 
                (area.width /width)
            );
        } else if (this.scaleMode === creatine.FILL) {
            scale_x = scale_y = Math.max(
                (area.height/height), 
                (area.width /width)
            );
        } else if (this.scaleMode === creatine.STRETCH) {
            scale_x = (area.width /width);
            scale_y = area.height/height;
        } 

        this.scaleX = scale_x;
        this.scaleY = scale_y;
    }

    /**
     * Returns a rectangle representing this object's bounds after the resize.
     *
     * @method getBounds
     * @protected
    **/
    p.getBounds = function() {
        var w = this.image.width*this.scaleX;
        var h = this.image.height*this.scaleY;
        return this._rectangle.setValues(0, 0, w, h);
    }

    creatine.FlexBitmap = createjs.promote(FlexBitmap, "Bitmap");
}());

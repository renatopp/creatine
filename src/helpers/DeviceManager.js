/**
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

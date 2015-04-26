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

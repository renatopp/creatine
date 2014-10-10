/*
* Display
*
* Code here is based on phaser Display and ScaleManager classes.
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
 * @module Creatine
 **/

// namespace:
this.creatine = this.creatine || {};

(function() {
    "use strict";

/**
 * The Display class handles manual and automatic canvas scaling, fullscreen 
 * and orientation changes, and canvas properties.
 *
 * @class Display
 * @param {HTMLCanvasElement} canvas A HTML canvas object.
 * @constructor
**/
var Display = function(canvas) {
    this.initialize(canvas); 
}
var p = Display.prototype = new createjs.EventDispatcher();
    
    /**
     * The canvas element.
     *
     * @property canvas
     * @type {HTMLCanvasElement}
     * @private
    **/
    p.canvas = null;

    /**
     * The current canvas width.
     *
     * @property width
     * @type {Number}
     * @readonly
    **/
    p.width = null;

    /**
     * The current canvas height.
     *
     * @property height
     * @type {Number}
     * @readonly
    **/
    p.height = null;

    /**
     * The original canvas width.
     *
     * @property sourceWidth
     * @type {Number}
     * @readonly
    **/
    p.sourceWidth = null;

    /**
     * The original canvas height.
     *
     * @property sourceHeight
     * @type {Number}
     * @readonly
    **/
    p.sourceHeight = null;

    /**
     * The minimum width of the canvas, used when canvas is resized.
     *
     * @property minWidth
     * @type {Number}
     * @readonly
    **/
    p.minWidth = null;

    /**
     * The minimum height of the canvas, used when canvas is resized.
     *
     * @property minHeight
     * @type {Number}
     * @readonly
    **/
    p.minHeight = null;

    /**
     * The maximum width of the canvas, used when canvas is resized.
     *
     * @property maxWidth
     * @type {Number}
     * @readonly
    **/
    p.maxWidth = null;

    /**
     * The maximum height of the canvas, used when canvas is resized.
     *
     * @property maxHeight
     * @type {Number}
     * @readonly
    **/
    p.maxHeight = null;

    /**
     * The scale mode of the canvas. Set this to use the automatic resizing. 
     * Accepted modes are:
     *
     * <ul>
     *     <li><code>creatine.FIT</code>: scale the canvas to fit the available
     *         space, without exceeding it and respecting the aspect ratio.
     *     </li>
     *     <li><code>creatine.STRETCH</code>: scale the canvas to fit the 
     *         available space, without exceeding it but does not respect the 
     *         aspect ratio.
     *     </li>
     *     <li><code>creatine.NOSCALE</code>: (default) keeps the original 
     *         size of the canvas.
     *     </li>
     * </ul>
     *
     * @property scaleMode
     * @type {Constant}
    **/
    p.scaleMode = null;

    /**
     * The orientation of the <strong>window</strong>.
     *
     * @property orientation
     * @type {Number}
     * @readonly
    **/
    p.orientation = null;

    /**
     * If <code>true</code>, the canvas will be resized using the CSS style.
     *
     * @property scaleUsingCSS
     * @type {Boolean}
    **/
    p.scaleUsingCSS = false;

    /**
     * Same as <code>scaleMode</code> but for fullscreen mode.
     *
     * @property fullscreenScaleMode
     * @type {Constant}
    **/
    p.fullscreenScaleMode = null;

    /**
     * The command to call the fullscreen.
     *
     * @property _fullscreenRequest
     * @type {String}
     * @private
    **/
    p._fullscreenRequest = null;

    /**
     * The last width before entering on fullscreen mode.
     *
     * @property _width
     * @type {Number}
     * @private
    **/
    p._width = null;

    /**
     * The last height before entering on fullscreen mode.
     *
     * @property _height
     * @type {Number}
     * @private
    **/
    p._height = null;
    

    p.EventDispatcher_initialize = p.initialize;

    /**
     * Initialization method.
     * 
     * @method initialize
     * @param {HTMLCanvasElement} canvas The HTML canvas element.
     * @protected
    **/
    p.initialize = function(canvas) {
        this.EventDispatcher_initialize();
        
        this.canvas              = canvas;
        this.width               = canvas.width;
        this.height              = canvas.height;
        this.sourceWidth         = canvas.width;
        this.sourceHeight        = canvas.height;
        this.scaleMode           = creatine.NOSCALE;
        this.orientation         = 0;
        this.scaleUsingCSS       = false;
        this.fullscreenScaleMode = creatine.FIT;

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
     * Refresh the display, scaling the canvas if necessary.
     * 
     * @method refresh
    **/
    p.refresh = function() {
        var mode = this.scaleMode;
        if (this.isFullscreen()) {
            mode = this.fullscreenScaleMode;
        }

        if (mode === creatine.STRETCH) {
            this.resizeStretch();
        } else if (mode === creatine.FIT) {
            this.resizeFit();
        }
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
    //                                RESIZE
    // ========================================================================
    /**
     * Perform the resize, using CSS if enabled.
     *
     * @method _setSize
     * @param {Number} width The target width.
     * @param {Number} height The target height.
     * @private
    **/
    p._setSize = function(width, height) {
        this.width = width;
        this.height = height;

        if (this.scaleUsingCSS) {
            this.canvas.style.width = width + 'px';
            this.canvas.style.height = height + 'px';
        } else {
            this.canvas.width = width;
            this.canvas.height = height;
        }
    }

    /**
     * Clip the width using the minWidth and maxWidth information.
     *
     * @method _clipWidth
     * @param {Number} width The target width.
     * @return {Number} The clipped width.
     * @private
    **/
    p._clipWidth = function(width) {
        if (this.minWidth && this.minWidth < width) {
            width = this.minWidth;
        }
        if (this.maxWidth && this.maxWidth > width) {
            width = this.maxWidth;
        }

        return width;
    }

    /**
     * Clip the height using the minWidth and maxWidth information.
     *
     * @method _clipHeight
     * @param {Number} height The target height.
     * @return {Number} The clipped height.
     * @private
    **/
    p._clipHeight = function(height) {
        if (this.minHeight && this.minHeight < height) {
            height = this.minHeight;
        }
        if (this.maxHeight && this.maxHeight > height) { 
            height = this.maxHeight;
        }

        return height;
    }

    /**
     * Resize the canvas to a custom size. This method override the original 
     * size.
     *
     * @method resizeCustom
     * @param {Number} width The target width.
     * @param {Number} height The target height.
    **/
    p.resizeCustom = function(width, height) {
        this.sourceHeight = height;
        this.sourceWidth = width;

        this._setSize(width, height);
    }

    /**
     * Stretch the canvas to fit the window, without respect the aspect ratio.
     *
     * @method resizeStretch
    **/
    p.resizeStretch = function() {
        var width = this._clipWidth(window.innerWidth);
        var height = this._clipHeight(window.innerHeight);

        this._setSize(width, height);
    }

    /**
     * Fit the canvas to the window size, respecting the aspect ratio.
     *
     * @method resizeFit
    **/
    p.resizeFit = function() {
        var multiplier = Math.min(
            (this._clipHeight(window.innerHeight)/this.sourceHeight), 
            (this._clipWidth(window.innerWidth)/this.sourceWidth)
        );

        var width = Math.round(this.sourceWidth * multiplier);
        var height = Math.round(this.sourceHeight * multiplier);

        this._setSize(width, height);
    }

    /**
     * Revert the canvas to its original size
     *
     * @method resizeOriginal
    **/
    p.resizeOriginal = function() {
        width = this.sourceWidth;
        height = this.sourceHeight;
        this._setSize(width, height);
    }


    // ========================================================================
    //                             ORIENTATION
    // ========================================================================
    /**
     * Returns true if the browser dimensions match a portrait display.
     * 
     * @method isPortrait
     * @return {Boolean}
    **/
    p.isPortrait = function() {
        return this.orientation === 0 || this.orientation == 180;
    }

    /**
     * Returns true if the browser dimensions match a landscape display.
     * 
     * @method isLandscape
     * @return {Boolean}
    **/
    p.isLandscape = function() {
        return this.orientation === 90 || this.orientation === -90;
    }

    // ========================================================================
    //                              FULLSCREEN
    // ========================================================================
    /**
     * Returns true if the browser is in full screen mode, otherwise false.
     * 
     * @method isFullScreen
     * @return {Boolean}
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
     *
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
        if (this.scaleMode !== creatine.NOSCALE) {
            this.refresh();
        }

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
     *
     * @method _onFullscreen
     * @private
    **/
    p._onFullscreen = function(event) {

        if (this.isFullscreen()) {
            this.refresh();
            
            this.dispatchEvent('enterfullscreen');
        } else {
            this.width = this._width;
            this.height = this._height;
            this.canvas.width = this._width;
            this.canvas.height = this._height;

            this.refresh();
            this.dispatchEvent('exitfullscreen');
        }
    }

creatine.Display = Display;
}());

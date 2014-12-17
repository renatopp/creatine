/*
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
* Creatine is a library that powers up the CreateJS suite! 
*
* Focusing on Game Development, creatine adds several new features such as:
* 
* <ul>
*   <li>Scene Management;</li>
*   <li>Scene Transitions;</li>
*   <li>Layout Management;</li>
*   <li>Canvas Resizing and other Display options;</li>
*   <li>Device Detection;</li>
*   <li>Other Visual Components, such as Flexible Bitmaps and Progress Bars</li>
* </ul>
* 
* Feel free to use, modify, improve, make additions and suggestions.
*
* @module Creatine
* @main Creatine
*/
this.creatine = this.creatine || {};

(function() {
"use strict";

// injected by build process
creatine.version = /*version*/"0.2.0dev";
creatine.buildDate = /*date*/"Wed, 17 Dec 2014 02:42:29 GMT";

// Direction and Anchor constants
creatine.LEFT          = 1;
creatine.RIGHT         = 2;
creatine.TOP           = 3;
creatine.BOTTOM        = 4;
creatine.TOP_LEFT      = 5;
creatine.TOP_RIGHT     = 6;
creatine.CENTER        = 7;
creatine.BOTTOM_LEFT   = 8;
creatine.BOTTOM_RIGHT  = 9;

// Axis constants
creatine.HORIZONTAL    = 10;
creatine.VERTICAL      = 11;

// Filling constants
creatine.LEFT_TO_RIGHT = 12;
creatine.RIGHT_TO_LEFT = 13;
creatine.TOP_TO_BOTTOM = 14;
creatine.BOTTOM_TO_TOP = 15;

// Resizing constants
creatine.STRETCH       = 16;
creatine.FIT           = 17;
creatine.FILL          = 18;
creatine.NOSCALE       = 19;

})();/*
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
*/
this.creatine = this.creatine || {};

(function() {
"use strict";

creatine.merge = function() {
    var obj, name, copy,
        target = arguments[0] || {},
        i = 1,
        length = arguments.length;

    for (; i < length; i++) {
        if ((obj = arguments[i]) != null) {
            for (name in obj) {
                copy = obj[name];

                if (target === copy) {
                    continue;
                }
                else if (copy !== undefined) {
                    target[name] = copy;
                }
            }
        }
    }

    return target;
};

creatine.clip = function(v, min, max) {
    return Math.max(Math.min(v, max), min);
}

})();/*
* Device
*
* Code here is based on phaser Device class and System.js.
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
 * Class used to detect the device support and specification.
 * 
 * @class Device
 * @param {HTMLCanvasElement} canvas A HTML canvas object.
 * @constructor
**/
var Device = function(canvas) {
    this.initialize(canvas); 
}
var p = Device.prototype;
    
    /**
     * The canvas element.
     *
     * @property canvas
     * @type {HTMLCanvasElement}
     * @private
    **/
    p._canvas         = null;
    

    // ========================================================================
    //                                 PLATFORM
    // ========================================================================
    /**
     * Is running desktop?
     *
     * @property desktop
     * @type Boolean
     * @readonly
    **/
    p.desktop        = false;
    

    // ========================================================================
    //                                    OS
    // ========================================================================
    /**
     * iOS Is running on iOS?
     *
     * @property iOS
     * @type Boolean
     * @readonly
    **/
    p.iOS            = false;

    /**
     * Is running on android?
     *
     * @property android
     * @type Boolean
     * @readonly
    **/
    p.android        = false;

    /**
     * Is running on chromeOS?
     *
     * @property chromeOS
     * @type Boolean
     * @readonly
    **/
    p.chromeOS       = false;

    /**
     * Is running on linux?
     *
     * @property linux
     * @type Boolean
     * @readonly
    **/
    p.linux          = false;

    /**
     * Is running on macOS?
     *
     * @property macOS
     * @type Boolean
     * @readonly
    **/
    p.macOS          = false;

    /**
     * Is running on windows?
     *
     * @property windows
     * @type Boolean
     * @readonly
    **/
    p.windows        = false;

    /**
     * Is running on a Windows Phone?
     *
     * @property windowsPhone
     * @type Boolean
     * @readonly
    **/
    p.windowsPhone   = false;
    

    // ========================================================================
    //                                 FEATURES
    // ========================================================================
    /**
     * Is canvas available?
     *
     * @property canvas
     * @type Boolean
     * @readonly
    **/
    p.canvas         = false;

    /**
     * Is file available?
     *
     * @property file
     * @type Boolean
     * @readonly
    **/
    p.file           = false;

    /**
     * Is fileSystem available?
     *
     * @property fileSystem
     * @type Boolean
     * @readonly
    **/
    p.fileSystem     = false;

    /**
     * Is localStorage available?
     *
     * @property localStorage
     * @type Boolean
     * @readonly
    **/
    p.localStorage   = false;

    /**
     * Is webGL available?
     *
     * @property webGL
     * @type Boolean
     * @readonly
    **/
    p.webGL          = false;

    /**
     * Is worker available?
     *
     * @property worker
     * @type Boolean
     * @readonly
    **/
    p.worker         = false;

    /**
     * Is touch available?
     *
     * @property touch
     * @type Boolean
     * @readonly
    **/
    p.touch          = false;

    /**
     * Is mspointer available?
     *
     * @property mspointer
     * @type Boolean
     * @readonly
    **/
    p.mspointer      = false;

    /**
     * Is css3D available?
     *
     * @property css3D
     * @type Boolean
     * @readonly
    **/
    p.css3D          = false;

    /**
     * Is pointerLock available?
     *
     * @property pointerLock
     * @type Boolean
     * @readonly
    **/
    p.pointerLock    = false;

    /**
     * Is typedArray available?
     *
     * @property typedArray
     * @type Boolean
     * @readonly
    **/
    p.typedArray     = false;

    /**
     * Is vibration available?
     *
     * @property vibration
     * @type Boolean
     * @readonly
    **/
    p.vibration      = false;

    /**
     * Is getUserMedia available?
     *
     * @property getUserMedia
     * @type Boolean
     * @readonly
    **/
    p.getUserMedia   = false;

    /**
     * Is quirksMode available?
     *
     * @property quirksMode
     * @type Boolean
     * @readonly
    **/
    p.quirksMode     = false;
    
    // ========================================================================
    //                                  BROWSER
    // ========================================================================
    /**
     * Is the game running under Ejecta?
     *
     * @property ejecta
     * @type Boolean
     * @readonly
    **/
    p.ejecta         = false;

    /**
     * Is the game running under CocoonJS?
     *
     * @property cocoonJS
     * @type Boolean
     * @readonly
    **/
    p.cocoonJS       = false;

    /**
     * Set to true if running as a WebApp, i.e. within a WebView.
     *
     * @property webApp
     * @type Boolean
     * @readonly
    **/
    p.webApp         = false;

    /**
     * Set to true if running in Arora.
     *
     * @property arora
     * @type Boolean
     * @readonly
    **/
    p.arora          = false;

    /**
     * Set to true if running in Chrome.
     *
     * @property chrome
     * @type Boolean
     * @readonly
    **/
    p.chrome         = false;

    /**
     * Set to true if running in Epiphany.
     *
     * @property epiphany
     * @type Boolean
     * @readonly
    **/
    p.epiphany       = false;

    /**
     * Set to true if running in Firefox.
     *
     * @property firefox
     * @type Boolean
     * @readonly
    **/
    p.firefox        = false;

    /**
     * Set to true if running in Internet Explorer.
     *
     * @property ie
     * @type Boolean
     * @readonly
    **/
    p.ie             = false;

    /**
     * If running in Internet Explorer this will contain the major version 
     * number. Beyond IE10 you should use Device.trident and 
     * Device.tridentVersion.
     *
     * @property ieVersion
     * @type Boolean
     * @readonly
    **/
    p.ieVersion      = 0;

    /**
     * Set to true if running a Trident version of Internet Explorer (IE11+).
     *
     * @property trident
     * @type Boolean
     * @readonly
    **/
    p.trident        = false;

    /**
     * If running in Internet Explorer 11 this will contain the major version
     * number.
     *
     * @property tridentVersion
     * @type Boolean
     * @readonly
    **/
    p.tridentVersion = 0;

    /**
     * Set to true if running in Mobile Safari.
     *
     * @property mobileSafari
     * @type Boolean
     * @readonly
    **/
    p.mobileSafari   = false;

    /**
     * Set to true if running in Midori.
     *
     * @property midori
     * @type Boolean
     * @readonly
    **/
    p.midori         = false;

    /**
     * Set to true if running in Opera.
     *
     * @property opera
     * @type Boolean
     * @readonly
    **/
    p.opera          = false;

    /**
     * Set to true if running in Safari.
     *
     * @property safari
     * @type Boolean
     * @readonly
    **/
    p.safari         = false;

    /**
     * Set to true if running in the Silk browser (as used on the Amazon 
     * Kindle).
     *
     * @property silk
     * @type Boolean
     * @readonly
    **/
    p.silk           = false;
    
    // ========================================================================
    //                                   AUDIO
    // ========================================================================
    /**
     * Are Audio tags available?
     *
     * @property audioData
     * @type Boolean
     * @readonly
    **/
    p.audioData      = false;

    /**
     * Is the WebAudio API available?
     *
     * @property webAudio
     * @type Boolean
     * @readonly
    **/
    p.webAudio       = false;

    /**
     * Can this device play ogg files?
     *
     * @property ogg
     * @type Boolean
     * @readonly
    **/
    p.ogg            = false;

    /**
     * Can this device play opus files?
     *
     * @property opus
     * @type Boolean
     * @readonly
    **/
    p.opus           = false;

    /**
     * Can this device play mp3 files?
     *
     * @property mp3
     * @type Boolean
     * @readonly
    **/
    p.mp3            = false;

    /**
     * Can this device play wav files?
     *
     * @property wav
     * @type Boolean
     * @readonly
    **/
    p.wav            = false;

    /**
     * Can this device play m4a files?
     *
     * @property m4a
     * @type Boolean
     * @readonly
    **/
    p.m4a            = false;

    /**
     * Can this device play webm files?
     *
     * @property webm
     * @type Boolean
     * @readonly
    **/
    p.webm           = false;
    
    // ========================================================================
    //                                   DEVICE
    // ========================================================================
    /**
     * Is running on iPhone?
     *
     * @property iPhone
     * @type Boolean
     * @readonly
    **/
    p.iPhone         = false;

    /**
     * Is running on iPhone 4?
     *
     * @property iPhone4
     * @type Boolean
     * @readonly
    **/
    p.iPhone4        = false;

    /**
     * Is running on iPad?
     *
     * @property iPhone4
     * @type Boolean
     * @readonly
    **/
    p.iPad           = false;

    /**
     * PixelRatio of the host device?
     *
     * @property pixelRatio
     * @type Boolean
     * @readonly
    **/
    p.pixelRatio     = 0;

    /**
     * Is the device big or little endian? (only detected if the browser 
     * supports TypedArrays).
     *
     * @property littleEndian
     * @type Boolean
     * @readonly
    **/
    p.littleEndian   = false;

    /**
     * Does the browser support the Full Screen API?
     * 
     * @property fullscreen
     * @type Boolean
     * @readonly
    **/
    p.fullscreen     = false;

    /**
     * Initialization method.
     * 
     * @method initialize
     * @param {HTMLCanvasElement} canvas The HTML canvas element.
     * @protected
    **/
    p.initialize = function(canvas) {
        this._canvas = canvas;

        this._checkAudio();
        this._checkBrowser();
        this._checkCSS3D();
        this._checkDevice();
        this._checkFeatures();
        this._checkOS();
        this._checkFullscreen();
    }

    /**
     * Check which OS is game running on.
     *
     * @method _checkOS
     * @private
    **/
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
     *
     * @method _checkFeatures
     * @private
    **/
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
     *
     * @method _checkFeatures
     * @private
    **/
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
     *
     * @method _checkAudio
     * @private
    **/
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
     *
     * @method _checkDevice
     * @private
    **/
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
     *
     * @method _checkCSS3D
     * @private
    **/
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
     *
     * @method _checkFullscreen
     * @private
    **/
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

creatine.Device = Device;
}());
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
     * The Display class handles manual and automatic canvas scaling, 
     * fullscreen and orientation changes, and canvas properties.
     *
     * @class Display
     * @param {HTMLCanvasElement} canvas A HTML canvas object.
     * @constructor
    **/
    var Display = function(canvas) {        
        /**
         * The canvas element.
         *
         * @property canvas
         * @type {HTMLCanvasElement}
         * @private
        **/
        this.canvas = null;

        /**
         * The current canvas width.
         *
         * @property width
         * @type {Number}
         * @readonly
        **/
        this.width = null;

        /**
         * The current canvas height.
         *
         * @property height
         * @type {Number}
         * @readonly
        **/
        this.height = null;

        /**
         * The original canvas width.
         *
         * @property sourceWidth
         * @type {Number}
         * @readonly
        **/
        this.sourceWidth = null;

        /**
         * The original canvas height.
         *
         * @property sourceHeight
         * @type {Number}
         * @readonly
        **/
        this.sourceHeight = null;

        /**
         * The minimum width of the canvas, used when canvas is resized.
         *
         * @property minWidth
         * @type {Number}
         * @readonly
        **/
        this.minWidth = null;

        /**
         * The minimum height of the canvas, used when canvas is resized.
         *
         * @property minHeight
         * @type {Number}
         * @readonly
        **/
        this.minHeight = null;

        /**
         * The maximum width of the canvas, used when canvas is resized.
         *
         * @property maxWidth
         * @type {Number}
         * @readonly
        **/
        this.maxWidth = null;

        /**
         * The maximum height of the canvas, used when canvas is resized.
         *
         * @property maxHeight
         * @type {Number}
         * @readonly
        **/
        this.maxHeight = null;

        /**
         * The scale mode of the canvas. Set this to use the automatic 
         * resizing. Accepted modes are:
         *
         * <ul>
         *     <li><code>creatine.FIT</code>: scale the canvas to fit the 
         *         available space, without exceeding it and respecting the 
         *         aspect ratio.</li>
         *     <li><code>creatine.STRETCH</code>: scale the canvas to fit the 
         *         available space, without exceeding it but does not respect 
         *         the aspect ratio.</li>
         *     <li><code>creatine.NOSCALE</code>: (default) keeps the original 
         *         size of the canvas.</li>
         * </ul>
         *
         * @property scaleMode
         * @type {Constant}
        **/
        this.scaleMode = null;

        /**
         * The orientation of the <strong>window</strong>.
         *
         * @property orientation
         * @type {Number}
         * @readonly
        **/
        this.orientation = null;

        /**
         * If <code>true</code>, the canvas will be resized using the CSS 
         * style.
         *
         * @property scaleUsingCSS
         * @type {Boolean}
        **/
        this.scaleUsingCSS = false;

        /**
         * Same as <code>scaleMode</code> but for fullscreen mode.
         *
         * @property fullscreenScaleMode
         * @type {Constant}
        **/
        this.fullscreenScaleMode = null;

        /**
         * The command to call the fullscreen.
         *
         * @property _fullscreenRequest
         * @type {String}
         * @private
        **/
        this._fullscreenRequest = null;

        /**
         * The last width before entering on fullscreen mode.
         *
         * @property _width
         * @type {Number}
         * @private
        **/
        this._width = null;

        /**
         * The last height before entering on fullscreen mode.
         *
         * @property _height
         * @type {Number}
         * @private
        **/
        this._height = null;
        
        this._initialize(canvas); 
    }
    var p = createjs.extend(Display, createjs.EventDispatcher);

    /**
     * Initialization method.
     * 
     * @method initialize
     * @param {HTMLCanvasElement} canvas The HTML canvas element.
     * @private
    **/
    p._initialize = function(canvas) {
        this.EventDispatcher_constructor();
        
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
        var width = this.sourceWidth;
        var height = this.sourceHeight;
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

    creatine.Display = createjs.promote(Display, "EventDispatcher");
}());
/*
* Entity
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
     * Helper to use localStorage. 
     * 
     * The localStorage is a HTML5 feature which allows persistent local 
     * storage (JS can save information in the browser). But, it is limited to
     * string values only. This class helps you to store and retrieve any kind
     * of data inside a local storage (by converting these values from/to 
     * JSON).
     *
     * <h4>Example</h4>
     *
     *     var storage = new creatine.Storage('my-namespace');
     *     storage.set('boolean-value', true);
     *     storage.set('string-value', 'lalala');
     *     storage.set('integer-value', 23);
     *     storage.set('object-value', {a:3});
     *
     *     console.log(storage.get('boolean-value')); // true
     *     console.log(storage.get('string-value'));  // 'lalala'
     *     console.log(storage.get('integer-value')); // 23
     *     console.log(storage.get('object-value'));  // {a:3}
     *
     * @class Storage
     * @param {String} namespace The prefix to all keys in localStorage.
     * @constructor
    **/
    var Storage = function(namespace) {
        /**
         * Holds the localStorage or a simple object.
         *
         * @property _memory
         * @type {Object}
         * @readonly
         * @private
        **/
        this._memory = localStorage;

        /**
         * Namespace, used as a prefixed to all keys in localStorage.
         *
         * @property namespace
         * @type {String}
         * @readonly
        **/
        this.namespace = (namespace || '')+'.';
        
        // verify if browser supports the localStorage feature
        try {
            !!localStorage.getItem;
        } catch (error) {
            this._memory = {};
        }
    }
    var p = Storage.prototype;

    /**
     * Set a value for a given key in storage.
     *
     * @method set
     * @param {String} key The key identifier.
     * @param {String} value The value.
    **/
    p.set = function(key, value) {
        try {
            value = JSON.stringify(value);
        } catch (e) {}

        this._memory[this.namespace+key] = value;
    }

    /**
     * Get a value for a given key in storage.
     * 
     * @method get
     * @param {String} key The key.
     * @return {Object} the stored value.
     */
    p.get = function(key) {
        var value = this._memory[this.namespace+key];
        try {
            value = JSON.parse(value);
        } catch (e) {}

        return value;
    }

    /**
     * Remove a key from storage.
     * 
     * @method remove
     * @param {String} key The key.
     */
    p.remove = function(key) {
        delete this._memory[this.namespace+key];
    }

    creatine.Storage = Storage;
})();/*
* Director
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
     * Director is the class that controls all the game scenes. This involves 
     * storing the current scene that is running, receiving the next scene 
     * which will replace the current one, and applying the transition effect 
     * between the old and the new scenes. When the current scene is replaced 
     * by a new one, the Director will automatically remove the old scene from 
     * stage and add the new scene to it.
     * 
     * Only a single scene can be active at a time, however, Director can 
     * handle a scene stack, allowing the addition of a new scene and keeping 
     * the old one in the stack. This feature is specially useful to overlap 
     * scenes and creating, for example, a semi-transparent pause scene.
     * 
     * It is possible to specify a transition effect in any action of adding or
     * removing scenes, making possible to slide a new scene to the screen or 
     * to make the old scene fade away. To know more about transitions, consult
     * the module <code>creatine.transitions</code>.
     *
     * <h4>Example</h4>
     * 
     *     // Create the Director
     *     var director = new creatine.Director(stage);
     * 
     *     // Adds the first scene
     *     director.push(new MyCustomScene());
     * 
     *     // Replaces the current scene
     *     director.replace(new OtherCustomScene());
     * 
     * @class Director
     * @constructor
     * @param {createjs.Stage} stage A <code>createjs.Stage</code> object.
    **/
    var Director = function(stage) {   
        /**
         * The <code>createjs.Stage</code> instance.
         *
         * @property stage
         * @type {createjs.Stage}
         * @private
        **/
        this.stage = stage;

        /**
         * The active scene. This variable can be viewed as the top of the 
         * scene stack.
         *
         * @property scene
         * @type {Scene}
         * @readonly
        **/
        this.scene = null;

        /**
         * The next scene which will replace the actual one. This variable is 
         * required to store the next scene until the transition effect is 
         * done.
         *
         * @property nextScene
         * @type {Scene}
         * @readonly
        **/
        this.nextScene = null;

        /**
         * The stack of scenes. This list only stores the inactive scenes, use 
         * the {{#crossLink "Director/scene:property"}}{{/crossLink}} to access
         * the active scene.
         *
         * @property sceneStack
         * @type {list}
         * @readonly
        **/
        this.sceneStack = [];

        /**
         * Indicates if a transition effect is running or not.
         *
         * @property sceneStack
         * @type boolean
         * @readonly
        **/
        this.inTransition = false;
    }
    var p = Director.prototype;

    /**
     * Pauses the current scene and send it to the stack. The new scene will 
     * replace the current one.
     * 
     * If transition is provided, the transition effect will be applied before
     * replacing scenes.
     * 
     * @method push
     * @param {Scene} scene The new scene.
     * @param {Transition} transition A transition effect.
    **/
    p.push = function(scene, transition) {
        if (this.scene) {
            this.scene.dispatchEvent('scenepause');
            this.sceneStack.push(this.scene);

            var index = this.stage.getChildIndex(this.scene);
            this.stage.addChildAt(scene, index+1)
        } else {
            this.stage.addChild(scene);
        }

        this.nextScene = scene;

        var _this = this;
        var setScene = function() {
            _this.scene = _this.nextScene;
            _this.nextScene = null;
            _this.inTransition = false;
            _this.scene.dispatchEvent('sceneenter');
        }

        if (transition) {
            this.inTransition = true;
            transition.run(this, this.scene||{}, this.nextScene, setScene);
        } else {
            setScene();
        }
    }

    /**
     * Removes the current scene and reactive the scene at the top of the 
     * stack.
     * 
     * If transition is provided, the transition effect will be applied before
     * replacing scenes.
     * 
     * @method pop
     * @param {Transition} transition A transition effect.
    **/
    p.pop = function(transition) {
        if (this.sceneStack.length == 0) return;

        var scene = this.sceneStack.pop();
        this.nextScene = scene;

        if (this.scene) {
            this.scene.dispatchEvent('scenepause');
        }

        var _this = this;
        var setScene = function() {
            _this.inTransition = false;
            if (_this.scene) {
                _this.scene.dispatchEvent('sceneexit');
                _this.stage.removeChild(_this.scene);
            }

            _this.scene = _this.nextScene;
            _this.scene.dispatchEvent('sceneresume');
            _this.nextScene = null;

        }

        if (transition) {
            this.inTransition = true;
            transition.run(this, this.scene||{}, this.nextScene, setScene);
        } else {
            setScene();
        }
    }

    /**
     * Replaces the current scene by a new one.
     * 
     * If transition is provided, the transition effect will be applied before
     * replacing scenes.
     * 
     * @method replace
     * @param {Scene} scene The new scene.
     * @param {Transition} transition A transition effect.
    **/
    p.replace = function(scene, transition) {
        if (this.scene) {
            this.scene.dispatchEvent('scenepause');
            var index = this.stage.getChildIndex(this.scene);
            this.stage.addChildAt(scene, index+1);
        } else {
            this.stage.addChild(scene);
        }

        this.nextScene = scene;

        var _this = this;
        var setScene = function() {
            _this.inTransition = false;
            if (_this.scene) {
                _this.scene.dispatchEvent('sceneexit');
                _this.stage.removeChild(_this.scene);
            }

            _this.scene = _this.nextScene;
            _this.scene.dispatchEvent('sceneenter');
            _this.nextScene = null;
        }

        if (transition) {
            this.inTransition = true;
            transition.run(this, this.scene||{}, this.nextScene, setScene);
        } else {
            setScene();
        }
    }

    /**
     * Swap the position of {{#crossLink "Director/scene:property"}}{{/crossLink}}
     * and {{#crossLink "Director/nextScene:property"}}{{/crossLink}} in the 
     * stage. This method is used in transitions to change the z-index of 
     * scenes.
     * 
     * @method swapScenes
     * @protected
    **/
    p.swapScenes = function() {
        this.stage.swapChildrenAt(
            this.stage.getChildIndex(this.scene),
            this.stage.getChildIndex(this.nextScene)
        );
    }

    /**
     * Removes all scenes from the stack, without transitions.
     * 
     * @method clearStack
    **/
    p.clearStack = function() {
        for (var i=0; i<this.sceneStack.length; i++) {
            this.sceneStack[i].dispatchEvent('sceneexit');
            this.stage.removeChild(this.sceneStack[i]);
        }
        this.sceneStack = [];
    }

    creatine.Director = Director;
}());
/*
* Scene
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
     * A Scene is a general container for display objects.
     * 
     * @class Scene
     * @constructor
     * @extends createjs.Container
    **/
    var Scene = function() {
        this.Container_constructor();
    }
    var p = createjs.extend(Scene, createjs.Container);

    /**
     * Dispatched when the scene is set as the active scene in Director.
     *
     * @event sceneenter
    **/

    /**
     * Dispatched when the scene is remove from Director.
     *
     * @event sceneexit
    **/
    
    /**
     * Dispatched when the scene is paused, i.e., when it is replaced as a 
     * active scene and placed in the Director stack.
     *
     * @event scenepause
    **/

    /**
     * Dispatched when the scene is resumed, i.e., when it is removed from the 
     * Director stack and set as the active scene.
     *
     * @event sceneresume
    **/

    creatine.Scene = createjs.promote(Scene, "Container");
}());
/*
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
 * @module Creatine
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
 * @module Creatine
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
    }

    creatine.GridSizer = GridSizer;
}());
/*
* Component
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
     * The Component object is a container of data to be included on entities. 
     * For example, a position component may store the <code>x</code> and 
     * <code>y</code> while a display component may store the image of the 
     * object. Components usually does not have methods, but it can be 
     * included.
     *
     * When inheriting the Component class you must set the name variable, 
     * preferably on prototype (such as in the example below). Setting this 
     * variable is obligatory and if not, entity will throw an error.
     * 
     * <h4>Example: Creating a component</h4>
     *
     *     var PositionComponent = function() {};
     *     PositionComponent.prototype = new creatine.Component();
     *     PositionComponent.prototype.name = 'position';
     *     PositionComponent.prototype.x = 0;
     *     PositionComponent.prototype.y = 0;
     *     
     *     var entity = new creatine.Entity();
     *     entity.addComponent(new PositionComponent());
     *
     *     
     * <h4>Example: Using a component</h4>
     *
     *     var position = entity.getComponent('position');
     *     position.x = 100;
     *     position.y = 150;
     *
     *
     * @class Component
     * @constructor
    **/
    var Component = function() {
        /**
         * The component name.
         *
         * @property name
         * @type {String}
        **/
        this.name = null;
    }

    creatine.Component = Component;
}());
/*
* Entity
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

    // Global entity counter, only accessed by the Entity class
    var _entity_count = 0;

    /**
     * Entity is a collection of Components, only consisting of an unique ID 
     * and a list of components.
     *
     * <h4>Example</h4>
     *
     *     var entity = new creatine.Entity();
     *     entity.addComponent(new MyComponent1());
     *     entity.addComponent(new MyComponent2());
     *
     * @class Entity
     * @constructor
    **/
    var Entity = function() {
        /**
         * The Entity ID.
         *
         * @property id
         * @type {String}
         * @readonly
        **/
        this.id = null;

        /**
         * The component list.
         *
         * @property components
         * @type {Object}
         * @private
        **/
        this.components = null;
        
        this._initialize();
    }
    var p = Entity.prototype;
    
    /**
     * Initialization.
     *
     * @method _initialize
     * @private
    **/
    p._initialize = function() {
        _entity_count++;

        this.id = (
            (new Date()).getTime().toString(16) + '-' +
            (Math.random()*100000000|0).toString(16) + '-' +
            _entity_count
        );
        this.components = {};
    }

    /**
     * Adds a new component to the entity. Notice that, if a component with the
     * same name is already included on the entity, the component will be 
     * overwritten.
     *
     * @method addComponent
     * @param {Object} object The component object (it must have a 
     *                 <code>name</code> variable).
    **/
    p.addComponent = function(component) {
        if (!component.name) {
            throw new Error('Component name must be a unique string. Make '+
                            'sure you have set the name variable into the '+
                            'component definition.');
        }

        this.components[component.name] = component;
        return this;
    }

    /**
     * Verifies if the entity contains a given component.
     *
     * @method hasComponent
     * @param {String} name The name of component.
     * @return {Boolean}
    **/
    p.hasComponent = function(name) {
        return this.components[name] !== undefined;
    }

    /**
     * Returns a component in the entity.
     *
     * @method getComponent
     * @param {String} name The name of component.
     * @return {creatine.Component}
    **/
    p.getComponent = function(name) {
        return this.components[name];
    }

    /**
     * Remove a given component from this entity.
     *
     * @method removeComponent
     * @param {String} name The name of component.
    **/
    p.removeComponent = function(name) {
        delete this.components[name];
        
        return this;
    }

creatine.Entity = Entity;
 
}());
/*
* System
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
     * Systems implement the game logic, such as collision detectition or
     * general physics control. Systems receive entities that are processed on 
     * the <code>process</code> method.
     *
     * <h4>Example</h4>
     *
     *     // Considering that you have implemented the DraggingSystem
     *     var system = new DraggingSystem();
     *     system.process(entityList);
     *     
     *
     * @class System
     * @constructor
    **/
    var System = function() {}
    var p = System.prototype;

    /**
     * Override this method in order to implemement the system logic.
     * 
     * @method process
    **/
    p.process = function(entities) {};

    creatine.System = System;
}());
/*
* TMXTileset
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
     * TMXTileset represents a Tileset in the TMX map.
     *
     * <h4>Data Format</h4>
     *
     * In relation to the tilesets properties, the data must be in the 
     * following format:
     * 
     *     var data = {
     *         'firstgid'    : [Integer], // mandatory
     *         'name'        : [String],  // mandatory
     *         'image'       : [String],  // mandatory
     *         'imagewidth'  : [Integer], // default to image.width
     *         'imageheight' : [Integer], // default to image.height
     *         'tilewidth'   : [Integer], // default to 32
     *         'tileheight'  : [Integer], // default to 32
     *         'spacing'     : [Integer], // default to 0
     *         'margin'      : [Integer], // default to 0
     *         'tileoffset'  : [Object],  // default to {x:0, y:0}
     *         'properties'  : [Object],
     *     }
     * 
     * Consult the official TMX description to known more:
     * https://github.com/bjorn/tiled/wiki/TMX-Map-Format
     *
     * @class TMXTileset
     * @param {Object} data The data object describing the tileset.
     * @constructor
    **/
    var TMXTileset = function(data) {
    
        /**
         * The first global tile ID of this tileset.
         *
         * @property firstgid
         * @type {Integer}
         * @readonly
        **/
        this.firstgid = null;

        /**
         * The name of this tileset.
         *
         * @property name
         * @type {String}
         * @readonly
        **/
        this.name = null;

        /**
         * The image width in pixels.
         *
         * @property width
         * @type {Integer}
         * @readonly
        **/
        this.width = null;

        /**
         * The image height in pixels.
         *
         * @property height
         * @type {Integer}
         * @readonly
        **/
        this.height = null;

        /**
         * The width of the tiles in this tileset.
         *
         * @property width
         * @type {Integer}
         * @readonly
        **/
        this.tileWidth = null;

        /**
         * The height of the tiles in this tileset.
         *
         * @property height
         * @type {Integer}
         * @readonly
        **/
        this.tileHeight = null;

        /**
         * The path to the image associated to this tilset.
         *
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
         *
         * @property spacing
         * @type {Integer}
         * @readonly
        **/
        this.spacing = null;

        /**
         * The margin of the image.
         *
         * @property spacing
         * @type {Integer}
         * @readonly
        **/
        this.margin = null;

        /**
         * An object with properties defined by user.
         *
         * @property properties
         * @type {Object}
         * @readonly
        **/
        this.properties = null;

        /**
         * An object with tile properties defined by user.
         *
         * @property properties
         * @type {Object}
         * @readonly
        **/
        this.tileProperties = null;

        /**
         * The spritesheet object loaded by this tileset.
         *
         * @property spritesheet
         * @type {createjs.SpriteSheet}
         * @readonly
        **/
        this.spritesheet = null;

        /**
         * Animation dict contained in the tileset.
         *
         * @property animations
         * @type {Object}
         * @readonly
        **/
        this.animations = null;

        this._initialize(data);
    }
    var p = TMXTileset.prototype;

    /**
     * Initialization method.
     * 
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
     * 
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

    creatine.TMXTileset = TMXTileset;
}());/*
* TMXTileLayer
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
     * TMXTileLayer represents an abstract TileLayer in the TMX map. Creatine 
     * actually use this as base class to <code>TMXOrthogonalTileLayer</code>,
     * <code>TMXIsometricTileLayer</code> and 
     * <code>TMXStaggeredTileLayer</code>. The difference among projections is 
     * performed at layer-level, making new projections and extensions of the
     * current ones a lot simpler to be created. This also allows you to use
     * multiple projections to the same map (unfortunately, this isn't 
     * supported by Tiled yet). 
     *
     * @class TMXTileLayer
     * @param {creatine.TMXMap} map The map object.
     * @param {Object} data The data object (from tmx format).
     * @extends createjs.Container
     * @constructor
    **/
    var TMXTileLayer = function(map, data) {
        
        /**
         * Reference to the TMX map.
         *
         * @property map
         * @type {creatine.TMXMap}
         * @readonly
        **/
        this.map = null;

        /**
         * The name of the layer.
         *
         * @property name
         * @type {String}
         * @readonly
        **/
        this.name = null;

        /**
         * The list of tile ids in the layer.
         *
         * @property data
         * @type {Array}
         * @readonly
        **/
        this.data = null;

        /**
         * The amount of tiles in x axis.
         *
         * @property width
         * @type {Integer}
         * @readonly
        **/
        this.width = null;

        /**
         * The amount of tiles in y axis.
         *
         * @property y
         * @type {Integer}
         * @readonly
        **/
        this.height = null;

        this._initialize(map, data);
    }
    var p = createjs.extend(TMXTileLayer, createjs.Container);

    /**
     * Initialization method.
     * 
     * @method _initialize
     * @param {creatine.TMXMap} map The map object.
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
        throw new Error('TMXTileLayer._createTiles not implemented.');
    }

    /**
     * Return the tile value, given a coord of a tile. 
     *
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
     *
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
        throw new Error('TMXTileLayer.getCoords not implemented.');
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
        throw new Error('TMXTileLayer.getPosition not implemented.');
    }

    creatine.TMXTileLayer = createjs.promote(TMXTileLayer, "Container");
}());/*
* TMXOrthogonalTileLayer
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
     * TMXOrthogonalTileLayer represents a TileLayer in the TMX map.
     *
     * @class TMXOrthogonalTileLayer
     * @param {creatine.TMXMap} map The map object.
     * @param {Object} data The data object (from tmx format).
     * @extends creatine.TMXTileLayer
     * @constructor
    **/
    var TMXOrthogonalTileLayer = function(map, data) {
        this.TMXTileLayer_constructor(map, data);
    }
    var p = createjs.extend(TMXOrthogonalTileLayer, creatine.TMXTileLayer);

    /**
     * Create the tiles. Override this method on the child class.
     * 
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
     *
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

    creatine.TMXOrthogonalTileLayer = createjs.promote(TMXOrthogonalTileLayer, "TMXTileLayer");
}());/*
* TMXIsometricTileLayer
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
     * TMXIsometricTileLayer represents a TileLayer in the TMX map.
     *
     * @class TMXIsometricTileLayer
     * @param {creatine.TMXMap} map The map object.
     * @param {Object} data The data object (from tmx format).
     * @extends creatine.TMXTileLayer
     * @constructor
    **/
    var TMXIsometricTileLayer = function(map, data) {
        this.TMXTileLayer_constructor(map, data);
    }
    var p = createjs.extend(TMXIsometricTileLayer, creatine.TMXTileLayer);

    /**
     * Create the tiles. Override this method on the child class.
     * 
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
    creatine.TMXIsometricTileLayer = createjs.promote(TMXIsometricTileLayer, "TMXTileLayer");
}());/*
* TMXStaggeredTileLayer
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
     * TMXStaggeredTileLayer represents a TileLayer in the TMX map.
     *
     * @class TMXStaggeredTileLayer
     * @param {creatine.TMXMap} map The map object.
     * @param {Object} data The data object (from tmx format).
     * @extends creatine.TMXTileLayer
     * @constructor
    **/
    var TMXStaggeredTileLayer = function(map, data) {
        this.TMXTileLayer_constructor(map, data);
    }
    var p = createjs.extend(TMXStaggeredTileLayer, creatine.TMXTileLayer);

    /**
     * Create the tiles. Override this method on the child class.
     * 
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
        // for (var y=startY; y!=2; y+=dirY) {
            // for (var x=startX; x!=2; x+=dirX) {
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
    creatine.TMXStaggeredTileLayer = createjs.promote(TMXStaggeredTileLayer, "TMXTileLayer");
}());/*
* TMXImageLayer
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
     * TMXImageLayer represents an image layer on TMX map.
     *
     * @class TMXImageLayer
     * @param {creatine.TMXMap} map The map object.
     * @param {Object} data The data object (from tmx format).
     * @extends createjs.Bitmap
     * @constructor
    **/
    var TMXImageLayer = function(map, data) {
        /**
         * Reference to the TMX map.
         *
         * @property map
         * @type {creatine.TMXMap}
         * @readonly
        **/
        this.map = null;

        /**
         * The path for the image.
         *
         * @property imagePath
         * @type {String}
         * @readonly
        **/
        this.imagePath = null;

        /**
         * The name of the layer.
         *
         * @property name
         * @type {String}
         * @readonly
        **/
        this.name = null;

        /**
         * The amount of tiles in x axis. Not really useful here.
         *
         * @property width
         * @type {Integer}
         * @readonly
        **/
        this.width = null;

        /**
         * The amount of tiles in y axis. Not really useful here.
         *
         * @property y
         * @type {Integer}
         * @readonly
        **/
        this.height = null;

        this._initialize(map, data);
    }
    var p = createjs.extend(TMXImageLayer, createjs.Bitmap);

    /**
     * Initialization method.
     * 
     * @method _initialize
     * @param {creatine.TMXMap} map The map object.
     * @param {Object} data The data object (from tmx format).
     * @protected
    **/
    p._initialize = function(map, data) {
        if (!map) return;

        this.Bitmap_constructor(data['image']);

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

    creatine.TMXImageLayer = createjs.promote(TMXImageLayer, "Bitmap");
}());/*
* TMXObjectLayer
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
     * TMXObjectLayer represents an Object Group in TMX maps.
     *
     * @class TMXObjectLayer
     * @param {creatine.TMXMap} map The map object.
     * @param {Object} data The data object (from tmx format).
     * @constructor
    **/
    var TMXObjectLayer = function(map, data) {
        /**
         * Reference to the TMX map.
         *
         * @property map
         * @type {creatine.TMXMap}
         * @readonly
        **/
        this.map = null;

        /**
         * The name of the layer.
         *
         * @property name
         * @type {String}
         * @readonly
        **/
        this.name = null;

        /**
         * List of objects in the layer.
         *
         * @property objects
         * @type {Array}
         * @readonly
        **/
        this.objects = null;

        /**
         * Is the layer visible?
         *
         * @property visible
         * @type {Boolean}
         * @readonly
        **/
        this.visible = null;

        /**
         * Opacity the layer.
         *
         * @property alpha
         * @type {Float}
         * @readonly
        **/
        this.alpha = null;

        this._initialize(map, data);
    }
    var p = TMXObjectLayer.prototype;

    /**
     * Initialization method.
     * 
     * @method initialize
     * @param {creatine.TMXMap} map The map object.
     * @param {Object} data The data object (from tmx format).
     * @protected
    **/
    p._initialize = function(map, data) {
        if (!map) return;

        this.map     = map;
        this.name    = data['name'];
        this.objects = data['objects'];
        this.visible = data['visible'];
        this.alpha   = data['opacity'];
    }

    creatine.TMXObjectLayer = TMXObjectLayer;
}());/*
* TMXMap
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
     * TMXMap is the class that handle tile maps in the TMX format, specified 
     * by the tile software Tiled. A TMX map is composed of one or more layers 
     * (tile layers, object layers or image layers) and one or more tilesets 
     * (image atlases). Creatine supports all types of layers and projections 
     * described by the TMX specification: orthogonal, isometric and staggered.
     *
     * The TMXMap receives a data object following the TMX specification. This 
     * is usually loaded from a json map. 
     *
     * <h4>Example</h4>
     *
     * Notice that, TMXMap is a display object, inherited from 
     * <code>createjs.Container</code>, it means that, after loading the map 
     * you can simply add it to the stage:
     * 
     *     var map = new creatine.TMXMap(dataObject);
     *     stage.addChild(map);
     *
     * <h4>Data Format</h4>
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
     * @class TMXMap
     * @extends createjs.Container
     * @param {Object} data A data object describing the map.
     * @constructor
    **/
    var TMXMap = function(data) {
        /**
         * Map version
         *
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
         *
         * @property height
         * @type {Integer}
         * @readonly
        **/
        this.height = null;

        /**
         * Describes how many tiles the map have in the x axis.
         *
         * @property width
         * @type {Integer}
         * @readonly
        **/
        this.width = null;

        /**
         * Height of tiles.
         *
         * @property tileHeight
         * @type {Integer}
         * @readonly
        **/
        this.tileHeight = null;

        /**
         * Width of tiles.
         *
         * @property tileWidth
         * @type {Integer}
         * @readonly
        **/
        this.tileWidth = null;

        /**
         * The list of tilesets in the map.
         *
         * @property tilesets
         * @type {Array}
         * @readonly
        **/
        this.tilesets = null;

        /**
         * The list of layers in the map.
         *
         * @property layers
         * @type {Array}
         * @readonly
        **/
        this.layers = null;

        /**
         * User defined properties object.
         *
         * @property properties
         * @type {Object}
         * @readonly
        **/
        this.properties = null;


        this._initialize(data);
    }
    var p = createjs.extend(TMXMap, createjs.Container);

    /**
     * Initialization method.
     * 
     * @method _initialize
     * @param {Object} data A data object describing the map.
     * @protected
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
     * 
     * @method _createTilesets
     * @param {Object} data An object following the TMX specification.
     * @protected
    **/
    p._createTilesets = function(data) {
        for (var i=0; i<data['tilesets'].length; i++) {
            this.tilesets.push(
                new creatine.TMXTileset(data['tilesets'][i])
            )
        }
    }

    /**
     * Create the layer objects.
     * 
     * @method _createLayers
     * @param {Object} data An object following the TMX specification.
     * @protected
    **/
    p._createLayers = function(data) {
        for (var i=0; i<data['layers'].length; i++) {
            var layerType = data['layers'][i].type;

            if (layerType == 'tilelayer') {
                if (this.orientation == 'orthogonal')
                    var Layer = creatine.TMXOrthogonalTileLayer

                else if (this.orientation == 'isometric')
                    var Layer = creatine.TMXIsometricTileLayer

                else if (this.orientation == 'staggered')
                    var Layer = creatine.TMXStaggeredTileLayer

                else
                    throw new Error('Unknown layer type: "'+layerType+'"');

                var layer = new Layer(this, data['layers'][i]);
                this.layers.push(layer);
                this.addChild(layer);

            } else if (layerType == 'objectgroup') {
                this.layers.push(
                    new creatine.TMXObjectLayer(this, data['layers'][i])
                );
                
            } else if (layerType == 'imagelayer') {
                var layer = new creatine.TMXImageLayer(this, data['layers'][i])

                // check for empty image
                if (layer.image.width > 0) {
                    this.addChild(layer);
                }
                this.layers.push(layer);
            }
        }
    }

    /**
     * Returns the tileset which holds the provided global ID.
     * 
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
     * Returns a layer by name
     * 
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

    creatine.TMXMap = createjs.promote(TMXMap, "Container");
}());/*
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
 * @module Creatine
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
 * @module Creatine
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
 * @module Creatine
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
        return this._rectangle.initialize(0, 0, w, h);
    }

    creatine.FlexBitmap = createjs.promote(FlexBitmap, "Bitmap");
}());
/*
* MoveOut
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
 * @submodule Transitions
 **/

// namespace:
this.creatine = this.creatine || {};
this.creatine.transitions = this.creatine.transitions || {};

(function() {
    "use strict";
        
    /**
     * The MoveOut is a transition effect that slides out the current scene 
     * from the screen. MoveOut accepts the following direction constants: 
     * <code>LEFT, RIGHT, TOP, BOTTOM, TOP_LEFT, TOP_RIGHT, BOTTOM_LEFT, 
     * BOTTOM_RIGHT</code>.
     *
     * <h4>Example</h4>
     *
     *     director.replace(
     *         new MyScene(),
     *         new creatine.transitions.MoveOut(
     *             creatine.LEFT,
     *             createjs.Ease.bounceOut,
     *             400
     *         )
     *     )
     *
     * @class MoveOut
     * @constructor
     * @param {Constant} direction The direction to where the current scene  
     *                   will leave.
     * @param {Function} ease An easing function from createjs.Ease (provided 
     *                   by TweenJS).
     * @param {Number} time The transition time in milliseconds. Default to 
     *                 400.
    **/

    var MoveOut = function(direction, ease, time) {
        /**
         * The direction to where the current scene will leave.
         *
         * @property direction
         * @type {Constant}
        **/
        this.direction = direction || creatine.LEFT;

        /**
         * An Easing function from createjs.Ease.
         *
         * @property ease
         * @type {Function}
        **/
        this.ease = ease || createjs.Ease.linear;

        /**
         * The transition time, in milliseconds
         *
         * @property time
         * @type {Number}
        **/
        this.time = time || 400;
    }
    var p = MoveOut.prototype;

    /**
     * Performe the transition. This method is called only by Director.
     *
     * @method run
     * @param {Director} director The Director instance.
     * @param {Scene} outScene The active scene.
     * @param {Scene} inScene The new scene.
     * @param {Function} callback The callback function called when the 
     *                   transition is done.
    **/
    p.run = function(director, outScene, inScene, callback) {
        director.swapScenes();

        var canvas_w = director.stage.canvas.width;
        var canvas_h = director.stage.canvas.height;
        var properties = {};

        switch (this.direction) {
            case creatine.LEFT:
                properties.x = -canvas_w;
                break;
            case creatine.RIGHT:
                properties.x = canvas_w;
                break;
            case creatine.TOP:
                properties.y = -canvas_h;
                break;
            case creatine.BOTTOM:
                properties.y = canvas_h;
                break;
            case creatine.TOP_LEFT:
                properties.x = -canvas_w;
                properties.y = -canvas_h;
                break;
            case creatine.TOP_RIGHT:
                properties.x = canvas_w;
                properties.y = -canvas_h;
                break;
            case creatine.BOTTOM_LEFT:
                properties.x = -canvas_w;
                properties.y = canvas_h;
                break;
            case creatine.BOTTOM_RIGHT:
                properties.x = canvas_w;
                properties.y = canvas_h;
                break
        }

        inScene.x = 0;
        inScene.y = 0;

        var tween = createjs.Tween.get(outScene);
        tween.to(properties, this.time, this.ease);

        if (callback) {
            tween.call(callback);
        }
    }

    creatine.transitions.MoveOut = MoveOut;
 
}());
/*
* MoveIn
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
 * @submodule Transitions
 **/

// namespace:
this.creatine = this.creatine || {};
this.creatine.transitions = this.creatine.transitions || {};

(function() {
    "use strict";
    
    /**
     * The MoveIn is a transition effect that slides in the new scene to 
     * the screen. MoveIn accepts the following direction constants: 
     * <code>LEFT, RIGHT, TOP, BOTTOM, TOP_LEFT, TOP_RIGHT, BOTTOM_LEFT, 
     * BOTTOM_RIGHT</code>.
     *
     * <h4>Example</h4>
     *
     *     director.replace(
     *         new MyScene(),
     *         new creatine.transitions.MoveIn(
     *             creatine.LEFT,
     *             createjs.Ease.bounceOut,
     *             400
     *         )
     *     )
     *
     * @class MoveIn
     * @constructor
     * @param {Constant} direction The direction from where the new scene will 
     *                   appear.
     * @param {Function} ease An easing function from createjs.Ease (provided 
     *                   by TweenJS).
     * @param {Number} time The transition time in milliseconds. Default to 
     *                 400.
    **/

var MoveIn = function(direction, ease, time) {

        /**
         * The direction from where the new scene will appear.
         *
         * @property direction
         * @type {Constant}
        **/
        this.direction = direction || creatine.LEFT;

        /**
         * An Easing function from createjs.Ease.
         *
         * @property ease
         * @type {Function}
        **/
        this.ease = ease || createjs.Ease.linear;

        /**
         * The transition time, in milliseconds
         *
         * @property time
         * @type {Number}
        **/
        this.time = time || 400;
    }
    var p = MoveIn.prototype;

    /**
     * Performe the transition. This method is called only by Director.
     *
     * @method run
     * @param {Director} director The Director instance.
     * @param {Scene} outScene The active scene.
     * @param {Scene} inScene The new scene.
     * @param {Function} callback The callback function called when the 
     *                   transition is done.
    **/
    p.run = function(director, outScene, inScene, callback) {
        var canvas_w = director.stage.canvas.width;
        var canvas_h = director.stage.canvas.height;
        var properties = {};

        switch (this.direction) {
            case creatine.LEFT:
                inScene.x = -canvas_w;
                properties.x = 0;
                break;
            case creatine.RIGHT:
                inScene.x = canvas_w;
                properties.x = 0;
                break;
            case creatine.TOP:
                inScene.y = -canvas_h;
                properties.y = 0;
                break;
            case creatine.BOTTOM:
                inScene.y = canvas_h;
                properties.y = 0;
                break;
            case creatine.TOP_LEFT:
                inScene.x = -canvas_w;
                inScene.y = -canvas_h;
                properties.x = 0;
                properties.y = 0;
                break;
            case creatine.TOP_RIGHT:
                inScene.x = canvas_w;
                inScene.y = -canvas_h;
                properties.x = 0;
                properties.y = 0;
                break;
            case creatine.BOTTOM_LEFT:
                inScene.x = -canvas_w;
                inScene.y = canvas_h;
                properties.x = 0;
                properties.y = 0;
                break;
            case creatine.BOTTOM_RIGHT:
                inScene.x = canvas_w;
                inScene.y = canvas_h;
                properties.x = 0;
                properties.y = 0;
                break
        }

        var tween = createjs.Tween.get(inScene);
        tween.to(properties, this.time, this.ease);

        if (callback) {
            tween.call(callback);
        }
    }

    creatine.transitions.MoveIn = MoveIn;
 
}());
/*
* Scroll
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
 * @submodule Transitions
 **/

// namespace:
this.creatine = this.creatine || {};
this.creatine.transitions = this.creatine.transitions || {};

(function() {
    "use strict";
        
    /**
     * The Scroll is a transition effect that slides out the current scene  
     * while slides in the new scene. Scroll accepts the following direction 
     * constants: <code>LEFT, RIGHT, TOP, BOTTOM</code>.
     *
     * <h4>Example</h4>
     *
     *     director.replace(
     *         new MyScene(),
     *         new creatine.transitions.Scroll(
     *             creatine.LEFT,
     *             createjs.Ease.bounceOut,
     *             400
     *         )
     *     )
     *
     * @class Scroll
     * @constructor
     * @param {Constant} direction The direction to where the current scene 
     *                   will leave.
     * @param {Function} ease An easing function from createjs.Ease (provided 
     *                   by TweenJS).
     * @param {Number} time The transition time in milliseconds. Default to 
     *                 400.
    **/
    var Scroll = function(direction, ease, time) {
        /**
         * The direction to where the current scene will leave.
         *
         * @property direction
         * @type {Constant}
        **/
        this.direction = direction || creatine.LEFT;

        /**
         * An Easing function from createjs.Ease.
         *
         * @property ease
         * @type {Function}
        **/
        this.ease = ease || createjs.Ease.linear;

        /**
         * The transition time, in milliseconds
         *
         * @property time
         * @type {Number}
        **/
        this.time = time || 400;
    }
    var p = Scroll.prototype;

    /**
     * Performe the transition. This method is called only by Director.
     *
     * @method run
     * @param {Director} director The Director instance.
     * @param {Scene} out_scene The active scene.
     * @param {Scene} in_scene The new scene.
     * @param {Function} callback The callback function called when the 
     *                   transition is done.
    **/
    p.run = function(director, out_scene, in_scene, callback) {
        director.swapScenes();

        var canvas_w = director.stage.canvas.width;
        var canvas_h = director.stage.canvas.height;
        var out_prop = {};
        var in_prop = {};

        switch (this.direction) {
            case creatine.LEFT:
                in_scene.x = canvas_w;
                in_scene.y = 0;
                in_prop.x = 0;
                out_prop.x = -canvas_w;
                break;
            case creatine.RIGHT:
                in_scene.x = -canvas_w;
                in_scene.y = 0;
                in_prop.x = 0;
                out_prop.x = canvas_w;
                break;
            case creatine.TOP:
                in_scene.x = 0;
                in_scene.y = canvas_h;
                in_prop.y = 0;
                out_prop.y = -canvas_h;
                break;
            case creatine.BOTTOM:
                in_scene.x = 0;
                in_scene.y = -canvas_h;
                in_prop.y = 0;
                out_prop.y = canvas_h;
                break;
        }

        var tween = createjs.Tween.get(in_scene);
        tween.to(in_prop, this.time, this.ease);
        if (callback) {
            tween.call(callback);
        }

        tween = createjs.Tween.get(out_scene);
        tween.to(out_prop, this.time, this.ease);
    }

    creatine.transitions.Scroll = Scroll;
 
}());
/*
* FadeIn
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
 * @submodule Transitions
 **/

// namespace:
this.creatine = this.creatine || {};
this.creatine.transitions = this.creatine.transitions || {};

(function() {
    "use strict";
        
    /**
     * The FadeIn is a transition effect that fades in the new scene.
     *
     * <h4>Example</h4>
     *
     *     director.replace(
     *         new MyScene(),
     *         new creatine.transitions.FadeIn(
     *             createjs.Ease.bounceOut, 
     *             400
     *         )
     *     )
     *
     * @class FadeIn
     * @constructor
     * @param {Function} ease An easing function from createjs.Ease (provided
     *                   by TweenJS).
     * @param {Number} time The transition time in milliseconds. Default to 
     *                 400.
    **/

    var FadeIn = function(ease, time) {
        /**
         * An Easing function from createjs.Ease.
         *
         * @property ease
         * @type {Function}
        **/
        this.ease = ease || createjs.Ease.linear;

        /**
         * The transition time, in milliseconds
         *
         * @property time
         * @type {Number}
        **/ 
         this.time = time || 400;
    }
    var p = FadeIn.prototype;

    /**
     * Performe the transition. This method is called only by Director.
     *
     * @method run
     * @param {Director} director The Director instance.
     * @param {Scene} outScene The active scene.
     * @param {Scene} inScene The new scene.
     * @param {Function} callback The callback function called when the 
     *                   transition is done.
    **/
    p.run = function(director, outScene, inScene, callback) {
        inScene.alpha = 0;

        var tween = createjs.Tween.get(inScene);
        tween.to({alpha:1}, this.time, this.ease);
        
        if (callback) {
            tween.call(callback);
        }
    }

    creatine.transitions.FadeIn = FadeIn;
 
}());
/*
* FadeOut
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
 * @submodule Transitions
 **/

// namespace:
this.creatine = this.creatine || {};
this.creatine.transitions = this.creatine.transitions || {};

(function() {
    "use strict";
    
    /**
     * The FadeOut is a transition effect that fades out the current scene.
     *
     * <h4>Example</h4>
     *
     *     director.replace(
     *         new MyScene(),
     *         new creatine.transitions.FadeOut(
     *             createjs.Ease.bounceOut, 
     *             400
     *         )
     *     )
     *
     * @class FadeOut
     * @constructor
     * @param {Function} ease An easing function from createjs.Ease (provided 
     *                   by TweenJS).
     * @param {Number} time The transition time in milliseconds. Default to 
     *                 400.
    **/

var FadeOut = function(ease, time) {
        /**
         * An Easing function from createjs.Ease.
         *
         * @property ease
         * @type {Function}
        **/
        this.ease = ease || createjs.Ease.linear;

        /**
         * The transition time, in milliseconds
         *
         * @property time
         * @type {Number}
        **/
        this.time = time || 400;
    }
    var p = FadeOut.prototype;

    /**
     * Performe the transition. This method is called only by Director.
     *
     * @method run
     * @param {Director} director The Director instance.
     * @param {Scene} outScene The active scene.
     * @param {Scene} inScene The new scene.
     * @param {Function} callback The callback function called when the 
     *                   transition is done.
    **/
    p.run = function(director, outScene, inScene, callback) {
        director.swapScenes();

        inScene.alpha = 1;
        var tween = createjs.Tween.get(outScene);
        tween.to({alpha:0}, this.time, this.ease);

        if (callback) {
            tween.call(callback);
        }
    }

    creatine.transitions.FadeOut = FadeOut;
 
}());
/*
* FadeInOut
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
 * @submodule Transitions
 **/

// namespace:
this.creatine = this.creatine || {};
this.creatine.transitions = this.creatine.transitions || {};

(function() {
    "use strict";
        
    /**
     * The FadeInOut is a transition effect that fades out the current scene
     * and fades in the new one.
     *
     * <h4>Example</h4>
     *
     *     director.replace(
     *         new MyScene(),
     *         new creatine.transitions.FadeInOut(
     *             createjs.Ease.bounceOut,
     *             400
     *         )
     *     )
     *
     * @class FadeInOut
     * @constructor
     * @param {Function} ease An easing function from createjs.Ease (provided
     *                   by TweenJS).
     * @param {Number} time The transition time in milliseconds. Default to 
     *                 1000.
    **/

    var FadeInOut = function(ease, time) {
        /**
         * An Easing function from createjs.Ease.
         *
         * @property ease
         * @type {Function}
        **/
        this.ease = ease || createjs.Ease.linear;

        /**
         * The transition time, in milliseconds
         *
         * @property time
         * @type {Number}
        **/
        this.time = time || 1000;
    }
    var p = FadeInOut.prototype;

    /**
     * Performe the transition. This method is called only by Director.
     *
     * @method run
     * @param {Director} director The Director instance.
     * @param {Scene} outScene The active scene.
     * @param {Scene} inScene The new scene.
     * @param {Function} callback The callback function called when the 
     *                   transition is done.
    **/
    p.run = function(director, outScene, inScene, callback) {
        var time = this.time/2;

        director.swapScenes();

        inScene.alpha = 0;
        var tween = createjs.Tween.get(inScene)
                                  .wait(time)
                                  .to({alpha:1}, time, this.ease);

        createjs.Tween.get(outScene)
                      .to({alpha:0}, time, this.ease);

        if (callback) {
            tween.call(callback);
        }
    }

    creatine.transitions.FadeInOut = FadeInOut;
 
}());
/*
* ScaleIn
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
 * @submodule Transitions
 **/

// namespace:
this.creatine = this.creatine || {};
this.creatine.transitions = this.creatine.transitions || {};

(function() {
    "use strict";

    /**
     * The ScaleIn is a transition effect that scales in the new scene.
     *
     * <h4>Example</h4>
     *
     *     director.replace(
     *         new MyScene(),
     *         new creatine.transitions.ScaleIn(
     *             createjs.Ease.bounceOut, 
     *             400
     *         )
     *     )
     *
     * @class ScaleIn
     * @constructor
     * @param {Function} ease An easing function from createjs.Ease (provided 
     *                   by TweenJS).
     * @param {Number} time The transition time in milliseconds. Default to
     *                 400. 
    **/

    var ScaleIn = function(ease, time) {
        /**
         * An Easing function from createjs.Ease.
         *
         * @property ease
         * @type {Function}
        **/
        this.ease = ease || createjs.Ease.linear;

        /**
         * The transition time, in milliseconds
         *
         * @property time
         * @type {Number}
        **/
        this.time = time || 400;
    }
    var p = ScaleIn.prototype;

    /**
     * Performe the transition. This method is called only by Director.
     *
     * @method run
     * @param {Director} director The Director instance.
     * @param {Scene} outScene The active scene.
     * @param {Scene} in_scene The new scene.
     * @param {Function} callback The callback function called when the 
     *                   transition is done.
    **/
    p.run = function(director, outScene, inScene, callback) {
        var canvas_w = director.stage.canvas.width;
        var canvas_h = director.stage.canvas.height;
        var properties = {};

        inScene.scaleX = 0;
        inScene.scaleY = 0;
        inScene.x = canvas_w/2;
        inScene.y = canvas_h/2;
        properties.scaleX = 1;
        properties.scaleY = 1;
        properties.x = 0;
        properties.y = 0;

        var tween = createjs.Tween.get(inScene);
        tween.to(properties, this.time, this.ease);
        if (callback) {
            tween.call(callback);
        }
    }

    creatine.transitions.ScaleIn = ScaleIn;
 
}());
/*
* ScaleOut
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
 * @submodule Transitions
 **/

// namespace:
this.creatine = this.creatine || {};
this.creatine.transitions = this.creatine.transitions || {};

(function() {
    "use strict";
        
    /**
     * The ScaleOut is a transition effect that scales out the current scene.
     *
     * <h4>Example</h4>
     *
     *     director.replace(
     *         new MyScene(),
     *         new creatine.transitions.ScaleOut(
     *             createjs.Ease.bounceOut, 
     *             400
     *         )
     *     )
     *
     * @class ScaleOut
     * @constructor
     * @param {Function} ease An easing function from createjs.Ease (provided 
     *                   by TweenJS).
     * @param {Number} time The transition time in milliseconds. Default to 
     *                 400.
    **/
    var ScaleOut = function(ease, time) {
        /**
         * An Easing function from createjs.Ease.
         *
         * @property ease
         * @type {Function}
        **/
        this.ease = ease || createjs.Ease.linear;

        /**
         * The transition time, in milliseconds
         *
         * @property time
         * @type {Number}
        **/
        this.time = time || 400;
    }
    var p = ScaleOut.prototype;

    /**
     * Performe the transition. This method is called only by Director.
     *
     * @method run
     * @param {Director} director The Director instance.
     * @param {Scene} outScene The active scene.
     * @param {Scene} inScene The new scene.
     * @param {Function} callback The callback function called when the 
     *                   transition is done.
    **/
    p.run = function(director, outScene, inScene, callback) {
        director.swapScenes();

        var canvas_w = director.stage.canvas.width;
        var canvas_h = director.stage.canvas.height;
        var properties = {};

        inScene.x = 0;
        inScene.y = 0;
        inScene.scaleX = 1;
        inScene.scaleY = 1;
        properties.scaleX = 0;
        properties.scaleY = 0;
        properties.x = canvas_w/2;
        properties.y = canvas_h/2;

        var tween = createjs.Tween.get(outScene);
        tween.to(properties, this.time, this.ease);
        if (callback) {
            tween.call(callback);
        }
    }

    creatine.transitions.ScaleOut = ScaleOut;
 
}());
/*
* ScaleInOut
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
 * @submodule Transitions
 **/

// namespace:
this.creatine = this.creatine || {};
this.creatine.transitions = this.creatine.transitions || {};

(function() {
    "use strict";
    
    /**
     * The ScaleInOut is a transition effect that scales out the current scene 
     * and scales in the new scene.
     *
     * <h4>Example</h4>
     *
     *     director.replace(
     *         new MyScene(),
     *         new creatine.transitions.ScaleInOut(
     *             createjs.Ease.bounceOut, 
     *             400
     *         )
     *     )
     *
     * @class ScaleInOut
     * @constructor
     * @param {Function} ease An easing function from createjs.Ease (provided 
     *                   by TweenJS).
     * @param {Number} time The transition time in milliseconds. Default to 
     *                 1000.
    **/
    var ScaleInOut = function(ease, time) {
        /**
         * An Easing function from createjs.Ease.
         *
         * @property ease
         * @type {Function}
        **/
        this.ease = ease || createjs.Ease.linear;

        /**
         * The transition time, in milliseconds
         *
         * @property time
         * @type {Number}
        **/
        this.time = time || 1000;
    }
    var p = ScaleInOut.prototype;

    /**
     * Performe the transition. This method is called only by Director.
     *
     * @method run
     * @param {Director} director The Director instance.
     * @param {Scene} outScene The active scene.
     * @param {Scene} inScene The new scene.
     * @param {Function} callback The callback function called when the 
     *                   transition is done.
    **/
    p.run = function(director, outScene, inScene, callback) {
        var time = this.time/2;
        var canvas_w = director.stage.canvas.width;
        var canvas_h = director.stage.canvas.height;
        var in_prop = {};
        var out_prop = {};

        inScene.x = canvas_w/2;
        inScene.y = canvas_h/2;
        inScene.scaleX = 0;
        inScene.scaleY = 0;
        in_prop.x = 0;
        in_prop.y = 0;
        in_prop.scaleX = 1;
        in_prop.scaleY = 1;

        out_prop.x = canvas_w/2;
        out_prop.y = canvas_h/2;
        out_prop.scaleX = 0;
        out_prop.scaleY = 0;

        createjs.Tween.get(outScene)
                      .to(out_prop, time, this.ease);

        var tween = createjs.Tween.get(inScene)
                                  .wait(time)
                                  .to(in_prop, time, this.ease);
        if (callback) {
            tween.call(callback);
        }
    }

    creatine.transitions.ScaleInOut = ScaleInOut;
 
}());

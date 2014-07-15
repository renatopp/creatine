/*
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

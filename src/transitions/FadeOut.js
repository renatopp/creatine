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

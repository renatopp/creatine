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

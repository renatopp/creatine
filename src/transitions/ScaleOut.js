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
 * @param {Function} ease An easing function from createjs.Ease (provided by
 *                   TweenJS).
 * @param {Number} time The transition time in milliseconds. Default to 400.
**/

var ScaleOut = function(ease, time) {
    this.initialize(ease, time);
}
var p = ScaleOut.prototype;

    /**
     * An Easing function from createjs.Ease.
     *
     * @property ease
     * @type {Function}
    **/
    p.ease = null;

    /**
     * The transition time, in milliseconds
     *
     * @property time
     * @type {Number}
    **/
    p.time = null;

    /**
     * Initialization method.
     *
     * @method initialize
     * @param {Function} ease An easing function from createjs.Ease (provided 
     *                   by TweenJS).
     * @param {Number} time The transition time in milliseconds. Default to 
     *                 400.
     * @protected
    **/
    p.initialize = function(ease, time) {
        this.ease = ease || createjs.Ease.linear;
        this.time = time || 400;
    }

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

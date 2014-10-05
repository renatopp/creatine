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
 * The Scroll is a transition effect that slides out the current scene while 
 * slides in the new scene. Scroll accepts the following direction constants: 
 * <code>LEFT, RIGHT, TOP, BOTTOM</code>.
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
 * @param {Constant} direction The direction to where the current scene will 
 *                   leave.
 * @param {Function} ease An easing function from createjs.Ease (provided by
 *                   TweenJS).
 * @param {Number} time The transition time in milliseconds. Default to 400.
**/

var Scroll = function(direction, ease, time) {
    this.initialize(direction, ease, time);
}
var p = Scroll.prototype;

    /**
     * The direction to where the current scene will leave.
     *
     * @property direction
     * @type {Constant}
    **/
    p.direction = null;

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
     * @param {Constant} direction The direction to where the current scene will
                         leave.
     * @param {Function} ease An easing function from createjs.Ease (provided 
     *                   by TweenJS).
     * @param {Number} time The transition time in milliseconds. Default to 
     *                 400.
     * @protected
    **/
    p.initialize = function(direction, ease, time) {
        this.direction = direction || creatine.LEFT;
        this.ease = ease || createjs.Ease.linear;
        this.time = time || 400;
    }

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

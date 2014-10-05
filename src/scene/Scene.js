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
    this.initialize();
}
var p = Scene.prototype = new createjs.Container();

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

creatine.Scene = Scene;
}());

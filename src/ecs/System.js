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

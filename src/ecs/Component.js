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
 * <code>y</code> while a display component may store the image of the object.
 * Components usually does not have methods, but it can be included.
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
var Component = function() {};

var p = Component.prototype;
    
    /**
     * The component name.
     *
     * @property name
     * @type {String}
    **/
    p.name = null;

creatine.Component = Component;
 
}());

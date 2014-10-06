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
 * Entity is a collection of Components, only consisting of an unique ID and a
 * list of components.
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
    this.initialize();
}
var p = Entity.prototype;

    /**
     * The Entity ID.
     *
     * @property id
     * @type {Striing}
     * @readonly
    **/
    p.id = null;

    /**
     * The component list.
     *
     * @property components
     * @type {Object}
     * @private
    **/
    p.components;
    
    /**
     * Initialization method.
     * 
     * @method initialize
     * @protected
    **/
    p.initialize = function() {
        _entity_count++;

        this.id = (
            (new Date()).getTime().toString(16) + '-' +
            (Math.random() * 100000000|0).toString(16) + '-' +
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

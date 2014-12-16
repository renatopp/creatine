/*
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
}());
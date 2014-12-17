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

    /**
     * Helper to use localStorage. 
     * 
     * The localStorage is a HTML5 feature which allows persistent local 
     * storage (JS can save information in the browser). But, it is limited to
     * string values only. This class helps you to store and retrieve any kind
     * of data inside a local storage (by converting these values from/to 
     * JSON).
     *
     * <h4>Example</h4>
     *
     *     var storage = new creatine.Storage('my-namespace');
     *     storage.set('boolean-value', true);
     *     storage.set('string-value', 'lalala');
     *     storage.set('integer-value', 23);
     *     storage.set('object-value', {a:3});
     *
     *     console.log(storage.get('boolean-value')); // true
     *     console.log(storage.get('string-value'));  // 'lalala'
     *     console.log(storage.get('integer-value')); // 23
     *     console.log(storage.get('object-value'));  // {a:3}
     *
     * @class Storage
     * @param {String} namespace The prefix to all keys in localStorage.
     * @constructor
    **/
    var Storage = function(namespace) {
        /**
         * Holds the localStorage or a simple object.
         *
         * @property _memory
         * @type {Object}
         * @readonly
         * @private
        **/
        this._memory = localStorage;

        /**
         * Namespace, used as a prefixed to all keys in localStorage.
         *
         * @property namespace
         * @type {String}
         * @readonly
        **/
        this.namespace = (namespace || '')+'.';
        
        // verify if browser supports the localStorage feature
        try {
            !!localStorage.getItem;
        } catch (error) {
            this._memory = {};
        }
    }
    var p = Storage.prototype;

    /**
     * Set a value for a given key in storage.
     *
     * @method set
     * @param {String} key The key identifier.
     * @param {String} value The value.
    **/
    p.set = function(key, value) {
        try {
            value = JSON.stringify(value);
        } catch (e) {}

        this._memory[this.namespace+key] = value;
    }

    /**
     * Get a value for a given key in storage.
     * 
     * @method get
     * @param {String} key The key.
     * @return {Object} the stored value.
     */
    p.get = function(key) {
        var value = this._memory[this.namespace+key];
        try {
            value = JSON.parse(value);
        } catch (e) {}

        return value;
    }

    /**
     * Remove a key from storage.
     * 
     * @method remove
     * @param {String} key The key.
     */
    p.remove = function(key) {
        delete this._memory[this.namespace+key];
    }

    creatine.Storage = Storage;
})();
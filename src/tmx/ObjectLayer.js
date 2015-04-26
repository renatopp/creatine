/**
 * @module creatine.tmx
 **/

(function() {
  "use strict";

  /**
   * ObjectLayer represents an Object Group in TMX maps.
   *
   * @class ObjectLayer
   * @param {creatine.tmx.Map} map The map object.
   * @param {Object} data The data object (from tmx format).
   * @constructor
  **/
  var ObjectLayer = function(map, data) {
    /**
     * Reference to the TMX map.
     * @property map
     * @type {creatine.tmx.Map}
     * @readonly
    **/
    this.map = null;

    /**
     * The name of the layer.
     * @property name
     * @type {String}
     * @readonly
    **/
    this.name = null;

    /**
     * List of objects in the layer.
     * @property objects
     * @type {Array}
     * @readonly
    **/
    this.objects = null;

    /**
     * Is the layer visible?
     * @property visible
     * @type {Boolean}
     * @readonly
    **/
    this.visible = null;

    /**
     * Opacity the layer.
     * @property alpha
     * @type {Float}
     * @readonly
    **/
    this.alpha = null;

    this._initialize(map, data);
  }
  var p = ObjectLayer.prototype;

  /**
   * Initialization method.
   * @method _initialize
   * @param {creatine.tmx.Map} map The map object.
   * @param {Object} data The data object (from tmx format).
   * @private
  **/
  p._initialize = function(map, data) {
    if (!map) return;

    this.map     = map;
    this.name    = data['name'];
    this.objects = data['objects'];
    this.visible = data['visible'];
    this.alpha   = data['opacity'];
  }

  creatine.tmx.ObjectLayer = ObjectLayer;
}());
/**
 * @module creatine.tmx
 **/

(function() {
  "use strict";

  /**
   * TileLayer represents an abstract TileLayer in the TMX map. Creatine 
   * actually use this as base class to `OrthogonalTileLayer`,
   * `IsometricTileLayer` and `StaggeredTileLayer`. The difference among 
   * projections is performed at layer-level, making new projections and 
   * extensions of the current ones a lot simpler to be created. This also 
   * allows you to use multiple projections to the same map (unfortunately, 
   * this isn't supported by Tiled yet). 
   *
   * @class TileLayer
   * @param {creatine.tmx.Map} map The map object.
   * @param {Object} data The data object (from tmx format).
   * @extends createjs.Container
   * @constructor
  **/
  var TileLayer = function(map, data) {
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
     * The list of tile ids in the layer.
     * @property data
     * @type {Array}
     * @readonly
    **/
    this.data = null;

    /**
     * The amount of tiles in x axis.
     * @property width
     * @type {Integer}
     * @readonly
    **/
    this.width = null;

    /**
     * The amount of tiles in y axis.
     * @property y
     * @type {Integer}
     * @readonly
    **/
    this.height = null;

    this._initialize(map, data);
  }
  var p = createjs.extend(TileLayer, createjs.Container);

  /**
   * Initialization method.
   * @method _initialize
   * @param {creatine.tmx.Map} map The map object.
   * @param {Object} data The data object (from tmx format).
   * @protected
  **/
  p._initialize = function(map, data) {
    this.Container_constructor();

    if (!map) return;

    this.map     = map;
    this.name    = data['name'];
    this.data    = data['data'];
    this.x       = data['x'];
    this.y       = data['y'];
    this.width   = data['width'];
    this.height  = data['height'];
    this.visible = data['visible'];
    this.alpha   = data['opacity'];

    this._createTiles();
  }

  /**
   * Create the tiles.
   * 
   * Override this method on the child class.
   * 
   * @method _createTiles
   * @protected
  **/
  p._createTiles = function() {
    throw new Error('TileLayer._createTiles not implemented.');
  }

  /**
   * Return the tile value, given a coord of a tile.
   * @method getTile
   * @param {Integer} x The column of a tile.
   * @param {Integer} y The row of a tile.
   * @return {Integer} The tile id.
  **/
  p.getTile = function(x, y) {
    return this.data[(this.width*y + x)]
  }

  /**
   * Set the tile value, given a coord of a tile.
   * @method getTile
   * @param {Integer} x The column of a tile.
   * @param {Integer} y The row of a tile.
   * @param {Integer} gid The global ID.
  **/
  p.setTile = function(x, y, gid) {
    var idx = (this.width*y + x);

    var tileset = this.map.getTilesetByGid(gid);
    var tileId = gid-tileset.firstgid;
    var tile = this.getChildAt(idx)

    this.data[idx] = tileId;
    if (tileset.animations['anim-'+(tileId)]) {
      tile.gotoAndPlay('anim-'+(tileId));
    } else {
      tile.gotoAndStop(tileId);
    }
  }

  /**
   * Return the coord of a tile given the local position. 
   * 
   * Override this method on the child class.
   *
   * @method getTile
   * @param {Integer} x The position x.
   * @param {Integer} y The position y.
   * @return {createjs.Point} The tile coord.
  **/
  p.getCoords = function(x, y) {
    throw new Error('TileLayer.getCoords not implemented.');
  }

  /**
   * Return the top-left local position of a tile, considering its coords
   * (column and row).
   * 
   * Override this method on the child class.
   *
   * @method getTile
   * @param {Integer} x The column of the tile.
   * @param {Integer} y The row of the tile.
   * @return {createjs.Point} The top-left tile local position.
  **/
  p.getPosition = function(x, y) {
    throw new Error('TileLayer.getPosition not implemented.');
  }

  creatine.tmx.TileLayer = createjs.promote(TileLayer, "Container");
}());
/**
 * @module creatine.tmx
 **/

(function() {
  "use strict";

  /**
   * OrthogonalTileLayer represents a TileLayer in the TMX map.
   * 
   * @class OrthogonalTileLayer
   * @param {creatine.tmx.Map} map The map object.
   * @param {Object} data The data object (from tmx format).
   * @extends creatine.tmx.TileLayer
   * @constructor
  **/
  var OrthogonalTileLayer = function(map, data) {
    this.TileLayer_constructor(map, data);
  }
  var p = createjs.extend(OrthogonalTileLayer, creatine.tmx.TileLayer);

  /**
   * Create the tiles. Override this method on the child class.
   * @method _createTiles
   * @protected
  **/
  p._createTiles = function() {
    var order = this.map.renderOrder;
    var startX = 0;
    var startY = 0;
    var endX = this.width;
    var endY = this.height;
    var dirX = 1;
    var dirY = 1;
    var tW = this.map.tileWidth;
    var tH = this.map.tileHeight;

    if (order == 'left-down' || order=='left-up') {
      startX = this.width-1; endX = 0; dirX = -1;
    }
    
    if (order == 'right-up' || order=='left-up') {
      startY = this.height-1; endY = 0; dirY = -1
    }

    for (var y=startY; y!=endY; y+=dirY) {
      for (var x=startX; x!=endX; x+=dirX) {
        var i = (this.width*y + x)

        var gid = this.data[i];

        if (gid <= 0) continue;

        var tileset = this.map.getTilesetByGid(gid);
        var tile = new createjs.Sprite(tileset.spritesheet)
        var tileId = gid-tileset.firstgid;
        
        if (tileset.animations['anim-'+(tileId)]) {
          tile.gotoAndPlay('anim-'+(tileId));
        } else {
          tile.gotoAndStop(tileId);
        }

        tile.x = x*tW;
        tile.y = y*tW + tH;
        this.addChild(tile);
      }
    }
  }

  /**
   * Return the coord of a tile given the local position. 
   * @method getTile
   * @param {Integer} x The position x.
   * @param {Integer} y The position y.
   * @return {createjs.Point} The tile coord.
  **/
  p.getCoords = function(x, y) {
    return new createjs.Point(
      Math.floor(x/this.map.tileWidth),
      Math.floor(y/this.map.tileHeight)
    );
  }

  /**
   * Return the top-left local position of a tile, considering its coords
   * (column and row).
   * 
   * @method getTile
   * @param {Integer} x The column of the tile.
   * @param {Integer} y The row of the tile.
   * @return {createjs.Point} The top-left tile local position.
  **/
  p.getPosition = function(x, y) {
    return new createjs.Point(
      Math.floor(x*this.map.tileWidth),
      Math.floor(y*this.map.tileHeight)
    );
  }

  creatine.tmx.OrthogonalTileLayer = createjs.promote(OrthogonalTileLayer, "TileLayer");
}());
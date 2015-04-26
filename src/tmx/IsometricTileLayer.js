/**
 * @module creatine.tmx
 **/

(function() {
  "use strict";

  /**
   * IsometricTileLayer represents a TileLayer in the TMX map.
   *
   * @class IsometricTileLayer
   * @param {creatine.tmx.Map} map The map object.
   * @param {Object} data The data object (from tmx format).
   * @extends creatine.tmx.TileLayer
   * @constructor
  **/
  var IsometricTileLayer = function(map, data) {
    this.TileLayer_constructor(map, data);
  }
  var p = createjs.extend(IsometricTileLayer, creatine.tmx.TileLayer);

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

        tile.x = (x-y-1)*(this.map.tileWidth/2);
        tile.y = (x+y+2)*(this.map.tileHeight/2);

        this.addChild(tile);
      }
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
    return new createjs.Point(
      Math.floor(x/this.map.tileWidth + y/this.map.tileHeight),
      Math.floor(-x/this.map.tileWidth + y/this.map.tileHeight)
    );
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
    return new createjs.Point(
      (x-y-1)*(this.map.tileWidth/2),
      (x+y+2)*(this.map.tileHeight/2)
    )
  }
  creatine.tmx.IsometricTileLayer = createjs.promote(IsometricTileLayer, "TileLayer");
}());
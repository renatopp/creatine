/*
* TMXOrthogonalTileLayer
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
 * TMXOrthogonalTileLayer represents a TileLayer in the TMX map.
 *
 * @class TMXOrthogonalTileLayer
 * @param {creatine.TMXMap} map The map object.
 * @param {Object} data The data object (from tmx format).
 * @extends creatine.TMXTileLayer
 * @constructor
**/
var TMXOrthogonalTileLayer = function(map, data) {
    this.initialize(map, data);
}
var p = TMXOrthogonalTileLayer.prototype = new creatine.TMXTileLayer();

    /**
     * Create the tiles. Override this method on the child class.
     * 
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

creatine.TMXOrthogonalTileLayer = TMXOrthogonalTileLayer;
}());
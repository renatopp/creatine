/*
* TMXTileset
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
     * TMXTileset represents a Tileset in the TMX map.
     *
     * <h4>Data Format</h4>
     *
     * In relation to the tilesets properties, the data must be in the 
     * following format:
     * 
     *     var data = {
     *         'firstgid'    : [Integer], // mandatory
     *         'name'        : [String],  // mandatory
     *         'image'       : [String],  // mandatory
     *         'imagewidth'  : [Integer], // default to image.width
     *         'imageheight' : [Integer], // default to image.height
     *         'tilewidth'   : [Integer], // default to 32
     *         'tileheight'  : [Integer], // default to 32
     *         'spacing'     : [Integer], // default to 0
     *         'margin'      : [Integer], // default to 0
     *         'tileoffset'  : [Object],  // default to {x:0, y:0}
     *         'properties'  : [Object],
     *     }
     * 
     * Consult the official TMX description to known more:
     * https://github.com/bjorn/tiled/wiki/TMX-Map-Format
     *
     * @class TMXTileset
     * @param {Object} data The data object describing the tileset.
     * @constructor
    **/
    var TMXTileset = function(data) {
    
        /**
         * The first global tile ID of this tileset.
         *
         * @property firstgid
         * @type {Integer}
         * @readonly
        **/
        this.firstgid = null;

        /**
         * The name of this tileset.
         *
         * @property name
         * @type {String}
         * @readonly
        **/
        this.name = null;

        /**
         * The image width in pixels.
         *
         * @property width
         * @type {Integer}
         * @readonly
        **/
        this.width = null;

        /**
         * The image height in pixels.
         *
         * @property height
         * @type {Integer}
         * @readonly
        **/
        this.height = null;

        /**
         * The width of the tiles in this tileset.
         *
         * @property width
         * @type {Integer}
         * @readonly
        **/
        this.tileWidth = null;

        /**
         * The height of the tiles in this tileset.
         *
         * @property height
         * @type {Integer}
         * @readonly
        **/
        this.tileHeight = null;

        /**
         * The path to the image associated to this tilset.
         *
         * @property imagePath
         * @type {String}
         * @readonly
        **/
        this.imagePath = null;

        /**
         * The offsetX to the tile origin. Notice that, tiled assumes (0, 0) as
         * the left-bottom.
         *
         * @property tileOffsetX
         * @type {Integer}
         * @readonly
        **/
        this.tileOffsetX = null;

        /**
         * The offsetY to the tile origin. Notice that, tiled assumes (0, 0) as
         * the left-bottom.
         *
         * @property tileOffsetY
         * @type {Integer}
         * @readonly
        **/
        this.tileOffsetY = null;
        /**
         * The spacing between tiles on the image.
         *
         * @property spacing
         * @type {Integer}
         * @readonly
        **/
        this.spacing = null;

        /**
         * The margin of the image.
         *
         * @property spacing
         * @type {Integer}
         * @readonly
        **/
        this.margin = null;

        /**
         * An object with properties defined by user.
         *
         * @property properties
         * @type {Object}
         * @readonly
        **/
        this.properties = null;

        /**
         * The spritesheet object loaded by this tileset.
         *
         * @property spritesheet
         * @type {createjs.SpriteSheet}
         * @readonly
        **/
        this.spritesheet = null;

        /**
         * Animation dict contained in the tileset.
         *
         * @property animations
         * @type {Object}
         * @readonly
        **/
        this.animations = null;

        this._initialize(data);
    }
    var p = TMXTileset.prototype;

    /**
     * Initialization method.
     * 
     * @method _initialize
     * @param {Object} data The data object describing the tileset.
     * @protected
    **/
    p._initialize = function(data) {
        this.firstgid    = data['firstgid'];
        this.name        = data['name'];
        this.imagePath   = data['image'];
        this.width       = data['imagewidth'];
        this.height      = data['imageheight'];
        this.tileWidth   = data['tilewidth'] || 32;
        this.tileHeight  = data['tileheight'] || 32;
        this.spacing     = data['spacing'] || 0;
        this.margin      = data['margin'] || 0;
        this.properties  = data['properties'];
        this.tileOffsetX = 0;
        this.tileOffsetY = 0;
        this.animations  = {};
        
        if (data['tileoffset']) {
            this.tileOffsetX = data['tileoffset']['x'];
            this.tileOffsetY = data['tileoffset']['y'];
        }

        if (data['tiles']) {
            for (var key in data['tiles']) {
                var info = data['tiles'][key];

                if (info['animation']) {
                    var frames = [];
                    var speeds = [];

                    for (var i=0; i<info['animation'].length; i++) {
                        frames.push(info['animation'][i]['tileid']);
                        speeds.push(info['animation'][i]['duration']);
                    }
                    this.animations['anim-'+key] = {
                        'frames': frames,
                        'speed': speeds[0]/1000
                    }
                }
            }
        }

        this._loadSpriteSheet();
    }

    /**
     * Loads the spritesheet.
     * 
     * @method _loadSpriteSheet
     * @protected
    **/
    p._loadSpriteSheet = function() {
        if (!this.imagePath) return;

        var data = {
            'images': [this.imagePath],
            'frames': {
                'width'   : this.tileWidth,
                'height'  : this.tileHeight,
                'regX'    :-this.tileOffsetX,
                'regY'    : this.tileHeight - this.tileOffsetY, // at bottom
                'spacing' : this.spacing,
                'margin'  : this.margin
            },
            'animations': this.animations
        }

        this.spritesheet = new createjs.SpriteSheet(data);
    }

    creatine.TMXTileset = TMXTileset;
}());
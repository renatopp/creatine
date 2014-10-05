/*
* FlexBitmap
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
 * FlexBitmap extends the createjs.Bitmap and adds the layout function to it,
 * thus, FlexBitmap can resize itself to best fit its position and area in a 
 * layout manager, such as the BoxSizer and the GridSizer.
 *
 * @class FlexBitmap
 * @extends createjs.DisplayObject
 * @constructor
 * @param {Image|HTMLCanvasElement|HTMLVideoElement|String} imageOrUri The 
 *        source object or URI to an image to display. This can be either an 
 *        Image, Canvas, or Video object, or a string URI to an image file to 
 *        load and use. If it is a URI, a new Image object will be constructed
 *        and assigned to the .image property.
 * @param {boolean} scaleMode creatine.NOSCALE The scale mode.
**/
var FlexBitmap = function(imageOrUri, scaleMode) {
    this.initialize(imageOrUri, scaleMode); 
}
var p = FlexBitmap.prototype = new createjs.Bitmap();

    /**
     * Indicates the scaling mode of the image:
     * 
     * <ul>
     *     <li><code>creatine.STRETCH</code>: to fill the available area 
     *                                        ignoring the aspect ratio.
     *     </li>
     *     <li><code>creatine.FIT</code>: to fill the available area without 
     *                                    overflow and keeping the aspect 
     *                                    ratio.
     *     </li>
     *     <li><code>creatine.FILL</code>: to fill the available area with 
     *                                     overflow and keeping the aspect 
     *                                     ratio.
     *     </li>
     *     <li><code>creatine.NOSCALE</code>: to keep the original size.</li>
     * </ul>
     *
     * @property scaleMode
     * @type {constant}
    **/
    p.scaleMode = null;

    
    p.Bitmap_initialize = p.initialize;

    /**
     * Initialization method.
     *
     * @method initialize
     * @param {Image|HTMLCanvasElement|HTMLVideoElement|String} imageOrUri The 
     *        source object or URI to an image to display. This can be either
     *        an Image, Canvas, or Video object, or a string URI to an image
     *        file to load and use. If it is a URI, a new Image object will be
     *        constructed and assigned to the .image property.
     * @param {Constant} scaleMode The scaling mode of the image. Default to 
                         NOSCALE.
     * @protected
    **/
    p.initialize = function(imageOrUri, scaleMode) {
        this.Bitmap_initialize(imageOrUri);
        this.scaleMode = scaleMode || creatine.NOSCALE;
    }

    /**
     * Resize this this image to fit the area.
     * 
     * @method layout 
     * @param {createjs.Rectangle} area A rectangle containing the usable area
     *                             of the bitmap. 
    **/
    p.layout = function(area) {
        var width = this.image.width;
        var height = this.image.height;

        var scale_x;
        var scale_y;

        if (this.scaleMode === creatine.FIT) {
            scale_x = scale_y = Math.min(
                (area.height/height), 
                (area.width /width)
            );
        } else if (this.scaleMode === creatine.FILL) {
            scale_x = scale_y = Math.max(
                (area.height/height), 
                (area.width /width)
            );
        } else if (this.scaleMode === creatine.STRETCH) {
            scale_x = (area.width /width);
            scale_y = area.height/height;
        } else {
            scale_x = scale_y = 1;
        }

        this.scaleX = scale_x;
        this.scaleY = scale_y;
    }

    /**
     * Returns a rectangle representing this object's bounds after the resize.
     *
     * @method getBounds
     * @protected
    **/
    p.getBounds = function() {
        var w = this.image.width*this.scaleX;
        var h = this.image.height*this.scaleY;
        return this._rectangle.initialize(0, 0, w, h);
    }

creatine.FlexBitmap = FlexBitmap;
}());

/*
* ProgressBar
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
 * @module legacy
 **/

// namespace:
this.creatine = this.creatine || {};

(function() {
    "use strict";
        
    /**
     * ProgressBar is a progress bar that handle continuous values. It is 
     * divided into three main types, which can be specified by `colorsOrImg` 
     * parameter:
     * 
     * - ColorBar: by passing a string representing a color (e.g., '#0f3' or 
     *   'red'), the progress bar will be filled using this color.
     * 
     * - GradientBar: by passing a list of colors (e.g., ['red', 'blue']), the 
     *   progress bar will be filled using a gradient passing through all 
     *   provided colors.
     *
     * - ImageBar: by passing a Bitmap or Image object, the progress bar will 
     *   be filled with using the provided image.
     *
     * A ProgressBar can filled in 4 different directions, by using the 
     * parameter `direction`: <code>LEFT_TO_RIGHT, RIGHT_TO_LEFT, 
     * TOP_TO_BOTTOM, BOTTOM_TO_TOP</code>. 
     *
     * <h4>Example</h4>
     * 
     *     // Create the Director
     *     var progress = new creatine.ProgressBar(
     *         'green',                     // The fill color
     *         'black',                     // The background color
     *         creatine.LEFT_TO_RIGHT       // The director
     *         100,                         // The bar width
     *         20,                          // The bar height
     *         0,                           // The minimum value
     *         100                          // The maximum value
     *     )
     * 
     * @class ProgressBar
     * @constructor
     * @param {String|Array|Bitmap|Image} colorsOrImg A color, list of colors 
     *                                    or bitmap that will be used to fill 
     *                                    the progress bar.
     * @param {String} backgroundColor A string with the color of the bar 
     *                 background. If `null`, the background will be 
     *                 transparent. Default to `null`.
     * @param {Constant} direction The filling direction. Default to 
     *                   `creatine.LEFT_TO_RIGHT`.
     * @param {Number} width The width of the bar. Default to 100.
     * @param {Number} height The height of the bar. Default to 10.
     * @param {Number} min The minimum value of the bar. Default to 0.
     * @param {Number} max The maximum value of the bar. Default to 100.
    **/
    var ProgressBar = function(colorsOrImg, backgroundColor, direction, width, 
                                 height, min, max) {
        /**
         * The bar type ('color', 'gradient' or 'image').
         *
         * @property type
         * @type {Sting}
        **/
        p.type = null;

        /**
         * The bar filling direction (`LEFT_TO_RIGHT`, `RIGHT_TO_LEFT`, 
         * `TOP_TO_BOTTOM` or `BOTTOM_TO_TOP`).
         *
         * @property direction
         * @type {Constant}
        **/
        p.direction = null;

        /**
         * The image which will be used to fill the bar (if type = 'image').
         *
         * @property image
         * @type {Image}
        **/
        p.image = null;

        /**
         * The array with colors of the gradient to fill the bar (if type = 
         * 'gradient').
         *
         * @property gradientColors
         * @type {Array}
        **/
        p.gradientColors = null;

        /**
         * The color to fill the bar (if type = 'color').
         *
         * @property fillColor
         * @type {String}
        **/
        p.fillColor = null;

        /**
         * The background color.
         *
         * @property backgroundColor
         * @type {String}
        **/
        p.backgroundColor = null;

        /**
         * The current value of the progress bar.
         *
         * @property value
         * @type {Number}
        **/
        p.value = null;

        /**
         * The minimum value of the progress bar.
         *
         * @property min
         * @type {Number}
        **/
        p.min = null;

        /**
         * The maximum value of the progress bar.
         *
         * @property max
         * @type {Number}
        **/
        p.max = null;

        /**
         * The width of the progress bar.
         *
         * @property width
         * @type {Number}
        **/
        p.width = null;

        /**
         * The height of the progress bar.
         *
         * @property height
         * @type {Number}
        **/
        p.height = null;

        if (colorsOrImg) {
            this._initialize(
                colorsOrImg,
                backgroundColor,
                direction,
                width,
                height,
                min,
                max
            );
        }
    }
    var p = createjs.extend(ProgressBar, createjs.Shape);

    /**
     * Initialization method.
     * 
     * @method initialize
     * @param {String|Array|Bitmap|Image} colorsOrImg A color, list of colors 
     *                                    or bitmap that will be used to fill 
     *                                    the progress bar.
     * @param {String} backgroundColor A string with the color of the bar 
     *                 background. If `null`, the background will be 
     *                 transparent. Default to `null`.
     * @param {Constant} direction The filling direction. Default to 
     *                   `creatine.LEFT_TO_RIGHT`.
     * @param {Number} width The width of the bar. Default to 100.
     * @param {Number} height The height of the bar. Default to 10.
     * @param {Number} min The minimum value of the bar. Default to 0.
     * @param {Number} max The maximum value of the bar. Default to 100.
     * @private
    **/
    p._initialize = function(colorsOrImg, backgroundColor, direction, width, 
                            height, min, max) {
        this.Shape_constructor();

        if (colorsOrImg instanceof Array) {
            this.type = 'gradient';
            this.gradientColors = colorsOrImg;
        } else if (typeof colorsOrImg === 'string') {
            this.type = 'color';
            this.fillColor = colorsOrImg;
        } else {
            this.type = 'image';
            this.image = colorsOrImg;
            if (this.image.image) {
                this.image = this.image.image;
            }
        }

        if (backgroundColor == null) backgroundColor = null;
        if (direction == null) direction = creatine.LEFT_TO_RIGHT;
        if (width == null) width = 100;
        if (height == null) height = 10;
        if (min == null) min = 0;
        if (max == null) max = 100;

        this.backgroundColor = backgroundColor;
        this.direction = direction;
        this.width = width;
        this.height = height;
        this.min = min;
        this.max = max;
        this.value = 0;
    }

    /**
    * Returns true or false indicating whether the bar would be visible if 
    * drawn to a canvas. This does not account for whether it would be visible 
    * within the boundaries of the stage.
    * 
    * @method isVisible
    * @protected
    **/
    p.isVisible = function() {
        return !!(this.visible && this.alpha > 0 && this.scaleX != 0 && this.scaleY != 0);
    };

    p.layout = function(area) {
        this.width = area.width;
        this.height = area.height;
    }

    /**
    * Draws the ProgressBar into the specified context ignoring its visible, 
    * alpha, shadow, and transform. Returns true if the draw was handled 
    * (useful for overriding functionality).
    *
    * @method draw
    * @param {CanvasRenderingContext2D} ctx The canvas 2D context object to 
    *                                   draw into.
    * @param {Boolean} [ignoreCache=false] Indicates whether the draw operation
    *                                      should ignore any current cache. For
    *                                      example, used for drawing the cache
    *                                      (to prevent it from simply drawing 
    *                                      an existing cache back into itself).
    * @protected
    **/
    p.draw = function(ctx, ignoreCache) {
        if (this.DisplayObject_draw(ctx, ignoreCache)) { return true; }

        var x = 0;
        var y = 0;
        var w = this.width;
        var h = this.height;
        var value_w = creatine.clip(w*(this.value-this.min)/(this.max-this.min), 0, w);
        var value_h = h;
        var gline = [w, 0];

        if (this.direction === creatine.TOP_TO_BOTTOM) {
            var gline = [0, w];

            var w_ = w;
            w = h;
            h = w_;

            w_ = value_w;
            value_w = value_h;
            value_h = w_;
        } 
        else if (this.direction === creatine.BOTTOM_TO_TOP) {
            var gline = [0, -w];

            var w_ = w;
            w = h;
            h = -w_;

            w_ = value_w;
            value_w = value_h;
            value_h = -w_;
        }
        else if (this.direction === creatine.RIGHT_TO_LEFT) {
            var gline = [-w, 0];
            w = -w;
            value_w = -value_w;
        }

        this.graphics.clear();
        if (this.backgroundColor) {
            this.graphics.beginFill(this.backgroundColor);
            this.graphics.drawRect(x, y, w, h);
        }

        if (this.type === 'color') {
            this.graphics.beginFill(this.fillColor);
            this.graphics.drawRect(x, y, value_w, value_h);
        }
        else if (this.type === 'gradient') {
            var ratios = [];
            for (var i=0; i<this.gradientColors.length; i++) {
                ratios.push(i/(this.gradientColors.length-1));
            }

            this.graphics.beginLinearGradientFill(
                this.gradientColors,
                ratios,
                0, 0, gline[0], gline[1]
            );
            this.graphics.drawRect(x, y, value_w, value_h);
        }
        else if (this.type === 'image') {
            this.graphics.beginBitmapFill(this.image);
            this.graphics.drawRect(x, y, value_w, value_h);
        }


        this.graphics.draw(ctx);
        return true;
    }

    creatine.ProgressBar = createjs.promote(ProgressBar, "Shape");
}());

/*
* DiscreteBar
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
     * DiscreteBar is a progress bar that only handle discrete values. This is  
     * a simple and specific implementation of a progress bar, for a more 
     * general version, consult the ProgressBar.
     * 
     * It can filled in 4 different directions, by using the parameter 
     * `direction`: <code>LEFT_TO_RIGHT, RIGHT_TO_LEFT, TOP_TO_BOTTOM, 
     * BOTTOM_TO_TOP</code>. 
     *
     * <h4>Example</h4>
     * 
     *     // Create the Director
     *     var progress = new creatine.DiscreteBar(
     *         image,                   // The image used to fill.
     *         5,                       // The space between one image and other.
     *         creatine.LEFT_TO_RIGHT   // The director.
     *     )
     * 
     * @class DiscreteBar
     * @constructor
     * @param {Bitmap|Image} image A bitmap or image that will be used to fill 
     *                       the progress bar.
     * @param {Number} spacing The space between one image and other. Default 
     *                 to 0.
     * @param {Constant} direction The filling direction. Default to 
     *                   `creatine.LEFT_TO_RIGHT`.
    **/
    var DiscreteBar = function(image, spacing, direction) {
        this.Container_constructor();

        /**
         * The bar filling direction (`LEFT_TO_RIGHT`, `RIGHT_TO_LEFT`, 
         * `TOP_TO_BOTTOM` or `BOTTOM_TO_TOP`).
         *
         * @property direction
         * @type {Constant}
        **/
        this.direction = direction || creatine.LEFT_TO_RIGHT;

        /**
         * The image which will be used to fill the bar.
         *
         * @property image
         * @type {Image}
        **/
        if (image.image) {
            this.image = image.image;
        } else {
            this.image = image;
        }

        /**
         * The space between one image and other.
         *
         * @property spacing
         * @type {Image}
        **/
        this.spacing = spacing || 0;

        /**
         * The current value of the progress bar.
         *
         * @property value
         * @type {Number}
        **/
        this.value = 0;

    }
    var p = createjs.extend(DiscreteBar, createjs.Container);

    /**
    * Returns true or false indicating whether the bar would be visible if 
    * drawn to a canvas. This does not account for whether it would be visible 
    * within the boundaries of the stage.
    * 
    * @method isVisible
    * @protected
    **/
    p.isVisible = function() {
        var hasContent = this.value > 0 || this.cacheCanvas;
        return !!(this.visible && this.alpha > 0 && this.scaleX != 0 && this.scaleY != 0 && hasContent);
    };

    /**
    * Draws the DiscreteBar into the specified context ignoring its visible, 
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

        var dir_x = 0;
        var dir_y = 0;
        var step_x = 0;
        var step_y = 0;
        var w = this.image.width;
        var h = this.image.height;


        if (this.direction === creatine.LEFT_TO_RIGHT) {dir_x = 1;}
        else if (this.direction === creatine.RIGHT_TO_LEFT) {dir_x = -1; step_x = -w;}
        else if (this.direction === creatine.TOP_TO_BOTTOM) {dir_y = 1;}
        else if (this.direction === creatine.BOTTOM_TO_TOP) {dir_y = -1; step_y = -h;}

        this.removeAllChildren();

        for (var i=0; i<this.value; i++) {
            var bitmap = new createjs.Bitmap(this.image);
            bitmap.x = step_x;
            bitmap.y = step_y;
            this.addChild(bitmap);

            step_x += this.spacing*dir_x + w*dir_x;
            step_y += this.spacing*dir_y + h*dir_y;
        }

        return this.Container_draw(ctx, ignoreCache);
    }

    creatine.DiscreteBar = createjs.promote(DiscreteBar, "Container");
}());

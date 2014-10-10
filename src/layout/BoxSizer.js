/*
* BoxSizer
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
 * The BoxSizer is a simple layout manager that organizes its components 
 * horizontally or vertically, depending on the <code>orientationat</code> 
 * parameter.
 * 
 * BoxSizer was create to organize the game interface using a basic geometry, 
 * e.g., in a single row or column. But several BoxSizers can be nested to 
 * create a more complex layout. Notice that, for regular grids, the best 
 * option is the GridSizer.
 * 
 * A BoxSizer requires an orientation parameter, which can be the constants
 * <code>HORIZONTAL</code> or <code>HORIZONTAL</code>. It also requires a
 * rectangle containing the information of how much space the sizer can use to
 * expand and organize its elements.
 * 
 * By specifying the proportion parameter when adding a child, the BoxSizer 
 * will expand to occupy all the available area. By doing this, the sizer also
 * can align the component using the anchor position. The anchor parameter
 * can be specified using the following constants: <code>LEFT, RIGHT, TOP, 
 * BOTTOM, TOP_LEFT, TOP_RIGHT, BOTTOM_LEFT, BOTTOM_RIGHT, CENTER</code>.
 * 
 * Each component can also have an individual border, by setting the border 
 * parameter when adding it to the sizer.
 * 
 * 
 * <h4>Example</h4>
 * 
 * A BoxSizer which grows horizontally and occupying all space of a canvas can
 * be created as:
 * 
 *     var area = new createjs.Rectangle(0, 0, canvas.width, canvas.height);
 *     var hbox = new creatine.BoxSizer(creatine.HORIZONTAL, area);
 * 
 * And components can be added as:
 * 
 *     hbox.add(my_text, 1, 0, creatine.CENTER);
 *     hbox.add(my_sprite);
 *     hbox.layout()
 * 
 * In the example above, the <code>my_sprite</code> component will be put at
 * the right while <code>my_text</code> will be moved the the center of the
 * remaining area.
 * 
 * @class BoxSizer
 * @constructor
 * @param {Constant} orientation The orientation of the sizer (horizontal or
 *                   vertical).
 * @param {createjs.Rectangle} area A rectangle containing the usable area of
 *                             the sizer.
**/
var BoxSizer = function(orientation, area) {
    this.initialize(orientation, area);
}
var p = BoxSizer.prototype;

    /**
     * The orientation of the sizer (use the HORIZONTAL or VERTICAL constants)
     *
     * @property orientation
     * @type {Constant}
    **/
    p.orientation = null;

    /**
     * The list within all items in this sizer together with their proportions,
     * border, and anchor.
     * 
     * @property children
     * @type {Array}
     * @private
    **/
    p.children = null;

    /**
     * A rectangle representing the area of which the sizer can use.
     *
     * @property area
     * @type {createjs.Rectangle}
    **/
    p.area = null;

    /**
     * Initialization method.
     * 
     * @method initialize
     * @param {Constant} orientation The orientation of the sizer (horizontal or
     *                   vertical).
     * @param {createjs.Rectangle} area A rectangle containing the usable area
     *                             of the sizer.
     * @protected
    **/
    p.initialize = function(orientation, area) {
        this.orientation = orientation;
        this.children = [];
        this.area = area;
    }
    
    /**
     * Adds a new object to the sizer.
     *
     * @method add
     * @param {Object} object The DisplayObject to be organized by this sizer.
     * @param {Number} proportion The expansion weight of this item, use 0 
     *                 (zero) to not expand. Default to 0.
     * @param {Number} border The spacing around this item. Default to 0.
     * @param {Constant} anchor The anchor of the object, only useful if 
     *                   proportion is greater than 0. Default to 
     *                   <code>creatine.TOP_LEFT</code>
    **/
    p.add = function(object, proportion, border, anchor) {
        anchor     = anchor     || creatine.TOP_LEFT;
        proportion = proportion || 0;
        border     = border     || 0;

        this.children.push([object, proportion, anchor, border]);
    }

    /**
     * Resize this sizer and its children.
     * 
     * For the root sizer, the parameter <code>area</code> does not to be 
     * specified, but it is automatically set in nested sizers.
     *
     * @method layout 
     * @param {createjs.Rectangle} area A rectangle containing the usable area
     *                             of the sizer. 
    **/
    p.layout = function(area) {
        if (area)
            this.area = area;

        var borders = 0;
        var proportions = 0;
        var fixed_widths = 0;
        var fixed_heights = 0;

        // Compute the available area
        for (var i=0; i<this.children.length; i++) {
            var item        = this.children[i][0];
            var proportion  = this.children[i][1];
            var anchor      = this.children[i][2];
            var border      = this.children[i][3];

            borders += border*2;
            if (proportion > 0) {
                proportions += proportion;
            } else {
                var bounds = item.getBounds();
                fixed_widths += bounds.width;
                fixed_heights += bounds.height;
            }
        }

        var avaliable_w = (this.area.width-borders-fixed_widths);
        var avaliable_h = (this.area.height-borders-fixed_heights);

        // Resize
        var step_x = this.area.x;
        var step_y = this.area.y;
        var x, y, w, h, weight = 0;
        for (var i=0; i<this.children.length; i++) {
            var item        = this.children[i][0];
            var proportion  = this.children[i][1];
            var anchor      = this.children[i][2];
            var border      = this.children[i][3];

            x = step_x + border;
            y = step_y + border;

            if (this.orientation == creatine.VERTICAL) {
                if (proportion == 0) {
                    var bounds = item.getBounds();
                    w = bounds.width;
                    h = bounds.height;
                } else {
                    weight = proportion/proportions;
                    w = this.area.width - border*2;
                    h = weight*avaliable_h;
                }

                step_y += h + border*2;
            }
            else if (this.orientation == creatine.HORIZONTAL) {
                if (proportion == 0) {
                    var bounds = item.getBounds();
                    w = bounds.width;
                    h = bounds.height;
                } else {
                    weight = proportion/proportions;
                    w = weight*avaliable_w;
                    h = this.area.height - border*2;
                }

                step_x += w + border*2;
            }

            this._resize_child(item, {x:x, y:y, width:w, height:h}, anchor);
        }
    }

    /**
     * Propagate the layout to a child and move it accordingly to its anchor.
     *
     * @method _resize_child 
     * @param {Object} item The DisplayObject to be organized by this sizer.
     * @param {createjs.Rectangle} area A rectangle containing the usable area
     *                             of the object. 
     * @param {Constant} anchor The anchor of the object, only useful if 
     *                   proportion is greater than 0. Default to 
     *                   <code>creatine.TOP_LEFT</code>
     * @private
    **/
    p._resize_child = function(item, area, anchor) {
        if (item.layout) {
            item.layout(area);
        }

        if (item.getBounds) {
            var bounds = item.getBounds();
        }

        if (bounds) {
            var w = bounds.width*item.scaleX;
            var h = bounds.height*item.scaleY;
        }
        else {
            var w = 0;
            var h = 0;
        }

        // Set y
        switch (anchor) {
            case creatine.TOP:
            case creatine.TOP_LEFT:
            case creatine.TOP_RIGHT:
                item.y = area.y;
                break;

            case creatine.LEFT:
            case creatine.CENTER:
            case creatine.RIGHT:
                item.y = (area.y+area.height/2)-h/2;
                break;
            
            case creatine.BOTTOM:
            case creatine.BOTTOM_LEFT:
            case creatine.BOTTOM_RIGHT:
                item.y = area.y+area.height-h;
                break;                
        }

        // Set x
        switch (anchor) {
            case creatine.LEFT:
            case creatine.TOP_LEFT:
            case creatine.BOTTOM_LEFT:
                item.x = area.x;
                break;

            case creatine.TOP:
            case creatine.CENTER:
            case creatine.BOTTOM:
                item.x = (area.x+area.width/2)-w/2;
                break;
            
            case creatine.RIGHT:
            case creatine.TOP_RIGHT:
            case creatine.BOTTOM_RIGHT:
                item.x = area.x+area.width-w;
                break;                
        }
    }

creatine.BoxSizer = BoxSizer;
}());

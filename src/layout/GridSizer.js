/*
* GridSizer
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
     * GridSizer is a layout manager that organizes its components in a regular
     * grid. 
     * 
     * Parameters <code>rows</code> and <code>cols</code> specify how many rows
     * and columns the grid will have, respectively. All cells in the grid have
     * the same size. However, each cell can have an individual border, by 
     * setting the border parameter when adding an object to the sizer.

     * The anchor parameter can be specified using the following constants: 
     * <code>LEFT, RIGHT, TOP, BOTTOM, TOP_LEFT, TOP_RIGHT, BOTTOM_LEFT, 
     * BOTTOM_RIGHT, CENTER</code>.
     * 
     * <h4>Example</h4>
     * 
     * A GridSizer which with 3 rows and 5 columns, and occupying all space of 
     * a canvas can be created as:
     * 
     *     var area = new createjs.Rectangle(0, 0, canvas.width, canvas.height);
     *     var hbox = new creatine.GridSizer(3, 5, area);
     * 
     * @class GridSizer
     * @constructor
     * @param {Number} rows The number of rows in the grid.
     * @param {Number} cols The number of columns in the grid.
     * @param {createjs.Rectangle} area A rectangle containing the usable area 
     *                             of the sizer.
    **/
    var GridSizer = function(rows, cols, area) {
        /**
         * The number of rows in the grid.
         * 
         * @property rows
         * @type {Number}
        **/
        this.rows = rows;

        /**
         * The number of columns in the grid.
         * 
         * @property cols
         * @type {Number}
        **/
        this.cols = cols;

        /**
         * The list within all items in this sizer together with their proportions,
         * border, and anchor.
         * 
         * @property children
         * @type {Array}
         * @private
        **/
        this.children = [];

        /**
         * A rectangle representing the area of which the sizer can use.
         *
         * @property area
         * @type {createjs.Rectangle}
        **/
        this.area = area;
    }
    var p = GridSizer.prototype;

    /**
     * Adds a new object to the sizer.
     *
     * @method add
     * @param {Object} object The DisplayObject to be organized by this sizer.
     * @param {Number} border The spacing around this item. Default to 0.
     * @param {Constant} anchor The anchor of the object. Default to 
     *                   <code>creatine.TOP_LEFT</code>
    **/
    p.add = function(object, border, anchor) {
        anchor = anchor || creatine.TOP_LEFT;
        border = border || 0;

        this.children.push([object, anchor, border]);
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

        var base_w = this.area.width/this.cols;
        var base_h = this.area.height/this.rows;

        for (var i=0; i<this.children.length; i++) {
            var item   = this.children[i][0];
            var anchor = this.children[i][1];
            var border = this.children[i][2];

            var x = this.area.x + base_w*Math.floor(i%this.cols) + border;
            var y = this.area.y + base_h*Math.floor(i/this.cols) + border;
            var w = base_w - border*2;
            var h = base_h - border*2;

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
        if (item.layout)
            item.layout(area);

        if (item.getBounds)
            var bounds = item.getBounds();

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

    creatine.GridSizer = GridSizer;
}());

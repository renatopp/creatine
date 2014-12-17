/*
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
* Creatine is a library that powers up the CreateJS suite! 
*
* Focusing on Game Development, creatine adds several new features such as:
* 
* <ul>
*   <li>Scene Management;</li>
*   <li>Scene Transitions;</li>
*   <li>Layout Management;</li>
*   <li>Canvas Resizing and other Display options;</li>
*   <li>Device Detection;</li>
*   <li>Other Visual Components, such as Flexible Bitmaps and Progress Bars</li>
* </ul>
* 
* Feel free to use, modify, improve, make additions and suggestions.
*
* @module Creatine
* @main Creatine
*/
this.creatine = this.creatine || {};

(function() {
    "use strict";

    // injected by build process
    creatine.version = /*version*/"0.2.0dev";
    creatine.buildDate = /*date*/"Wed, 17 Dec 2014 02:42:29 GMT";

    // Direction and Anchor constants
    creatine.LEFT          = 1;
    creatine.RIGHT         = 2;
    creatine.TOP           = 3;
    creatine.BOTTOM        = 4;
    creatine.TOP_LEFT      = 5;
    creatine.TOP_RIGHT     = 6;
    creatine.CENTER        = 7;
    creatine.BOTTOM_LEFT   = 8;
    creatine.BOTTOM_RIGHT  = 9;

    // Axis constants
    creatine.HORIZONTAL    = 10;
    creatine.VERTICAL      = 11;

    // Filling constants
    creatine.LEFT_TO_RIGHT = 12;
    creatine.RIGHT_TO_LEFT = 13;
    creatine.TOP_TO_BOTTOM = 14;
    creatine.BOTTOM_TO_TOP = 15;

    // Resizing constants
    creatine.STRETCH       = 16;
    creatine.FIT           = 17;
    creatine.FILL          = 18;
    creatine.NOSCALE       = 19;

})();
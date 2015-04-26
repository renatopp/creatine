/** 
 * @module creatine
 */

(function() {
  "use strict";

  /**
   * System class, no function yet.
   * 
   * @class System
   * @constructor
   */
  var System = function() {
    this.initialize();
  }
  var p = System.prototype;
  
  p.initialize = function() {}
  p.enter = function() {}
  p.pause = function() {}
  p.resume = function() {}
  p.update = function() {}
  p.exit = function() {}

  creatine.System = System;

  // @SHORTCUT
  creatine._system = function(properties) {
    var S = function() { this.System_constructor(); }
    var p = createjs.extend(S, creatine.System);
    for (k in properties) { p[k] = properties[k]; }
    return createjs.promote(S, 'System');
  }
}());

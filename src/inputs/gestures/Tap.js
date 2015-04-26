this.creatine = this.creatine || {};
this.creatine.gestures = this.creatine.gestures || {};

Tap.

(function() {
  "use strict";

  var Tap = function(manager, game) {
    this.game = game;
    this.manager = manager;
    this.state = 'idle'; // running, 

    this.interval = 300;
    this.time = 250;
    this.threshold = 2;
    this.posThreshold = 10;

  }
  var p = Tap.prototype;

  p._reset = function() {
    this.state = 'idle';
  }
  p._updateTouch = function(data) {
    
  }

  creatine.gestures.Tap = Tap;
})();
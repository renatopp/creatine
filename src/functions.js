/**
 * @module core functions
 */


/**
 * Shuffle a given array.
 * 
 * @class shuffle
 * @constructor
 * @param {Object} array The target array.
 * @returns {Object} The same target array.
 */
creatine.shuffle = function(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {
    
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}


/**
 * Returns a uniformly random float between -1 and 1.
 * 
 * @class randomPolar
 * @constructor
 * @returns {Number} A random float.
 */
creatine.randomPolar = function() {
  return Math.random()*2-1;
}


/**
 * Returns a uniformly random integer between `min` and `max`, inclusive.
 * 
 * @class randomInt
 * @constructor
 * @param {Integer}  min The minimum value.
 * @param {Integer}  max The maximum value.
 * @returns {Integer} A random integer.
 */
creatine.randomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


/**
 * Keeps a value `v` between `min` and `max`.
 * 
 * @class clip
 * @constructor
 * @param {Number}  v The value to be bounded.
 * @param {Number}  min The minimum bound for the value.
 * @param {Number}  max The maximum bound for value.
 * @returns {Number} The bounded value.
 */
creatine.clip = function(v, min, max) {
  return Math.max(Math.min(v, max), min);
}


/**
 * Keeps a angle (in degrees) between 0 and 359.
 * 
 * @class wrapAngle
 * @constructor
 * @param {Number}  angle The angle in degrees.
 * @returns {Number} The wrapped value.
 */
creatine.wrapAngle = function(angle) {
  return (angle<0)? 360+angle%360 : angle%360;
}


/**
 * Returns the minimum distance from angle `a1` to `a2` (both in degrees). The
 * result is kept between 0 and 359.
 * 
 * @class angleDistance
 * @constructor
 * @param {Number}  a1 The initial angle in degrees.
 * @param {Number}  a2 The final angle in degrees.
 * @returns {Number} The angle distance value.
 */
creatine.angleDistance = function(a1, a2) {
  a1 = (a1<0)? 360+a1%360 : a1%360;
  a2 = (a2<0)? 360+a2%360 : a2%360;

  var d = a2-a1;
  if (d<0) d+=360;
  if (d>180) d = 360-d;

  return d;
}


/**
 * Returns the direction that represents the minimum distance from angle `a1` 
 * to `a2` (in degrees). The result is `-1`, `1`, or `0` if equal.
 * 
 * @class angleDirection
 * @constructor
 * @param {Number}   a1 The initial angle in degrees.
 * @param {Number}   a2 The final angle in degrees.
 * @returns {Integer} A direction -1, 1 or 0.
 */
creatine.angleDirection = function(a1, a2) {
  a1 = (a1<0)? 360+a1%360 : a1%360;
  a2 = (a2<0)? 360+a2%360 : a2%360;

  if (a1 === a2) return 0;

  var d = a2-a1;
  if (d<0) d+=360;
  if (d>180) return -1;

  return 1;
}


/**
 * When two or more object arguments are supplied to `merge`, properties from 
 * all of the objects are added to the target object.
 * 
 * Notice that this function does not do deep copy.
 *
 * Reference: http://stackoverflow.com/questions/11197247/javascript-equivalent-of-jquerys-extend-method
 * 
 * @class merge
 * @constructor
 * @param {Object}   target  An object that will receive the new properties.
 * @param {Object}   object1 An object containing additional properties to 
 *                           merge in.
 * @param {Object}   objectN Additional objects containing properties to merge 
 *                           in.
 * @returns {Object} The `target` object with properties merged.
 */
creatine.merge = function() {
  for(var i=1; i<arguments.length; i++) {
    for(var key in arguments[i]) {
      if(arguments[i].hasOwnProperty(key)) {
        if(typeof key === 'object') {
          arguments[0][key] = creatine.merge.call(null, arguments[0][key]||{}, arguments[i][key]);
        } else {
          arguments[0][key] = arguments[i][key];
        }
      }
    }
  }

  return arguments[0];
}


/**
 * Loads a JSON-encoded data from the server using a GET HTTP request.
 *
 * Reference: http://ondrek.me/post/84819614785/how-to-get-json-xml-in-jquery-and-in-vanilla
 * 
 * @class getJSON
 * @constructor
 * @param {String}   url     The URL to which the request is sent.
 * @param {Function} success The callback function that is executed if the 
 *                           request succeeds.
 */
creatine.getJSON = function(url, success) {
  function callback(data) {
    if (data && typeof success === 'function') {
      success(JSON.parse(data));
    }
  }

  var xmlhttp = new XMLHttpRequest();                 
  xmlhttp.overrideMimeType('application/json');  
  xmlhttp.onreadystatechange = function() {
      ready = (xmlhttp.readyState === 4 && xmlhttp.status === 200);
      callback(ready?xmlhttp.responseText:false);
  };
  xmlhttp.open('GET', url, true);
  xmlhttp.send();
}


/**
 * Generates a new sequential identifier, starting from `1`.
 *
 * @class newId
 * @constructor
 * @returns A sequential integer.
 */
creatine.__lastID=0;
creatine.newId = function() {
  return ++creatine.__lastID;
};
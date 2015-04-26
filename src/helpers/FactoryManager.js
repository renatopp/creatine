/** 
 * @module creatine
 */

(function() {
  "use strict";

  /**
   * The factory manager facilitates the creation of some objects. It is 
   * instantiated by the game and can be accessed via `game.create`. 
   *
   * The functions here receives some obligatory or essential parameters plus 
   * a parameter name `properties`, whose values will be write into the new 
   * object. Additionally, you can use constants to set the object registration
   * points (only if the object implements the `getBounds` function correctly).
   * Take a look at the example below to see this work.
   * 
   * Notice that this factory does not add the objects to the stage, you must 
   * do that manually. It is **highly recommended** that you create all your 
   * objects during the initialization of the game (the create state).
   * 
   * ## Usage example
   *
   *     var game = new tine.Game(null, {
   *       preload: function() {
   *         game.load.image('daisy', 'path/to/daisy.png');
   *       },
   *       create: function() {
   *        var image = game.create.bitmap('daisy', 
   *          {x:400, y:300, regX:'center', regY:'center'} // or
   *        //{x:400, y:300, regX:tine.CENTER, regY:tine.CENTER}
   *        )
   *        game.stage.addChild(image);
   *       }
   *     })
   * 
   * @class FactoryManager
   * @constructor
   * @param {Object} game The game instance.
   */ 
  var FactoryManager = function(game) {
    /**
     * The game instance.
     * @property {creatine.Game} game
     */
    this.game = game;
  }
  var p = FactoryManager.prototype;
  
  //---------------------------------------------------------------------------
  // INTERNAL METHODS
  //---------------------------------------------------------------------------
  /**
   * Set the registration points for a given object. The anchors are given 
   * independently and can be the constants `'left', 'center', 'right'` for 
   * `regX` and `'top', 'center', 'bottom'` for `regY`. Notice that, this will
   * only set the anchor using constants if the object implements the method
   * `getBounds`.
   * 
   * @method _setAnchor
   * @param {Object} object The target object.
   * @param {Integer or String} regX The registration point at X.
   * @param {Integer or String} regY The registration point at Y.
   * @private
   */
  p._setAnchor = function(object, regX, regY) {
    var bounds = object.getBounds() || {};
    var w = bounds.width || 0;
    var h = bounds.height || 0;

    if (regX===creatine.LEFT) {
      object.regX = 0;
    } else if (regX===creatine.CENTER) {
      object.regX = w/2;
    } else if (regX===creatine.RIGHT) {
      object.regX = w;
    } else {
      object.regX = regX
    }

    if (regY===creatine.TOP) {
      object.regY = 0;
    } else if (regY===creatine.CENTER) {
      object.regY = h/2;
    } else if (regY===creatine.BOTTOM) {
      object.regY = h;
    } else {
      object.regY = regY
    }
  }

  /**
   * Given a set of properties, this method insert these properties into a 
   * given object.
   * 
   * @method _setProperties
   * @param {Object} object The target object.
   * @param {Object} [properties] The object with properties.
   * @private
   */
  p._setProperties = function(object, properties) {
    for (var key in properties) {
      if (key === 'regX' || key === 'regY') continue;
      object[key] = properties[key];
    }
    this._setAnchor(object, properties['regX'], properties['regY'])
  }

  /**
   * If string, retrieve the resource from the resource manager. Otherwise it
   * just return the same object. It will throw an error if the provided ID 
   * isn't recorded at the resource manager.
   * 
   * @method _getResource
   * @param {Object} idOrData An ID string or an object.
   * @returns {Object} The resource.
   * @private
   */
  p._getResource = function(idOrData) {
    var resource = idOrData;
    if (typeof idOrData === 'string') {
      resource = this.game.load.get(idOrData);
      if (!resource && !idOrData.startsWith('data:')) {
        throw Error('Resource "'+idOrData+'" couldn\'t be found.');
      }
    }

    return resource;
  }

  //---------------------------------------------------------------------------
  // PUBLIC FACTORY METHODS
  //---------------------------------------------------------------------------
  /**
   * Creates a new `createjs.Bitmap` object.
   * 
   * @method bitmap
   * @param {Object} idOrData An ID string or an image object.
   * @param {Object} [properties] A list of initial properties.
   * @returns {Object} The Bitmap.
   */
  p.bitmap = function(idOrData, properties) {
    var image = this._getResource(idOrData);
    var bitmap = new createjs.Bitmap(image);
    if (properties) this._setProperties(bitmap, properties);
    return bitmap;
  }

  /**
   * Creates a new `createjs.SpriteSheet` object from a given data.
   * 
   * @method spritesheet
   * @param {Object} idOrData An ID string for a loaded data or a data object.
   * @param {Object} [properties] A list of initial properties.
   * @returns {Object} The SpriteSheet.
   */
  p.spritesheet = function(idOrData, properties) {
    var data = this._getResource(idOrData);
    var ss = new createjs.SpriteSheet(data);
    if (properties) this._setProperties(ss, properties);
    return data;
  }

  /**
   * Creates a new `createjs.Sprite` given the sprite sheet and the animation.
   * 
   * @method sprite
   * @param {Object} idOrData An ID string or a spritesheet object.
   * @param {Object} animation The animation of the sprite.
   * @param {Object} [properties] A list of initial properties.
   * @returns {Object} The Sprite.
   */
  p.sprite = function(idOrData, animation, properties) {
    var image = this._getResource(idOrData);
    var sprite = new createjs.Sprite(image, animation);
    if (properties) this._setProperties(sprite, properties);
    return sprite;
  }

  /**
   * Creates a new `creatine.tmx.Map` from a Tiled data.
   * 
   * @method tilemap
   * @param {Object} idOrData An ID string or a data object.
   * @param {Object} [properties] A list of initial properties.
   * @returns {Object} The tile Map.
   */
  p.tilemap = function(idOrData, properties) {
    var data = this._getResource(idOrData);
    var map = new creatine.tmx.Map(data);
    if (properties) this._setProperties(map, properties);
    return map;
  }

  /**
   * Creates a new `creatine.BitmapText` from a spritesheet.
   * 
   * @method bitmaptext
   * @param {Object} idOrData An ID string or a sprite sheet object.
   * @param {Object} text The initial text.
   * @param {Object} [properties] A list of initial properties.
   * @returns {Object} The bitmap text.
   */
  p.bitmaptext = function(idOrData, text, properties) {
    var image = this._getResource(idOrData);
    var bitmap = new createjs.BitmapText(text, image);
    if (properties) this._setProperties(bitmap, properties);
    return bitmap;
  }

  /**
   * Creates a new `creatine.Text`.
   * 
   * @method text
   * @param {Object} text The initial text.
   * @param {Object} [properties] A list of initial properties.
   * @returns {Object} The text.
   */
  p.text = function(text, properties) {
    var obj = new createjs.Text(text);
    if (properties) this._setProperties(obj, properties);
    return obj;
  }

  /**
   * Creates a new `creatine.Shape`.
   * 
   * @method shape
   * @param {Object} [properties] A list of initial properties.
   * @returns {Object} The shape.
   */
  p.shape = function(properties) {
    var shape = new createjs.Shape();
    if (properties) this._setProperties(shape, properties);
    return shape;
  }

  /**
   * Shortcut for:
   *
   *     var shape = game.create.shape(properties);
   *     shape.graphics.f(color).dc(0, 0, r);
   * 
   * @method circle
   * @param {Number} r The circle radius.
   * @param {Object} [color='white'] The circle color.
   * @param {Object} [properties] A list of initial properties.
   * @returns {Object} The shape.
   */
  p.circle = function(r, color, properties) {
    var shape = new createjs.Shape();
    shape.graphics.f(color||'white').dc(0, 0, r);
    if (properties) this._setProperties(shape, properties);
    return shape;
  }

  /**
   * Shortcut for:
   *
   *     var shape = game.create.shape(properties);
   *     shape.graphics.f(color).r(-w/2, -h/2, w, h);
   * 
   * @method box
   * @param {Number} w The box width.
   * @param {Number} h The box height.
   * @param {Object} [color='white'] The box color.
   * @param {Object} [properties] A list of initial properties.
   * @returns {Object} The shape.
   */
  p.box = function(w, h, color, properties) {
    var shape = new createjs.Shape();
    shape.graphics.f(color||'white').r(-w/2, -h/2, w, h);
    if (properties) this._setProperties(shape, properties);
    return shape;
  }

  creatine.FactoryManager = FactoryManager;
})();

/**
 * @module creatine.tmx
 **/

(function() {
  "use strict";

  /**
   * Map is the class that handle tile maps in the TMX format, specified by the
   * tile software Tiled. A TMX map is composed of one or more layers (tile 
   * layers, object layers or image layers) and one or more tilesets (image 
   * atlases). Creatine supports all types of layers and projections described
   * by the TMX specification: orthogonal, isometric and staggered.
   *
   * The Map receives a data object following the TMX specification. This is
   * usually loaded from a json map. 
   *
   * 
   * ## Usage example
   *
   * Notice that, Map is a display object, inherited from `createjs.Container`,
   * it means that, after loading the map you can simply add it to the stage:
   * 
   *     var map = new creatine.tmx.Map(dataObject);
   *     stage.addChild(map);
   *
   * 
   * ## Data format
   *
   * In relation to the map properties, the data must be in the following 
   * format:
   * 
   *     var data = {
   *         'version'     : [Integer], // default to 1
   *         'orientation' : [String],  // default to 'orthogonal'
   *         'renderorder' : [String],  // default to 'right-down'
   *         'height'      : [Integer], // default to 0
   *         'width'       : [Integer], // default to 0
   *         'tileheight'  : [Integer], // default to 0
   *         'tilewidth'   : [Integer], // default to 0
   *         'tilesets'    : [Array],   // mandatory
   *         'layers'      : [Array],   // mandatory
   *         'properties'  : [Object],
   *     }
   * 
   * Consult the specific classes for layer and tileset to known more about 
   * the data format for these structures or consult the official TMX 
   * description: https://github.com/bjorn/tiled/wiki/TMX-Map-Format
   *
   * @class Map
   * @extends createjs.Container
   * @param {Object} data A data object describing the map.
   * @constructor
  **/
  var Map = function(data) {
    /**
     * Map version
     * @property version
     * @type {Integer}
     * @readonly
    **/
    this.version = null;

    /**
     * Orientation of the map, it supports "orthogonal", "isometric" and 
     * "staggered".
     *
     * @property orientation
     * @type {String}
     * @readonly
    **/
    this.orientation = null;

    /**
     * Order of rendering, supports "right-down", "right-up", "left-down" and
     * "left-up".
     *
     * @property renderOrder
     * @type {String}
     * @readonly
    **/
    this.renderOrder = null;

    /**
     * Describes how many tiles the map have in the y axis.
     * @property height
     * @type {Integer}
     * @readonly
    **/
    this.height = null;

    /**
     * Describes how many tiles the map have in the x axis.
     * @property width
     * @type {Integer}
     * @readonly
    **/
    this.width = null;

    /**
     * Height of tiles.
     * @property tileHeight
     * @type {Integer}
     * @readonly
    **/
    this.tileHeight = null;

    /**
     * Width of tiles.
     * @property tileWidth
     * @type {Integer}
     * @readonly
    **/
    this.tileWidth = null;

    /**
     * The list of tilesets in the map.
     * @property tilesets
     * @type {Array}
     * @readonly
    **/
    this.tilesets = null;

    /**
     * The list of layers in the map.
     * @property layers
     * @type {Array}
     * @readonly
    **/
    this.layers = null;

    /**
     * User defined properties object.
     * @property properties
     * @type {Object}
     * @readonly
    **/
    this.properties = null;


    this._initialize(data);
  }
  var p = createjs.extend(Map, createjs.Container);

  /**
   * Initialization method.
   * @method _initialize
   * @param {Object} data A data object describing the map.
   * @private
  **/
  p._initialize = function(data) {
    this.Container_constructor();
    this.version     = data['version'] || 1;
    this.orientation = data['orientation'] || 'orthogonal';
    this.renderOrder = data['renderorder'] || 'right-down';
    this.height      = data['height'] || 0;
    this.width       = data['width'] || 0;
    this.tileHeight  = data['tileheight'] || 0;
    this.tileWidth   = data['tilewidth'] || 0;
    this.properties  = data['properties'];
    this.tilesets    = [];
    this.layers      = [];

    this._createTilesets(data);
    this._createLayers(data);
  }
  /**
   * Create the tileset objects.
   * @method _createTilesets
   * @param {Object} data An object following the TMX specification.
   * @protected
  **/
  p._createTilesets = function(data) {
    for (var i=0; i<data['tilesets'].length; i++) {
      this.tilesets.push(
        new creatine.tmx.Tileset(data['tilesets'][i])
      )
    }
  }

  /**
   * Create the layer objects.
   * @method _createLayers
   * @param {Object} data An object following the TMX specification.
   * @protected
  **/
  p._createLayers = function(data) {
    for (var i=0; i<data['layers'].length; i++) {
      var layerType = data['layers'][i].type;

      if (layerType == 'tilelayer') {
        if (this.orientation == 'orthogonal')
          var Layer = creatine.tmx.OrthogonalTileLayer

        else if (this.orientation == 'isometric')
          var Layer = creatine.tmx.IsometricTileLayer

        else if (this.orientation == 'staggered')
          var Layer = creatine.tmx.StaggeredTileLayer

        else
          throw new Error('Unknown layer type: "'+layerType+'"');

        var layer = new Layer(this, data['layers'][i]);
        this.layers.push(layer);
        this.addChild(layer);

      } else if (layerType == 'objectgroup') {
        this.layers.push(
          new creatine.tmx.ObjectLayer(this, data['layers'][i])
        );
          
      } else if (layerType == 'imagelayer') {
        var layer = new creatine.tmx.ImageLayer(this, data['layers'][i])

        this.addChild(layer);
        this.layers.push(layer);
      }
    }
  }

  /**
   * Returns the tileset which holds the provided global ID.
   * @method getTilesetByGid
   * @param {Integer} gid A global ID.
  **/
  p.getTilesetByGid = function(gid) {
    for (var i=this.tilesets.length-1; i>=0; i--) {
      if (this.tilesets[i].firstgid <= gid) {
        return this.tilesets[i];
      }
    }
  }

  /**
   * Returns a layer by name.
   * @method getLayerByName
   * @param {String} name Layer name.
  **/
  p.getLayerByName = function(name) {
    for (var i=0; i<this.layers.length; i++) {
      if (this.layers[i].name == name) {
        return this.layers[i];
      }
    }
  }

  creatine.tmx.Map = createjs.promote(Map, "Container");
}());
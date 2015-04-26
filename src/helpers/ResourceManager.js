/** 
 * @module creatine
 */

(function() {
  "use strict";

  /**
   * The role of a resource manager is to load and handle different file types.
   * It instantiated by the game and can be accessed via `game.load`.
   * 
   * The `ResourceManager` is a bridge to the `createjs.LoadQueue`, which can 
   * be accessed using `game.load._loader`. It adds some features to the 
   * default load queue of CreateJS, such as the capability to define groups 
   * (of sound manager) directly in the manifest or convert all images directly
   * into `createjs.SpriteSheet` objects.
   *
   * Events to the queue can be added or removed via `on` and `off`. To 
   * retrieve some result you can simply use the `get` method. The resource 
   * manager can handle directly the following types:
   *
   * - **image**: a simple image as PNG, JPG or GIF.
   * - **spritesheet**: an image atlas that will be converted to the 
   * spritesheet object.
   * - **audio**: an audio file. It can be added directly to the sound groups.
   * - **audiosprite**: an audio atlas that will be converted to individual
   * sounds, each sound can be individually added to the sound groups.
   * - **json**: a JSON object that will be converted to a data object.
   * - **script**: a JavaScript file that will be added automatically to the 
   * page.
   * - **css**: a stylesheet file that will be added automatically to the page.
   * - **manifest**: a manifest list. Notice that this can be slightly 
   * different from the manifest used by CreateJS.
   * - **raw**: any other requisition that will be send directly to the 
   * `LoadQueue`.
   *
   * ## Usage examples
   *
   *     var game = new tine.Game({resources:{
   *       manifest: [
   *         {id:'img_daisy', src:'path/image/daisy.png'},
   *         {
   *           id:'img_grant', 
   *           src:'path/spritesheet/grant.png',
   *           type:'spritesheet',
   *           data: {
   *             frames: {width:50, height:50},
   *             animations: {stand: 0, run: [1, 5]}
   *           }  
   *         }
   *       ]
   *     }})
   *
   * Alternatively:
   *
   *     var game = new tine.Game(null, {
   *       preload: function() {
   *         game.load.image('img_daisy', 'path/image/daisy.png');
   *         game.load.spritesheet('img_grant', 'path/spritesheet/grant.png', {
   *           frames: {width:50, height:50},
   *           animations: {stand: 0, run: [1, 5]}
   *         });
   *       }
   *     })
   * 
   * 
   * 
   * @class ResourceManager
   * @constructor
   * @param {Object} game The game instance.
   */
  var ResourceManager = function(game) {
    /**
     * The game instance.
     * @property {creatine.Game} game
     */
    this.game = game;

    /**
     * Cache for post processed objects. Other objects are store in `_loader`.
     * @property {Object} _cache
     */
    this._cache = {};

    /**
     * The queued objects to post process.
     * @property {Array} _processQueue
     */
    this._processQueue = [];
  
    /**
     * The base path for assets, this will be used as prefix the resource 
     * pathes.
     * 
     * @property {String} basePath
     */
    this.basePath = '';

    // config
    this._initializeConfig(game.config['resources']||{})

    // loadqueue
    this._loader = new createjs.LoadQueue(false);
    this._loader.installPlugin(createjs.Sound);
    this._loader.on('complete', this._postProcess, this);
  }
  var p = ResourceManager.prototype;


  // --------------------------------------------------------------------------
  // INTERNAL METHODS
  // --------------------------------------------------------------------------
  /**
   * Validate the configuration object provided by the user. It merges the 
   * argument with the default options if necessary.
   * 
   * @method _initializeConfig
   * @param {Object} [config] The configuration object.
   * @return {Object}         The configuration object.
   * @private
   */
  p._initializeConfig = function(config) {
    if (config.base_path && typeof config.base_path === 'string') {
      this.basePath = config.base_path;
      if (!this.basePath.endsWith('/')) { this.basePath += '/'; }
    }
  }

  /**
   * Handle some types after the preloading process, like spritesheets, 
   * audio and audiosprites. The processed files may be included into the 
   * `_cache`.
   * 
   * @method _postProcess
   * @private
   */
  p._postProcess = function() {
    for (var i=0; i<this._processQueue.length; i++) {
      var toProcess = this._processQueue[i];
      var tempObject = this._loader.getResult(toProcess.id);

      switch (toProcess.type) {
        case 'spritesheet':
          toProcess.data['images'] = [tempObject];
          var finalObject = new createjs.SpriteSheet(toProcess.data);
          break;
        case 'audio':
          if (toProcess.data && toProcess.data.group) {
            this.game.sound.add(toProcess.id, toProcess.data.group);
          }
          break;
        case 'audiosprite':
          if (toProcess.data) {
            var data = toProcess.data;
            for (var j=0; j<data.length; j++) {
              var d = data[j];
              if (d.group) {
                this.game.sound.add(d.id, d.group);
              }
            }
          }
          break;
      }

      if (finalObject) {
        this._cache[toProcess.id] = finalObject;
      }
    }
  }


  // --------------------------------------------------------------------------
  // PUBLIC COMMON METHODS
  // --------------------------------------------------------------------------
  /**
   * Register an event to the CreateJS `LoadQueue`. This is a shortcut for 
   * `_loader.on`.
   *
   * @method on
   * @param {String} event The event name.
   * @param {Function} callback The callback function.
   * @param {Object} context The context object.
   */
  p.on = function(event, callback, context) {
    this._loader.on(event, callback, context);
  }

  /**
   * Unregister an event to the CreateJS `LoadQueue`. This is a shortcut for 
   * `_loader.off`.
   *
   * @method on
   * @param {String} event The event name.
   * @param {Function} callback The callback function.
   */
  p.off = function(event, callback) {
    this._loader.off(event, callback);
  }

  /**
   * Initialize the preloading process. This is called automatically by the 
   * game, right after the preload state.
   *
   * @method load
   */
  p.load = function() {
    this._loader.load();
  }

  /**
   * Retrieve a loaded item by ID. Look first in the internal cache then in the
   * `LoadQueue`.
   *
   * @method get
   * @param {String} id The identifier for the resource.
   * @returns {Object} The loaded resource.
   */
  p.get = function(id) {
    if (typeof this._cache[id] !== 'undefined') {
      return this._cache[id];
    }

    return this._loader.getResult(id);
  }

  /**
   * Verify if the loading process is finished. Notice that this return `true` 
   * if the loading queue is empty, even if it has never been used.
   *
   * @method isFinished
   * @param {String} id The identifier for the resource.
   * @returns {Boolean} The loading status. 
   */
  p.isFinished = function() {
    return this._loader._numItems === this._loader._numItemsLoaded;
  }


  // --------------------------------------------------------------------------
  // PUBLIC TYPE METHODS (USE THIS TO REGISTER ITENS TO BE LOADED)
  // --------------------------------------------------------------------------
  /**
   * Loads an image.
   * @method image
   * @param {String} id  The unique identifier for this image.
   * @param {String} src The url for this image.
   */
  p.image = function(id, src) {
    this._loader.loadFile({id:id, src:this.basePath+src, type:'image'}, false);
  }

  /**
   * Loads a sprite sheet. A data object must be provided. 
   *
   * Please consult the SpriteSheet API to see how data is formatted:
   * http://createjs.com/Docs/EaselJS/classes/SpriteSheet.html
   *
   * @method spritesheet
   * @param {String} id   The unique identifier for this spritesheet.
   * @param {String} src  The url for this image.
   * @param {Object} data The data describing the sprite sheet
   */
  p.spritesheet = function(id, src, data) {
    if (typeof src === 'string' && src.endsWith('.json')) {
      this._loader.loadFile({id:id, src:this.basePath+src, type:'spritesheet'}, false);
    } else {
      this._loader.loadFile({id:id, src:this.basePath+src, data:data}, false);
      this._processQueue.push({id:id, data:data, type:'spritesheet'});
    }
  }

  /**
   * Loads an audio. A data object may be provided with the sound group. For 
   * example:
   *
   *     game.load.audio('my_audio', 'audio.mp3', {group: 'effect1'});
   *
   * @method audio
   * @param {String} id     The unique identifier for this audio.
   * @param {String} src    The url for this audio.
   * @param {Object} [data] An object with the audio group.
   */
  p.audio = function(id, src, data) {
    this._loader.loadFile({id:id, src:this.basePath+src}, false)
    this._processQueue.push({id:id, data:data, type:'audio'});
  }

  /**
   * Loads an audio sprite. A data object must be provided with the individual 
   * sound data, a group may be provided. For example:
   *
   *     game.load.audiosprite('_', 'audio.mp3', [
   *       {id:'as1', start:1000, duration:1000, group:'hit'},
   *       {id:'as2', start:8000, duration:500, group:'hit'},
   *       {id:'as3', start:17000, duration:1000, group:'bounce'}
   *     ]);
   *
   * @method audiosheet
   * @param {String} id     The unique identifier for this audio.
   * @param {String} src    The url for this audio.
   * @param {Object} [data] An object with the audio group.
   */
  p.audiosprite = function(id, src, data) {
    this._loader.loadFile({id:id, src:this.basePath+src}, false);
    var _data = [];
    for (var i=0; i<data.length; i++) {
      var d = data[i];
      _data.push({id:d.id, startTime:d.start, duration:d.duration})
    }
    this._processQueue.push({id:id, data:data, type:'audiosprite'});

    createjs.Sound.registerSounds([{src:this.basePath+src, data:{audioSprite:_data}}], '');
  }

  /**
   * Loads a JSON file. The file will be converted automatically.
   * @method json
   * @param {String} id  The unique identifier for this file.
   * @param {String} src The url for this JSON.
   */
  p.json = function(id, src) {
    this._loader.loadFile({id:id, src:this.basePath+src}, false);
  }

  /**
   * Loads a JavaScript file. The file will be added to the page.
   * @method script
   * @param {String} id  The unique identifier for this script.
   * @param {String} src The url for this script.
   */
  p.script = function(id, src) {
    this._loader.loadFile({id:id, src:this.basePath+src}, false);
  }

    /**
   * Loads a stylesheet file. The file will be added to the page.
   * @method css
   * @param {String} id  The unique identifier for this file.
   * @param {String} src The url for this file.
   */
  p.css = function(id, src) {
    this._loader.loadFile({id:id, src:this.basePath+src}, false);
  }

  /**
   * Loads a manifest. See the individual types to see their formats.
   * @method manifest
   * @param {Object} data A list of objects.
   */
  p.manifest = function(data) {
    for (var i=0; i<data.length; i++) {
      var d = data[i];
      if (d.type === 'audio') {
        this.audio(d.id, d.src, d.data);
      } else if (d.type === 'audiosprite') {
        this.audiosprite(d.id, d.src, d.data);
      } else if (d.type === 'spritesheet') {
        this.spritesheet(d.id, d.src, d.data);
      } else {
        this.raw(d);
      }
    }
    this._loader.loadManifest(data, false);
  }

  /**
   * Loads a file using directly the `LoadQueue`.
   * @method raw
   * @param {Object} itemData The properties of the target object.
   */
  p.raw = function(itemData) {
    this._loader.loadFile(itemData, false);
  }

  creatine.ResourceManager = ResourceManager;
})();
/** 
 * @module creatine
 */

(function() {
  "use strict";

  /**
   * The plugin manager is used to register and unregister plugins into the 
   * game. This manager is created by the game and can be accessed by using 
   * `game.plugins`.
   *
   * Plugins work together within the engine, being update automatically by the
   * engine during the execution of the game. Plugins are identified by ids, so
   * you must provide an unique identifier when adding a plugin.
   *
   * ## Usage example
   *
   *     var plugin = tine._plugin({
   *       update: function() { ... }, 
   *       ...
   *     })
   *     game.plugins.add('my plugin', plugin);
   * 
   * 
   * @class PluginManager
   * @constructor
   * @param {Object} game The game instance.
   */ 
  var PluginManager = function(game) {
    /**
     * The game instance.
     * @property {creatine.Game} game
     */
    this.game = game;

    /**
     * The plugin map
     * @property {Object} _plugins
     */
    this._plugins = {};
  }
  var p = PluginManager.prototype;


  /**
   * Called before the engine update, it propagates the function to the 
   * registered plugins.
   * 
   * @method preUpdate
   * @protected
   */
  p.preUpdate = function() {
    for (var id in this._plugins) {
      if (this._plugins[id].active && this._plugins[id].hasPreUpdate) {
        this._plugins[id].preUpdate();
      }
    }
  }

  /**
   * Called during the engine update, it propagates the function to the 
   * registered plugins.
   * 
   * @method update
   * @protected
   */
  p.update = function() {
    for (var id in this._plugins) {
      if (this._plugins[id].active && this._plugins[id].hasUpdate) {
        this._plugins[id].update();
      }
    }
  }

  /**
   * Called after the engine update, it propagates the function to the 
   * registered plugins.
   * 
   * @method postUpdate
   * @protected
   */
  p.postUpdate = function() {
    for (var id in this._plugins) {
      if (this._plugins[id].active && this._plugins[id].hasPostUpdate) {
        this._plugins[id].postUpdate();
      }
    }
  }

  /**
   * Called before the engine draw, it propagates the function to the 
   * registered plugins.
   * 
   * @method preUpdate
   * @protected
   */
  p.preDraw = function() {
    for (var id in this._plugins) {
      if (this._plugins[id].active && this._plugins[id].hasPreDraw) {
        this._plugins[id].preDraw();
      }
    }
  }

  /**
   * Called during the engine draw, it propagates the function to the 
   * registered plugins.
   * 
   * @method draw
   * @protected
   */
  p.draw = function() {
    for (var id in this._plugins) {
      if (this._plugins[id].active && this._plugins[id].hasDraw) {
        this._plugins[id].draw();
      }
    }
  }

  /**
   * Called after the engine draw, it propagates the function to the 
   * registered plugins.
   * 
   * @method postDraw
   * @protected
   */
  p.postDraw = function() {
    for (var id in this._plugins) {
      if (this._plugins[id].active && this._plugins[id].hasPostDraw) {
        this._plugins[id].postDraw();
      }
    }
  }


  //---------------------------------------------------------------------------
  // PUBLIC ACCESS
  //---------------------------------------------------------------------------
  
  /**
   * Adds a new plugin to the engine.
   * @method add
   * @param {String} id     The unique identifier of the plugin.
   * @param {Object} plugin The plugin instance or class.
   */
  p.add = function(id, plugin) {
    if (!id) throw Error('No id provided');
    if (!plugin) throw Error('No plugin provided');

    if (typeof plugin === 'function') {
      plugin = new plugin();
    }

    plugin.game = this.game;
    plugin.manager = this;

    if (plugin.preUpdate)   plugin.hasPreUpdate = true;
    if (plugin.update)      plugin.hasUpdate = true;
    if (plugin.postUpdate)  plugin.hasPostUpdate = true;
    if (plugin.preDraw)     plugin.hasPreDraw = true;
    if (plugin.draw)        plugin.hasDraw = true;
    if (plugin.postDraw)    plugin.hasPostDraw = true;

    if (this._plugins[id]) this.remove(id);
    this._plugins[id] = plugin;

    plugin.enter();
  }

  /**
   * Retrieves a plugin given its ID.
   * @method get
   * @param {String} id The unique identifier of the plugin.
   * @returns {Object} The plugin
   */
  p.get = function(id) {
    return this._plugins[id];
  }

  /**
   * Removes a plugin from this manager by its ID.
   * @method remove
   * @param {String} id The unique identifier of the plugin.
   */
  p.remove = function(id) {
    var plugin = this._plugins[id];
    if (!plugin) return;

    plugin.exit();
    delete this._plugins[id];
  }

  /**
   * Removes all plugin from this manager.
   * @method removeAll
   */
  p.removeAll = function() {
    for (var id in this._plugins) {
      this._plugins[id].exit();
    }

    this._plugins = {};
  }

  creatine.PluginManager = PluginManager;

})();
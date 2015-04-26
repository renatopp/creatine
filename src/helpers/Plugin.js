/** 
 * @module creatine
 */

(function() {
  "use strict";

  /**
   * A plugin is a custom manager that works together with the engine. The 
   * plugin must be registered in the game plugin manager to work.
   * 
   * To create a plugin you must inherit this class, which provides some base
   * methods used by the engine. You can override or create the following 
   * methods:
   *
   * - **initialize**: called in the creation of the plugin.
   * - **enter**: called when the plugin is registered into the plugin manager.
   * - **preUpdate**: called before the engine update.
   * - **update**: called during the engine update.
   * - **postUpdate**: called after the engine update.
   * - **preDraw**: called before the engine draw.
   * - **draw**: called during the engine draw.
   * - **postDraw**: called after the engine draw.
   * - **exit**: called when the plugin is unregistered of the plugin manager.
   *
   * ## Usage example
   * 
   * Creatine provides an shortcut to extend Plugin:
   *
   *     var MyPlugin = tine._plugin({
   *       initialize: function() { ... },
   *       update: function() { ... },
   *       ...
   *     })
   *
   *     game.plugins.add('my plugin', MyPlugin);
   * 
   * @class Plugin
   * @constructor
   * @param {Object} game The game instance.
   */ 
  var Plugin = function() {
    /**
     * The game instance.
     * @property {creatine.Game} game
     */
    this.game;

    /**
     * The plugin manager instance.
     * @property {creatine.PluginManager} manager
     */
    this.manager;

    /**
     * Is this plugin active?
     * @property {Boolean} active
     */
    this.active = true;

    /**
     * Has this plugin a pre update function? Set by the manager.
     * @property {Boolean} hasPreUpdate
     * @protected
     */
    this.hasPreUpdate = false;

    /**
     * Has this plugin a update function? Set by the manager.
     * @property {Boolean} hasUpdate
     * @protected
     */
    this.hasUpdate = false;

    /**
     * Has this plugin a post update function? Set by the manager.
     * @property {Boolean} hasPpostUpdate
     * @protected
     */
    this.hasPostUpdate = false;

    /**
     * Has this plugin pre a draw function? Set by the manager.
     * @property {Boolean} hasPreDraw
     * @protected
     */
    this.hasPreDraw = false;

    /**
     * Has this plugin a draw function? Set by the manager.
     * @property {Boolean} hasDraw
     * @protected
     */
    this.hasDraw = false;

    /**
     * Has this plugin a post draw function? Set by the manager.
     * @property {Boolean} postDraw
     * @protected
     */
    this.hasPostDraw = false;

    this.initialize();
  }
  var p = Plugin.prototype;

  /**
   * Called in the plugin initialization.
   * @method initialize
   */
  p.initialize = function() {}

  /**
   * Called when the plugin is registered into the plugin manager.
   * @method enter
   */
  p.enter = function() {}

  /**
   * Called when the plugin in unregistered of the plugin manager.
   * @method exit
   */
  p.exit = function() {}


  creatine.Plugin = Plugin;

  // @SHORTCUT
  creatine._plugin = function(properties) {
    var S = function() { this.Plugin_constructor(); }
    var p = createjs.extend(S, creatine.Plugin);
    for (var k in properties) { p[k] = properties[k]; }
    return createjs.promote(S, 'Plugin');
  }
})();
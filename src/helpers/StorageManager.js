/** 
 * @module creatine
 */

(function() {
  "use strict";

  /**
   * This manager is a helper to use the browser localStorage feature. It is 
   * created by the game and accessed using `game.storage`.
   *
   * The localStorage is a HTML5 feature which allows persistent local 
   * storage (JS can save information in the browser). But, it is limited to
   * string values only. This class helps you to store and retrieve any kind
   * of data inside a local storage (by converting these values from/to 
   * JSON).
   *
   * Notice that this class uses the `game.config.project` as prefix for all 
   * stored keys.
   *
   * ## Usage example
   *
   *     var game = new tine.Game();
   *     
   *     game.storage.set('boolean-value', true);
   *     game.storage.set('string-value', 'lalala');
   *     game.storage.set('integer-value', 23);
   *     game.storage.set('object-value', {a:3});
   *
   *     console.log(game.storage.get('boolean-value')); // true
   *     console.log(game.storage.get('string-value'));  // 'lalala'
   *     console.log(game.storage.get('integer-value')); // 23
   *     console.log(game.storage.get('object-value'));  // {a:3}
   *
   * @class StorageManager
   * @constructor
   * @param {Object} game The game instance.
   */ 
  var StorageManager = function(game) {
    /**
     * The game instance.
     * @property {creatine.Game} game
     */
    this.game = game;

    /**
     * The reference to the local storage, if this isn't provided by the 
     * browser then it is a simple object.
     * 
     * @property {Object} _memory
     * @private
     */
    this._memory = localStorage;

    /**
     * The name (same as `game.config.project`).
     * @property {String} _namespace
     * @private
     */
    this._namespace = game.config.project;

    try {
      !!localStorage.getItem;
    } catch (e) {
      this._memory = {};
    }
  }
  var p = StorageManager.prototype;

  //---------------------------------------------------------------------------
  // CORE ACCESS (INTERNAL)
  //---------------------------------------------------------------------------
  /**
   * Same as `set` but used by internal modules.
   * @method iset
   * @param {String} module The name of the module using it.
   * @param {String} key The key identifier.
   * @param {Object} value The value to be stored.
   * @protected
   */
  p.iset = function(module, key, value) { this.set('['+module+']'+key, value); }

  /**
   * Same as `get` but used by internal modules.
   * @method iget
   * @param {String} module The name of the module using it.
   * @param {String} key The key identifier.
   * @returns {Object} The retrieved value.
   * @protected
   */
  p.iget = function(module, key) { return this.get('['+module+']'+key); }

  /**
   * Same as `remove` but used by internal modules.
   * @method iremove
   * @param {String} module The name of the module using it.
   * @param {String} key The key identifier.
   * @protected
   */
  p.iremove = function(module, key) { this.remove('['+module+']'+key); }


  //---------------------------------------------------------------------------
  // PUBLIC ACCESS
  //---------------------------------------------------------------------------
  /**
   * Set a value for a given key in storage.
   * @method set
   * @param {String} key The key identifier.
   * @param {String} value The value.
  **/
  p.set = function(key, value) {
    try {
      value = JSON.stringify(value);
    } catch (e) {}

    this._memory[this._namespace+key] = value;
  }

  /**
   * Get a value for a given key in storage.
   * @method get
   * @param {String} key The key.
   * @return {Object} the stored value.
   */
  p.get = function(key) {
    var value = this._memory[this._namespace+key];
    try {
      value = JSON.parse(value);
    } catch (e) {}

    return value;
  }

  /**
   * Remove a key from storage.
   * @method remove
   * @param {String} key The key.
   */
  p.remove = function(key) {
    delete this._memory[this._namespace+key];
  }

  creatine.StorageManager = StorageManager;

})();
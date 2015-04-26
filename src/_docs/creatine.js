/**
 * Creatine is a power-up to the CreateJS libraries, providing data structures 
 * and algorithms for game development. You see here:
 * 
 * - **Scene management** - *with scene stacks based on Cocos2D Director*
 * - **Scene transitions** - *you can also create new transitions*
 * - **Input handling** - *keyboard, mouse, touch and gamepads*
 * - **Resources and Factories** - *facilitates the access to PreloadJS*
 * - **Sound handling** - *facilitates the access to SoundJS*
 * - **Storage helper** - *easy use of localStorage*
 * - **Plugins** - *create and install plugins that work together with the 
 * engine*
 * - **Particles** - *a fast particle system for canvas*
 * - **Tile Maps** - *total integration with Tiled, supporting all map 
 * projections*
 *
 * Feel free to use, modify, improve, make additions and suggestions.
 *
 * ## Usage
 *
 * You can access creatine function by the namespace `creatine` or its shortcut
 * `tine`:
 *
 *     console.log(creatine.VERSION);
 *     
 *     // is the same as
 *     console.log(tine.VERSION);
 *
 * To start your development with creatine, you need to create a Game object, 
 * which will create a canvas object inside the page. The basic signature for 
 * the game object:
 *
 *     var game = new tine.Game(config, state);
 *     
 * where `config` is a configuration object or an url for a JSON, and `state` 
 * is a collection of functions that will be called by the game in certain 
 * moments.
 *
 * You can use 5 functions inside the state: `boot`, `preload`, `create`, 
 * `update`, or `draw`. The `boot` function is called right after the game 
 * create the canvas and initialize the managers and right before the 
 * preloading; you can initialize 3th party libraries here. The `preload` 
 * function is called after booting and before the preloading itself; you can 
 * add items to be loaded here. When preloading is finished, the game call the
 * `create` function, where you can create the objects of you game or 
 * initialize the base scenes. The functions `update` and `draw` are called 
 * periodically in that order. The recommended way to pass these function is 
 * like this:
 *
 *     var game = new tine.Game(null, {
 *       boot    : function() { ... },
 *       preload : function() { ... },
 *       create  : function() { ... },
 *       update  : function() { ... },
 *       draw    : function() { ... }
 *     })
 *
 * The configuration object must be an object or an url for a JSON in the 
 * following format:
 *
 *     var config = {
 *       project          : 'creatine_game',
 *       width            : 800,
 *       height           : 600,
 *       container        : null,
 *       framerate        : 60,
 *       showfps          : false,
 *       background_color : '#000',
 *       resources        : {
 *         base_path : './',
 *         manifest  : []
 *       }
 *     }
 *
 * This configuration is also the default options of the engine. You can 
 * provide only a part of these variables because game will use the default 
 * configuration for missing values.
 * 
 * ## Links
 *
 * - **Site**: http://creatine.guineashots.com
 * - **Repository**: http://github.com/renatopp/creatine
 * - **API**: http://docs.guineashots.com/creatine
 * - **User Guide**: http://docs.guineashots.com/creatine/guide
 * - **Examples**: http://creatine.guineashots.com/examples
 *
 * 
 * @module creatine
 * @main creatine
 */
/** 
 * @module creatine
 */

(function() {
  "use strict";

  /**
   * The emitter is a simple particle system based on Cocos2D systems.
   *
   * The emitter receives one or more display objects as parameter to be used
   * as base images (the emitter uses the `copy` method, so if you're using a
   * custom display object, it must support copying), and the maximum number
   * of particles. These parameters are used to initialize the emitter and 
   * can't be changed after that. It is highly recommended to initialize the
   * emitter during the create state of the game.
   *
   * The emitter also has some limitations due the the performance. It cannot 
   * change the color of the particles during its execution because canvas 
   * does not have a builtin tinting function and implementing one would impact
   * on the emitter performance. To overcome this, you must provide a colored 
   * particle. 
   *
   * For better control purpose, the emitter must be updated manually. 
   * 
   * Notice that, all time variables, such as life or duration, must be in 
   * milliseconds.
   *
   * ## Usage examples:
   *
   *     var emitter = null;
   *     var game = new tine.Game(null, {
   *       create: function() {
   *         var particle = game.create.circle(10, 'red');
   *         
   *         emitter = new tine.Emitter(particle, 1000);
   *       },
   *       update: function() {
   *         emitter.update(game.time.delta);
   *
   *         if (game.mouse.isPressed(tine.buttons.LEFT)) {
   *           emitter.start(200, game.mouse.x, game.mouse.y);
   *         }
   *       }
   *     })
   *
   * 
   * @class Emitter
   * @constructor
   * @param {Object} image A display object or a list of display objects.
   * @param {Integer} maxParticles The maximum number of particles.
   */
  var Emitter = function(images, maxParticles) {
    this.Container_constructor();

    /**
     * Tell if the emitter is active or not.
     * @property {Boolean} _active
     * @private
     */
    this._active = false;

    /**
     * A time counter to create new particles
     * @property {Integer} _emissionTime.
     * @private
     */
    this._emissionTime = 0;

    /**
     * The elapsed time during the execution of the emitter. Reset on each 
     * start.
     * 
     * @property {Integer} _elapsed
     * @private
     */
    this._elapsed = 0;

    /**
    * The target time duration of the emitter emission.
    * @property {Integer} _duration
    * @private
    */
    this._duration = 0;

    /**
    * The current number of alive particles.
    * @property {Integer} _counter
    * @private
    */
    this._counter = 0;

   /**
    * The list of display objects.
    * @property {Array} _images
    * @private
    */
    this._images = [];

   /**
    * The maximum number of particles.
    * @property {Integer} _maxParticles
    * @private
    */
    this._maxParticles = 0;

   /**
    * The list of all particles in this emitter.
    * @property {Integer} _particles
    * @private
    */
    this._particles = [];


   /**
    * The emission rate. Emitter create 1 particle per emissionRate 
    * milliseconds.
    * 
    * @property {Integer} emissionRate
    * @default 100
    */
    this.emissionRate = 100;

   /**
    * The base angle of emission (in degress), Zero is the right.
    * @property {Integer} angle
    * @default 0
    */
    this.angle = 0;

   /**
    * Variance of the emission angle (in degrees).
    * @property {Integer} angleVar
    * @default 45
    */
    this.angleVar = 45;


   /**
    * The initial x position of the particles.
    * @property {Integer} emitX
    * @default 0
    */
    this.emitX = 0;

   /**
    * Variance of the initial x position.
    * @property {Integer} emitXVar
    * @default 0
    */
    this.emitXVar = 0;

   /**
    * The initial y position of the particles.
    * @property {Integer} emitY
    * @default 0
    */
    this.emitY = 0;

   /**
    * Variance of the initial y position.
    * @property {Integer} emitYVar
    * @default 0
    */
    this.emitYVar = 0;

   /**
    * The base particle life.
    * @property {Integer} life
    * @default 1000
    */
    this.life = 1000;

   /**
    * Variance of the particle life.
    * @property {Integer} lifeVar
    * @default 0
    */
    this.lifeVar = 0;

   /**
    * Initial particle alpha.
    * @property {Number} startAlpha
    * @default 1
    */
    this.startAlpha = 1;

   /**
    * Variance of the initial particle alpha.
    * @property {Number} startAlphaVar
    * @default 0
    */
    this.startAlphaVar = 0;

   /**
    * Final particle alpha.
    * @property {Number} endAlpha
    * @default 0
    */
    this.endAlpha = 0;

   /**
    * Variance of the end particle alpha.
    * @property {Number} endAlphaVar
    * @default 0
    */
    this.endAlphaVar = 0;

   /**
    * Initial particle rotation (in degrees).
    * @property {Integer} startRotation
    * @default 0
    */
    this.startRotation = 0;

   /**
    * Variance of the initial particle rotation.
    * @property {Integer} startRotationVar
    * @default 0
    */
    this.startRotationVar = 0;

   /**
    * Final particle rotation.
    * @property {Integer} endRotation
    * @default 0
    */
    this.endRotation = 0;

   /**
    * Variance of the final particle rotation.
    * @property {Integer} endRotationVar
    * @default 0
    */
    this.endRotationVar = 0;

   /**
    * Initial particle scale.
    * @property {Number} startScale
    * @default 1
    */
    this.startScale = 1;

   /**
    * Variance of the initial scale.
    * @property {Number} startScaleVar 
    * @default 0
    */
    this.startScaleVar = 0;

   /**
    * Final particle scale.
    * @property {Number} endScale
    * @default 0
    */
    this.endScale = 0;

   /**
    * Variance of the final particle scale.
    * @property {Number} endScaleVAr
    * @default 0
    */
    this.endScaleVar = 0;


   /**
    * Base particle speed.
    * @property {Integer} speed
    * @default 100
    */
    this.speed = 100;

   /**
    * Variance of the base particle speed.
    * @property {Integer} speedVar
    * @default 0
    */
    this.speedVar = 0;

   /**
    * Gravity force in X.
    * @property {Integer} gravityX
    * @default 0
    */
    this.gravityX = 0;

   /**
    * Gravity force in X.
    * @property {Integer} gravityY
    * @default 0
    */
    this.gravityY = 0;

   /**
    * Radial particle acceleration
    * @property {Integer} radAccel
    * @default 0
    */
    this.radAccel = 0;

   /**
    * Variance of the radial particle acceleration
    * @property {Integer} radAccelVar
    * @default 0
    */
    this.radAccelVar = 0;

   /**
    * Tangential particle rotation.
    * @property {Integer} tacAccel
    * @default 0
    */
    this.tanAccel = 0;

   /**
    * Variance of the tangential rotation.
    * @property {Integer} tanAccelVar
    * @default 0
    */
    this.tanAccelVar = 0;

    this._initialize(images, maxParticles);
  }
  var p = createjs.extend(Emitter, createjs.Container);

  /**
   * Initialize the emitter.
   * @method _initialize
   * @param {Object} image A display object or a list of display objects.
   * @param {Integer} maxParticles The maximum number of particles.
   * @private
   */
  p._initialize = function(images, maxParticles) {
    this._maxParticles = maxParticles;
    
    if (!images.length) {
      images = [images];
    }

    // create images
    this._particles = [];
    var i = 0;
    while (i < maxParticles) {
      for (var j=0; j<images.length&&i<maxParticles; j++) {
        var p = images[j].clone();

        p.visible = false;
        p.angle = 0;
        p.startLife = 0;
        p.life = 0;
        p.dirX = 0;
        p.dirY = 0;
        p.deltaAlpha = 0;
        p.startRotation = 0;
        p.deltaRotation = 0;
        p.startScale = 0;
        p.deltaScale = 0;
        p.speed = 0;
        p.gravityX = 0;
        p.gravityY = 0;
        p.radAccel = 0;
        p.tanAccel = 0;

        this.addChild(p);
        this._particles.push(p);
        i++;
      }
    }
    tine.shuffle(this._particles);
  } 

  /**
   * Add a new particle.
   * @method _addParticle
   * @private
   */
  p._addParticle = function() {
    var p = this._particles[this._counter++];
    var cos=Math.cos;
    var sin=Math.sin;
    var abs=Math.abs;
    var rand=tine.randomPolar; 
    var clip=tine.clip;
    var rot, size;
    
    var endAlpha = clip(this.endAlpha + this.endAlphaVar*rand(), 0, 1);
    var endRotation = this.endRotation + this.endRotationVar*rand();
    var endScale = this.endScale + this.endScaleVar*rand();

    p.visible     = true;
    p.startLife   = p.life = abs(this.life + this.lifeVar*rand());
    p.alpha       = clip(this.startAlpha + this.startAlphaVar*rand(), 0, 1);
    p.x           = this.emitX + this.emitXVar*rand();
    p.y           = this.emitY + this.emitYVar*rand();
    rot           = (this.angle + this.angleVar*rand())*0.0174532925;
    p.dirX        = cos(rot);
    p.dirY        = sin(rot);
    p.speed       = this.speed + this.speedVar*rand();
    p.rotation    = this.startRotation + this.startRotationVar*rand();
    p.scaleX = p.scaleY = this.startScale + this.startScaleVar*rand();

    p.deltaAlpha    = (endAlpha-p.alpha)/p.life;
    p.deltaRotation = (endRotation-p.rotation)/p.life;
    p.deltaScale    = (endScale-p.scaleX)/p.life;

    p.gravityX    = this.gravityX;
    p.gravityY    = this.gravityY;
    p.radAccel    = this.radAccel + this.radAccelVar*rand();
    p.tanAccel    = this.tanAccel + this.tanAccelVar*rand();
    // console.log(p, p.x, p.y);
  }

  /**
   * Update the emitter.
   * @method update
   * @param {Number} delta The delta time (in milliseconds).
   */
  p.update = function(delta) {
    if (!delta) return;
    var fdelta = delta/1000;

    // Add particles if needed
    if (this._active) {
      var rate = 1000/this.emissionRate;
      this._emissionTime += delta;

      while (this._counter < this._maxParticles && this._emissionTime > rate) {
        this._addParticle();
        this._emissionTime -= rate;
      }

      this._elapsed += delta;
      if (this._duration != -1 && this._duration < this._elapsed) {
        this._active = false;
      }
    }

    // Update particles
    var i=0; 
    var N=this._counter;
    var particles=this._particles;
    var sqrt = Math.sqrt;
    var p, step, norm, px, py;
    var radX, tanX, radY, tanY;

    while (i<N) {
      p = particles[i];

      // Remove particles if needed
      p.life -= delta;
      if (p.life <= 0) {
        p.visible = false;
        N--;
        particles[i] = particles[N];
        particles[N] = p;
        continue;
      }

      // Update values
      step = p.life/p.startLife;
      if (p.x || p.y) {
        norm = sqrt(p.x*p.x + p.y*p.y);
        px = p.x/norm;
        py = p.y/norm
      } else {
        px = 0;
        py = 0;
      }
      radX = px*p.radAccel;
      radY = py*p.radAccel;
      tanX = -py*p.tanAccel;
      tanY = px*p.tanAccel;

      p.dirX += (radX + tanX + p.gravityX)*fdelta;
      p.dirY += (radY + tanY + p.gravityY)*fdelta;

      p.alpha += p.deltaAlpha*delta;
      p.scaleX += p.deltaScale*delta;
      p.scaleY = p.scaleX;
      p.rotation += p.deltaRotation*delta;
      p.x += p.dirX*p.speed*fdelta;
      p.y += p.dirY*p.speed*fdelta;

      i++;
    }

    this._counter = N;
  }

  /**
   * Start the emission of particles.
   * @method start
   * @param {Integer} duration Duration of emission (in milliseconds), use -1 
   * for infinity.
   * @param {Integer} [x] override the emitX variable.
   * @param {Integer} [y] override the emitY variable.
   */
  p.start = function(duration, x, y) {
    duration = duration || -1;
    this.emitX = (typeof x==='undefined')?this.emitX:x;
    this.emitY = (typeof y==='undefined')?this.emitY:y;
    this._duration = duration;
    this._elapsed = 0;
    this._active = true;
  }

  creatine.Emitter = createjs.promote(Emitter, 'Container');

})();
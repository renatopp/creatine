/*
* Director
*
* Copyright (c) 2014 Renato de Pontes Pereira.
*
* Permission is hereby granted, free of charge, to any person obtaining a copy 
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell 
* copies of the Software, and to permit persons to whom the Software is 
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/

/**
 * @module Creatine
 **/

// namespace:
this.creatine = this.creatine || {};

(function() {
    "use strict";

/**
 * Director is the class that controls all the game scenes. This involves 
 * storing the current scene that is running, receiving the next scene which 
 * will replace the current one, and applying the transition effect between the
 * old and the new scenes. When the current scene is replaced by a new one, the
 * Director will automatically remove the old scene from stage and add the new 
 * scene to it.
 * 
 * Only a single scene can be active at a time, however, Director can handle a
 * scene stack, allowing the addition of a new scene and keeping the old one in
 * the stack. This feature is specially useful to overlap scenes and creating, 
 * for example, a semi-transparent pause scene.
 * 
 * It is possible to specify a transition effect in any action of adding or
 * removing scenes, making possible to slide a new scene to the screen or to
 * make the old scene fade away. To know more about transitions, consult the
 * module <code>creatine.transitions</code>.
 *
 * <h4>Example</h4>
 * 
 *     // Create the Director
 *     var director = new creatine.Director(stage);
 * 
 *     // Adds the first scene
 *     director.push(new MyCustomScene());
 * 
 *     // Replaces the current scene
 *     director.replace(new OtherCustomScene());
 * 
 * @class Director
 * @constructor
 * @param {createjs.Stage} stage A <code>createjs.Stage</code> object.
**/
var Director = function(stage) {
    this.initialize(stage);
}
var p = Director.prototype;

    /**
     * The <code>createjs.Stage</code> instance.
     *
     * @property stage
     * @type {createjs.Stage}
     * @private
    **/
    p.stage = null;

    /**
     * The active scene. This variable can be viewed as the top of the scene
     * stack.
     *
     * @property scene
     * @type {Scene}
     * @readonly
    **/
    p.scene = null;

    /**
     * The next scene which will replace the actual one. This variable is 
     * required to store the next scene until the transition effect is done.
     *
     * @property nextScene
     * @type {Scene}
     * @readonly
    **/
    p.nextScene = null;

    /**
     * The stack of scenes. This list only stores the inactive scenes, use the 
     * {{#crossLink "Director/scene:property"}}{{/crossLink}} to access the 
     * active scene.
     *
     * @property sceneStack
     * @type {list}
     * @readonly
    **/
    p.sceneStack = null;

    /**
     * Indicates if a transition effect is running or not.
     *
     * @property sceneStack
     * @type boolean
     * @readonly
    **/
    p.inTransition = false;

    /**
     * Initialization method.
     * 
     * @method initialize
     * @param {createjs.Stage} stage A createjs.Stage object.
     * @protected
    **/
    p.initialize = function(stage) {
        this.stage = stage;
        this.scene = null;
        this.nextScene = null;
        this.sceneStack = [];
        this.inTransition = null;
    }

    /**
     * Pauses the current scene and send it to the stack. The new scene will 
     * replace the current one.
     * 
     * If transition is provided, the transition effect will be applied before
     * replacing scenes.
     * 
     * @method push
     * @param {Scene} scene The new scene.
     * @param {Transition} transition A transition effect.
    **/
    p.push = function(scene, transition) {
        if (this.scene) {
            this.scene.dispatchEvent('scenepause');
            this.sceneStack.push(this.scene);

            var index = this.stage.getChildIndex(this.scene);
            this.stage.addChildAt(scene, index+1)
        } else {
            this.stage.addChild(scene);
        }

        this.nextScene = scene;

        var _this = this;
        var setScene = function() {
            _this.scene = _this.nextScene;
            _this.nextScene = null;
            _this.inTransition = false;
            _this.scene.dispatchEvent('sceneenter');
        }

        if (transition) {
            this.inTransition = true;
            transition.run(this, this.scene||{}, this.nextScene, setScene);
        } else {
            setScene();
        }
    }

    /**
     * Removes the current scene and reactive the scene at the top of the 
     * stack.
     * 
     * If transition is provided, the transition effect will be applied before
     * replacing scenes.
     * 
     * @method pop
     * @param {Transition} transition A transition effect.
    **/
    p.pop = function(transition) {
        if (this.sceneStack.length == 0) return;

        var scene = this.sceneStack.pop();
        this.nextScene = scene;

        if (this.scene) {
            this.scene.dispatchEvent('scenepause');
        }

        var _this = this;
        var setScene = function() {
            _this.inTransition = false;
            if (_this.scene) {
                _this.scene.dispatchEvent('sceneexit');
                _this.stage.removeChild(_this.scene);
            }

            _this.scene = _this.nextScene;
            _this.scene.dispatchEvent('sceneresume');
            _this.nextScene = null;

        }

        if (transition) {
            this.inTransition = true;
            transition.run(this, this.scene||{}, this.nextScene, setScene);
        } else {
            setScene();
        }
    }

    /**
     * Replaces the current scene by a new one.
     * 
     * If transition is provided, the transition effect will be applied before
     * replacing scenes.
     * 
     * @method replace
     * @param {Scene} scene The new scene.
     * @param {Transition} transition A transition effect.
    **/
    p.replace = function(scene, transition) {
        if (this.scene) {
            this.scene.dispatchEvent('scenepause');
            var index = this.stage.getChildIndex(this.scene);
            this.stage.addChildAt(scene, index+1);
        } else {
            this.stage.addChild(scene);
        }

        this.nextScene = scene;

        var _this = this;
        var setScene = function() {
            _this.inTransition = false;
            if (_this.scene) {
                _this.scene.dispatchEvent('sceneexit');
                _this.stage.removeChild(_this.scene);
            }

            _this.scene = _this.nextScene;
            _this.scene.dispatchEvent('sceneenter');
            _this.nextScene = null;
        }

        if (transition) {
            this.inTransition = true;
            transition.run(this, this.scene||{}, this.nextScene, setScene);
        } else {
            setScene();
        }
    }

    /**
     * Swap the position of {{#crossLink "Director/scene:property"}}{{/crossLink}}
     * and {{#crossLink "Director/nextScene:property"}}{{/crossLink}} in the 
     * stage. This method is used in transitions to change the z-index of 
     * scenes.
     * 
     * @method swapScenes
     * @protected
    **/
    p.swapScenes = function() {
        this.stage.swapChildrenAt(
            this.stage.getChildIndex(this.scene),
            this.stage.getChildIndex(this.nextScene)
        );
    }

    /**
     * Removes all scenes from the stack, without transitions.
     * 
     * @method clearStack
    **/
    p.clearStack = function() {
        for (var i=0; i<this.sceneStack.length; i++) {
            this.sceneStack[i].dispatchEvent('sceneexit');
            this.stage.removeChild(this.sceneStack[i]);
        }
        this.sceneStack = [];
    }

creatine.Director = Director;
}());

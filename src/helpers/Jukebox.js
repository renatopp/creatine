/*
* Entity
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
     * The Jukebox class is a helper to handle music and sound playback.
     *
     * The goal of this class is:
     *
     * - Handle different configuration for music and sound (you can set 
     *   different volume setting for them);
     * - Handle sound and music groups for random play (you can "play a group"
     *   and Jukebox will choose a random sound/music of this group);
     * - Provide helper functions, such as: toogleMute.
     *
     *
     * <h4>Example</h4>
     *
     *     var jukebox = new creatine.Jukebox();
     *
     *     // set sound volume
     *     jukebox.soundVolume = 0.3
     *
     *     // add sounds to a group and play a random one
     *     jukebox.addSound('sound1', 'my-group');
     *     jukebox.addSound('sound2', 'my-group');
     *     jukebox.playSound('my-group')
     *
     * @class Jukebox
     * @constructor
    **/
    var Jukebox = function() {
        /**
         * The sound groups.
         *
         * @property _sounds
         * @type {Object}
         * @protected
        **/
        this._sounds = {};

        /**
         * The music groups.
         *
         * @property _musics
         * @type {Object}
         * @protected
        **/
        this._musics = {};

        /**
         * The sound volume.
         *
         * @property _soundVolume
         * @type {Number}
         * @protected
        **/
        this._soundVolume = 1;

        /**
         * The music volume.
         *
         * @property _musicVolume
         * @type {Number}
         * @protected
        **/
        this._musicVolume = 1;
    }
    var p = Jukebox.prototype;

    /**
     * Returns the current sound volume.
     *
     * @method getSoundVolume
     * @return {Number} The sound volume (between 0 and 1).
    **/
    p.getSoundVolume = function() {
        return this._soundVolume;
    }

    /**
     * Set the current sound volume.
     *
     * @method setSoundVolume
     * @param {Number} value The sound volume (between 0 and 1).
    **/
    p.setSoundVolume = function(value) {
        this._soundVolume = creatine.clip(value, 0, 1);
    }

    /**
     * Returns the current music volume.
     *
     * @method getMusicVolume
     * @return {Number} The music volume (between 0 and 1).
    **/
    p.getMusicVolume = function() {
        return this._musicVolume;
    }

    /**
     * Set the current music volume.
     *
     * @method setMusicVolume
     * @param {Number} value The music volume (between 0 and 1).
    **/
    p.setMusicVolume = function(value) {
        this._musicVolume = creatine.clip(value, 0, 1);
    }

    /**
     * Returns the current master volume. Same as `createjs.Sound.getVolume()`.
     *
     * @method getMasterVolume
     * @return {Number} The master volume (between 0 and 1).
    **/
    p.getMasterVolume = function() {
        return createjs.Sound.getVolume();
    }

    /**
     * Set the current master volume. Same as `createjs.Sound.setVolume()`.
     *
     * @method setMasterVolume
     * @param {Number} value The master volume (between 0 and 1).
    **/
    p.setMasterVolume = function(value) {
        createjs.Sound.setVolume(creatine.clip(value, 0, 1));
    }

    /**
     * Adds a sound to a sound group.
     *
     * @method addSound
     * @param {String} sound The sound name (as registered for SoundJS).
     * @param {String} group The group name.
    **/
    p.addSound = function(sound, group) {
        if (!sound) throw new Error('Sound name is mandatory.');
        if (!group) throw new Error('Group name is mandatory.');

        if (!this._sounds[group]) {
            this._sounds[group] = [];
        }

        this._sounds[group].push(sound);
    }

    /**
     * Removes a sound from a sound group.
     *
     * @method addSound
     * @param {String} sound The sound name (as registered for SoundJS).
     * @param {String} group The group name.
    **/
    p.removeSound = function(sound, group) {
        if (!sound) throw new Error('Sound name is mandatory.');
        if (!group) throw new Error('Group name is mandatory.');

        var sounds = this._sounds[group]
        if (!sounds) return;
        
        for (var i=0; i<sounds.length; i++) {
            if (sounds[i] == sound) {
                sounds.splice(i, 1);
                return;
            }
        }
    }

    /**
     * Adds a music to a music group.
     *
     * @method addMusic
     * @param {String} music The music name (as registered for SoundJS).
     * @param {String} group The group name.
    **/
    p.addMusic = function(music, group) {
        if (!music) throw new Error('Sound name is mandatory.');
        if (!group) throw new Error('Group name is mandatory.');

        if (!this._musics[group]) {
            this._musics[group] = [];
        }

        this._musics[group].push(music);
    }

    /**
     * Removes a music from a music group.
     *
     * @method addMusic
     * @param {String} music The music name (as registered for SoundJS).
     * @param {String} group The group name.
    **/
    p.removeMusic = function(music, group) {
        if (!music) throw new Error('Sound name is mandatory.');
        if (!group) throw new Error('Group name is mandatory.');

        var musics = this._musics[group]
        if (!musics) return;
        
        for (var i=0; i<musics.length; i++) {
            if (musics[i] == music) {
                musics.splice(i, 1);
                return;
            }
        }
    }

    /**
     * Play a sound. If the name is a group in sound groups, play a random
     * sound in that group.
     *
     * @method playSound
     * @param {String} name The audio ID or group name.
     * @param {String | Object} [interrupt="none"|options] How to interrupt any currently playing instances of audio with the same source,
     * if the maximum number of instances of the sound are already playing. Values are defined as <code>INTERRUPT_TYPE</code>
     * constants on the Sound class, with the default defined by {{#crossLink "Sound/defaultInterruptBehavior:property"}}{{/crossLink}}.
     * <br /><strong>OR</strong><br />
     * This parameter can be an object that contains any or all optional properties by name, including: interrupt,
     * delay, offset, loop, volume, and pan (see the above code sample).
     * @param {Number} [delay=0] The amount of time to delay the start of audio playback, in milliseconds.
     * @param {Number} [offset=0] The offset from the start of the audio to begin playback, in milliseconds.
     * @param {Number} [loop=0] How many times the audio loops when it reaches the end of playback. The default is 0 (no
     * loops), and -1 can be used for infinite playback.
     * @param {Number} [pan=0] The left-right pan of the sound (if supported), between -1 (left) and 1 (right).
     * @return {SoundInstance} A "SoundInstance" that can be controlled after it is created.
    **/
    p.playSound = function(name, interrupt, delay, offset, loop, pan) {
        var group = this._sounds[name];

        if (group) {
            var idx = creatine.randomInt(0, group.length-1);
            name = group[idx];
        }

        return createjs.Sound.play(
            name,
            interrupt,
            delay,
            offset,
            loop,
            this._soundVolume,
            pan
        );
    }

    /**
     * Play a music. If the name is a group in music groups, play a random
     * music in that group.
     *
     * @method playMusic
     * @param {String} name The audio ID or group name.
     * @param {String | Object} [interrupt="none"|options] How to interrupt any currently playing instances of audio with the same source,
     * if the maximum number of instances of the sound are already playing. Values are defined as <code>INTERRUPT_TYPE</code>
     * constants on the Sound class, with the default defined by {{#crossLink "Sound/defaultInterruptBehavior:property"}}{{/crossLink}}.
     * <br /><strong>OR</strong><br />
     * This parameter can be an object that contains any or all optional properties by name, including: interrupt,
     * delay, offset, loop, volume, and pan (see the above code sample).
     * @param {Number} [delay=0] The amount of time to delay the start of audio playback, in milliseconds.
     * @param {Number} [offset=0] The offset from the start of the audio to begin playback, in milliseconds.
     * @param {Number} [loop=0] How many times the audio loops when it reaches the end of playback. The default is 0 (no
     * loops), and -1 can be used for infinite playback.
     * @param {Number} [pan=0] The left-right pan of the sound (if supported), between -1 (left) and 1 (right).
     * @return {SoundInstance} A "SoundInstance" that can be controlled after it is created.
    **/
    p.playMusic = function(name, interrupt, delay, offset, loop, pan) {
        var group = this._musics[name];

        if (group) {
            var idx = creatine.randomInt(0, group.length-1);
            name = group[idx];
        }

        return createjs.Sound.play(
            name,
            interrupt,
            delay,
            offset,
            loop,
            this._musicVolume,
            pan
        );
    }

    /**
     * Mute/Unmute all audio. Same as setting mute on SoundJS.
    **/
    p.toogleMute = function() {
        if (createjs.Sound.getMute()) {
            createjs.Sound.setMute(false);
        } else {
            createjs.Sound.setMute(true);
        }
    }

    /**
     * @property soundVolume
     * @type {Number}
    **/
    /**
     * @property musicVolume
     * @type {Number}
    **/
    /**
     * @property masterVolume
     * @type {Number}
    **/
    try {
        Object.defineProperties(p, {
            musicVolume: {get:p.getMusicVolume, set:p.setMusicVolume},
            soundVolume: {get:p.getSoundVolume, set:p.setSoundVolume},
            masterVolume: {get:p.getMasterVolume, set:p.setMasterVolume},
        });
    } catch (e) {}

    creatine.Jukebox = Jukebox;

})();
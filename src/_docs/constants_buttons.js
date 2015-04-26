/**
 * @module constants
 */

/** 
 * Constants used for mouse buttons.
 *
 * Identifier            | Value
 * --------------------- | -------------------
 * LEFT                  | `0`
 * MIDDLE                | `1`
 * RIGHT                 | `2`
 *
 * 
 * ## Usage examples
 *
 *     var game = new tine.Game(null, {
 *       update: function() {
 *         if (game.mouse.isPressed(tine.buttons.LEFT)) {
 *           console.log('mouse left pressed');
 *         } else if (game.mouse.isPressed(tine.buttons.MIDDLE)) {
 *           console.log('mouse middle pressed');
 *         }
 *       }
 *     })
 * 
 * @class buttons
 */

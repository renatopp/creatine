/**
 * @module constants
 */

/** 
 * Constants used for gamepad buttons.
 *
 * Identifier            | Value
 * --------------------- | -------------------
 * A                     | `0`
 * B                     | `1`
 * X                     | `2`
 * Y                     | `3`
 * LB                    | `4`
 * RB                    | `5`
 * LT                    | `6`
 * RT                    | `7`
 * SELECT                | `8`
 * START                 | `9`
 * LEFTSTICK             | `10`
 * RIGHTSTICK            | `11`
 * UP                    | `12`
 * DOWN                  | `13`
 * LEFT                  | `14`
 * RIGHT                 | `15`
 * META                  | `16`
 *
 * 
 * ## Usage examples
 *
 *     var game = new tine.Game(null, {
 *       update: function() {
 *         var gamepad = game.gamepads.get(0);
 *         
 *         if (gamepad.isPressed(tine.buttons.A)) {
 *           console.log('gamepad A button pressed');
 *         } else if (gamepad.isReleased(tine.buttons.LT)) {
 *           console.log('gamepad left trigger released');
 *         }
 *       }
 *     })
 * 
 * @class pad
 */

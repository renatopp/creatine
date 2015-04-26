/**
 * @module constants
 */

/** 
 * Constants used for keyboard keys.
 *
 * Identifier            | Value
 * --------------------- | -------------------
 * BACKSPACE             | `8`
 * TAB                   | `9`
 * RETURN                | `13`
 * SHIFT                 | `16`
 * CTRL                  | `17`
 * ALT                   | `18`
 * PAUSE                 | `19`
 * CAPSLOCK              | `20`
 * ESC                   | `27`
 * SPACE                 | `32`
 * PAGEUP                | `33`
 * PAGEDOWN              | `34`
 * END                   | `35`
 * HOME                  | `36`
 * LEFT                  | `37`
 * UP                    | `38`
 * RIGHT                 | `39`
 * DOWN                  | `40`
 * INSERT                | `45`
 * DELETE                | `46`
 * NUM0                  | `48`
 * NUM1                  | `49`
 * NUM2                  | `50`
 * NUM3                  | `51`
 * NUM4                  | `52`
 * NUM5                  | `53`
 * NUM6                  | `54`
 * NUM7                  | `55`
 * NUM8                  | `56`
 * NUM9                  | `57`
 * A                     | `65`
 * B                     | `66`
 * C                     | `67`
 * D                     | `68`
 * E                     | `69`
 * F                     | `70`
 * G                     | `71`
 * H                     | `72`
 * I                     | `73`
 * J                     | `74`
 * K                     | `75`
 * L                     | `76`
 * M                     | `77`
 * N                     | `78`
 * O                     | `79`
 * P                     | `80`
 * Q                     | `81`
 * R                     | `82`
 * S                     | `83`
 * T                     | `84`
 * U                     | `85`
 * V                     | `86`
 * W                     | `87`
 * X                     | `88`
 * Y                     | `89`
 * Z                     | `90`
 * LEFTWINDOWKEY         | `91`
 * RIGHTWINDOWKEY        | `92`
 * CONTEXTMENU           | `93`
 * NUMPAD0               | `96`
 * NUMPAD1               | `97`
 * NUMPAD2               | `98`
 * NUMPAD3               | `99`
 * NUMPAD4               | `100`
 * NUMPAD5               | `101`
 * NUMPAD6               | `102`
 * NUMPAD7               | `103`
 * NUMPAD8               | `104`
 * NUMPAD9               | `105`
 * MULTIPLY              | `106`
 * ADD                   | `107`
 * SEPARATOR             | `108`
 * SUBTRACT              | `109`
 * DECIMAL               | `110`
 * DIVIDE                | `111`
 * F1                    | `112`
 * F2                    | `113`
 * F3                    | `114`
 * F4                    | `115`
 * F5                    | `116`
 * F6                    | `117`
 * F7                    | `118`
 * F8                    | `119`
 * F9                    | `120`
 * F10                   | `121`
 * F11                   | `122`
 * F12                   | `123`
 * F13                   | `124`
 * F14                   | `125`
 * F15                   | `126`
 * F16                   | `127`
 * F17                   | `128`
 * F18                   | `129`
 * F19                   | `130`
 * F20                   | `131`
 * F21                   | `132`
 * F22                   | `133`
 * F23                   | `134`
 * F24                   | `135`
 * NUMLOCK               | `144`
 * SCROLLLOCK            | `145`
 * SEMICOLON             | `186`
 * EQUAL                 | `187`
 * COMMA                 | `188`
 * DASH                  | `189`
 * PERIOD                | `190`
 * SLASH                 | `191`
 * GRAVEACCENT           | `192`
 * OPENBRACKET           | `219`
 * BACKSLASH             | `220`
 * CLOSEBRAKET           | `221`
 * QUOTE                 | `222`
 *
 * 
 * ## Usage examples
 *
 *     var game = new tine.Game(null, {
 *       update: function() {
 *         if (game.keyboard.isPressed(tine.keys.A)) {
 *           console.log('A pressed');
 *         } else if (game.keyboard.isReleased(tine.keys.ENTER)) {
 *           console.log('ENTER released');
 *         }
 *       }
 *     })
 * 
 * @class keys
 */

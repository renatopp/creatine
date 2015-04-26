this.creatine = this.creatine || {};
this.creatine.transitions = this.creatine.transitions || {};
this.creatine.tmx = this.creatine.tmx || {};

// Register the shortcut `tine`
if (typeof this.tine === 'undefined') {
  this.tine = this.creatine;
}

// Anchor constants
creatine.TOP_LEFT     = 'topleft';
creatine.TOP_RIGHT    = 'topright';
creatine.BOTTOM_LEFT  = 'bottomleft';
creatine.BOTTOM_RIGHT = 'bottomright';
creatine.TOP          = 'top';
creatine.BOTTOM       = 'bottom';
creatine.LEFT         = 'left';
creatine.RIGHT        = 'right';
creatine.CENTER       = 'center';

// Axis constants
creatine.HORIZONTAL = 'horizontal';
creatine.VERTICAL = 'vertical';

// Direction constants
creatine.LEFT_TO_RIGHT = 12;
creatine.RIGHT_TO_LEFT = 13;
creatine.TOP_TO_BOTTOM = 14;
creatine.BOTTOM_TO_TOP = 15;

// Resizing constants
creatine.STRETCH = 16;
creatine.FIT = 17;
creatine.FILL = 18;
creatine.NOSCALE = 19;

// Math constants
creatine.DEGREES = 57.2957795;
creatine.RADIANS = 0.0174532925;
creatine.PI2 = 6.2831853071;

// Creatine constants
creatine.VERSION       = '1.0.0';
creatine.DEFAULT_CONFIG = {
  project          : 'creatine_game',
  width            : 800,
  height           : 600,
  container        : null,
  framerate        : 60,
  showfps          : false,
  background_color : '#000',
  resources        : {
    base_path : './',
    manifest  : []
  }
}

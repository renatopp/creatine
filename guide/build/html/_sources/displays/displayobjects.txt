======================
Custom Display Objects
======================

Creatine provides some custom display objects that you can use in your games. 
Notice that, all components here implement the ``layout`` method (with 
exception to the discrete bar), thus you can use them inside a sizer to make 
them resize automatically.


-------------
Progress Bars
-------------

You can easily create progress bars using Creatine, choosing the axis between
horizontal and vertical; and filling it with a full color, with a gradient or
with an image. 

To create a new progress bar, use:

.. code-block:: javascript

    var progress = new creatine.ProgressBar(
        colorsOrImg,
        backgroundColor,
        direction,
        width,
        height,
        min,
        max
    )

where:

- **colorsOrImg** can be:

    - A string with color, e.g.: ``'#FF0033'``. In this case, the whole bar 
      will be filled with the same color;
    - A list of colors, e.g.: ``['#0000FF', '#FF0000']``. In this case, the bar
      will be filled with a gradient passing through all colors in the list;
    - A Bitmap. In this case, the bitmap will be used to fill the bar;

- **backgroundColor** is the background color, e.g.: ``'#000000'``;
- **direction** is the direction that progress bar will grow, it can assume 
  the following values: ``creatine.LEFT_TO_RIGHT``, ``creatine.RIGHT_TO_LEFT``,
  ``creatine.BOTTOM_TO_TOP`` or ``creatine.TOP_TO_BOTTOM``. Using this, you can
  define if the bar is horizontal or vertical.
- **width** is the width in pixels;
- **height** is the height in pixels;
- **min** is the minimum value of the bar;
- **max** is the maximum value of the bar;


------------
Discrete Bar
------------

If you need a progress bar filled with an image, where it only can assume 
discrete values (e.g., the lives of a character) or you need to specify the 
spacing between the images, you can use the ``DiscreteBar``:

.. code-block:: javascript

    var progress = new creatine.DiscreteBar(
        image,
        spacing,
        direction
    )

Notice that, the ``DiscreteBar`` is very simple compared to the progress bar,
accepting only the image as a bitmap, the spacing as an integer, and the 
direction constant.


---------------
Flexible Bitmap
---------------

The ``FlexBitmap`` inherit the ``createjs.Bitmap`` and add the method 
``layout`` to it, allowing the bitmap expanding according to the sizer.

To create a flexible bitmap, you can use:

.. code-block:: javascript

    var bitmap = new creatine.FlexBitmap(imageOrUri, scaleMode);

where:

- **imageOrUri** is the source object or URI to an image to display. Consult
  ``createjs.Bitmap`` to more information.
- **scaleMode** is the constant that describes how the bitmap will expand. This
  can be:

    - ``creatine.STRETCH`` to fill the whole available area, ignoring the 
      aspect ratio of the image;
    - ``creatine.FIT`` to fill the available area keeping the aspect ratio of 
      the image. This does not overflow the area size;
    - ``creatine.FILL`` to fill the available area completely, keeping the 
      aspect ratio of the image. This do overflow the are size;
    - ``creatine.NOSCALE`` to keep the original image size;

=================
Layout Management
=================

Usually, when you add visual objects to the canvas using CreateJS, you must set the absolute position of this object in order to organize it at the screen. Unfortunately, this brings several issues, including: when you have tons of sprites, is pretty hard to set their position one-by-one; after organizing all objects, you can't change any element size or position, otherwise you would have to reorganize the whole screen (this also occurs when you change the text fonts); if the canvas is resized the layout is lost (this resize is common on mobile devices, when the user change the device orientation).

Creatine provides two classes that helps you to organize the visual objects in the screen, their are called Sizers. With these sizers, you can manage all sprite on the screen without the need to set their individual positions (and sizes, in some cases) and you can easily rearrange the sprites when the canvas is resized or when you want to change the layout of the scene. Sizers are a great solution for UI objects, making things easy when you want to create menu, credits and pause scenes, for example.

There are two sizers implemented in Creatine. **BoxSizers** organize the objects into a row or a column, while **GridSizers** organize the objects into a regular or irregular grid, similar to a tic-tac-toe or chess board. These sizers are described in detail in the next subsections.

Basically, sizers implement the ``layout`` method, which receives a parameter ``area`` that describes the total area that the sizer can occupy. When you call the ``layout`` method, the sizer automatically expand itself to occupy the whole area and set the position of all objects that it manage. The objects positions are divided dependently on the sizer configuration. You can add objects to sizers with ``add`` method.

You can also implement the ``layout`` method in your custom visual objects, for example in a button. This method will be called when the sizer is rearranging the objects, allowing you to resize automatically these sprites to occupy the area defined by the sizer.

----------
Box Sizers
----------

A ``BoxSizer`` allow you to organize things in a row or a col. You can create a instance of this sizer using::

    var sizer = new creatine.BoxSizer(orientation, area);

where orientation is one of the constants ``creatine.HORIZONTAL`` or ``creatine.VERTICAL``, and the area is an object describing the available area that the sizer can use. Supposing you want to create a sizer that occupy the whole canvas, the area can be defined as:

.. code-block:: javascript

    var area = new createjs.Rectangle(0, 0, canvas.width, canvas.height);

or:

.. code-block:: javascript

    var area = {x:0, y:0, width:canvas.width, height:canvas.height};

With you base box sizer ready, you can add objects to it using:


.. code-block:: javascript

    sizer.add(object, proportion, border, anchor);

where:

- **object** is the visual object you want to put on the sizer;
- **proportion** is how much of the total area you want to reserve to this 
  object. This may be an integer and is relative to all objects in this sizer, 
  i.e., if this object have the proportion ``5`` and other objects have ``2`` 
  and ``3``, this object will occupy 50% of the total area of the sizer; if 
  this object have proportion ``5`` and other objects have ``25`` and ``20``, 
  this object will occupy only 10% of the total area;
- **border** is how much of empty space the object will have around it;
- **anchor**, default to ``creatine.TOP_LEFT``, is used to defined to where the
  object will be positioned inside its available area.

You can add a sizer inside of another one in order to create complex layouts. 
For example, a horizontal box sizer inside a vertical box sizer:

.. code-block:: javascript
    
    var vbox = new creatine.BoxSizer(creatine.VERTICAL, area);
    var hbox = new creatine.BoxSizer(creatine.HORIZONTAL);

    vbox.add(hbox);

Notice that, the area parameter is required only on the first sizer. 

-----------
Grid Sizers
-----------

With a ``GridSizer``, you can organize things on a regular grid, such as a tic-tac-toe or a chess board. You can create a instance of this sizer as:

.. code-block:: javascript

    var sizer = new creatine.GridSizer(rows, cols, area);

where ``rows`` and ``cols`` are integers defining how much slots the grid will have. The area parameter has the same role as in the ``BoxSizer``, thus you can create a ``Rectangle`` object or a simple dictionary. Also similarly to the box sizer, you can add objects to it using:

.. code-block:: javascript

    sizer.add(object, border, anchor);

Notice that, the grid sizer have no ``proportion`` parameter. The other parameters are:

- **object** is the visual object you want to put on the sizer;
- **border** is how much of empty space the object will have around it;
- **anchor**, default to ``creatine.TOP_LEFT``, is used to defined to where the
  object will be positioned inside its available area.

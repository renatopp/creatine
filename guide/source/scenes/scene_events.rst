============
Scene Events
============

When you add or remove scenes in the director, event signals will be triggered by director to the scenes. A scene can receive 4 different events: ``sceneenter``, ``scenepause``, ``sceneresume`` and ``sceneexit``, and they can be caught using:

.. code-block:: javascript

    this.on('<eventname>', this.callbackFunction);

or:

.. code-block:: javascript

    this.addEventListener('<eventname>', this.callbackFunction);

considering that both statements are inside the Scene. These functions are triggered when:

- **sceneenter**: when a new scene is added to the director. The new scene receives the ``sceneenter`` event.
- **scenepause**: when a new scene is pushed to the director. The scene that leaved the active status receives the ``scenepause`` event.
- **sceneresume**: when you remove the top of the scene stack, the a scene already on the stack that assumes the status of actived receives the ``sceneresume`` event.
- **sceneexit**: when a scene is removed from the director, it receives the ``sceneexit`` event.




===================
Working with Scenes
===================

The previous section presented how ``Director`` and ``Scene`` objects are related and what are the roles of these classes. Now, this section presents how ``Director`` manages the scenes internally and how you can add or remove scenes from it.

You can add lots of scenes into director, but only a single scene be active. In practice, ``Director`` organizes all scenes into a stack, where the scene at the top of this stack is the active one. This organization allows you to put a scene above another, for example, imagine a simple rpg game where the player controls a given character in the ``LevelScene``, when he or she press the 'P' key, you can add a new semi-transparent scene ``PauseScene`` above the ``LevelScene``, keeping both scenes at the screen but the player will only interact with the pause scene.

There are two ways to add a scene into the director:

.. code-block:: javascript

    director.push(new Scene());
    director.replace(new Scene());

When you ``push`` a new scene, the current one will be kept at the stack and the new scene will take its place. Notice that, both scenes will be drawed in the canvas. When you ``replace`` a new scene, the current one will be removed and the new scene will take its place.

There are two ways to remove a scene from the director:

.. code-block:: javascript

    director.pop();
    director.clearStack();

The ``pop`` method removes the current scene from the director and resume the next scene at the stack, turning it as the active scene. The ``clearStack`` will remove all scenes from the stack but the current one.

Take a look at the examples folder, the file "scenes/simple.html" shows how all these functions work.

Scenes are nothing more than ``createjs.Container`` objects, thus, all display objects at the screen can be added on scenes, instead of ``stage``. You still can add objects to the stage, ``Director`` will try to keep the stage children organized. In this case, all objects added to the stage before the first scene pushed will be below the scenes, while that all objects added to the stage after the first scene pushed will be above the scenes. This is useful to add debug or other general UI scenes.

Next section will present how you can add transition effects when you add or remove scenes.
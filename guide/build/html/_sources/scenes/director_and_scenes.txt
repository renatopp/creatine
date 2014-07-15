===================
Director and Scenes
===================

Imagine a theater play about the history of a girl that fights alone against an army of zombies from another dimension. The girl finds itself madly in love for a boy that she saved in her journey and now must decide if she will continue in her endless battle against the zombies or if she will run away to the cold mountains with her lover.

This play can be divided into several **scenes**. In a given scene, the protagonist may be fighting a legion of zombies with her sword in order to keep the enemies away from the children's hospital. In another scene, the protagonist talks with her lover in order to know more about him. In a different scene, the nurse at the children's hospital tells the protagonist that a zombie horde is approaching and the protagonist must accepts her quest or not.

In this play, the **director** has the role of deciding which scene will start the play, when it will end, and which scene will be put in the place of the old one. Moreover, the director controls the whole process of scene changing until the end of the play.

Notice that, in the same way as a theater play, a game can be divided into several scenes. For example: an introduction scene, where an opening video is played; a menu scene, where the player can start the game or change options; credits scene; battle scene; dialog scene; etc.

Creatine provides an architecture for scene management similar to this theater example. An instance of the ``Director`` class has the same role of the director at the theater play, i.e., it controls the whole process of scene changing. By its turn, instances of the ``Scene`` class contain all the graphic and sound content of a small part of the game.

Take a fast look at the following example:

.. code-block:: javascript
    
    var canvas = document.getElementById('canvas');
    var stage = new createjs.Stage(canvas);

    var director = new creatine.Director(stage);
    var menuScene = new creatine.Scene();

    director.push(menuScene);

In this example, we create the ``director`` at line 4 and a scene at line 5. Notice that the ``Director`` requires a ``createjs.Stage`` instance as parameter. This is necessary because the stage is the object responsible to draw everything on the screen, and the director adds and removes scenes from stage automatically to show and hide them. Following, at line 7, the scene is added to the game via ``director.push``.

Next section will present how you can add and remove scenes, and how this work inside the director.
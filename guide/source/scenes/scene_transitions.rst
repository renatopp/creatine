===================
Transitions Effects
===================

Every time you add or remove scenes in director, you can add a transition effect. For example, again, when the player pause the game, the pause scene can fall from the top, bounce when it touches the bottom of the screen and finally stop at its desired position. Once the game is resumed, the same pause screen can bounce again at the bottom and get out of the screen to the top.

There are several different effects on Creatine, check it out the ``creatine.transitions`` module to see the full list. Meanwhile, take a look at the following code:

.. code-block:: javascript

    var effect = new creatine.transitions.MoveIn(creatine.TOP);
    director.push(new PauseScene(), effect);

A ``MoveIn`` transition is created at the first line. This effect makes the new scene enter the screen from a given position (in this case, the top). This is a simple linear effect, i.e., the scene will move with the same velocity from its original position to its destination. You can change this default behavior by adding an Easing, founded on ``createjs.Ease`` module, for example:

.. code-block:: javascript

    var effect = new creatine.transitions.MoveIn(
        creatine.TOP, 
        createjs.Ease.bounceOut
    );
    director.push(new PauseScene(), effect);

Now, the pause scene will fall from the top and bounce at the bottom of the screen before reaching its destination.

You can apply these transitions on the methods: ``push``, ``replace`` and ``pop``. Take a look at the examples folder to see transitions in action.

Next section will describe the events received by scenes, allowing you to pause and resume scenes.
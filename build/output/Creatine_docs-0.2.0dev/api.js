YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [
        "BoxSizer",
        "Component",
        "Device",
        "Director",
        "DiscreteBar",
        "Display",
        "Entity",
        "FadeIn",
        "FadeInOut",
        "FadeOut",
        "FlexBitmap",
        "GridSizer",
        "MoveIn",
        "MoveOut",
        "ProgressBar",
        "ScaleIn",
        "ScaleInOut",
        "ScaleOut",
        "Scene",
        "Scroll",
        "System",
        "TMXImageLayer",
        "TMXIsometricTileLayer",
        "TMXMap",
        "TMXObjectLayer",
        "TMXOrthogonalTileLayer",
        "TMXStaggeredTileLayer",
        "TMXTileLayer",
        "TMXTileset"
    ],
    "modules": [
        "Creatine",
        "Transitions"
    ],
    "allModules": [
        {
            "displayName": "Creatine",
            "name": "Creatine",
            "description": "Creatine is a library that powers up the CreateJS suite! \n\nFocusing on Game Development, creatine adds several new features such as:\n\n<ul>\n  <li>Scene Management;</li>\n  <li>Scene Transitions;</li>\n  <li>Layout Management;</li>\n  <li>Canvas Resizing and other Display options;</li>\n  <li>Device Detection;</li>\n  <li>Other Visual Components, such as Flexible Bitmaps and Progress Bars</li>\n</ul>\n\nFeel free to use, modify, improve, make additions and suggestions."
        },
        {
            "displayName": "Transitions",
            "name": "Transitions",
            "description": "The FadeIn is a transition effect that fades in the new scene.\n\n<h4>Example</h4>\n\n    director.replace(\n        new MyScene(),\n        new creatine.transitions.FadeIn(\n            createjs.Ease.bounceOut, \n            400\n        )\n    )"
        }
    ]
} };
});
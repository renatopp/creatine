
Expandable = function(color) {
    this.initialize();
    this.color = color;

    var shape = new createjs.Shape();
    shape.graphics.beginFill(this.color);
    shape.graphics.drawRect(0, 0, 50, 50);
    this.addChild(shape);
}

Expandable.prototype = new createjs.Container();

Expandable.prototype.layout = function(area) {
    this.removeAllChildren();
    
    var shape = new createjs.Shape();
    shape.graphics.beginFill(this.color);
    shape.graphics.drawRect(0, 0, area.width, area.height);
    this.addChild(shape);
}

Expandable.prototype.getBounds = function() {
    return {x:0, y:0, width:50, height:50};
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
}

if (creatine.Scene) {
    RandomScene = function(x, y, w, h, label) {
        this.initialize();
        
        var color = getRandomColor();
        var shape = new createjs.Shape();
        var text = new createjs.Text(label||color, '48px Arial');
        var text_bounds = text.getBounds();
        text.x = w/2 - text_bounds.width/2;
        text.y = h/2 - text_bounds.height/2;
        shape.graphics.beginFill(color);
        shape.graphics.drawRect(0, 0, w, h);
        this.addChild(shape);
        this.addChild(text);
        this.x = x;
        this.y = y;
    }
    RandomScene.prototype = new creatine.Scene();
}
DefineModule('phoenix/level-manager', function (require) {
    var GameObject = require('models/game-object');
    var FlyPlayerInFromBottom = require('phoenix/scripts/fly-player-in-from-bottom');
    var Level_01 = require('phoenix/levels/level-01');

    return DefineClass(GameObject, {
        levels: [null, Level_01],

        constructor: function (game) {
            this.super('constructor', arguments);

            this.game = game;
            this.levelIndex = 1;
        },

        startLevel: function () {
            var LevelClass = this.levels[ this.levelIndex ];
            this.currentLevel = new LevelClass(this, this.game);

            this.children.push(this.currentLevel);
            this.children.push(new FlyPlayerInFromBottom(this, this.game));

            this.children.forEach(function (script) {
                script.active = true;
                script.start();
            });
        },
        signalScriptFinished: function (script) {
            script.active = false;
            this.removeChild(script);
        }
    });
});

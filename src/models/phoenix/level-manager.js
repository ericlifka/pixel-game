(function () {

    var FlyPlayerInFromBottom = DefineClass(GameObject, {
        constructor: function (parent, game) {
            this.super('constructor', arguments);

            this.game = game;
            this.player = game.player;
        },
        start: function () {
            this.setStartingPosition();
        },
        update: function (dtime) {
            this.super('update', arguments);
        },
        setStartingPosition: function () {
            var position = this.player.position;
            var velocity = this.player.velocity;

            position.x = Math.floor(this.game.width / 2 - this.player.sprite.width / 2);
            position.y = this.game.height - this.player.sprite.height - 1;
            velocity.x = 0;
            velocity.y = 0;
        },
    });

    window.PhoenixLevelManager = DefineClass(GameObject, {
        levels: [
            {

            }
        ],
        constructor: function (game) {
            this.super('constructor', arguments);

            this.game = game;
            this.nextLevel = 0;
        },
        startLevel: function () {
            this.currentLevel = this.levels[ this.nextLevel ];
            this.nextLevel++;

            this.children.push(new FlyPlayerInFromBottom(this, this.game));

            this.children.forEach(function (script) {
                script.start();
            });
        }
    });
}());

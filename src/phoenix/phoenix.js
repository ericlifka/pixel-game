DefineModule('phoenix/game', function (require) {
    var GameObject = require('models/game-object');
    var LevelManager = require('phoenix/level-manager');
    var Bullet = require('phoenix/bullet');
    var PlayerShip = require('phoenix/player-controlled-ship');
    var Collisions = require('helpers/collisions');
    var InputInterpretter = require('phoenix/input-interpretter');

    return DefineClass(GameObject, {
        FILL_COLOR: "#020031",
        constructor: function (gameDimensions) {
            this.super('constructor');

            this.width = gameDimensions.width;
            this.height = gameDimensions.height;

            this.inputInterpretter = new InputInterpretter();
            this.levelManager = new LevelManager(this);
            this.player = new PlayerShip(this);

            this.addChild(this.levelManager);
            this.addChild(this.player);

            this.levelManager.startLevel();
        },
        spawnBullet: function (position, velocity, acceleration) {
            this.addChild(new Bullet(this, position, velocity, acceleration));
        },
        processInput: function (rawInput) {
            var input = this.inputInterpretter.interpret(rawInput);

            this.super('processInput', [ input ]);
        },
        update: function (dtime) {
            this.super('update', arguments);
            this.checkCollisions();
        },
        checkCollisions: function () {
            var physicalEntities = this.children.filter(function (child) {
                return child.position && child.sprite && !child.exploding;
            });

            var collisionPairs = [ ];

            for (var i = 0; i < physicalEntities.length - 1; i++) {
                var outer = physicalEntities[ i ];

                for (var j = i + 1; j < physicalEntities.length; j++) {
                    var inner = physicalEntities[ j ];

                    if (Collisions.boxCollision(outer, inner)) {
                        collisionPairs.push([outer, inner]);
                    }
                }
            }

            collisionPairs.forEach(function (entityPair) {
                var a = entityPair[ 0 ];
                var b = entityPair[ 1 ];

                if (Collisions.spriteCollision(a, b)) {
                    a.applyDamage(b.damage);
                    b.applyDamage(a.damage);
                }
            });
        }
    });
});

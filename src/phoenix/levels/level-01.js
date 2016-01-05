DefineModule('phoenix/levels/level-01', function (require) {
    var EnemyShip = require('phoenix/enemy-ship');
    var GameObject = require('models/game-object');
    var MoveObjectToPoint = require('phoenix/scripts/move-object-to-point');

    return DefineClass(GameObject, {
        constructor: function (parent, game) {
            this.super('constructor', arguments);

            this.game = game;
            this.ships = [];

            for (var i = 1; i <= 10; i++) {
                var ship = new EnemyShip(game);
                ship.position.x = 10 * i;
                ship.position.y = -20 * i;

                this.addChild(new MoveObjectToPoint(game, ship, {
                    x: ship.position.x,
                    y: 20
                }, 2 + i * .5));
                this.ships.push(ship);
            }
        },
        start: function () {
            var game = this.game;
            this.ships.forEach(function (ship) {
                game.addChild(ship);
            });

            this.children.forEach(function (script) {
                script.start();
            });
        }
    });
});

DefineModule('phoenix/bullet', function (require) {
    var GameObject = require('models/game-object');
    var bulletSprite = require('phoenix/sprites/bullet');
    var smallExplosion = require('phoenix/animations/small-explosion');

    return DefineClass(GameObject, {
        constructor: function (parent, team, position, velocity, acceleration) {
            this.super('constructor', arguments);

            this.team = team;
            this.position = position;
            this.velocity = velocity;
            this.acceleration = acceleration;

            this.sprite = bulletSprite();
            this.explosion = smallExplosion;

            this.life = 0;
            this.maxLife = 1;
            this.damage = 1;
        },
        checkBoundaries: function () {
            if (this.position.x < 0
                || this.position.y < 0
                || this.position.x + this.sprite.width > this.parent.width
                || this.position.y + this.sprite.height > this.parent.height) {

                this.destroy();
            }
        }
    });
});

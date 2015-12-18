window.GameObject = DefineClass({
    constructor: function (parentObj) {
        this.parent = parentObj;
        this.children = [];
    },
    processInput: function (input) {
        if (this.children) {
            this.children.forEach(function (child) {
                if (typeof child.processInput === "function") {
                    child.processInput(input);
                }
            });
        }
    },
    update: function (dtime) {
        if (this.children) {
            this.children.forEach(function (child) {
                if (typeof child.update === "function") {
                    child.update(dtime);
                }
            });
        }

        if (this.position && this.velocity) {
            this.position.x += this.velocity.x * dtime / 1000;
            this.position.y += this.velocity.y * dtime / 1000;
        }

        this.checkBoundaries();
    },
    checkBoundaries: function () { },
    renderToFrame: function (frame) {
        if (this.children) {
            this.children.forEach(function (child) {
                if (typeof child.renderToFrame === "function") {
                    child.renderToFrame(frame);
                }
            });
        }

        if (this.sprite && this.position) {
            this.sprite.renderToFrame(Math.floor(this.position.x), Math.floor(this.position.y), frame);
        }
    },
    addChild: function (child) {
        if (this.children && child) {
            this.children.push(child);
        }
    },
    removeChild: function (child) {
        if (this.children && child) {
            var index = this.children.indexOf(child);
            if (index >= 0) {
                this.children.splice(index, 1);
            }
        }
    }
});